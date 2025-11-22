import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ethers } from 'ethers';
import { encryptKey } from '@/lib/crypto';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { nik, name, password } = await req.json();

        // 1. Validate NIK
        const existingUser = await prisma.user.findUnique({ where: { nik }});
        if (existingUser) {
            return NextResponse.json({ error: "NIK sudah terdaftar" }, { status: 400});
        }

        // 2. Create new wallet
        const wallet = ethers.Wallet.createRandom();

        // 3. Encrypt Private Key before storing in the DB
        const encryptedKey = encryptKey(wallet.privateKey);

        // 4. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // 5. Store user + wallet in DB
        const newUser = await prisma.user.create({
            data: {
                nik,
                name,
                password: hashedPassword,
                walletAddress: wallet.address,
                encryptedPrivateKey: encryptedKey
            }
        })

        return NextResponse.json({
            success: true,
            message: "User & Wallet berhasil dibuat",
            walletAddress: newUser.walletAddress
        });
    
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Gagal registrasi" }, { status: 500});
    } 
}