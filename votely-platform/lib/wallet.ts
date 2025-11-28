import { prisma } from '@/lib/prisma'
import { ethers } from 'ethers'
import { encryptKey } from '@/lib/crypto'


export type WalletInfo = {
    walletAddress: string
    encryptedPrivateKey: string
}

// Generates a new wallet (no database interaction)
export function generateWallet(): WalletInfo {
    const wallet = ethers.Wallet.createRandom()
    const encryptedPrivateKey = encryptKey(wallet.privateKey)
    return { walletAddress: wallet.address, encryptedPrivateKey }
}

// Creates user wallet after user has registered
export async function createUserWallet(userId: string): Promise<WalletInfo> {
    const user = await prisma.user.findUnique({ where: { id: userId}})
    if (!user) throw new Error ('User not found') // throws error if userId not found
    
    const existingEncrypted = user.encryptedPrivateKey

    if (user.walletAddress && user.encryptedPrivateKey) {
        return { walletAddress: user.walletAddress, encryptedPrivateKey: user.encryptedPrivateKey } // returns existing wallet
    }

    const wallet = ethers.Wallet.createRandom() // Creates new wallet
    const encryptedPrivateKey = encryptKey(wallet.privateKey) // Encrypts wallet private key

    return { walletAddress: wallet.address, encryptedPrivateKey}
}