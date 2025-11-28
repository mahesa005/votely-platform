// DEPRECATED: This route is no longer used. Use /api/vote/cast instead.
// Keeping this file to prevent 404 errors from old clients.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'This endpoint is deprecated. Please use /api/vote/cast instead.' 
    },
    { status: 410 } // 410 Gone
  );
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'This endpoint is deprecated. Please use /api/vote/cast instead.' 
    },
    { status: 410 }
  );
}