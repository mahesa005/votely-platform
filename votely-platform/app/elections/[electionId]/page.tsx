'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar, MapPin, Users, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

type Candidate = {
  id: string
  name: string
  party: string
  description: string | null
  photoUrl: string | null
  orderIndex: number
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
  _count?: {
    votes: number
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'finished':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'upcoming':
      return 'Akan Datang'
    case 'active':
      return 'Berlangsung'
    case 'finished':
      return 'Selesai'
    default:
      return status
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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchElection() {
      try {
        setLoading(true)
        const response = await fetch(`/api/elections/${params.electionId}`)
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
      }
    }

    fetchElection()
  }, [params.electionId])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Memuat data pemilu...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !election) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-red-600 mb-4">{error || 'Pemilu tidak ditemukan'}</p>
            <Button onClick={() => router.push('/dashboard')}>Kembali ke Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const status = getElectionStatus(election)
  const candidates = election.candidates || []

  return (
    <div className="max-w-8xl mx-auto space-y-6 p-15">
      {/* Election Header */}
      <div className="border-b border-border pb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Pemilu
        </Link>

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{election.name}</h1>
            <p className="text-muted-foreground mb-4">{election.description}</p>
          </div>
          <Badge className={`${getStatusColor(status)} border-0`}>
            {getStatusLabel(status)}
          </Badge>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{getLocation(election)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{formatDate(election.startTime)} - {formatDate(election.endTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 shrink-0" />
            <span>{candidates.length} Kandidat</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="results">Hasil</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">Detail Pemilu</h2>
            <p className="text-muted-foreground leading-relaxed">{election.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Kandidat</h2>
            {candidates.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">Belum ada kandidat terdaftar</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {candidates.map((candidate) => (
                  <Card key={candidate.id} className="hover:shadow-sm transition-shadow overflow-hidden flex flex-col">
                    {candidate.photoUrl && (
                      <div className="w-full h-48 bg-muted overflow-hidden">
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base">{candidate.name}</CardTitle>
                          <CardDescription className="text-xs">{candidate.party}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    {candidate.description && (
                      <CardContent className="flex-1">
                        <p className="text-sm text-foreground">{candidate.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {status === 'active' && (
            <div className="pt-4">
              <Link href={`/elections/${election.id}/vote`}>
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  <Users className="w-4 h-4" />
                  Mulai Voting
                </Button>
              </Link>
            </div>
          )}

          {status === 'upcoming' && (
            <Alert>
              <AlertDescription>
                Pemilu ini belum dimulai. Silakan kembali pada {formatDate(election.startTime)} untuk mulai voting.
              </AlertDescription>
            </Alert>
          )}

          {status === 'finished' && (
            <Alert>
              <AlertDescription>
                Pemilu ini telah berakhir. Lihat hasil di tab "Hasil".
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Hasil Pemilu</h2>
          {status === 'upcoming' ? (
            <Alert>
              <AlertDescription>
                Hasil akan tersedia setelah pemilu dimulai.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {candidates.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">Belum ada data hasil</p>
                  </CardContent>
                </Card>
              ) : (
                candidates.map((candidate) => (
                  <Card key={candidate.id.toString()}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{candidate.name}</CardTitle>
                          <CardDescription className="text-xs">{candidate.party}</CardDescription>
                        </div>
                        <span className="text-lg font-bold text-primary">0%</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: '0%' }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">0 suara</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
