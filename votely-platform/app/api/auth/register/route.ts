import { NextResponse } from "next/server";
import { registerVoterAccount } from "@/lib/auth";

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

        const result = await registerVoterAccount(nik, password);

        return NextResponse.json(result, { status: 201 });

    } catch (error: any) {
            // Handle error 
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