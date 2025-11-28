import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Check if user has voted in an election
 * GET /api/vote/check?electionId=xxx
 */
export async function GET(request: NextRequest) {
  try {
    // Verify user authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getCurrentUserFromToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 401 }
      );
    }

    console.log('[VoteCheck] Checking vote for user:', user.id);

    const { searchParams } = new URL(request.url);
    const electionId = searchParams.get('electionId');

    if (!electionId) {
      return NextResponse.json(
        { success: false, error: 'Election ID is required' },
        { status: 400 }
      );
    }

    // Check if user has voted
    const vote = await prisma.vote.findUnique({
      where: {
        userId_electionId: {
          userId: user.id,
          electionId: BigInt(electionId)
        }
      },
      include: {
        candidate: true
      }
    });

    console.log('[VoteCheck] Vote result for user', user.id, ':', vote ? 'HAS VOTED' : 'NOT VOTED');

    if (vote) {
      const response = NextResponse.json({
        success: true,
        data: {
          hasVoted: true,
          candidateId: vote.candidateId.toString(),
          candidateName: vote.candidate.name,
          txHash: vote.txHash,
          votedAt: vote.castAt.toISOString()
        }
      });
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
      return response;
    }

    const response = NextResponse.json({
      success: true,
      data: {
        hasVoted: false,
        candidateId: null,
        candidateName: null,
        txHash: null,
        votedAt: null
      }
    });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;

  } catch (error: any) {
    console.error('Vote check error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to check vote status' },
      { status: 500 }
    );
  }
}
