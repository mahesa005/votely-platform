import { NextResponse } from "next/server";
import { getCurrentUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers"; // <--- Import ini

export async function GET() {
  try {
    const cookieStore = await cookies();
    
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ 
        success: false,
        error: "Belum login (Token tidak ada)" 
      }, { status: 401 });
    }

    const user = await getCurrentUserFromToken(token);

    return NextResponse.json({ 
      success: true,
      data: user 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: "Token invalid atau expired" 
    }, { status: 401 });
  }
}