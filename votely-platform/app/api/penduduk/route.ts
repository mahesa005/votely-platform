import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const nik = searchParams.get('nik')
    const id = searchParams.get('id')

    if (!nik && !id) {
      return NextResponse.json({
        success: false,
        error: 'Parameter nik atau id harus disediakan'
      }, { status: 400 })
    }

    let penduduk

    if (nik) {
      penduduk = await prisma.penduduk.findUnique({
        where: { nik }
      })
    } else if (id) {
      penduduk = await prisma.penduduk.findUnique({
        where: { id }
      })
    }

    if (!penduduk) {
      return NextResponse.json({
        success: false,
        error: 'Data penduduk tidak ditemukan'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: penduduk
    })
  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
