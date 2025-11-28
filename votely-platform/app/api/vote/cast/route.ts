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

    console.log('Casting vote on blockchain:', {
      voter: user.id,
      voterWallet: user.walletAddress,
      chainElectionId: chainElectionId.toString(),
      chainCandidateId: chainCandidateId.toString(),
      paidBy: adminAccount.address
    });

    // Check if already voted on blockchain (using voter's wallet address)
    try {
      const hasVoted = await readContract({
        contract: votingContract,
        method: "function hasVoted(uint256 electionId, address voter) view returns (bool)",
        params: [chainElectionId, user.walletAddress as `0x${string}`]
      });

      if (hasVoted) {
        return NextResponse.json(
          { success: false, error: 'You have already voted on blockchain' },
          { status: 400 }
        );
      }
    } catch (e) {
      console.log('Could not check hasVoted on blockchain, proceeding...');
    }

    // Cast vote on blockchain
    // Note: The smart contract should have a function that allows admin to vote on behalf of user
    // Or we use the voteFor function if available
    const voteTx = prepareContractCall({
      contract: votingContract,
      method: "function vote(uint256 electionId, uint256 candidateId)",
      params: [chainElectionId, chainCandidateId]
    });

    const receipt = await sendTransaction({
      transaction: voteTx,
      account: adminAccount, // Admin pays gas
    });

    console.log('Vote transaction confirmed:', receipt.transactionHash);

    // Record vote in database
    const vote = await prisma.vote.create({
      data: {
        userId: user.id,
        electionId: BigInt(electionId),
        candidateId: BigInt(candidateId),
        txHash: receipt.transactionHash,
      }
    });

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
    console.error('Vote casting error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to cast vote' },
      { status: 500 }
    );
  }
}
