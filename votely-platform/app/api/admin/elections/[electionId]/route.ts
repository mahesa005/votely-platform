import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getElectionById, updateElection, deleteElection } from '@/lib/elections';
import { getCurrentUserFromToken } from '@/lib/auth';

// Helper to serialize election data
function serializeElection(election: any) {
  return {
    ...election,
    id: election.id.toString(),
    chainElectionId: election.chainElectionId?.toString() || null,
    candidates: election.candidates?.map((c: any) => ({
      ...c,
      id: c.id.toString(),
      electionId: c.electionId.toString(),
    })) || [],
  };
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
    const election = await getElectionById(electionId);

    if (!election) {
      return NextResponse.json(
        { success: false, error: 'Election not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: serializeElection(election),
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

// DELETE - Delete election (admin only)
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
    await deleteElection(electionId);

    return NextResponse.json({
      success: true,
      message: 'Election deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting election:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
