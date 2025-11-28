'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Loader2, User, Mail, MapPin, Calendar, CreditCard, Shield, ArrowLeft, Copy, Eye, EyeOff, Check } from 'lucide-react'
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
        
        // 1. Fetch user profile (dengan NIK)
        const userResponse = await fetch('/api/auth/me')
        const userData = await userResponse.json()

        if (!userData.success) {
          setError(userData.error || 'Gagal memuat profil')
          return
        }

        setProfile(userData.data)

        // 2. Fetch data penduduk lengkap berdasarkan NIK
        const nik = userData.data?.penduduk?.nik
        if (nik) {
          const pendudukResponse = await fetch(`/api/penduduk?nik=${nik}`)
          const pendudukData = await pendudukResponse.json()

          if (pendudukData.success) {
            setPendudukData(pendudukData.data)
          } else {
            console.error('Failed to fetch penduduk data:', pendudukData.error)
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Memuat profil...</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center space-y-4">
            <p className="text-red-600">{error || 'Profil tidak ditemukan'}</p>
            <Button onClick={() => router.push('/dashboard')}>Kembali ke Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!pendudukData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-12 text-center space-y-4">
            <p className="text-red-600">Data kependudukan tidak ditemukan</p>
            <Button onClick={() => router.push('/dashboard')}>Kembali ke Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>

        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                  {getInitials(pendudukData?.namaLengkap)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h1 className="text-3xl font-bold text-foreground">{pendudukData?.namaLengkap || 'Nama tidak tersedia'}</h1>
                  <Badge className="w-fit mx-auto md:mx-0">
                    {profile.role === 'ADMIN' ? 'Administrator' : 'Pemilih'}
                  </Badge>
                </div>
                <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>NIK: {pendudukData?.nik || '-'}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{pendudukData?.kabKota || '-'}, {pendudukData?.provinsi || '-'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pribadi</CardTitle>
            <CardDescription>Data kependudukan Anda</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Tanggal Lahir</p>
              <p className="text-foreground">{formatDate(pendudukData?.tanggalLahir)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">NIK</p>
              <p className="text-foreground">{pendudukData?.nik || '-'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle>Alamat</CardTitle>
            <CardDescription>Alamat domisili sesuai KTP</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Alamat Lengkap</p>
              <p className="text-foreground">{pendudukData?.alamat || '-'}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Kelurahan</p>
                <p className="text-foreground">{pendudukData?.kelurahan || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Kecamatan</p>
                <p className="text-foreground">{pendudukData?.kecamatan || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Kabupaten/Kota</p>
                <p className="text-foreground">{pendudukData?.kabKota || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Provinsi</p>
                <p className="text-foreground">{pendudukData?.provinsi || '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Akun</CardTitle>
            <CardDescription>Detail akun votely Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">ID Akun</p>
              <p className="text-foreground font-mono text-sm">{profile?.id || '-'}</p>
            </div>
            {profile?.walletAddress && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Alamat Wallet Blockchain</p>
                <div className="flex items-center gap-2">
                  <p className="text-foreground font-mono text-sm break-all flex-1">
                    {showWallet ? profile.walletAddress : maskWalletAddress(profile.walletAddress)}
                  </p>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => setShowWallet(!showWallet)}
                      title={showWallet ? 'Sembunyikan' : 'Tampilkan'}
                    >
                      {showWallet ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={handleCopyWallet}
                      title="Salin alamat wallet"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Terdaftar Sejak</p>
              <p className="text-foreground">{formatDate(profile?.createdAt)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
