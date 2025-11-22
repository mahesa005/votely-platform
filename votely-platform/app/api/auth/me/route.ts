import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getCurrentUserFromToken } from "@/lib/auth";

export async function GET() {
  try {
    const headersList = await  headers();
    const authorization = headersList.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token tidak ditemukan atau format salah." },
        { status: 401 }
      );
    }

    const token = authorization.split(" ")[1];

    const user = await getCurrentUserFromToken(token);

    return NextResponse.json({ user }, { status: 200 });
    
  } catch (error: any) {
    if (error.message === "Token tidak valid atau kadaluarsa.") {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    else if (error.message === "User tidak ditemukan.") {
        return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan internal server." },
      { status: 500 }
    );
  }
}