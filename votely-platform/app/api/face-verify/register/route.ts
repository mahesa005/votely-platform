import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Use 127.0.0.1 explicitly to avoid IPv6 issues
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:5000'

export async function POST(req: NextRequest) {
  try {
    const { image, nik } = await req.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    if (!nik) {
      return NextResponse.json(
        { error: 'NIK is required for face registration' },
        { status: 400 }
      )
    }

    // Check if user exists
    const penduduk = await prisma.penduduk.findUnique({
      where: { nik },
      select: { id: true, namaLengkap: true, foto: true }
    })

    if (!penduduk) {
      return NextResponse.json(
        { error: 'User not found. Please register first.' },
        { status: 404 }
      )
    }

    // Call Python API to generate embedding from image
    const response = await fetch(`${PYTHON_API_URL}/generate-embedding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Python API returned ${response.status}`)
    }

    const result = await response.json()

    if (!result.success || !result.embedding) {
      return NextResponse.json(
        { error: result.error || 'No face detected in image. Please try again.' },
        { status: 400 }
      )
    }

    // Save embedding to database
    await prisma.penduduk.update({
      where: { nik },
      data: {
        foto: {
          embedding_vector: result.embedding,
          face_location: result.face_location,
          registered_at: new Date().toISOString()
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Face registered successfully',
      user_name: penduduk.namaLengkap,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Face registration error:', error)
    
    return NextResponse.json(
      { 
        error: 'Face registration failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure Python API server is running on port 5000'
      },
      { status: 500 }
    )
  }
}
