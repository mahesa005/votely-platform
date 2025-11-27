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
import { Camera, CheckCircle, Users, ArrowLeft, Loader2 } from 'lucide-react'

// --- IMPORT THIRDWEB ---
import { prepareContractCall } from "thirdweb"
import { TransactionButton, useActiveAccount } from "thirdweb/react"
import { votingContract } from "@/lib/thirdweb" // Pastikan path ini benar
// -----------------------

export default function VotingPage() {
  const params = useParams()
  const router = useRouter()
  const account = useActiveAccount() // Cek apakah user sudah login wallet

  // Konversi ID string dari URL ke BigInt untuk smart contract
  const electionIdParam = params.electionId as string
  const election = mockElections.find(e => e.id === electionIdParam)
  const candidates = mockCandidates[election?.id || ''] || []

  const [faceVerified, setFaceVerified] = useState(false)
  const [votedFor, setVotedFor] = useState<string | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  
  // State local untuk hasil (nanti bisa diganti fetch real-time dari blockchain)
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
          <div className="text-sm text-muted-foreground">
            {election.name}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {!account ? (
             <Alert className="border-red-200 bg-red-50">
             <AlertDescription className="text-red-900">
               Please connect your wallet first to vote.
             </AlertDescription>
           </Alert>
        ) : election.status !== 'Active' ? (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertDescription className="text-amber-900">
              Voting is {election.status === 'Upcoming' ? 'not open yet' : 'closed'}
            </AlertDescription>
          </Alert>
        ) : !showResults ? (
          <>
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
                          src={candidate.image || "/placeholder.svg"}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{candidate.name}</CardTitle>
                        <Badge variant="outline" className="w-fit">{candidate.party}</Badge>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <p className="text-sm text-foreground">{candidate.description}</p>
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

                    {/* --- TRANSACTION BUTTON (INTI INTEGRASI) --- */}
                    <TransactionButton
                      transaction={() => {
                        // PENTING: Konversi ID ke BigInt sesuai Solidity uint256
                        // Pastikan ID di mock-data Anda bisa dikonversi ke angka (misal "1", "2")
                        // Jika ID di mock data "c1", Anda harus mapping ke integer 1 dulu.
                        const _electionId = BigInt(election.id); 
                        const _candidateId = BigInt(selectedCandidate.id);

                        return prepareContractCall({
                          contract: votingContract,
                          method: "function vote(uint256 _electionId, uint256 _candidateId)",
                          params: [_electionId, _candidateId],
                        });
                      }}
                      onTransactionConfirmed={(receipt) => {
                        console.log("Vote confirmed:", receipt);
                        setVotedFor(selectedCandidate.id);
                        setShowConfirmDialog(false);
                        setShowResults(true);
                      }}
                      onError={(error) => {
                        console.error("Vote failed:", error);
                        alert(`Voting Gagal: ${error.message}`);
                      }}
                      theme="dark" // Sesuaikan tema
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Confirm & Vote On-Chain
                    </TransactionButton>
                    {/* ------------------------------------------- */}
                    
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowConfirmDialog(false)} 
                      className="w-full"
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
