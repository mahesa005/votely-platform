'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, ChevronRight, Loader2 } from 'lucide-react'

type Election = {
  id: string
  name: string
  description: string
  level: string
  city: string | null
  province: string | null
  startTime: string
  endTime: string
  candidates: any[]
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

export default function DashboardPage() {
  const [elections, setElections] = useState<Election[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchElections() {
      try {
        setLoading(true)
        const response = await fetch('/api/elections?forUser=true')
        const data = await response.json()

        if (data.success) {
          setElections(data.data)
        } else {
          setError(data.error || 'Gagal memuat data pemilu')
        }
      } catch (err) {
        console.error('Error fetching elections:', err)
        setError('Gagal memuat data pemilu')
      } finally {
        setLoading(false)
      }
    }

    fetchElections()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Memuat data pemilu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Pemilu Anda</h1>
          <p className="text-muted-foreground">Lihat dan ikuti pemilu yang sedang berlangsung di wilayah Anda</p>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Pemilu Anda</h1>
        <p className="text-muted-foreground">Lihat dan ikuti pemilu yang sedang berlangsung di wilayah Anda</p>
      </div>

      {elections.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Tidak ada pemilu yang tersedia saat ini</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {elections.map((election) => {
            const status = getElectionStatus(election)
            return (
              <Card key={election.id} className="hover:shadow-md transition-shadow flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-2">{election.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{election.level}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(status)} border-0 whitespace-nowrap`}>
                      {getStatusLabel(status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{getLocation(election)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{formatDate(election.startTime)} - {formatDate(election.endTime)}</span>
                    </div>
                  </div>
                  <Link href={`/elections/${election.id}`} className="mt-4">
                    <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                      Lihat Detail
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
