import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getContract, prepareContractCall, sendTransaction, readContract } from "thirdweb";
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
 * Deploy election to blockchain
 * POST /api/admin/elections/deploy-blockchain
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

    // Check if already deployed
    if (election.chainElectionId) {
      return NextResponse.json(
        { success: false, error: 'Election already deployed to blockchain' },
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

    // Convert dates to Unix timestamps
    const startTime = Math.floor(new Date(election.startTime).getTime() / 1000);
    const endTime = Math.floor(new Date(election.endTime).getTime() / 1000);

    console.log('Deploying election to blockchain:', {
      name: election.name,
      startTime: new Date(startTime * 1000).toISOString(),
      endTime: new Date(endTime * 1000).toISOString(),
    });

    // Create election on blockchain
    const createTx = prepareContractCall({
      contract: votingContract,
      method: "function createElection(string name, string description, uint256 startTime, uint256 endTime) returns (uint256)",
      params: [
        election.name,
        election.description || "",
        BigInt(startTime),
        BigInt(endTime)
      ]
    });

    const receipt = await sendTransaction({
      transaction: createTx,
      account: adminAccount,
    });

    console.log('Election created on blockchain:', receipt.transactionHash);

    // Get the new election ID from blockchain
    const electionCount = await readContract({
      contract: votingContract,
      method: "function electionCount() view returns (uint256)",
      params: []
    });

    const chainElectionId = electionCount;

    console.log('Blockchain election ID:', chainElectionId);

    // Add candidates to blockchain
    for (const candidate of election.candidates) {
      console.log('Adding candidate:', candidate.name);
      
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
    }

    // Update database with blockchain election ID
    await prisma.election.update({
      where: { id: BigInt(electionId) },
      data: {
        chainElectionId: chainElectionId,
      }
    });

    console.log('Database updated with blockchain ID');

    return NextResponse.json({
      success: true,
      data: {
        chainElectionId: chainElectionId.toString(),
        transactionHash: receipt.transactionHash,
        candidatesDeployed: election.candidates.length
      }
    });

  } catch (error: any) {
    console.error('Deploy blockchain error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to deploy to blockchain' },
      { status: 500 }
    );
  }
}
