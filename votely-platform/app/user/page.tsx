'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Loader2, User, MapPin, Calendar, CreditCard, Shield, ArrowLeft, Copy, Eye, EyeOff, Check, Vote, Wallet, Clock, Fingerprint } from 'lucide-react'
import Link from 'next/link'

type UserProfile = {
  id: string
  role: string
  walletAddress: string | null
  createdAt: string
  penduduk: {
    nik: string
  }
}

type PendudukData = {
  id: string
  nik: string
  namaLengkap: string
  tanggalLahir: string
  alamat: string | null
  kabKota: string | null
  kecamatan: string | null
  kelurahan: string | null
  provinsi: string | null
}

function formatDate(dateString?: string | null) {
  if (!dateString) return '-'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return '-'
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  } catch {
    return '-'
  }
}

function getInitials(name?: string) {
  if (!name) return 'US'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function UserProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [pendudukData, setPendudukData] = useState<PendudukData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showWallet, setShowWallet] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true)
        
        const userResponse = await fetch('/api/auth/me')
        const userData = await userResponse.json()

        if (!userData.success) {
          setError(userData.error || 'Gagal memuat profil')
          return
        }

        setProfile(userData.data)

        const nik = userData.data?.penduduk?.nik
        if (nik) {
          const pendudukResponse = await fetch(`/api/penduduk?nik=${nik}`)
          const pendudukData = await pendudukResponse.json()

          if (pendudukData.success) {
            setPendudukData(pendudukData.data)
          }
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Gagal memuat profil')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleCopyWallet = async () => {
    if (profile?.walletAddress) {
      await navigator.clipboard.writeText(profile.walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const maskWalletAddress = (address: string) => {
    if (address.length <= 10) return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (loading) {
    return (
      <div className="min-h-screen votely-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center animate-pulse">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-[#9AA3B8]">Memuat profil...</p>
        </div>
      </div>
    )
  }

  if (error || !profile || !pendudukData) {
    return (
      <div className="min-h-screen votely-bg flex items-center justify-center p-4">
        <div className="glass-panel rounded-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-500 mb-4">{error || 'Profil tidak ditemukan'}</p>
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

  return (
    <div className="min-h-screen votely-bg">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#DDE6F4]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-[#9AA3B8] hover:text-[#1FD7BE] text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1FD7BE]/10 rounded-full">
            <Shield className="w-3.5 h-3.5 text-[#1FD7BE]" />
            <span className="text-xs font-medium text-[#1FD7BE]">Terverifikasi</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12 space-y-6">
        {/* Profile Hero */}
        <div className="glass-panel rounded-2xl overflow-hidden border-glow">
          <div className="bg-gradient-to-r from-[#1FD7BE]/10 via-[#17c5ae]/5 to-transparent p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                  <AvatarFallback className="bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] text-white text-2xl font-bold">
                    {getInitials(pendudukData?.namaLengkap)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#C8FF4D] border-4 border-white flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#3A3F52]" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left space-y-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#3A3F52] mb-1">
                    {pendudukData?.namaLengkap || 'Nama tidak tersedia'}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Badge className="bg-[#1FD7BE]/10 text-[#1FD7BE] border-0">
                      {profile.role === 'ADMIN' ? 'Administrator' : 'Pemilih Terdaftar'}
                    </Badge>
                    <span className="text-sm text-[#9AA3B8]">•</span>
                    <span className="text-sm text-[#9AA3B8]">{pendudukData?.kabKota}, {pendudukData?.provinsi}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-[#9AA3B8]">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>NIK: {pendudukData?.nik}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Sejak {formatDate(profile?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="glass-panel rounded-xl p-4 text-center border-glow">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#1FD7BE]/10 flex items-center justify-center mb-2">
              <Vote className="w-5 h-5 text-[#1FD7BE]" />
            </div>
            <p className="text-lg font-bold text-[#3A3F52]">-</p>
            <p className="text-xs text-[#9AA3B8]">Total Suara</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center border-glow">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#C8FF4D]/20 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-[#7cb300]" />
            </div>
            <p className="text-lg font-bold text-[#3A3F52]">Active</p>
            <p className="text-xs text-[#9AA3B8]">Status</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center border-glow">
            <div className="w-10 h-10 mx-auto rounded-xl bg-blue-100 flex items-center justify-center mb-2">
              <Fingerprint className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-lg font-bold text-[#3A3F52]">✓</p>
            <p className="text-xs text-[#9AA3B8]">Biometrik</p>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center border-glow">
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-100 flex items-center justify-center mb-2">
              <Wallet className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-lg font-bold text-[#3A3F52]">✓</p>
            <p className="text-xs text-[#9AA3B8]">Wallet</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="glass-panel rounded-2xl overflow-hidden border-glow">
          <div className="p-5 border-b border-[#DDE6F4]/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DDE6F4]/50 flex items-center justify-center">
              <User className="w-5 h-5 text-[#9AA3B8]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#3A3F52]">Informasi Pribadi</h2>
              <p className="text-sm text-[#9AA3B8]">Data kependudukan Anda</p>
            </div>
          </div>
          <div className="p-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[#9AA3B8] uppercase tracking-wider">Tanggal Lahir</p>
              <p className="text-[#3A3F52] font-medium">{formatDate(pendudukData?.tanggalLahir)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-[#9AA3B8] uppercase tracking-wider">NIK</p>
              <p className="text-[#3A3F52] font-medium font-mono">{pendudukData?.nik || '-'}</p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="glass-panel rounded-2xl overflow-hidden border-glow">
          <div className="p-5 border-b border-[#DDE6F4]/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DDE6F4]/50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#9AA3B8]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#3A3F52]">Alamat Domisili</h2>
              <p className="text-sm text-[#9AA3B8]">Alamat sesuai KTP</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {pendudukData?.alamat && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#9AA3B8] uppercase tracking-wider">Alamat Lengkap</p>
                <p className="text-[#3A3F52] font-medium">{pendudukData.alamat}</p>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#9AA3B8] uppercase tracking-wider">Kelurahan</p>
                <p className="text-[#3A3F52] font-medium">{pendudukData?.kelurahan || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#9AA3B8] uppercase tracking-wider">Kecamatan</p>
                <p className="text-[#3A3F52] font-medium">{pendudukData?.kecamatan || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#9AA3B8] uppercase tracking-wider">Kabupaten/Kota</p>
                <p className="text-[#3A3F52] font-medium">{pendudukData?.kabKota || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#9AA3B8] uppercase tracking-wider">Provinsi</p>
                <p className="text-[#3A3F52] font-medium">{pendudukData?.provinsi || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Wallet */}
        {profile?.walletAddress && (
          <div className="glass-panel rounded-2xl overflow-hidden border-glow">
            <div className="p-5 border-b border-[#DDE6F4]/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#3A3F52]">Wallet Blockchain</h2>
                <p className="text-sm text-[#9AA3B8]">Alamat Ethereum untuk voting</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 p-3 bg-[#DDE6F4]/30 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-[#3A3F52] font-mono text-sm truncate">
                    {showWallet ? profile.walletAddress : maskWalletAddress(profile.walletAddress)}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-white"
                    onClick={() => setShowWallet(!showWallet)}
                  >
                    {showWallet ? <EyeOff className="h-4 w-4 text-[#9AA3B8]" /> : <Eye className="h-4 w-4 text-[#9AA3B8]" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-white"
                    onClick={handleCopyWallet}
                  >
                    {copied ? <Check className="h-4 w-4 text-[#1FD7BE]" /> : <Copy className="h-4 w-4 text-[#9AA3B8]" />}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-[#9AA3B8] mt-2">
                Wallet ini digunakan untuk mencatat suara Anda di blockchain Ethereum
              </p>
            </div>
          </div>
        )}

        {/* Security Footer */}
        <div className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#9AA3B8]">
            <Shield className="w-4 h-4 text-[#1FD7BE]" />
            <span>Data Anda dilindungi dengan enkripsi end-to-end</span>
          </div>
        </div>
      </div>
    </div>
  )
}
