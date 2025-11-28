import { NextResponse } from 'next/server'
import { createElectionService } from '@/lib/services/electionService'
import { getAllElections, getElectionsForUser } from '@/lib/elections'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

// Helper function to serialize BigInt to string
function serializeElection(election: any) {
    return {
        ...election,
        id: election.id.toString(),
        candidates: election.candidates?.map((c: any) => ({
            ...c,
            id: c.id.toString(),
            electionId: c.electionId.toString()
        })) || []
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const forUser = searchParams.get('forUser')

        // Get all elections
        if (!forUser) {
            const elections = await getAllElections()
            const serializedElections = elections.map(serializeElection)
            return NextResponse.json({
                success: true,
                data: serializedElections
            })
        }

        // Get elections for logged-in user
        const cookieStore = await cookies()
        const token = cookieStore.get('token')

        if (!token) {
            return NextResponse.json({
                success: false,
                error: 'Unauthorized'
            }, { status: 401 })
        }

        try {
            const { payload } = await jwtVerify(token.value, JWT_SECRET)
            const userId = payload.userId as string

            const elections = await getElectionsForUser(userId)
            const serializedElections = elections.map(serializeElection)
            return NextResponse.json({
                success: true,
                data: serializedElections
            })
        } catch (error) {
            return NextResponse.json({
                success: false,
                error: 'Invalid token'
            }, { status: 401 })
        }
    } catch (error: any) {
        console.error("API Error:", error)
        return NextResponse.json({
            success: false,
            error: error.message || "Internal Server Error"
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json() // Retrieve req body

        // Call electionService function
        const result = await createElectionService({
            ...body,
            adminId: 'cmibaa1x40000wcudx7zuazlq'
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