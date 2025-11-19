'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { mockElections, mockCandidates } from '@/lib/mock-data'
import { Calendar, MapPin, Users, CheckCircle, Camera, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function getStatusColor(status: string) {
  switch (status) {
    case 'Upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Finished':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function ElectionDetailPage() {
  const params = useParams()
  const election = mockElections.find(e => e.id === params.electionId as string)
  const candidates = mockCandidates[election?.id || ''] || []

  const [faceVerified, setFaceVerified] = useState(false)
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)

  if (!election) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Election not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleVoteClick = (candidate: any) => {
    setSelectedCandidate(candidate)
    setShowConfirmDialog(true)
  }

  const handleConfirmVote = async () => {
    await new Promise(r => setTimeout(r, 500))
    setVotedFor(selectedCandidate.id)
    setShowConfirmDialog(false)
  }

  const handleVerifyFace = async () => {
    await new Promise(r => setTimeout(r, 800))
    setFaceVerified(true)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Election Header */}
      <div className="border-b border-border pb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Elections
        </Link>

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{election.name}</h1>
            <p className="text-muted-foreground mb-4">{election.description}</p>
          </div>
          <Badge className={`${getStatusColor(election.status)} border-0`}>
            {election.status}
          </Badge>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{election.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{election.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>{candidates.length} Candidates</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vote" disabled>Vote</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Election Details</h2>
            <p className="text-muted-foreground leading-relaxed">{election.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Candidates</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {candidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-sm transition-shadow overflow-hidden flex flex-col">
                  <div className="w-full h-48 bg-muted overflow-hidden">
                    <img
                      src={candidate.image || "/placeholder.svg"}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base">{candidate.name}</CardTitle>
                        <CardDescription className="text-xs">{candidate.party}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-foreground">{candidate.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {election.status === 'Active' && (
            <div className="pt-4">
              <Link href={`/elections/${election.id}/vote`}>
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  <Users className="w-4 h-4" />
                  Proceed to Voting
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>

        {/* Vote Tab */}
        <TabsContent value="vote" className="space-y-6">
          <Alert>
            <AlertDescription>
              Click "Proceed to Voting" in the Overview tab to start voting.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Live Results</h2>
          <div className="space-y-4">
            {candidates.map((candidate) => {
              const percentage = candidate.votes || 0
              return (
                <Card key={candidate.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{candidate.name}</CardTitle>
                      <span className="text-lg font-bold text-primary">{percentage}%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{candidate.totalVotes} votes cast</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
