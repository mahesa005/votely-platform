'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { mockElections, mockCandidates } from '@/lib/mock-data'
import { Camera, CheckCircle, Users, ArrowLeft } from 'lucide-react'

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

export default function VotingPage() {
  const params = useParams()
  const router = useRouter()
  const election = mockElections.find(e => e.id === params.electionId as string)
  const candidates = mockCandidates[election?.id || ''] || []

  const [faceVerified, setFaceVerified] = useState(false)
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)

  if (!election) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
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
    setShowResults(true)
  }

  const handleVerifyFace = async () => {
    await new Promise(r => setTimeout(r, 800))
    setFaceVerified(true)
  }

  const handleBackToElection = () => {
    router.push(`/elections/${election.id}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header with back button */}
      <div className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/elections/${election.id}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Election
          </Link>
          <div className="text-sm text-muted-foreground">
            {election.name}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {election.status !== 'Active' ? (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertDescription className="text-amber-900">
              Voting is {election.status === 'Upcoming' ? 'not open yet' : 'closed'} for this election
            </AlertDescription>
          </Alert>
        ) : !showResults ? (
          <>
            {/* Face Verification Step */}
            <Card className={`border-2 transition-all ${faceVerified ? 'border-green-200 bg-green-50' : 'border-border'}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Camera className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle className="text-base">Step 1: Face Verification</CardTitle>
                      <CardDescription>Verify your identity before voting</CardDescription>
                    </div>
                  </div>
                  {faceVerified && <CheckCircle className="w-5 h-5 text-green-600" />}
                </div>
              </CardHeader>
              {!faceVerified && (
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    For security, we require face verification to ensure voting integrity. Your biometric data is encrypted and secure.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90" onClick={handleVerifyFace}>
                        Open Camera and Verify Face
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Face Verification</DialogTitle>
                        <DialogDescription>Look at the camera and wait for verification</DialogDescription>
                      </DialogHeader>
                      <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Camera preview here</p>
                        </div>
                      </div>
                      <Button onClick={handleVerifyFace} className="w-full bg-primary hover:bg-primary/90">
                        Verify
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              )}
              {faceVerified && (
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Face verification successful</span>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Voting Step */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">Step 2: Choose Your Candidate</CardTitle>
                    <CardDescription>Select who you want to vote for</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {candidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className={`cursor-pointer transition-all overflow-hidden ${
                        votedFor === candidate.id
                          ? 'border-green-500 border-2 bg-green-50'
                          : 'hover:shadow-md border-border'
                      }`}
                    >
                      {/* Candidate Image */}
                      <div className="w-full h-56 bg-muted overflow-hidden">
                        <img
                          src={candidate.image || "/placeholder.svg"}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {candidate.party}
                        </Badge>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="text-sm text-foreground">{candidate.description}</p>

                        {votedFor !== candidate.id && (
                          <Button
                            variant="outline"
                            disabled={!faceVerified || votedFor !== null}
                            onClick={() => handleVoteClick(candidate)}
                            className="w-full"
                          >
                            Vote for {candidate.name}
                          </Button>
                        )}
                        {votedFor === candidate.id && (
                          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 px-3 py-2 rounded-md font-medium">
                            <CheckCircle className="w-4 h-4" />
                            <span>Vote recorded!</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Your Vote</DialogTitle>
                  <DialogDescription>You're about to vote for:</DialogDescription>
                </DialogHeader>
                {selectedCandidate && (
                  <div className="space-y-4">
                    <div className="bg-secondary p-4 rounded-lg">
                      <p className="text-lg font-semibold text-foreground">{selectedCandidate.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCandidate.party}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Please review before confirming. Your vote cannot be changed after submission.</p>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleConfirmVote} className="flex-1 bg-primary hover:bg-primary/90">
                        Confirm Vote
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <>
            {/* Vote Confirmation Screen */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Thank You for Voting!</CardTitle>
                <CardDescription className="text-base mt-2">Your vote has been successfully recorded</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-white p-6 rounded-lg border border-green-200">
                  <p className="text-sm text-muted-foreground mb-2">You voted for:</p>
                  <p className="text-xl font-bold text-foreground">{selectedCandidate?.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCandidate?.party}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your vote is secure and encrypted. The counting will begin after voting closes. Thank you for participating in this important democratic process.
                </p>
              </CardContent>
            </Card>

            {/* Results Preview */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Live Results</h2>
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

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBackToElection} className="flex-1">
                Back to Election
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
