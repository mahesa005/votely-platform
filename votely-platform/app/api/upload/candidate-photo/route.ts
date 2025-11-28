import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Create admin client with service role key (bypasses RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://foxpgqpclfptrkyfoivo.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 9)
    const ext = file.name.split('.').pop()
    const filename = `${timestamp}-${randomStr}.${ext}`
    const path = `candidates/${filename}`

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin.storage
      .from('fotoKandidat')
      .upload(path, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json(
        { success: false, error: `Upload failed: ${error.message}` },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('fotoKandidat')
      .getPublicUrl(data.path)

    return NextResponse.json({
      success: true,
      data: {
        url: urlData.publicUrl,
        path: data.path
      }
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload file' },
      { status: 500 }
    )
  }
}
