import { prisma } from '@/lib/prisma'
import { ethers } from 'ethers'
import VotingArtifact from '@/artifacts/contracts/Voting.sol/Voting.json'

// Interface for input parameter
export interface CandidateInput {
    name: string
    party: string
    description: string
    image?: string
}

export interface CreateElectionParams {
    name: string
    description: string
    level: string
    city: string
    province: string
    startDateTime: string
    endDateTime: string
    candidates: CandidateInput[]
    adminId: string
}

// Helper to serialize BigInt
(BigInt.prototype as any).toJSON = function() {
    return this.toString()
}

export async function createElectionService(params: CreateElectionParams) {
    const { 
    name, description, level, city, province, 
    startDateTime, endDateTime, candidates, adminId 
  } = params;

  // 1. Initial Validation
  if (!candidates || candidates.length < 2) {
    throw new Error("Minimal harus ada 2 kandidat.")
  }

  // 2. Setup Blockchain Connection
  // rpcUrl: Endpoint blockchain (local Hardhat or testnet)
  const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "http://127.0.0.1:8545";
  
  // privateKey deployer admin, used for tx signature (tx = transaction)
  const privateKey = process.env.PRIVATE_KEY; // Admin deployer key
  
  // contractAddress: address of the voting contract (smart contract)
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  if (!privateKey || !contractAddress) {
    throw new Error("Konfigurasi Blockchain (Env) tidak lengkap.")
  }

  // provider is the "cable" that connects to the blockchain node
  const provider = new ethers.JsonRpcProvider(rpcUrl)
  
  // adminWallet is the signer that has ETH for gas
  const adminWallet = new ethers.Wallet(privateKey, provider)
  
  // contract object that is callable by adminWaller signer
  const votingContract = new ethers.Contract(contractAddress, VotingArtifact.abi, adminWallet)

  // 3. Create Election in Blockchain
  console.log("Inisiasi Transaksi Blockchain: Membuat Election")

  const startTimeUnix = Math.floor(new Date(startDateTime).getTime() / 1000);
  const endTimeUnix = Math.floor(new Date(endDateTime).getTime() / 1000);

  const tx = await votingContract.createElection(
    name,
    description,
    startTimeUnix,
    endTimeUnix,
    { gasLimit: 1000000 } // Adjust limit jika perlu
  );

  const receipt = await tx.wait();

  // 4. Retrieve Election ID from Event Logs
  let onChainElectionId: number | null = null;
  for (const log of receipt.logs) {
    try {
      const parsedLog = votingContract.interface.parseLog(log);
      if (parsedLog?.name === 'ElectionCreated') {
        onChainElectionId = Number(parsedLog.args[0]);
        break;
      }
    } catch (e) { continue; }
  }

  if (onChainElectionId === null) {
    throw new Error("Gagal mendapatkan Election ID dari Blockchain.");
  }

  console.log(`Election Berhasil Dibuat Pada Chain. ID: ${onChainElectionId}`);

  // 5. Add Candidates to Blockchain (loop)
  for (const cand of candidates) {
    console.log(`Adding Candidate: ${cand.name}`);
    const addTx = await votingContract.addCandidate(
      onChainElectionId,
      cand.name,
      cand.party,
      cand.image || "placeholder.jpg",
      { gasLimit: 500000 }
    );
    await addTx.wait();
  }

  // 6. Save Mirror Data to Database (Prisma)
  console.log("Saving to Database...");
  const newElection = await prisma.election.create({
    data: {
      name,
      description,
      level,
      city,
      province,
      startTime: new Date(startDateTime),
      endTime: new Date(endDateTime),
      chainElectionId: BigInt(onChainElectionId),
      statusOverride: 'ACTIVE',
      createdBy: adminId,
      candidates: {
        create: candidates.map((c, idx) => ({
          name: c.name,
          party: c.party,
          description: c.description,
          photoUrl: c.image,
          orderIndex: idx + 1
        }))
      }
    },
    include: {
      candidates: true
    }
  });

  return newElection;
}
