'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { ErrorDialog } from '@/components/ui/error-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Lock, User, Wallet } from 'lucide-react'
import { FaceScanner } from '@/components/face-scanner'
import { useConnect } from "thirdweb/react"
import { inAppWallet } from "thirdweb/wallets"
import { client } from "@/lib/thirdweb"

export default function LoginPage() {
  const router = useRouter()
  const { connect } = useConnect()
  
  const [nik, setNik] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [faceVerified, setFaceVerified] = useState(false)
  const [showFaceScanner, setShowFaceScanner] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState("")
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);

  const performLogin = async () => {
    if (!nik || !password) {
      setError('Mohon isi NIK dan password Anda.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nik, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat login.')
      }

      // Auto-connect Thirdweb In-App Wallet setelah login berhasil
      console.log('Auto-connecting Thirdweb In-App Wallet...')
      setIsConnectingWallet(true)
      
      try {
        const wallet = inAppWallet()
        await connect(async () => {
          // Use guest mode - simple & free, no email/phone needed
          await wallet.connect({
            client,
            strategy: "guest",
            // Guest wallet uses browser storage, unique per browser session
          })
          return wallet
        })
        console.log('Wallet connected successfully')
      } catch (walletError) {
        console.error('⚠️ Wallet connection failed (non-blocking):', walletError)
        // Don't block login if wallet connection fails
      } finally {
        setIsConnectingWallet(false)
      }

      // Check user role and redirect accordingly
      if (data.data?.role === "ADMIN") {
        router.push('/admin')
        console.log("Redirecting to /admin");
        router.refresh()
        return
      }

      router.push('/dashboard')
      console.log("Redirecting to /dashboard");
      router.refresh()
    } catch (err) {
      console.error(err);
      setModalMessage(err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.");
      setIsModalOpen(true); 
      setIsLoading(false);
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsModalOpen(false);
    
    // Skip face verification untuk sementara
    await performLogin()
  }

  const handleFaceVerified = async () => {
    setFaceVerified(true)
    setShowFaceScanner(false)
    await performLogin()
  }

  if (showFaceScanner && !faceVerified) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="border-b border-border bg-secondary/50 py-6">
          <CardTitle className="text-2xl">Verifikasi Identitas Anda</CardTitle>
          <CardDescription>Penggunaan pengenalan wajah diperlukan demi keamanan</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <FaceScanner 
            onSuccess={handleFaceVerified}
            onSkip={handleFaceVerified}
            title="Verifikasi Wajah"
            description="Posisikan wajah Anda di tengah untuk verifikasi"
            nik={nik}
          />
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => {
              setShowFaceScanner(false)
              setFaceVerified(false)
            }}
          >
            Kembali
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <> 
      <ErrorDialog 
        isOpen={isModalOpen} 
        message={modalMessage} 
        onClose={() => setIsModalOpen(false)} 
      />
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="border-b border-border bg-secondary/50 py-6">
        <CardTitle className="text-2xl">Selamat Datang di Platform Votely</CardTitle>
        <CardDescription>Masuk untuk berpartisipasi dalam pemilihan atau mengelola proses pemungutan suara</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {faceVerified && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800 text-sm">Face verified successfully</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="nik" className="text-sm font-medium">NIK (Nomor Induk Kependudukan)</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="nik"
                placeholder="Masukkan NIK Anda"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10"
            disabled={isLoading || isConnectingWallet}
          >
            {isConnectingWallet ? (
              <>
                <Wallet className="w-4 h-4 mr-2 animate-pulse" />
                Connecting Wallet...
              </>
            ) : isLoading ? (
              'Proses...'
            ) : faceVerified ? (
              'Login Selesai'
            ) : (
              'Masuk'
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center mb-4">Belum punya akun?</p>
          <Link href="/auth/register">
            <Button variant="outline" className="w-full" disabled={isLoading}>
              Daftar sebagai Pemilih
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
    </>
  )
}