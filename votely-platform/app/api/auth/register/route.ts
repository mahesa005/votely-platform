import { NextResponse } from "next/server";
import { registerVoterAccount } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nik, namaLengkap, password, provinsi, kabKota, kecamatan, kelurahan, dob } = body;

        if (!nik || !namaLengkap || !password || !provinsi || !kabKota || !kecamatan || !kelurahan || !dob) {
            return NextResponse.json(
                { error: "Semua field wajib diisi." },
                { status: 400 }
            );
        }

        const pendudukData = { 
            nik,
            namaLengkap,
            provinsi,
            kabKota,
            kecamatan,
            kelurahan,
            tanggalLahir: new Date(dob),
        };

        const result = await registerVoterAccount(password, pendudukData);

        return NextResponse.json(result, { status: 201 });

    } catch (error: any) {
        // Debug logging
        console.error("=== REGISTER ERROR ===");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        if (error.message === "NIK sudah terdaftar sebagai akun.") {
        return NextResponse.json({ error: error.message }, { status: 409 }); // Conflict
        }
        if (error.message.includes("tidak ditemukan dalam database")) {
        return NextResponse.json({ error: error.message }, { status: 404 }); // Not Found
        }
        if (error.message.includes("Data tidak sesuai")) {
        return NextResponse.json({ error: error.message }, { status: 400 }); // Bad Request - data mismatch
        }

        return NextResponse.json(
        { error: `Terjadi kesalahan internal server: ${error.message}` },
        { status: 500 }
        );
    }
}