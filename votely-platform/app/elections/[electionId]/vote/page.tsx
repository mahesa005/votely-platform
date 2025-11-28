'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle, Users, ArrowLeft, Loader2, BarChart3 } from 'lucide-react'
import { FaceScanner } from '@/components/face-scanner'

type Candidate = {
  id: string
  name: string
  party: string
  description: string | null
  photoUrl: string | null
  orderIndex: number
  electionId: string
  chainCandidateId: string | null
  voteCount?: number
}

type Election = {
  id: string
  name: string
  description: string | null
  level: string
  province: string | null
  city: string | null
  startTime: string
  endTime: string
  chainElectionId: string | null
  candidates: Candidate[]
  totalVotes?: number
}

type UserInfo = {
  id: string
  name: string
  role: string
}

export default function VotingPage() {
  const params = useParams()
  const router = useRouter()

  // Konversi ID string dari URL
  const electionIdParam = params.electionId as string
  
  const [election, setElection] = useState<Election | null>(null)
  const [loading, setLoading] = useState(true)
  const [faceVerified, setFaceVerified] = useState(false)
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasAlreadyVoted, setHasAlreadyVoted] = useState(false)
  const [userVotedCandidateId, setUserVotedCandidateId] = useState<string | null>(null)
  const [showFaceScanner, setShowFaceScanner] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null)
  
  // State local untuk hasil
  const [showResults, setShowResults] = useState(false)

  // Reset all vote-related state
  const resetVoteState = useCallback(() => {
    setFaceVerified(false)
    setVotedFor(null)
    setShowConfirmDialog(false)
    setSelectedCandidate(null)
    setHasAlreadyVoted(false)
    setUserVotedCandidateId(null)
    setShowFaceScanner(false)
    setShowResults(false)
  }, [])

  // Fetch election data and check if user already voted
  useEffect(() => {
    async function fetchElectionAndVoteStatus() {
      // Reset state first to avoid stale data from previous user
      resetVoteState()
      setLoading(true)
      
      try {
        // Fetch current user first
        const userResponse = await fetch('/api/auth/me', { 
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        })
        const userData = await userResponse.json()
        
        if (userData.success && userData.data) {
          setCurrentUser(userData.data)
        } else {
          // User not logged in, redirect to login
          router.push('/auth/login')
          return
        }
        
        // Fetch election with results
        const response = await fetch(`/api/elections/${electionIdParam}?includeResults=true`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        })
        const result = await response.json()
        
        if (result.success && result.data) {
          setElection(result.data)
        } else {
          console.error('Failed to fetch election:', result.error)
        }

        // Check if user has already voted (with cache-busting)
        const voteCheckResponse = await fetch(`/api/vote/check?electionId=${electionIdParam}&_t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        })
        const voteCheckResult = await voteCheckResponse.json()
        
        console.log('[VotingPage] Vote check result:', voteCheckResult)
        
        if (voteCheckResult.success && voteCheckResult.data.hasVoted) {
          setHasAlreadyVoted(true)
          setUserVotedCandidateId(voteCheckResult.data.candidateId)
          setShowResults(true) // Show results if already voted
        }
      } catch (error) {
        console.error('Error fetching election:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchElectionAndVoteStatus()
  }, [electionIdParam, resetVoteState, router])

  // Helper function to get election status
  const getElectionStatus = (election: Election) => {
    const now = new Date()
    const startTime = new Date(election.startTime)
    const endTime = new Date(election.endTime)
    
    if (now < startTime) return 'Upcoming'
    if (now > endTime) return 'Finished'
    return 'Active'
  }


  if (!election) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            {loading ? (
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            ) : (
              <p className="text-muted-foreground">Election not found</p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const candidates = election.candidates || []
  const electionStatus = getElectionStatus(election)

  const handleVoteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setShowConfirmDialog(true)
  }

  // Submit vote via API (Admin pays gas)
  const handleConfirmVote = async () => {
    if (!selectedCandidate) {
      alert('Please select a candidate first')
      return
    }

    // Check if election is deployed to blockchain
    if (!election.chainElectionId) {
      alert('This election is not deployed to blockchain yet. Please contact administrator.')
      return
    }
    
    setIsSubmitting(true)
    try {
      // Check if candidate has blockchain ID
      if (!selectedCandidate.chainCandidateId) {
        alert('This candidate is not deployed to blockchain yet. Please contact administrator.')
        setIsSubmitting(false)
        return
      }

      console.log(`Casting vote via API...`)
      console.log(`   Election ID: ${election.id}`)
      console.log(`   Candidate ID: ${selectedCandidate.id}`)

      // Call API to cast vote (admin pays gas)
      const response = await fetch('/api/vote/cast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          electionId: election.id,
          candidateId: selectedCandidate.id,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to cast vote')
      }

      console.log(`Vote confirmed on-chain!`)
      console.log(`   Transaction Hash: ${result.data.transactionHash}`)
      
      setVotedFor(selectedCandidate.id)
      setShowConfirmDialog(false)
      setShowResults(true)

    } catch (error: any) {
      console.error('[ERROR] Vote error:', error)
      alert(`Voting gagal: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle face verification success
  const handleFaceVerified = () => {
    setFaceVerified(true)
    setShowFaceScanner(false)
  }

  const handleBackToElection = () => {
    router.push(`/elections/${election.id}`)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      {/* Header */}
      <div className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/elections/${election.id}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Election
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {election.name}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {electionStatus !== 'Active' ? (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertDescription className="text-amber-900">
              Voting is {electionStatus === 'Upcoming' ? 'not open yet' : 'closed'}
            </AlertDescription>
          </Alert>
        ) : !showResults ? (
          <>
            {/* Step 1: Face Verification */}
            {!faceVerified ? (
              <Card className="border-2 border-border">
                <CardHeader>
                  <CardTitle className="text-base">Step 1: Face Verification</CardTitle>
                  <CardDescription>Verify your identity before voting</CardDescription>
                </CardHeader>
                <CardContent>
                  <FaceScanner
                    onSuccess={handleFaceVerified}
                    title="Verifikasi Wajah"
                    description="Posisikan wajah Anda di tengah untuk verifikasi identitas"
                    mode="verify"
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Step 1: Face Verification</CardTitle>
                      <CardDescription>Verify your identity before voting</CardDescription>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Identity Verified Successfully</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Voting */}
            <Card className={!faceVerified ? "opacity-50 pointer-events-none" : ""}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">Step 2: Choose Candidate</CardTitle>
                    <CardDescription>Select your preferred candidate</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {candidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className={`cursor-pointer transition-all overflow-hidden hover:shadow-md border-border`}
                    >
                      <div className="w-full h-56 bg-muted overflow-hidden">
                         {/* Gunakan Image component Next.js jika bisa, atau img biasa */}
                        <img
                          src={candidate.photoUrl || "/placeholder.svg"}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <Badge variant="outline" className="w-fit">{candidate.party}</Badge>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="text-sm text-foreground">{candidate.description || 'No description available'}</p>
                        <Button
                          variant="outline"
                          onClick={() => handleVoteClick(candidate)}
                          className="w-full"
                        >
                          Select {candidate.name}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Confirmation Dialog dengan Integrasi Blockchain */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Vote</DialogTitle>
                  <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                
                {selectedCandidate && (
                  <div className="space-y-4">
                    <div className="bg-secondary p-4 rounded-lg">
                      <p className="text-lg font-bold">{selectedCandidate.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCandidate.party}</p>
                    </div>

                    <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="font-semibold text-blue-900 mb-1">Informasi:</p>
                      <p className="text-blue-800">Vote Anda akan dicatat di blockchain. Gas fee dibayar oleh sistem.</p>
                    </div>

                    {/* Submit vote via API */}
                    <Button
                      onClick={handleConfirmVote}
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting Vote...
                        </>
                      ) : (
                        'Confirm Vote'
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowConfirmDialog(false)} 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        ) : (
          // Tampilan hasil voting dengan persentase
          <div className="space-y-6">
            <Card className={hasAlreadyVoted ? "border-blue-200 bg-blue-50" : "border-green-200 bg-green-50"}>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <CheckCircle className={`w-12 h-12 ${hasAlreadyVoted ? 'text-blue-600' : 'text-green-600'}`} />
                </div>
                <CardTitle className="text-2xl">
                  {hasAlreadyVoted ? 'You Have Already Voted' : 'Vote Recorded Successfully!'}
                </CardTitle>
                <CardDescription>
                  {hasAlreadyVoted 
                    ? 'Your vote has been recorded on the blockchain' 
                    : 'Your transaction has been verified on blockchain'}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className={`p-4 rounded-lg border mb-4 ${hasAlreadyVoted ? 'bg-white border-blue-200' : 'bg-white border-green-200'}`}>
                  <p className="text-sm text-muted-foreground">You voted for:</p>
                  <p className="text-xl font-bold">
                    {hasAlreadyVoted 
                      ? election.candidates.find(c => c.id === userVotedCandidateId)?.name 
                      : selectedCandidate?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {hasAlreadyVoted 
                      ? election.candidates.find(c => c.id === userVotedCandidateId)?.party 
                      : selectedCandidate?.party}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Election Results */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle>Live Results</CardTitle>
                </div>
                <CardDescription>
                  Total votes: {election.totalVotes || 0}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {election.candidates
                  .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
                  .map((candidate, index) => {
                    const voteCount = candidate.voteCount || 0
                    const totalVotes = election.totalVotes || 0
                    const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
                    const isUserVote = hasAlreadyVoted 
                      ? candidate.id === userVotedCandidateId 
                      : candidate.id === selectedCandidate?.id

                    return (
                      <div 
                        key={candidate.id} 
                        className={`p-4 rounded-lg border ${isUserVote ? 'border-primary bg-primary/5' : 'border-border'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {index === 0 && totalVotes > 0 && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-0">Leading</Badge>
                            )}
                            <span className="font-semibold">{candidate.name}</span>
                            {isUserVote && (
                              <Badge className="bg-primary/10 text-primary border-0">Your Vote</Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-lg">{percentage.toFixed(1)}%</span>
                            <span className="text-sm text-muted-foreground ml-2">({voteCount} votes)</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">{candidate.party}</div>
                        <div className="w-full bg-secondary rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${isUserVote ? 'bg-primary' : 'bg-primary/60'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </CardContent>
            </Card>

            <Link href="/dashboard">
              <Button className="w-full">Return to Dashboard</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
