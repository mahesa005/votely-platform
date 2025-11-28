import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserFromToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getContract, prepareContractCall, sendTransaction, readContract } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { cookies } from 'next/headers';

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

const chain = defineChain(11155111); // Sepolia

const votingContract = getContract({
  client,
  chain,
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
});

/**
 * Cast vote on blockchain (admin pays gas, vote recorded for user)
 * POST /api/vote/cast
 */
export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please login' },
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

    console.log('[VoteCast] User attempting to vote:', user.id);

    const body = await request.json();
    const { electionId, candidateId } = body;

    if (!electionId || !candidateId) {
      return NextResponse.json(
        { success: false, error: 'Election ID and Candidate ID are required' },
        { status: 400 }
      );
    }

    // Get election from database
    const election = await prisma.election.findUnique({
      where: { id: BigInt(electionId) },
      include: { candidates: true }
    });

    if (!election) {
      return NextResponse.json(
        { success: false, error: 'Election not found' },
        { status: 404 }
      );
    }

    // Check if election is deployed to blockchain
    if (!election.chainElectionId) {
      return NextResponse.json(
        { success: false, error: 'Election is not deployed to blockchain' },
        { status: 400 }
      );
    }

    // Check if election is active
    const now = new Date();
    if (now < election.startTime) {
      return NextResponse.json(
        { success: false, error: 'Election has not started yet' },
        { status: 400 }
      );
    }
    if (now > election.endTime) {
      return NextResponse.json(
        { success: false, error: 'Election has ended' },
        { status: 400 }
      );
    }

    // Find candidate
    const candidate = election.candidates.find(c => c.id.toString() === candidateId);
    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found in this election' },
        { status: 404 }
      );
    }

    // Check if candidate is deployed
    if (!(candidate as any).chainCandidateId) {
      return NextResponse.json(
        { success: false, error: 'Candidate is not deployed to blockchain' },
        { status: 400 }
      );
    }

    // Check if user already voted in database
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_electionId: {
          userId: user.id,
          electionId: BigInt(electionId)
        }
      }
    });

    if (existingVote) {
      console.log('[VoteCast] User already voted in DB:', user.id);
      return NextResponse.json(
        { success: false, error: 'You have already voted in this election' },
        { status: 400 }
      );
    }

    // Admin wallet pays gas
    const adminPrivateKey = process.env.PRIVATE_KEY;
    if (!adminPrivateKey) {
      return NextResponse.json(
        { success: false, error: 'Server wallet not configured' },
        { status: 500 }
      );
    }

    const adminAccount = privateKeyToAccount({
      client,
      privateKey: adminPrivateKey,
    });

    const chainElectionId = election.chainElectionId;
    const chainCandidateId = (candidate as any).chainCandidateId;

    console.log('[VoteCast] Casting vote on blockchain:', {
      odVoter: user.id,
      voterWallet: user.walletAddress,
      chainElectionId: chainElectionId.toString(),
      chainCandidateId: chainCandidateId.toString(),
      paidBy: adminAccount.address
    });

    // Try to use voteFor function if available (allows voting on behalf of user)
    // This properly records the vote for the user's wallet address
    let receipt;
    try {
      // First try voteFor (if contract supports it)
      const voteForTx = prepareContractCall({
        contract: votingContract,
        method: "function voteFor(uint256 electionId, uint256 candidateId, address voter)",
        params: [chainElectionId, chainCandidateId, user.walletAddress as `0x${string}`]
      });

      receipt = await sendTransaction({
        transaction: voteForTx,
        account: adminAccount,
      });
      console.log('[VoteCast] Vote (voteFor) transaction confirmed:', receipt.transactionHash);
    } catch (voteForError: any) {
      console.log('[VoteCast] voteFor not available or failed, trying vote():', voteForError.message);
      
      // Check if admin already voted on blockchain
      try {
        const hasVoted = await readContract({
          contract: votingContract,
          method: "function hasVoted(uint256 electionId, address voter) view returns (bool)",
          params: [chainElectionId, adminAccount.address as `0x${string}`]
        });

        if (hasVoted) {
          console.log('[VoteCast] Admin wallet already voted on blockchain for this election');
          // Since admin wallet already voted, we can only record in DB
          // This is a limitation of the current contract design
          return NextResponse.json(
            { 
              success: false, 
              error: 'Already voted in this election',
              details: 'The voting system has reached its limit for this election. Please contact administrator.'
            },
            { status: 400 }
          );
        }
      } catch (checkError) {
        console.log('[VoteCast] Could not check hasVoted:', checkError);
      }

      // Fallback to regular vote function
      const voteTx = prepareContractCall({
        contract: votingContract,
        method: "function vote(uint256 electionId, uint256 candidateId)",
        params: [chainElectionId, chainCandidateId]
      });

      receipt = await sendTransaction({
        transaction: voteTx,
        account: adminAccount,
      });
      console.log('[VoteCast] Vote transaction confirmed:', receipt.transactionHash);
    }

    // Record vote in database
    const vote = await prisma.vote.create({
      data: {
        userId: user.id,
        electionId: BigInt(electionId),
        candidateId: BigInt(candidateId),
        txHash: receipt.transactionHash,
      }
    });

    console.log('[VoteCast] Vote recorded in DB for user:', user.id);

    return NextResponse.json({
      success: true,
      data: {
        voteId: vote.id.toString(),
        transactionHash: receipt.transactionHash,
        electionId: electionId,
        candidateId: candidateId,
      },
      message: 'Vote cast successfully!'
    });

  } catch (error: any) {
    console.error('[VoteCast] Vote casting error:', error);
    
    // Parse blockchain errors for better user messages
    let errorMessage = error.message || 'Failed to cast vote';
    if (errorMessage.includes('Already voted')) {
      errorMessage = 'Already voted in this election';
    } else if (errorMessage.includes('Election not active')) {
      errorMessage = 'Election is not currently active';
    } else if (errorMessage.includes('insufficient funds')) {
      errorMessage = 'System error - please contact administrator';
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
