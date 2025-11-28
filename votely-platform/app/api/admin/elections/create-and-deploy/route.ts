import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getCurrentUserFromToken } from '@/lib/auth';
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
 * Create election and deploy to blockchain in one atomic operation
 * POST /api/admin/elections/create-and-deploy
 * 
 * If blockchain deployment fails, database changes are rolled back
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
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
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    // Support both naming conventions (name/title, startTime/startDate, etc.)
    const name = body.name || body.title;
    const description = body.description;
    const level = body.level;
    const city = body.city;
    const province = body.province;
    const startTime = body.startTime || body.startDate;
    const endTime = body.endTime || body.endDate;
    const candidates = body.candidates;

    // Validate required fields
    if (!name || !description || !level || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, description, level, startTime, endTime' },
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

    // Convert dates to Unix timestamps for blockchain
    const startTimeUnix = Math.floor(start.getTime() / 1000);
    const endTimeUnix = Math.floor(end.getTime() / 1000);

    console.log('Creating and deploying election:', {
      name,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      candidatesCount: candidates?.length || 0
    });

    // Step 1: Deploy election to blockchain FIRST
    // If this fails, we don't create anything in database
    console.log('Step 1: Deploying election to blockchain...');
    
    // First, get current election count to know the next ID
    const currentCount = await readContract({
      contract: votingContract,
      method: "function electionCount() view returns (uint256)",
      params: []
    });
    console.log('Current election count before create:', currentCount.toString());
    
    const createTx = prepareContractCall({
      contract: votingContract,
      method: "function createElection(string name, string description, uint256 startTime, uint256 endTime) returns (uint256)",
      params: [
        name,
        description || "",
        BigInt(startTimeUnix),
        BigInt(endTimeUnix)
      ]
    });

    const receipt = await sendTransaction({
      transaction: createTx,
      account: adminAccount,
    });

    console.log('Election deployed to blockchain:', receipt.transactionHash);

    // Wait a moment for state to update, then get the new election count
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get the new election ID from blockchain - should be currentCount + 1
    const newElectionCount = await readContract({
      contract: votingContract,
      method: "function electionCount() view returns (uint256)",
      params: []
    });

    // The new election ID is the new count (since IDs start at 1 and increment)
    const chainElectionId = newElectionCount;
    console.log('New election count after create:', newElectionCount.toString());
    console.log('Blockchain election ID:', chainElectionId.toString());

    // Step 2: Add candidates to blockchain (if any)
    const candidateChainIds: Map<number, bigint> = new Map(); // orderIndex -> chainCandidateId
    
    if (candidates && Array.isArray(candidates) && candidates.length > 0) {
      console.log('Step 2: Adding candidates to blockchain...');
      
      let blockchainCandidateId = 1n;
      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        
        console.log(`Adding candidate ${i + 1}/${candidates.length}: ${candidate.name}`);
        
        const addCandidateTx = prepareContractCall({
          contract: votingContract,
          method: "function addCandidate(uint256 electionId, string name, string party, string imageUrl)",
          params: [
            chainElectionId,
            candidate.name,
            candidate.party,
            candidate.photoUrl || "" // photoUrl dari upload
          ]
        });

        const candidateReceipt = await sendTransaction({
          transaction: addCandidateTx,
          account: adminAccount,
        });

        console.log(`Candidate added: ${candidateReceipt.transactionHash}`);
        candidateChainIds.set(i, blockchainCandidateId);
        blockchainCandidateId++;
      }
    }

    // Step 3: Now that blockchain is successful, create in database
    // Use transaction to ensure atomicity
    console.log('Step 3: Creating election in database...');
    
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
          chainElectionId: chainElectionId,
        }
      });

      // Create candidates if provided
      if (candidates && Array.isArray(candidates) && candidates.length > 0) {
        for (let i = 0; i < candidates.length; i++) {
          const candidate = candidates[i];
          const chainCandidateId = candidateChainIds.get(i);
          
          await tx.candidate.create({
            data: {
              electionId: newElection.id,
              name: candidate.name,
              party: candidate.party,
              description: candidate.description || null,
              photoUrl: candidate.photoUrl || null,
              orderIndex: i,
              chainCandidateId: chainCandidateId || null,
            }
          });
        }
      }

      // Return election with candidates
      return tx.election.findUnique({
        where: { id: newElection.id },
        include: { candidates: true }
      });
    });

    console.log('Election created successfully in database:', election?.id.toString());

    // Serialize response
    const serializedElection = {
      ...election,
      id: election!.id.toString(),
      chainElectionId: election!.chainElectionId?.toString() || null,
      candidates: election!.candidates.map((c: any) => ({
        ...c,
        id: c.id.toString(),
        electionId: c.electionId.toString(),
        chainCandidateId: c.chainCandidateId?.toString() || null,
      })),
    };

    return NextResponse.json({
      success: true,
      data: serializedElection,
      message: 'Election created and deployed successfully!',
      blockchain: {
        transactionHash: receipt.transactionHash,
        chainElectionId: chainElectionId.toString(),
        candidatesDeployed: candidates?.length || 0
      }
    });

  } catch (error: any) {
    console.error('Create and deploy error:', error);
    
    // Provide more helpful error messages
    let errorMessage = error.message || 'Failed to create election';
    
    if (errorMessage.includes('insufficient funds')) {
      errorMessage = 'Insufficient funds for gas. Please add ETH to admin wallet.';
    } else if (errorMessage.includes('execution reverted')) {
      errorMessage = 'Blockchain transaction reverted. Check contract parameters.';
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
