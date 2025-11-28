'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar, MapPin, Users, ArrowLeft, Loader2, BarChart3, RefreshCw, Vote, Trophy, Clock, Shield, AlertTriangle, Sparkles } from 'lucide-react'
import Link from 'next/link'

type Candidate = {
  id: string
  name: string
  party: string
  description: string | null
  photoUrl: string | null
  orderIndex: number
  voteCount?: number
}

type Election = {
  id: string
  name: string
  description: string
  level: string
  city: string | null
  province: string | null
  startTime: string
  endTime: string
  candidates: Candidate[]
  totalVotes?: number
  _count?: {
    votes: number
  }
}

function getStatusConfig(status: string) {
  switch (status) {
    case 'upcoming':
      return { 
        bg: 'bg-blue-50', 
        text: 'text-blue-600', 
        border: 'border-blue-200',
        dot: 'bg-blue-500',
        label: 'Akan Datang',
        icon: Clock
      }
    case 'active':
      return { 
        bg: 'bg-[#1FD7BE]/10', 
        text: 'text-[#1FD7BE]', 
        border: 'border-[#1FD7BE]/30',
        dot: 'bg-[#1FD7BE]',
        label: 'Berlangsung',
        icon: Vote
      }
    case 'finished':
      return { 
        bg: 'bg-gray-100', 
        text: 'text-gray-600', 
        border: 'border-gray-200',
        dot: 'bg-gray-400',
        label: 'Selesai',
        icon: BarChart3
      }
    default:
      return { 
        bg: 'bg-gray-100', 
        text: 'text-gray-600', 
        border: 'border-gray-200',
        dot: 'bg-gray-400',
        label: status,
        icon: Vote
      }
  }
}

function getElectionStatus(election: Election): 'upcoming' | 'active' | 'finished' {
  const now = new Date()
  const startTime = new Date(election.startTime)
  const endTime = new Date(election.endTime)
  
  if (now < startTime) {
    return 'upcoming'
  } else if (now >= startTime && now <= endTime) {
    return 'active'
  } else {
    return 'finished'
  }
}

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

function formatShortDate(date: string | Date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date))
}

function getLocation(election: Election) {
  if (election.level === 'NASIONAL') return 'Seluruh Indonesia'
  if (election.level === 'PROVINSI') return election.province || '-'
  if (election.level === 'KOTA') return `${election.city}, ${election.province}` || '-'
  return '-'
}

export default function ElectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [election, setElection] = useState<Election | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchElection = async (showRefreshLoader = false) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      const response = await fetch(`/api/elections/${params.electionId}?includeResults=true`)
      const data = await response.json()

      if (data.success) {
        setElection(data.data)
      } else {
        setError(data.error || 'Gagal memuat data pemilu')
      }
    } catch (err) {
      console.error('Error fetching election:', err)
      setError('Gagal memuat data pemilu')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchElection()
  }, [params.electionId])

  const handleRefresh = () => {
    fetchElection(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen votely-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center animate-pulse">
            <Vote className="w-8 h-8 text-white" />
          </div>
          <p className="text-[#9AA3B8]">Memuat data pemilu...</p>
        </div>
      </div>
    )
  }

  if (error || !election) {
    return (
      <div className="min-h-screen votely-bg flex items-center justify-center p-4">
        <div className="glass-panel rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-500 mb-4">{error || 'Pemilu tidak ditemukan'}</p>
          <Button 
            onClick={() => router.push('/dashboard')}
            className="bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] text-white"
          >
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const status = getElectionStatus(election)
  const statusConfig = getStatusConfig(status)
  const candidates = election.candidates || []
  const StatusIcon = statusConfig.icon

  return (
    <div className="min-h-screen votely-bg">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#DDE6F4]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-[#9AA3B8] hover:text-[#1FD7BE] text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Badge className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border px-3 py-1.5 rounded-full text-xs font-medium`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-1.5 ${status === 'active' ? 'animate-pulse' : ''}`} />
            {statusConfig.label}
          </Badge>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12 space-y-6">
        {/* Hero Section */}
        <div className="glass-panel rounded-2xl overflow-hidden border-glow">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center shadow-lg shadow-[#1FD7BE]/25 shrink-0">
                <StatusIcon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#3A3F52] mb-2">{election.name}</h1>
                <p className="text-[#9AA3B8] line-clamp-2">{election.description}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="glass-panel rounded-xl p-3 bg-white/50">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#9AA3B8]" />
                  <span className="text-xs text-[#9AA3B8]">Wilayah</span>
                </div>
                <p className="text-sm font-semibold text-[#3A3F52] truncate">{getLocation(election)}</p>
              </div>
              <div className="glass-panel rounded-xl p-3 bg-white/50">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-[#9AA3B8]" />
                  <span className="text-xs text-[#9AA3B8]">Periode</span>
                </div>
                <p className="text-sm font-semibold text-[#3A3F52]">{formatShortDate(election.startTime)}</p>
              </div>
              <div className="glass-panel rounded-xl p-3 bg-white/50">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-[#9AA3B8]" />
                  <span className="text-xs text-[#9AA3B8]">Kandidat</span>
                </div>
                <p className="text-sm font-semibold text-[#3A3F52]">{candidates.length} Orang</p>
              </div>
              <div className="glass-panel rounded-xl p-3 bg-white/50">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4 text-[#9AA3B8]" />
                  <span className="text-xs text-[#9AA3B8]">Total Suara</span>
                </div>
                <p className="text-sm font-semibold text-[#3A3F52]">{election.totalVotes || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="glass-panel rounded-xl p-1 w-full grid grid-cols-2 h-auto">
            <TabsTrigger 
              value="overview" 
              className="rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1FD7BE] data-[state=active]:to-[#17c5ae] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#1FD7BE]/25 transition-all"
            >
              Ringkasan
            </TabsTrigger>
            <TabsTrigger 
              value="results"
              className="rounded-lg py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1FD7BE] data-[state=active]:to-[#17c5ae] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#1FD7BE]/25 transition-all"
            >
              Hasil
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Candidates Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-bold text-[#3A3F52]">Daftar Kandidat</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#DDE6F4] to-transparent" />
              </div>
              
              {candidates.length === 0 ? (
                <div className="glass-panel rounded-2xl p-8 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#DDE6F4]/50 flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-[#9AA3B8]" />
                  </div>
                  <p className="text-[#9AA3B8]">Belum ada kandidat terdaftar</p>
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  {candidates.map((candidate, index) => (
                    <div 
                      key={candidate.id} 
                      className="glass-panel rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#1FD7BE]/10 transition-all duration-300 group border-glow"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {candidate.photoUrl && (
                        <div className="aspect-[16/10] bg-gradient-to-br from-[#DDE6F4]/30 to-[#DDE6F4]/10 overflow-hidden">
                          <img
                            src={candidate.photoUrl}
                            alt={candidate.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-[#3A3F52] group-hover:text-[#1FD7BE] transition-colors">
                          {candidate.name}
                        </h3>
                        <Badge variant="outline" className="mt-1 mb-2 bg-[#DDE6F4]/30 border-[#DDE6F4] text-[#9AA3B8] text-xs">
                          {candidate.party}
                        </Badge>
                        {candidate.description && (
                          <p className="text-sm text-[#9AA3B8] line-clamp-2">{candidate.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Section */}
            {status === 'active' && (
              <Link 
                href={`/elections/${election.id}/vote`}
                className="w-full h-12 bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white font-semibold rounded-xl shadow-lg shadow-[#1FD7BE]/25 hover:shadow-[#1FD7BE]/40 transition-all duration-300 group flex items-center justify-center gap-2"
              >
                <Vote className="w-5 h-5" />
                Mulai Voting
                <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              </Link>
            )}

            {status === 'upcoming' && (
              <Alert className="glass-panel border-blue-200/50 rounded-xl">
                <Clock className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Pemilu ini belum dimulai. Silakan kembali pada <strong>{formatDate(election.startTime)}</strong>.
                </AlertDescription>
              </Alert>
            )}

            {status === 'finished' && (
              <Alert className="glass-panel border-[#DDE6F4] rounded-xl">
                <BarChart3 className="h-4 w-4 text-[#9AA3B8]" />
                <AlertDescription className="text-[#3A3F52]">
                  Pemilu telah berakhir. Lihat hasil lengkap di tab <strong>Hasil</strong>.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8FF4D]/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#7cb300]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#3A3F52]">Hasil Pemilu</h2>
                  <p className="text-sm text-[#9AA3B8]">Total: {election.totalVotes || 0} suara</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={refreshing}
                className="gap-2 border-[#DDE6F4] hover:border-[#1FD7BE] hover:bg-[#1FD7BE]/5 text-[#3A3F52]"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {status === 'upcoming' ? (
              <Alert className="glass-panel border-blue-200/50 rounded-xl">
                <Clock className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700">
                  Hasil akan tersedia setelah pemilu dimulai.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                {candidates.length === 0 || (election.totalVotes || 0) === 0 ? (
                  <div className="glass-panel rounded-2xl p-8 text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-[#DDE6F4]/50 flex items-center justify-center mb-3">
                      <BarChart3 className="w-6 h-6 text-[#9AA3B8]" />
                    </div>
                    <p className="text-[#9AA3B8]">
                      {candidates.length === 0 ? 'Belum ada data hasil' : 'Belum ada suara masuk'}
                    </p>
                  </div>
                ) : (
                  [...candidates]
                    .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
                    .map((candidate, index) => {
                      const voteCount = candidate.voteCount || 0
                      const totalVotes = election.totalVotes || 0
                      const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0
                      const isLeading = index === 0 && totalVotes > 0

                      return (
                        <div 
                          key={candidate.id.toString()} 
                          className={`glass-panel rounded-xl p-4 transition-all duration-300 ${
                            isLeading ? 'border-[#C8FF4D]/50 bg-[#C8FF4D]/5' : 'border-glow'
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
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold text-[#3A3F52]">{percentage.toFixed(1)}%</span>
                              <span className="text-sm text-[#9AA3B8] ml-2">({voteCount})</span>
                            </div>
                          </div>
                          <div className="w-full bg-[#DDE6F4]/50 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${
                                isLeading 
                                  ? 'bg-gradient-to-r from-[#C8FF4D] to-[#a8d700]' 
                                  : 'bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae]'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Security Footer */}
        <div className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#9AA3B8]">
            <Shield className="w-4 h-4 text-[#1FD7BE]" />
            <span>Semua suara dicatat secara permanen di blockchain Ethereum</span>
          </div>
        </div>
      </div>
    </div>
  )
}
