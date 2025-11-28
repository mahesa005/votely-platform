'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, ChevronRight, Loader2, Vote, Clock, Users, Shield, Sparkles, TrendingUp } from 'lucide-react'

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

function getStatusConfig(status: string) {
  switch (status) {
    case 'upcoming':
      return { 
        bg: 'bg-blue-50', 
        text: 'text-blue-600', 
        border: 'border-blue-200',
        dot: 'bg-blue-500',
        label: 'Akan Datang' 
      }
    case 'active':
      return { 
        bg: 'bg-[#1FD7BE]/10', 
        text: 'text-[#1FD7BE]', 
        border: 'border-[#1FD7BE]/30',
        dot: 'bg-[#1FD7BE]',
        label: 'Berlangsung' 
      }
    case 'finished':
      return { 
        bg: 'bg-gray-100', 
        text: 'text-gray-600', 
        border: 'border-gray-200',
        dot: 'bg-gray-400',
        label: 'Selesai' 
      }
    default:
      return { 
        bg: 'bg-gray-100', 
        text: 'text-gray-600', 
        border: 'border-gray-200',
        dot: 'bg-gray-400',
        label: status 
      }
  }
}

function formatDate(date: string | Date) {
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

  const activeElections = elections.filter(e => getElectionStatus(e) === 'active')
  const upcomingElections = elections.filter(e => getElectionStatus(e) === 'upcoming')

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center animate-pulse">
            <Vote className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <p className="text-[#3A3F52] font-medium">Memuat Data Pemilu</p>
            <p className="text-sm text-[#9AA3B8]">Mohon tunggu sebentar...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#3A3F52] mb-2">Dashboard Pemilu</h1>
          <p className="text-[#9AA3B8]">Lihat dan ikuti pemilu yang sedang berlangsung</p>
        </div>
        <div className="glass-panel rounded-2xl p-12 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pt-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#9AA3B8]">Selamat datang kembali</span>
            <Sparkles className="w-4 h-4 text-[#C8FF4D]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#3A3F52] tracking-tight">
            Dashboard Pemilu
          </h1>
          <p className="text-[#9AA3B8] max-w-lg">
            Pilih dan ikuti pemilihan yang tersedia di wilayah Anda dengan keamanan blockchain
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1FD7BE]/10 flex items-center justify-center">
              <Vote className="w-5 h-5 text-[#1FD7BE]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3A3F52]">{elections.length}</p>
              <p className="text-xs text-[#9AA3B8]">Total Pemilu</p>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4 border-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3A3F52]">{activeElections.length}</p>
              <p className="text-xs text-[#9AA3B8]">Berlangsung</p>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4 border-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3A3F52]">{upcomingElections.length}</p>
              <p className="text-xs text-[#9AA3B8]">Akan Datang</p>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4 border-glow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8FF4D]/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#7cb300]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#3A3F52]">100%</p>
              <p className="text-xs text-[#9AA3B8]">Terenkripsi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center gap-3 pt-4">
        <h2 className="text-xl font-bold text-[#3A3F52]">Pemilu Tersedia</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#DDE6F4] to-transparent" />
      </div>

      {/* Elections Grid */}
      {elections.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#DDE6F4]/50 flex items-center justify-center mb-4">
            <Vote className="w-8 h-8 text-[#9AA3B8]" />
          </div>
          <p className="text-[#3A3F52] font-medium mb-1">Belum Ada Pemilu</p>
          <p className="text-sm text-[#9AA3B8]">Tidak ada pemilu yang tersedia di wilayah Anda saat ini</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {elections.map((election, index) => {
            const status = getElectionStatus(election)
            const statusConfig = getStatusConfig(status)
            return (
              <div 
                key={election.id} 
                className="glass-panel rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#1FD7BE]/10 transition-all duration-300 group border-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header */}
                <div className="p-5 border-b border-[#DDE6F4]/50">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#3A3F52] line-clamp-2 group-hover:text-[#1FD7BE] transition-colors">
                        {election.name}
                      </h3>
                      <p className="text-xs text-[#9AA3B8] mt-1 uppercase tracking-wider font-medium">
                        {election.level}
                      </p>
                    </div>
                    <Badge className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border text-xs font-medium px-2.5 py-1 rounded-full`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} mr-1.5 ${status === 'active' ? 'animate-pulse' : ''}`} />
                      {statusConfig.label}
                    </Badge>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-[#DDE6F4]/50 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#9AA3B8]" />
                      </div>
                      <span className="text-[#3A3F52]">{getLocation(election)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-[#DDE6F4]/50 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-[#9AA3B8]" />
                      </div>
                      <span className="text-[#3A3F52]">{formatDate(election.startTime)} - {formatDate(election.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-[#DDE6F4]/50 flex items-center justify-center">
                        <Users className="w-4 h-4 text-[#9AA3B8]" />
                      </div>
                      <span className="text-[#3A3F52]">{election.candidates?.length || 0} Kandidat</span>
                    </div>
                  </div>

                  <Link 
                    href={`/elections/${election.id}`}
                    className={`w-full h-11 mt-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                      status === 'active'
                        ? 'bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white shadow-lg shadow-[#1FD7BE]/25 hover:shadow-[#1FD7BE]/40'
                        : 'bg-[#DDE6F4]/50 hover:bg-[#DDE6F4] text-[#3A3F52]'
                    }`}
                  >
                    {status === 'active' ? 'Ikuti Pemilihan' : 'Lihat Detail'}
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Security Footer */}
      <div className="glass-panel rounded-xl p-4 mt-8">
        <div className="flex items-center justify-center gap-6 text-xs text-[#9AA3B8]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#1FD7BE]" />
            <span>Enkripsi End-to-End</span>
          </div>
          <div className="w-px h-4 bg-[#DDE6F4]" />
          <div className="flex items-center gap-2">
            <Vote className="w-4 h-4 text-[#1FD7BE]" />
            <span>Blockchain Verified</span>
          </div>
          <div className="w-px h-4 bg-[#DDE6F4]" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#1FD7BE]" />
            <span>Verifikasi Biometrik</span>
          </div>
        </div>
      </div>
    </div>
  )
}
