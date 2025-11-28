'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Camera, CheckCircle, Users, ArrowLeft, Loader2 } from 'lucide-react'
import { useActiveAccount, ConnectButton } from "thirdweb/react"
import { prepareContractCall, sendTransaction } from "thirdweb"
import { votingContract, client } from "@/lib/thirdweb"
import { inAppWallet } from "thirdweb/wallets"

type Candidate = {
  id: string
  name: string
  party: string
  description: string | null
  photoUrl: string | null
  orderIndex: number
  electionId: string
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
  candidates: Candidate[]
}

export default function VotingPage() {
  const params = useParams()
  const router = useRouter()
  const account = useActiveAccount() // Get user's In-App Wallet

  // Konversi ID string dari URL
  const electionIdParam = params.electionId as string
  
  const [election, setElection] = useState<Election | null>(null)
  const [loading, setLoading] = useState(true)
  const [faceVerified, setFaceVerified] = useState(false)
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // State local untuk hasil
  const [showResults, setShowResults] = useState(false)

  // Fetch election data from API
  useEffect(() => {
    async function fetchElection() {
      try {
        const response = await fetch(`/api/elections/${electionIdParam}`)
        const result = await response.json()
        
        if (result.success && result.data) {
          setElection(result.data)
        } else {
          console.error('Failed to fetch election:', result.error)
        }
      } catch (error) {
        console.error('Error fetching election:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchElection()
  }, [electionIdParam])

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

  // Submit vote with In-App Wallet (Client-side signing + Gasless)
  const handleConfirmVote = async () => {
    if (!selectedCandidate || !account) {
      alert('Please connect your wallet first')
      return
    }
    
    setIsSubmitting(true)
    try {
      console.log(`Preparing vote transaction...`)
      console.log(`   Voter: ${account.address}`)
      console.log(`   Election: ${election.id}`)
      console.log(`   Candidate: ${selectedCandidate.id}`)

      // Prepare contract call
      const transaction = prepareContractCall({
        contract: votingContract,
        method: "function vote(uint256 electionId, uint256 candidateId)",
        params: [BigInt(election.id), BigInt(selectedCandidate.id)],
      })

      // User signs transaction with their In-App Wallet
      // Admin wallet pays gas via Thirdweb Paymaster (if configured)
      console.log(`Signing transaction with user wallet...`)
      const receipt = await sendTransaction({
        transaction,
        account, // User's In-App Wallet signs
      })

      console.log(`Vote confirmed on-chain!`)
      console.log(`   Transaction Hash: ${receipt.transactionHash}`)
      console.log(`   From: ${account.address} (User's unique identity)`)
      
      setVotedFor(selectedCandidate.id)
      setShowConfirmDialog(false)
      setShowResults(true)

      // Optional: Record vote in database
      await fetch('/api/vote/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          electionId: election.id,
          candidateId: selectedCandidate.id,
          txHash: receipt.transactionHash,
        }),
      })

    } catch (error: any) {
      console.error('[ERROR] Vote error:', error)
      alert(`Voting gagal: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fungsi Face Verification (Simulasi)
  const handleVerifyFace = async () => {
    // Di sini nanti logika Python Face Recognition Anda dipanggil
    // Untuk sekarang kita simulasi delay saja
    await new Promise(r => setTimeout(r, 800))
    setFaceVerified(true)
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
            <ConnectButton
              client={client}
              wallets={[inAppWallet()]}
              connectButton={{ label: "Connect Wallet" }}
              connectModal={{ size: "compact" }}
            />
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
            {/* Wallet Connection Info */}
            {account && (
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Wallet Connected: {account.address.slice(0, 6)}...{account.address.slice(-4)}</span>
                </AlertDescription>
              </Alert>
            )}

            {/* Step 1: Face Verification */}
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
              {!faceVerified ? (
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ensure you are in a well-lit room. Look straight at the camera.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        Open Camera & Verify
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Face Verification</DialogTitle>
                        <DialogDescription>Position your face in the frame</DialogDescription>
                      </DialogHeader>
                      <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                        <Camera className="w-12 h-12 opacity-50" />
                      </div>
                      <Button onClick={handleVerifyFace} className="w-full">Verify Now</Button>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              ) : (
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Identity Verified Successfully</span>
                  </div>
                </CardContent>
              )}
            </Card>

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

                    {!account ? (
                      <Alert className="border-amber-200 bg-amber-50">
                        <AlertDescription className="text-amber-900">
                          Please connect your wallet first to vote
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="text-xs text-muted-foreground bg-blue-50 p-3 rounded border border-blue-200">
                        <p className="font-semibold text-blue-900 mb-1">Your Vote Identity:</p>
                        <p className="font-mono text-blue-700">{account.address}</p>
                        <p className="mt-2 text-blue-800">Gas fee akan dibayar oleh sistem (Gasless Transaction)</p>
                      </div>
                    )}

                    {/* Submit vote - Client signs with In-App Wallet */}
                    <Button
                      onClick={handleConfirmVote}
                      disabled={isSubmitting || !account}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing & Submitting...
                        </>
                      ) : (
                        'Sign & Vote'
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
          // Tampilan setelah sukses voting (Sama seperti sebelumnya)
          <Card className="border-green-200 bg-green-50">
             <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Voting Recorded on Blockchain!</CardTitle>
                <CardDescription>Your transaction hash has been verified.</CardDescription>
             </CardHeader>
             <CardContent className="text-center">
                <div className="bg-white p-6 rounded-lg border border-green-200 mb-4">
                  <p className="text-sm text-muted-foreground">You voted for:</p>
                  <p className="text-xl font-bold">{selectedCandidate?.name}</p>
                </div>
                <Link href="/dashboard">
                  <Button className="w-full">Return to Dashboard</Button>
                </Link>
             </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
