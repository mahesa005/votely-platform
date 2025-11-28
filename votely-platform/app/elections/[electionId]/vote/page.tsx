'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle, Users, ArrowLeft, Loader2, BarChart3, Shield, Scan, Vote, Trophy, Sparkles, AlertTriangle } from 'lucide-react'
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
  const [showResults, setShowResults] = useState(false)

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

  useEffect(() => {
    async function fetchElectionAndVoteStatus() {
      resetVoteState()
      setLoading(true)
      
      try {
        const userResponse = await fetch('/api/auth/me', { 
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        })
        const userData = await userResponse.json()
        
        if (userData.success && userData.data) {
          setCurrentUser(userData.data)
        } else {
          router.push('/auth/login')
          return
        }
        
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

        const voteCheckResponse = await fetch(`/api/vote/check?electionId=${electionIdParam}&_t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' }
        })
        const voteCheckResult = await voteCheckResponse.json()
        
        if (voteCheckResult.success && voteCheckResult.data.hasVoted) {
          setHasAlreadyVoted(true)
          setUserVotedCandidateId(voteCheckResult.data.candidateId)
          setShowResults(true)
        }
      } catch (error) {
        console.error('Error fetching election:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchElectionAndVoteStatus()
  }, [electionIdParam, resetVoteState, router])

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
      <div className="min-h-screen votely-bg flex items-center justify-center p-4">
        <div className="glass-panel rounded-2xl p-12 text-center max-w-md">
          {loading ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center animate-pulse">
                <Vote className="w-8 h-8 text-white" />
              </div>
              <p className="text-[#9AA3B8]">Memuat data pemilihan...</p>
            </div>
          ) : (
            <p className="text-[#9AA3B8]">Pemilihan tidak ditemukan</p>
          )}
        </div>
      </div>
    )
  }

  const candidates = election.candidates || []
  const electionStatus = getElectionStatus(election)

  const handleVoteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setShowConfirmDialog(true)
  }

  const handleConfirmVote = async () => {
    if (!selectedCandidate) {
      alert('Silakan pilih kandidat terlebih dahulu')
      return
    }

    if (!election.chainElectionId) {
      alert('Pemilihan ini belum terdeploy ke blockchain. Silakan hubungi administrator.')
      return
    }
    
    setIsSubmitting(true)
    try {
      if (!selectedCandidate.chainCandidateId) {
        alert('Kandidat ini belum terdeploy ke blockchain. Silakan hubungi administrator.')
        setIsSubmitting(false)
        return
      }

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
        throw new Error(result.error || 'Gagal mencatat suara')
      }
      
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

  const handleFaceVerified = () => {
    setFaceVerified(true)
    setShowFaceScanner(false)
  }

  return (
    <div className="min-h-screen votely-bg">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#DDE6F4]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link 
            href={`/elections/${election.id}`} 
            className="inline-flex items-center gap-2 text-[#9AA3B8] hover:text-[#1FD7BE] text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1FD7BE]/10 rounded-full">
              <Shield className="w-3.5 h-3.5 text-[#1FD7BE]" />
              <span className="text-xs font-medium text-[#1FD7BE]">Blockchain Secured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12 space-y-6">
        {/* Election Info Header */}
        <div className="glass-panel rounded-2xl p-6 border-glow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center shadow-lg shadow-[#1FD7BE]/25">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-[#3A3F52]">{election.name}</h1>
              <p className="text-sm text-[#9AA3B8]">{election.level} • {candidates.length} Kandidat</p>
            </div>
            <Badge className={`px-3 py-1.5 rounded-full text-xs font-medium ${
              electionStatus === 'Active' 
                ? 'bg-[#1FD7BE]/10 text-[#1FD7BE] border border-[#1FD7BE]/30' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {electionStatus === 'Active' ? 'Berlangsung' : electionStatus === 'Upcoming' ? 'Akan Datang' : 'Selesai'}
            </Badge>
          </div>
        </div>

        {electionStatus !== 'Active' ? (
          <Alert className="glass-panel border-amber-200/50 rounded-xl">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-amber-700">
              {electionStatus === 'Upcoming' ? 'Pemilihan belum dimulai' : 'Pemilihan telah berakhir'}
            </AlertDescription>
          </Alert>
        ) : !showResults ? (
          <>
            {/* Step 1: Face Verification */}
            <div className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${
              faceVerified ? 'border-[#1FD7BE]/30 bg-[#1FD7BE]/5' : 'border-glow'
            }`}>
              <div className="p-5 border-b border-[#DDE6F4]/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    faceVerified 
                      ? 'bg-[#1FD7BE]/10' 
                      : 'bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] shadow-lg shadow-[#1FD7BE]/25'
                  }`}>
                    {faceVerified ? (
                      <CheckCircle className="w-5 h-5 text-[#1FD7BE]" />
                    ) : (
                      <Scan className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#3A3F52]">Langkah 1: Verifikasi Wajah</h2>
                    <p className="text-sm text-[#9AA3B8]">
                      {faceVerified ? 'Identitas berhasil diverifikasi' : 'Verifikasi identitas Anda sebelum memilih'}
                    </p>
                  </div>
                </div>
                {faceVerified && (
                  <Badge className="bg-[#1FD7BE]/10 text-[#1FD7BE] border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              {!faceVerified && (
                <div className="p-6">
                  <FaceScanner
                    onSuccess={handleFaceVerified}
                    title="Verifikasi Wajah"
                    description="Posisikan wajah Anda di tengah frame"
                    mode="verify"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Vote Selection */}
            <div className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${
              !faceVerified ? 'opacity-50 pointer-events-none' : 'border-glow'
            }`}>
              <div className="p-5 border-b border-[#DDE6F4]/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DDE6F4]/50 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#9AA3B8]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#3A3F52]">Langkah 2: Pilih Kandidat</h2>
                    <p className="text-sm text-[#9AA3B8]">Pilih kandidat pilihan Anda</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {candidates.map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className="group glass-panel rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#1FD7BE]/10 transition-all duration-300 cursor-pointer border-glow"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-[4/3] bg-gradient-to-br from-[#DDE6F4]/30 to-[#DDE6F4]/10 overflow-hidden">
                        <img
                          src={candidate.photoUrl || "/placeholder.svg"}
                          alt={candidate.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-[#3A3F52] group-hover:text-[#1FD7BE] transition-colors">
                            {candidate.name}
                          </h3>
                          <Badge variant="outline" className="mt-1 bg-[#DDE6F4]/30 border-[#DDE6F4] text-[#9AA3B8] text-xs">
                            {candidate.party}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#9AA3B8] line-clamp-2">
                          {candidate.description || 'Tidak ada deskripsi'}
                        </p>
                        <Button
                          onClick={() => handleVoteClick(candidate)}
                          className="w-full h-10 bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white font-medium rounded-lg shadow-lg shadow-[#1FD7BE]/25 hover:shadow-[#1FD7BE]/40 transition-all duration-300"
                        >
                          Pilih {candidate.name.split(' ')[0]}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
              <DialogContent className="glass-panel border-[#DDE6F4] rounded-2xl max-w-md">
                <DialogHeader className="text-center pb-2">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center shadow-lg shadow-[#1FD7BE]/25 mb-4">
                    <Vote className="w-8 h-8 text-white" />
                  </div>
                  <DialogTitle className="text-xl font-bold text-[#3A3F52]">Konfirmasi Pilihan</DialogTitle>
                  <DialogDescription className="text-[#9AA3B8]">
                    Suara Anda akan dicatat secara permanen di blockchain
                  </DialogDescription>
                </DialogHeader>
                
                {selectedCandidate && (
                  <div className="space-y-4 pt-2">
                    <div className="glass-panel rounded-xl p-4 border-[#1FD7BE]/20 bg-[#1FD7BE]/5">
                      <p className="text-xs text-[#9AA3B8] mb-1">Anda memilih:</p>
                      <p className="text-xl font-bold text-[#3A3F52]">{selectedCandidate.name}</p>
                      <p className="text-sm text-[#9AA3B8]">{selectedCandidate.party}</p>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                      <div className="text-xs text-blue-700">
                        <p className="font-semibold mb-1">Keamanan Blockchain</p>
                        <p>Suara Anda akan terenkripsi dan tersimpan permanen di blockchain Ethereum.</p>
                      </div>
                    </div>

                    <Button
                      onClick={handleConfirmVote}
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white font-semibold rounded-xl shadow-lg shadow-[#1FD7BE]/25 hover:shadow-[#1FD7BE]/40 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Mencatat Suara...
                        </span>
                      ) : (
                        'Konfirmasi & Kirim Suara'
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowConfirmDialog(false)} 
                      className="w-full h-10 text-[#9AA3B8] hover:text-[#3A3F52] hover:bg-[#DDE6F4]/50"
                      disabled={isSubmitting}
                    >
                      Batalkan
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </>
        ) : (
          /* Results View */
          <div className="space-y-6">
            {/* Success Card */}
            <div className={`glass-panel rounded-2xl overflow-hidden ${
              hasAlreadyVoted ? 'border-blue-200/50 bg-blue-50/30' : 'border-[#1FD7BE]/30 bg-[#1FD7BE]/5'
            }`}>
              <div className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                  hasAlreadyVoted 
                    ? 'bg-blue-100' 
                    : 'bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] shadow-lg shadow-[#1FD7BE]/25'
                }`}>
                  <CheckCircle className={`w-10 h-10 ${hasAlreadyVoted ? 'text-blue-500' : 'text-white'}`} />
                </div>
                <h2 className="text-2xl font-bold text-[#3A3F52] mb-2">
                  {hasAlreadyVoted ? 'Anda Sudah Memilih' : 'Suara Berhasil Dicatat!'}
                </h2>
                <p className="text-[#9AA3B8] mb-6">
                  {hasAlreadyVoted 
                    ? 'Suara Anda telah tersimpan di blockchain' 
                    : 'Transaksi Anda telah diverifikasi di blockchain'}
                </p>
                <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl ${
                  hasAlreadyVoted ? 'bg-white border border-blue-200' : 'bg-white border border-[#1FD7BE]/20'
                }`}>
                  <div>
                    <p className="text-xs text-[#9AA3B8]">Pilihan Anda:</p>
                    <p className="text-lg font-bold text-[#3A3F52]">
                      {hasAlreadyVoted 
                        ? election.candidates.find(c => c.id === userVotedCandidateId)?.name 
                        : selectedCandidate?.name}
                    </p>
                    <p className="text-sm text-[#9AA3B8]">
                      {hasAlreadyVoted 
                        ? election.candidates.find(c => c.id === userVotedCandidateId)?.party 
                        : selectedCandidate?.party}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Results */}
            <div className="glass-panel rounded-2xl overflow-hidden border-glow">
              <div className="p-5 border-b border-[#DDE6F4]/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C8FF4D]/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#7cb300]" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#3A3F52]">Hasil Sementara</h2>
                    <p className="text-sm text-[#9AA3B8]">Total suara: {election.totalVotes || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C8FF4D]/20 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-[#7cb300]" />
                  <span className="text-xs font-medium text-[#7cb300]">Live</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {election.candidates
                  .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
                  .map((candidate, index) => {
                    const voteCount = candidate.voteCount || 0
                    const totalVotes = election.totalVotes || 0
                    const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
                    const isUserVote = hasAlreadyVoted 
                      ? candidate.id === userVotedCandidateId 
                      : candidate.id === selectedCandidate?.id
                    const isLeading = index === 0 && totalVotes > 0

                    return (
                      <div 
                        key={candidate.id} 
                        className={`p-4 rounded-xl transition-all duration-300 ${
                          isUserVote 
                            ? 'bg-[#1FD7BE]/5 border border-[#1FD7BE]/30' 
                            : 'bg-[#DDE6F4]/20 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {isLeading && (
                              <div className="w-8 h-8 rounded-lg bg-[#C8FF4D]/20 flex items-center justify-center">
                                <Trophy className="w-4 h-4 text-[#7cb300]" />
                              </div>
                            )}
                            <div>
                              <span className="font-bold text-[#3A3F52]">{candidate.name}</span>
                              <span className="text-sm text-[#9AA3B8] ml-2">{candidate.party}</span>
                            </div>
                            {isUserVote && (
                              <Badge className="bg-[#1FD7BE]/10 text-[#1FD7BE] border-0 text-xs">
                                Pilihan Anda
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-[#3A3F52]">{percentage.toFixed(1)}%</span>
                            <span className="text-sm text-[#9AA3B8] ml-2">({voteCount})</span>
                          </div>
                        </div>
                        <div className="w-full bg-[#DDE6F4]/50 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ${
                              isUserVote 
                                ? 'bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae]' 
                                : 'bg-[#9AA3B8]/40'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            <Link 
              href="/dashboard"
              className="w-full h-12 bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white font-semibold rounded-xl shadow-lg shadow-[#1FD7BE]/25 hover:shadow-[#1FD7BE]/40 transition-all duration-300 flex items-center justify-center"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
