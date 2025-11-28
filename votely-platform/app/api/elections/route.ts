import { NextResponse } from 'next/server'
import { createElectionService } from '@/lib/services/electionService'
import { getAllElections, getElectionsForUser } from '@/lib/elections'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

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
        
        console.log("[ELECTIONS] Token exists:", !!token)

        if (!token) {
            console.log("[ELECTIONS] No token found in cookies")
            return NextResponse.json({
                success: false,
                error: 'Unauthorized - No token'
            }, { status: 401 })
        }

        try {
            console.log("[ELECTIONS] Verifying token...")
            const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string }
            console.log("[ELECTIONS] Token verified, userId:", decoded.userId)
            const userId = decoded.userId

            const elections = await getElectionsForUser(userId)
            const serializedElections = elections.map(serializeElection)
            return NextResponse.json({
                success: true,
                data: serializedElections
            })
        } catch (error) {
            console.error('Token verification error:', error)
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