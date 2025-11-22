import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { User, Penduduk } from "../prisma/generated/client/index";


const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// --- UTILS ---

/**
 * Helper: Hash password
 */
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// --- CORE FUNCTIONS ---

/**
 * Mencari user berdasarkan NIK.
 */
export async function getUserByNik(nik: string): Promise<User | null> {
  const penduduk = await prisma.penduduk.findUnique({
    where: { nik },
    include: { user: true },
  });
  return penduduk?.user || null;
}

/**
 * Internal helper untuk membuat user baru dari data penduduk.
 */
async function createUserFromCitizenData(
  citizenData: Penduduk,
  passwordHash: string
): Promise<User> {
  return await prisma.user.create({
    data: {
      password: passwordHash,
      role: "WARGA", // Default role
      pendudukId: citizenData.id,
      walletAddress: "1234567890", 
    },
  });
}

/**
 * 3. registerVoterAccount
 * Orchestrator utama pendaftaran.
 * - Cek NIK di User (sudah daftar?)
 * - Cek NIK di Penduduk(valid penduduk?)
 * - Hash password
 * - Create User
 */
export async function registerVoterAccount(nik: string, password: string) {
  const existingUser = await getUserByNik(nik);
  if (existingUser) {
    throw new Error("NIK sudah terdaftar sebagai akun.");
  }

  const citizenData = await prisma.penduduk.findUnique({
    where: { nik },
  });

  if (!citizenData) {
    throw new Error("NIK tidak ditemukan dalam database kependudukan (Penduduk).");
  }

  const hashedPassword = await hashPassword(password);

  console.log("Citizen data:", {
    id: citizenData.id,
    nik: citizenData.nik,
    hasPassword: !!hashedPassword,
  });

  try {
    const newUser = await createUserFromCitizenData(citizenData, hashedPassword);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error: any) {
    console.error("Error creating user:", error);
    console.error("Error meta:", error.meta);
    throw new Error(`Gagal membuat akun: ${error.message}`);
  }
}

/**
 * - Cek User by NIK
 * - Compare Hash
 * - Generate Token
 */
export async function loginVoterAccount(nik: string, password: string) {
  // A. Cari user
  const user = await getUserByNik(nik);
  
  if (!user) {
    throw new Error("Kombinasi NIK atau password salah.");
  }

  // B. Cek Password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error("Kombinasi NIK atau password salah.");
  }

  // C. Generate Token
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1d" } // Token valid 1 hari
  );

  return {
    user: {
      id: user.id,
      role: user.role,
    },
    token,
  };
}

/**
 * 5. getCurrentUserFromToken
 * Decode token dan ambil data user terbaru dari DB
 */
export async function getCurrentUserFromToken(token: string) {
  try {
    // A. Verify Token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // B. Fetch User dari DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        role: true,
        penduduk: {
          select: {
            nik: true,
            namaLengkap: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User tidak ditemukan.");
    }

    return user;
  } catch (error) {
    throw new Error("Token tidak valid atau kadaluarsa.");
  }
}