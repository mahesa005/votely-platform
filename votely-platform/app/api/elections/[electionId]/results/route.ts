import { NextRequest, NextResponse } from 'next/server';
import { getElectionById } from '@/lib/elections';
import { prisma } from '@/lib/prisma';

// GET - Get election results (public endpoint for finished elections)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ electionId: string }> }
) {
  try {
    const { electionId } = await context.params;

    const election = await getElectionById(electionId);

    if (!election) {
      return NextResponse.json(
        { success: false, error: 'Election not found' },
        { status: 404 }
      );
    }

    // Check if election has ended (results should only be visible after election ends)
    const now = new Date();
    const isFinished = now > election.endTime;

    if (!isFinished) {
      return NextResponse.json(
        { success: false, error: 'Election results are not yet available. Results will be visible after the election ends.' },
        { status: 403 }
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
    const totalVotes = voteCounts.reduce((sum, v) => sum + v._count.candidateId, 0);

    // Build results with candidate info
    const results = election.candidates?.map((candidate: any) => {
      const voteData = voteCounts.find(v => v.candidateId === candidate.id);
      const count = voteData?._count.candidateId || 0;
      return {
        candidateId: candidate.id.toString(),
        name: candidate.name,
        party: candidate.party,
        imageUrl: candidate.imageUrl,
        voteCount: count,
        percentage: totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(2) : '0.00'
      };
    }) || [];

    // Sort by vote count descending
    results.sort((a, b) => b.voteCount - a.voteCount);

    return NextResponse.json({
      success: true,
      data: {
        electionId: election.id.toString(),
        electionName: election.name,
        description: election.description,
        startTime: election.startTime.toISOString(),
        endTime: election.endTime.toISOString(),
        totalVotes,
        results,
        winner: results.length > 0 ? results[0] : null
      }
    });
  } catch (error) {
    console.error('Error fetching election results:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
