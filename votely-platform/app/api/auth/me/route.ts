import { NextResponse } from "next/server";
import { getCurrentUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers"; // <--- Import ini

export async function GET() {
  try {
    const cookieStore = await cookies();
    
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Belum login (Token tidak ada)" }, { status: 401 });
    }

    const user = await getCurrentUserFromToken(token);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Token invalid atau expired" }, { status: 401 });
  }
}