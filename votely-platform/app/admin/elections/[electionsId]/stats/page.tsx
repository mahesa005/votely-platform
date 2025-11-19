'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { mockElections, mockCandidates } from '@/lib/mock-data'
import { Users, CheckCircle, Percent } from 'lucide-react'

export default function ElectionStatsPage() {
  const params = useParams()
  const election = mockElections.find(e => e.id === params.electionId as string)
  const candidates = mockCandidates[election?.id || ''] || []

  if (!election) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Election not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalVotes = candidates.reduce((sum, c) => sum + (c.totalVotes || 0), 0)
  const totalVoters = 5000
  const participationRate = totalVoters > 0 ? Math.round((totalVotes / totalVoters) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{election.name} - Statistics</h1>
        <p className="text-muted-foreground">Real-time voting participation and results</p>
      </div>

      {/* Participation Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Registered Voters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{totalVoters.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Total Votes Cast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{totalVotes.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Participation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{participationRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Results</CardTitle>
          <CardDescription>Candidate performance and vote distribution</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {candidates.map((candidate) => {
            const percentage = totalVotes > 0 ? Math.round((candidate.totalVotes! / totalVotes) * 100) : 0
            return (
              <div key={candidate.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.party}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{percentage}%</p>
                    <p className="text-xs text-muted-foreground">{candidate.totalVotes} votes</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/70 h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
