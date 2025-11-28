import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

// Use 127.0.0.1 explicitly to avoid IPv6 issues
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:5000'
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(req: NextRequest) {
  try {
    const { image, nik } = await req.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      )
    }

    // Get NIK from request body or from JWT token
    let userNik = nik
    
    if (!userNik) {
      // Try to get NIK from JWT token
      const cookieStore = await cookies()
      const token = cookieStore.get('token')?.value
      
      if (token) {
        try {
          const decoded = verify(token, JWT_SECRET) as any
          userNik = decoded.nik
        } catch (err) {
          console.error('JWT verification failed:', err)
        }
      }
    }

    if (!userNik) {
      return NextResponse.json(
        { error: 'NIK is required for face verification' },
        { status: 400 }
      )
    }

    // Fetch user's face embedding from database
    const penduduk = await prisma.penduduk.findUnique({
      where: { nik: userNik },
      select: { foto: true, namaLengkap: true }
    })

    if (!penduduk) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (!penduduk.foto) {
      return NextResponse.json(
        { error: 'No face embedding found for this user. Please register your face first.' },
        { status: 404 }
      )
    }

    // Extract embedding vector from database
    const fotoData = penduduk.foto as any
    const referenceEmbedding = fotoData.embedding_vector

    if (!referenceEmbedding || !Array.isArray(referenceEmbedding)) {
      return NextResponse.json(
        { error: 'Invalid face embedding format in database' },
        { status: 500 }
      )
    }

    // Call Python face recognition service with reference embedding
    const response = await fetch(`${PYTHON_API_URL}/verify-face`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image,
        reference_embedding: referenceEmbedding
      })
    })

    if (!response.ok) {
      throw new Error(`Python API returned ${response.status}`)
    }

    const result = await response.json()

    return NextResponse.json({
      similarity: result.similarity,
      message: result.message,
      face_detected: result.face_detected,
      face_location: result.face_location,
      user_name: penduduk.namaLengkap,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Face verification error:', error)
    
    // Return a more helpful error message
    return NextResponse.json(
      { 
        error: 'Face verification failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Make sure Python API server is running on port 5000'
      },
      { status: 500 }
    )
  }
}
