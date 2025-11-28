import { NextResponse } from 'next/server'
import { getElectionById } from '@/lib/elections'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ electionId: string }> }
) {
  try {
    const { electionId } = await params
    const { searchParams } = new URL(req.url)
    const includeResults = searchParams.get('includeResults') === 'true'

    const election = await getElectionById(electionId)

    if (!election) {
      return NextResponse.json({
        success: false,
        error: 'Pemilu tidak ditemukan'
      }, { status: 404 })
    }

    // Get vote counts per candidate if requested
    let voteCounts: Record<string, number> = {}
    let totalVotes = 0

    if (includeResults) {
      const votes = await prisma.vote.groupBy({
        by: ['candidateId'],
        where: {
          electionId: BigInt(electionId)
        },
        _count: {
          candidateId: true
        }
      })

      votes.forEach(v => {
        voteCounts[v.candidateId.toString()] = v._count.candidateId
        totalVotes += v._count.candidateId
      })
    }

    // Convert BigInt to string for JSON serialization
    const serializedElection = {
      ...election,
      id: election.id.toString(),
      chainElectionId: election.chainElectionId?.toString() || null,
      totalVotes: includeResults ? totalVotes : undefined,
      candidates: election.candidates.map(candidate => ({
        ...candidate,
        id: candidate.id.toString(),
        electionId: candidate.electionId.toString(),
        chainCandidateId: (candidate as any).chainCandidateId?.toString() || null,
        voteCount: includeResults ? (voteCounts[candidate.id.toString()] || 0) : undefined
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
