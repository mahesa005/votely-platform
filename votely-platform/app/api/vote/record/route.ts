import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserFromToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { prisma } from '@/lib/prisma'

/**
 * Record vote in database (after blockchain confirmation)
 * This is optional - blockchain is source of truth
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Get user from session
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const currentUser = await getCurrentUserFromToken(token)
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }

    // 2. Parse request
    const { electionId, candidateId, txHash } = await request.json()
    
    if (!electionId || candidateId === undefined || !txHash) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 3. Record vote in database
    const vote = await prisma.vote.create({
      data: {
        userId: currentUser.id,
        electionId: BigInt(electionId),
        candidateId: BigInt(candidateId),
        txHash: txHash,
        sourceIp: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    })

    console.log(`Vote recorded in database: ${vote.id}`)

    return NextResponse.json({
      success: true,
      message: 'Vote recorded',
      voteId: vote.id.toString(),
    })

  } catch (error: any) {
    console.error('[ERROR] Record vote error:', error)
    
    // Duplicate vote is not critical - blockchain already enforced
    if (error.code === 'P2002') {
      return NextResponse.json({
        success: true,
        message: 'Vote already recorded',
      })
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to record vote',
      },
      { status: 500 }
    )
  }
}
