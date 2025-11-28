// lib/thirdweb.ts
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// 1. Inisialisasi Client
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

// 2. Definisikan Chain (Sepolia Testnet)
export const chain = defineChain(11155111); // ID Sepolia

// 3. Definisikan Kontrak Voting Anda
export const votingContract = getContract({
  client,
  chain,
  address: "f447555bdbc886b1ec74b0b9a98b481b"
});