import { prisma } from '@/lib/prisma'
import { ethers , type Log} from 'ethers'
import { VotingABI } from '@/lib/contracts/VotingABI'

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
  
  // Debug: Check ABI loaded
  console.log("VotingABI loaded:", VotingABI ? "YES" : "NO");
  console.log("ABI length:", VotingABI?.length || 0);
  
  // contract object that is callable by adminWaller signer
  const votingContract = new ethers.Contract(contractAddress, VotingABI, adminWallet)

  // Get current nonce from chain
  let currentNonce = await provider.getTransactionCount(adminWallet.address, "latest");
  console.log(`Initial Nonce: ${currentNonce}`);

  // 3. Create Election in Blockchain
  console.log("Inisiasi Transaksi Blockchain: Membuat Election")

  
  const startTimeUnix = Math.floor(new Date(startDateTime).getTime() / 1000);
  const endTimeUnix = Math.floor(new Date(endDateTime).getTime() / 1000);

  // Debug timestamps
  const currentBlockTime = Math.floor(Date.now() / 1000);
  console.log("⏰ Current time:", currentBlockTime, new Date(currentBlockTime * 1000).toISOString());
  console.log("⏰ Start time:  ", startTimeUnix, new Date(startTimeUnix * 1000).toISOString());
  console.log("⏰ End time:    ", endTimeUnix, new Date(endTimeUnix * 1000).toISOString());
  
  // Ensure start time is in the future (add buffer)
  if (startTimeUnix <= currentBlockTime) {
    throw new Error(`Start time must be in the future. Current: ${currentBlockTime}, Start: ${startTimeUnix}`);
  }

  const tx = await votingContract.createElection(
    name,
    description,
    startTimeUnix,
    endTimeUnix,
    { 
        gasLimit: 3000000, // Increased gas limit
        nonce:currentNonce
    }
  );

  // Increment nonce for next transaction
  currentNonce++

  console.log('TX sent:', tx.hash);
  console.log('tx.data:', tx.data); // Should NOT be empty!
  console.log('tx.data length:', tx.data?.length || 0);
  
  // 4. Retrieve ElectionId 
  const receipt = await tx.wait();
  console.log('tx.hash', tx.hash);
  console.log('receipt.status', receipt.status);
  console.log('raw logs', receipt.logs.map((l: Log) => ({
    address: l.address,
    topics: l.topics,
    data: l.data
    })));

  let onChainElectionId: number | null = null;
  for (const log of receipt.logs) {
    try {
            const parsed = votingContract.interface.parseLog(log);
            if (parsed) {
            console.log('parsed event:', parsed.name, parsed.args);
            if (parsed.name === 'ElectionCreated') {
                onChainElectionId = Number(parsed.args[0]);
                break;
            }
            }
        } catch (err) {
            // not a matching ABI event — ignore
        }
    }

    // Fallback: read contract state if no event found
    if (onChainElectionId === null) {
        try {
            const count = await votingContract.electionCount(); // change to whatever getter exists
            console.log('fallback electionCount', count.toString());
            // derive id if contract uses count-1 as latest id
            onChainElectionId = Number(count) - 1;
        } catch (err) {
            console.error('fallback read failed', err);
        }
    }

  if (onChainElectionId === null) {
    throw new Error("Gagal mendapatkan Election ID dari Blockchain.");
  }

  console.log(`Election Berhasil Dibuat Pada Chain. ID: ${onChainElectionId}`);

  // 5. Add Candidates to Blockchain (loop)
  // Add candidates sequentially - ethers will auto-manage nonce
    for (const [index, cand] of candidates.entries()) {
    console.log(`Adding Candidate ${index+1}/${candidates.length}: ${cand.name} with Nonce ${currentNonce}`);

    try {
        const addTx = await votingContract.addCandidate(
            onChainElectionId,
            cand.name,
            cand.party,
            cand.image || "placeholder.jpg",
            { 
                gasLimit: 1000000,
                nonce: currentNonce // Pakai nonce yang sudah di-increment
            }
        );
        
        // PENTING: Increment nonce LANGSUNG setelah mengirim transaksi
        // Jangan tunggu .wait() selesai baru increment, tapi increment untuk penyiapan TX berikutnya
        currentNonce++; 

        // Kita tetap await wait() agar urutan block rapi (opsional, bisa diparallelkan kalau mau cepat)
        await addTx.wait(); 

    } catch (err) {
        console.error(`[ERROR] Gagal menambah kandidat ${cand.name}:`, err);
        throw new Error(`Gagal menambah kandidat ke Blockchain: ${cand.name}`);
    }
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
