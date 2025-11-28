import { NextResponse } from "next/server";
import { getCurrentUserFromToken } from "@/lib/auth";
import { cookies } from "next/headers"; // <--- Import ini

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    console.log('[AuthMe] Current user:', user?.id, user?.name);

    const response = NextResponse.json({ 
      success: true,
      data: user 
    }, { status: 200 });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: "Token invalid atau expired" 
    }, { status: 401 });
  }
}