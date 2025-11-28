import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { privateKeyToAccount } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

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
 * Deploy candidates to an already deployed election on blockchain
 * POST /api/admin/elections/deploy-candidates
 * 
 * This is used when:
 * 1. Election was deployed without candidates
 * 2. New candidates were added after initial deployment
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userData = await verifyToken(token);
    if (!userData || userData.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { electionId } = body;

    if (!electionId) {
      return NextResponse.json(
        { success: false, error: 'Election ID is required' },
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
        { success: false, error: 'Election is not deployed to blockchain yet. Deploy the election first.' },
        { status: 400 }
      );
    }

    // Get candidates that are NOT yet deployed (chainCandidateId is null)
    const undeployedCandidates = election.candidates.filter(c => !c.chainCandidateId);

    if (undeployedCandidates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'All candidates are already deployed to blockchain' },
        { status: 400 }
      );
    }

    // Admin wallet from private key
    const adminPrivateKey = process.env.PRIVATE_KEY;
    if (!adminPrivateKey) {
      return NextResponse.json(
        { success: false, error: 'Admin wallet not configured' },
        { status: 500 }
      );
    }

    const adminAccount = privateKeyToAccount({
      client,
      privateKey: adminPrivateKey,
    });

    const chainElectionId = election.chainElectionId;

    // Find the highest existing chainCandidateId for this election
    const deployedCandidates = election.candidates.filter(c => c.chainCandidateId);
    let nextBlockchainCandidateId = 1n;
    if (deployedCandidates.length > 0) {
      const maxChainId = deployedCandidates.reduce((max, c) => {
        const chainId = c.chainCandidateId || 0n;
        return chainId > max ? chainId : max;
      }, 0n);
      nextBlockchainCandidateId = maxChainId + 1n;
    }

    console.log('Deploying candidates to blockchain:', {
      electionId: electionId,
      chainElectionId: chainElectionId.toString(),
      undeployedCount: undeployedCandidates.length,
      startingBlockchainId: nextBlockchainCandidateId.toString()
    });

    // Sort undeployed candidates by orderIndex
    const sortedCandidates = undeployedCandidates.sort((a, b) => a.orderIndex - b.orderIndex);

    const deployedResults: { candidateId: string; name: string; chainCandidateId: string; txHash: string }[] = [];

    // Add candidates to blockchain
    for (const candidate of sortedCandidates) {
      console.log(`Adding candidate: ${candidate.name} (blockchain ID: ${nextBlockchainCandidateId})`);
      
      const addCandidateTx = prepareContractCall({
        contract: votingContract,
        method: "function addCandidate(uint256 electionId, string name, string party, string imageUrl)",
        params: [
          chainElectionId,
          candidate.name,
          candidate.party,
          candidate.photoUrl || ""
        ]
      });

      const candidateReceipt = await sendTransaction({
        transaction: addCandidateTx,
        account: adminAccount,
      });

      console.log('Candidate added:', candidateReceipt.transactionHash);

      // Update candidate with blockchain ID
      await prisma.candidate.update({
        where: { id: candidate.id },
        data: { chainCandidateId: nextBlockchainCandidateId } as any
      });

      deployedResults.push({
        candidateId: candidate.id.toString(),
        name: candidate.name,
        chainCandidateId: nextBlockchainCandidateId.toString(),
        txHash: candidateReceipt.transactionHash
      });

      console.log(`Updated candidate ${candidate.id} with chainCandidateId: ${nextBlockchainCandidateId}`);

      nextBlockchainCandidateId++;
    }

    console.log('All candidates deployed successfully');

    return NextResponse.json({
      success: true,
      data: {
        electionId: electionId,
        chainElectionId: chainElectionId.toString(),
        candidatesDeployed: deployedResults.length,
        candidates: deployedResults
      }
    });

  } catch (error: any) {
    console.error('Deploy candidates error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to deploy candidates to blockchain' },
      { status: 500 }
    );
  }
}
