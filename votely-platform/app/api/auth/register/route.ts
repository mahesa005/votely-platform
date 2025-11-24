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

        if (error.message === "NIK sudah terdaftar sebagai akun.") {
        return NextResponse.json({ error: error.message }, { status: 409 }); // Conflict
        }
        if (error.message.includes("tidak ditemukan dalam database")) {
        return NextResponse.json({ error: error.message }, { status: 404 }); // Not Found
        }

        return NextResponse.json(
        { error: "Terjadi kesalahan internal server." },
        { status: 500 }
        );
    }
}