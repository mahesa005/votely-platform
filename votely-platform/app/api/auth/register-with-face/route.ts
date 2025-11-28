import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateWallet } from "@/lib/wallet";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nik, 
      namaLengkap, 
      password, 
      provinsi, 
      kabKota, 
      kecamatan, 
      kelurahan, 
      dob,
      faceEmbedding 
    } = body;

    // Validate required fields
    if (!nik || !namaLengkap || !password || !provinsi || !kabKota || !dob) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    if (!faceEmbedding || !Array.isArray(faceEmbedding)) {
      return NextResponse.json(
        { error: "Face embedding wajib diisi." },
        { status: 400 }
      );
    }

    // Check if NIK already registered
    const existingPenduduk = await prisma.penduduk.findUnique({
      where: { nik },
      include: { user: true }
    });

    if (existingPenduduk?.user) {
      return NextResponse.json(
        { error: "NIK sudah terdaftar sebagai akun." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate wallet for user
    const { walletAddress, encryptedPrivateKey } = generateWallet();

    // Create penduduk and user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create or update Penduduk with face embedding
      const penduduk = existingPenduduk 
        ? await tx.penduduk.update({
            where: { nik },
            data: {
              namaLengkap,
              tanggalLahir: new Date(dob),
              provinsi,
              kabKota,
              kecamatan,
              kelurahan,
              foto: {
                embedding_vector: faceEmbedding,
                registered_at: new Date().toISOString()
              }
            }
          })
        : await tx.penduduk.create({
            data: {
              nik,
              namaLengkap,
              tanggalLahir: new Date(dob),
              provinsi,
              kabKota,
              kecamatan,
              kelurahan,
              foto: {
                embedding_vector: faceEmbedding,
                registered_at: new Date().toISOString()
              }
            }
          });

      // Create User
      const user = await tx.user.create({
        data: {
          pendudukId: penduduk.id,
          password: hashedPassword,
          role: "WARGA",
          walletAddress,
          encryptedPrivateKey,
        }
      });

      return { penduduk, user };
    });

    return NextResponse.json({
      success: true,
      message: "Registrasi berhasil",
      data: {
        id: result.user.id,
        nik: result.penduduk.nik,
        namaLengkap: result.penduduk.namaLengkap,
        walletAddress: result.user.walletAddress,
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error("=== REGISTER WITH FACE ERROR ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    if (error.message === "NIK sudah terdaftar sebagai akun.") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: `Terjadi kesalahan internal server: ${error.message}` },
      { status: 500 }
    );
  }
}
