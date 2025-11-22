import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { loginVoterAccount } from "@/lib/auth";


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

        const result = await loginVoterAccount(nik, password);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        // Handle error
        if (error.message === "Kombinasi NIK atau password salah.") {
            return NextResponse.json({ error: error.message }, { status: 401 }); // Unauthorized
        }
        return NextResponse.json(
            { error: "Terjadi kesalahan internal server." },
            { status: 500 }
        );
    }  
}