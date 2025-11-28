import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { addCandidate, getCandidatesByElection } from '@/lib/elections';
import { getCurrentUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Helper to serialize candidate data
function serializeCandidate(candidate: any) {
  return {
    ...candidate,
    id: candidate.id.toString(),
    electionId: candidate.electionId.toString(),
  };
}

// GET - Get candidates for an election (admin only)
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
    const candidates = await getCandidatesByElection(electionId);

    return NextResponse.json({
      success: true,
      data: candidates.map(serializeCandidate),
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add candidate to election (admin only)
export async function POST(
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
    const { name, party, description, photoUrl } = body;

    // Validate required fields
    if (!name || !party) {
      return NextResponse.json(
        { success: false, error: 'Name and party are required' },
        { status: 400 }
      );
    }

    // Get the next order index
    const existingCandidates = await getCandidatesByElection(electionId);
    const orderIndex = existingCandidates.length;

    const candidate = await addCandidate({
      electionId,
      name,
      party,
      description: description || null,
      photoUrl: photoUrl || null,
      orderIndex,
    });

    return NextResponse.json({
      success: true,
      data: serializeCandidate(candidate),
      message: 'Candidate added successfully',
    });
  } catch (error) {
    console.error('Error adding candidate:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete candidate (admin only)
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

    const { searchParams } = new URL(request.url);
    const candidateId = searchParams.get('candidateId');

    if (!candidateId) {
      return NextResponse.json(
        { success: false, error: 'Candidate ID is required' },
        { status: 400 }
      );
    }

    await prisma.candidate.delete({
      where: { id: BigInt(candidateId) },
    });

    return NextResponse.json({
      success: true,
      message: 'Candidate deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
