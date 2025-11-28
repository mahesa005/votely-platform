import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nik, password } = body;

    if (!nik || !password) {
      return NextResponse.json(
        { error: "NIK dan password wajib diisi." },
        { status: 400 }
      );
    }

    // Find penduduk by NIK
    const penduduk = await prisma.penduduk.findUnique({
      where: { nik },
      include: {
        user: true,
      },
    });

    if (!penduduk) {
      return NextResponse.json(
        { error: "NIK tidak ditemukan." },
        { status: 404 }
      );
    }

    if (!penduduk.user) {
      return NextResponse.json(
        { error: "Akun belum terdaftar. Silakan daftar terlebih dahulu." },
        { status: 404 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, penduduk.user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Password salah." },
        { status: 401 }
      );
    }

    // Check if user has face registered
    const fotoData = penduduk.foto as any;
    const hasFaceRegistered = !!(fotoData?.embedding_vector && Array.isArray(fotoData.embedding_vector));

    return NextResponse.json({
      success: true,
      message: "Credentials valid",
      hasFaceRegistered,
      userName: penduduk.namaLengkap,
    });

  } catch (error: any) {
    console.error("Validate credentials error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat validasi." },
      { status: 500 }
    );
  }
}
