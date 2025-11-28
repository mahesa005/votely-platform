import { NextRequest, NextResponse } from 'next/server'

// Use 127.0.0.1 explicitly to avoid IPv6 issues
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:5000'

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required', success: false },
        { status: 400 }
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
      return NextResponse.json(
        { error: errorData.error || 'Failed to generate embedding', success: false },
        { status: response.status }
      )
    }

    const result = await response.json()

    if (!result.success || !result.embedding) {
      return NextResponse.json(
        { error: result.error || 'No face detected in image', success: false },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      embedding: result.embedding,
      face_detected: result.face_detected,
      face_location: result.face_location,
      embedding_dimension: result.embedding_dimension,
      message: 'Face embedding generated successfully'
    })

  } catch (error) {
    console.error('Generate embedding error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate face embedding',
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false,
        hint: 'Make sure Python API server is running on port 5000'
      },
      { status: 500 }
    )
  }
}
