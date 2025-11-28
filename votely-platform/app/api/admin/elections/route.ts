import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAllElections, createElection, deleteElection } from '@/lib/elections';
import { getCurrentUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Helper to serialize election data
function serializeElection(election: any) {
  return {
    ...election,
    id: election.id.toString(),
    chainElectionId: election.chainElectionId?.toString() || null,
    deletedAt: election.deletedAt?.toISOString() || null,
    candidates: election.candidates?.map((c: any) => ({
      ...c,
      id: c.id.toString(),
      electionId: c.electionId.toString(),
      chainCandidateId: c.chainCandidateId?.toString() || null,
    })) || [],
  };
}

// GET - Get all elections (admin only)
export async function GET(request: NextRequest) {
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

    // Fetch elections with vote counts (exclude soft-deleted)
    const elections = await prisma.election.findMany({
      where: {
        deletedAt: null
      },
      include: {
        candidates: {
          orderBy: {
            orderIndex: 'asc'
          }
        },
        creator: {
          include: {
            penduduk: true
          }
        },
        _count: {
          select: {
            votes: true
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    });

    const serializedElections = elections.map(serializeElection);

    return NextResponse.json({
      success: true,
      data: serializedElections,
    });
  } catch (error) {
    console.error('Error fetching elections:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new election (admin only)
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { name, description, level, city, province, startTime, endTime, candidates } = body;

    // Validate required fields
    if (!name || !description || !level || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startTime);
    const end = new Date(endTime);
    
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

    // Create election with candidates in a transaction
    const election = await prisma.$transaction(async (tx) => {
      // Create election
      const newElection = await tx.election.create({
        data: {
          name,
          description,
          level,
          city: city || null,
          province: province || null,
          startTime: start,
          endTime: end,
          createdBy: user.id,
        }
      });

      // Create candidates if provided
      if (candidates && Array.isArray(candidates) && candidates.length > 0) {
        await tx.candidate.createMany({
          data: candidates.map((c: { name: string; party: string; description?: string }, index: number) => ({
            electionId: newElection.id,
            name: c.name,
            party: c.party,
            description: c.description || null,
            orderIndex: index,
          }))
        });
      }

      // Return election with candidates
      return tx.election.findUnique({
        where: { id: newElection.id },
        include: { candidates: true }
      });
    });

    return NextResponse.json({
      success: true,
      data: serializeElection(election),
      message: 'Election created successfully',
    });
  } catch (error) {
    console.error('Error creating election:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete election (admin only)
export async function DELETE(request: NextRequest) {
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
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Election ID is required' },
        { status: 400 }
      );
    }

    await deleteElection(id);

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
