// app/api/vote/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ethers } from 'ethers';
import { decryptKey } from '@/lib/crypto';

// Import ABI Smart Contract (Sesuaikan path)
import VotingArtifact from '@/lib/abi/Voting.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!;

export async function POST(req: Request) {
  try {
    // Terima data dari frontend (User harus login dulu / session check)
    const { userId, electionId, candidateId } = await req.json();

    // 1. Ambil Data User dari DB
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 2. Decrypt Private Key User
    // Ini langkah krusial: Server membuka kunci wallet user sesaat
    const privateKey = decryptKey(user.encryptedPrivateKey);

    // 3. Koneksi ke Blockchain (Hardhat Localhost)
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const voterWallet = new ethers.Wallet(privateKey, provider);

    // 4. Load Smart Contract instance dengan Wallet User
    const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingArtifact.abi, voterWallet);

    console.log(`🗳️ Voting: User ${user.walletAddress} -> Election ${electionId}, Candidate ${candidateId}`);

    // 5. EKSEKUSI VOTE (ZERO GAS)
    // override gasPrice: 0 agar tidak butuh saldo ETH
    const tx = await contract.vote(electionId, candidateId, {
      gasPrice: 0, 
      gasLimit: 500000 // Limit komputasi (bukan biaya)
    });

    // 6. Tunggu konfirmasi blok
    const receipt = await tx.wait();

    // 7. Simpan Log Audit ke Database (Off-chain record)
    await prisma.voteLog.create({
      data: {
        userId: user.id,
        electionId: Number(electionId),
        candidateId: Number(candidateId),
        txHash: receipt.hash
      }
    });

    return NextResponse.json({
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber
    });

  } catch (error: any) {
    console.error("Voting Error:", error);
    
    // Handle error dari Smart Contract (misal: "Already voted")
    let errorMessage = "Terjadi kesalahan saat voting";
    if (error.reason) errorMessage = error.reason;
    if (error.info?.error?.message) errorMessage = error.info.error.message;

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}