import { NextResponse } from "next/server";
import { loginVoterAccount } from "@/lib/auth";
import { cookies } from "next/headers";


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

        const cookieStore = await cookies(); // Next.js 15 pakai await, versi 14 tanpa await

        cookieStore.set("token", result.token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict", 
        maxAge: 60 * 60 * 24, 
        path: "/", 
        });
        return NextResponse.json(
            { 
                message: "Login berhasil", 
                user: result.user 
            },
            { status: 200 }
        );
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