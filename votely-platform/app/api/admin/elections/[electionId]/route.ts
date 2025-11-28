import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getElectionById, updateElection } from '@/lib/elections';
import { getCurrentUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Helper to serialize election data
function serializeElection(election: any, voteCounts?: Record<string, number>, totalVotes?: number) {
  return {
    ...election,
    id: election.id.toString(),
    chainElectionId: election.chainElectionId?.toString() || null,
    totalVotes: totalVotes || 0,
    deletedAt: election.deletedAt?.toISOString() || null,
    candidates: election.candidates?.map((c: any) => ({
      ...c,
      id: c.id.toString(),
      electionId: c.electionId.toString(),
      chainCandidateId: c.chainCandidateId?.toString() || null,
      voteCount: voteCounts ? (voteCounts[c.id.toString()] || 0) : 0,
    })) || [],
  };
}

// Helper to get election status
function getElectionStatus(startTime: Date, endTime: Date): 'upcoming' | 'active' | 'finished' {
  const now = new Date();
  if (now < startTime) return 'upcoming';
  if (now >= startTime && now <= endTime) return 'active';
  return 'finished';
}

// GET - Get election by ID (admin only)
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
    const { searchParams } = new URL(request.url);
    const includeResults = searchParams.get('includeResults') === 'true';

    const election = await getElectionById(electionId);

    if (!election) {
      return NextResponse.json(
        { success: false, error: 'Election not found' },
        { status: 404 }
      );
    }

    // Get vote counts if requested
    let voteCounts: Record<string, number> = {}
    let totalVotes = 0

    if (includeResults) {
      const votes = await prisma.vote.groupBy({
        by: ['candidateId'],
        where: {
          electionId: BigInt(electionId)
        },
        _count: {
          candidateId: true
        }
      })

      votes.forEach(v => {
        voteCounts[v.candidateId.toString()] = v._count.candidateId
        totalVotes += v._count.candidateId
      })
    }

    return NextResponse.json({
      success: true,
      data: serializeElection(election, voteCounts, totalVotes),
    });
  } catch (error) {
    console.error('Error fetching election:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update election (admin only)
export async function PUT(
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
    const body = await request.json();

    // Get current election to check status
    const currentElection = await getElectionById(electionId);
    if (!currentElection) {
      return NextResponse.json(
        { success: false, error: 'Election not found' },
        { status: 404 }
      );
    }

    // Check if election is soft deleted
    if (currentElection.deletedAt) {
      return NextResponse.json(
        { success: false, error: 'Cannot edit a deleted election' },
        { status: 400 }
      );
    }

    // Check if election is deployed to blockchain
    if (currentElection.chainElectionId) {
      return NextResponse.json(
        { success: false, error: 'Cannot edit election after it has been deployed to blockchain. Only adding candidates is allowed (if not yet started).' },
        { status: 400 }
      );
    }

    // Check election status
    const status = getElectionStatus(currentElection.startTime, currentElection.endTime);
    
    if (status === 'active') {
      return NextResponse.json(
        { success: false, error: 'Cannot edit election while it is active/ongoing' },
        { status: 400 }
      );
    }

    if (status === 'finished') {
      return NextResponse.json(
        { success: false, error: 'Cannot edit election after it has finished' },
        { status: 400 }
      );
    }

    // Validate dates if provided
    if (body.startTime && body.endTime) {
      const start = new Date(body.startTime);
      const end = new Date(body.endTime);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return NextResponse.json(
          { success: false, error: 'Invalid date format' },
          { status: 400 }
        );
      }

      if (end <= start) {
        return NextResponse.json(
          { success: false, error: 'End time must be after start time' },
          { status: 400 }
        );
      }

      body.startTime = start;
      body.endTime = end;
    }

    const election = await updateElection(electionId, body);

    return NextResponse.json({
      success: true,
      data: serializeElection(election),
      message: 'Election updated successfully',
    });
  } catch (error) {
    console.error('Error updating election:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete election (admin only)
export async function DELETE(
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

    // Get current election to check status
    const currentElection = await getElectionById(electionId);
    if (!currentElection) {
      return NextResponse.json(
        { success: false, error: 'Election not found' },
        { status: 404 }
      );
    }

    // Check if already deleted
    if (currentElection.deletedAt) {
      return NextResponse.json(
        { success: false, error: 'Election is already deleted' },
        { status: 400 }
      );
    }

    // Check election status - can only delete if finished or upcoming (not active)
    const status = getElectionStatus(currentElection.startTime, currentElection.endTime);
    
    if (status === 'active') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete election while it is active/ongoing' },
        { status: 400 }
      );
    }

    // Perform soft delete
    await prisma.election.update({
      where: { id: BigInt(electionId) },
      data: { deletedAt: new Date() }
    });

    return NextResponse.json({
      success: true,
      message: 'Election deleted successfully (soft delete)',
    });
  } catch (error) {
    console.error('Error deleting election:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
