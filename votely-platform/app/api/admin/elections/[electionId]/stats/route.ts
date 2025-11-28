import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getElectionById } from '@/lib/elections';
import { getCurrentUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Get election statistics (admin only)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ electionId: string }> }
) {
  try {
    // Verify admin
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getCurrentUserFromToken(token);
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { electionId } = await context.params;

    const election = await getElectionById(electionId);

    if (!election) {
      return NextResponse.json(
        { success: false, error: 'Election not found' },
        { status: 404 }
      );
    }

    // Get vote counts per candidate
    const voteCounts = await prisma.vote.groupBy({
      by: ['candidateId'],
      where: {
        electionId: BigInt(electionId)
      },
      _count: {
        candidateId: true
      }
    });

    // Get total votes
    const totalVotes = voteCounts.reduce((sum: number, v: { _count: { candidateId: number } }) => sum + v._count.candidateId, 0);

    // Get unique voters count
    const uniqueVoters = await prisma.vote.findMany({
      where: {
        electionId: BigInt(electionId)
      },
      distinct: ['userId'],
      select: {
        userId: true
      }
    }).then((votes: { userId: string }[]) => votes.length).catch(() => totalVotes);

    // Build candidate stats
    const candidateStats = election.candidates?.map((candidate: any) => {
      const voteData = voteCounts.find((v: { candidateId: bigint; _count: { candidateId: number } }) => v.candidateId === candidate.id);
      const count = voteData?._count.candidateId || 0;
      return {
        id: candidate.id.toString(),
        name: candidate.name,
        party: candidate.party,
        voteCount: count,
        percentage: totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(2) : '0.00'
      };
    }) || [];

    // Calculate election status
    const now = new Date();
    let status: 'upcoming' | 'active' | 'finished';
    if (now < election.startTime) {
      status = 'upcoming';
    } else if (now >= election.startTime && now <= election.endTime) {
      status = 'active';
    } else {
      status = 'finished';
    }

    return NextResponse.json({
      success: true,
      data: {
        electionId: election.id.toString(),
        electionName: election.name,
        status,
        totalVotes,
        uniqueVoters,
        candidateCount: election.candidates?.length || 0,
        candidateStats,
        startTime: election.startTime.toISOString(),
        endTime: election.endTime.toISOString(),
      }
    });
  } catch (error) {
    console.error('Error fetching election stats:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
