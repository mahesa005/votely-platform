import { NextResponse } from 'next/server'
import { getElectionById } from '@/lib/elections'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ electionId: string }> }
) {
  try {
    const { electionId } = await params
    const election = await getElectionById(electionId)

    if (!election) {
      return NextResponse.json({
        success: false,
        error: 'Pemilu tidak ditemukan'
      }, { status: 404 })
    }

    // Convert BigInt to string for JSON serialization
    const serializedElection = {
      ...election,
      id: election.id.toString(),
      candidates: election.candidates.map(candidate => ({
        ...candidate,
        id: candidate.id.toString(),
        electionId: candidate.electionId.toString()
      }))
    }

    return NextResponse.json({
      success: true,
      data: serializedElection
    })
  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Internal Server Error'
    }, { status: 500 })
  }
}
