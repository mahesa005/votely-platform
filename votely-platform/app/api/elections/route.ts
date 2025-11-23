import { NextResponse } from 'next/server'
import { createElectionService } from '@/lib/services/electionService'

export async function POST(req: Request) {
    try {
        const body = await req.json() // Retrieve req body

        // Call electionService function
        const result = await createElectionService({
            ...body,
            adminId: 'apayak'
        })

        return NextResponse.json({
            success: true,
            data: result,
            message: "Pemilu berhasil dibuat!"
        }, { status: 201 })
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ 
        success: false, 
        error: error.message || "Internal Server Error" 
        }, { status: 500 });
    }
}