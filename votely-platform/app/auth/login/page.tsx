'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorDialog } from '@/components/ui/error-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Lock, User, Wallet, ArrowRight, Shield, Scan } from 'lucide-react'
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
  const [credentialsValidated, setCredentialsValidated] = useState(false);

  // Step 1: Validate credentials first (NIK & Password)
  const validateCredentials = async () => {
    if (!nik || !password) {
      setError('Mohon isi NIK dan password Anda.')
      return false
    }

    setIsLoading(true)
    setError('')

    try {
      // Validate credentials with server
      const response = await fetch('/api/auth/validate-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'NIK atau password salah.')
      }

      // Credentials valid, check if user has face registered
      if (!data.hasFaceRegistered) {
        // No face registered, skip face verification and login directly
        setIsLoading(false)
        await performLogin()
        return true
      }

      // Credentials valid and has face registered, proceed to face verification
      setCredentialsValidated(true)
      setIsLoading(false)
      setShowFaceScanner(true)
      return true

    } catch (err) {
      console.error(err);
      setModalMessage(err instanceof Error ? err.message : "NIK atau password salah.");
      setIsModalOpen(true); 
      setIsLoading(false);
      return false
    }
  }

  // Step 2: Perform actual login after face verification
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
          await wallet.connect({
            client,
            strategy: "guest",
          })
          return wallet
        })
        console.log('Wallet connected successfully')
      } catch (walletError) {
        console.error('⚠️ Wallet connection failed (non-blocking):', walletError)
      } finally {
        setIsConnectingWallet(false)
      }

      // Check user role and redirect accordingly
      if (data.data?.role === "ADMIN") {
        router.push('/admin')
        router.refresh()
        return
      }

      router.push('/dashboard')
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
    
    if (!nik || !password) {
      setError('Mohon isi NIK dan password Anda.')
      return
    }

    await validateCredentials()
  }

  const handleFaceVerified = async () => {
    setFaceVerified(true)
    setShowFaceScanner(false)
    await performLogin()
  }

  if (showFaceScanner && !faceVerified) {
    return (
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#DDE6F4]/50 bg-gradient-to-r from-[#1FD7BE]/5 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#1FD7BE]/10 flex items-center justify-center">
              <Scan className="w-5 h-5 text-[#1FD7BE]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#3A3F52]">Verifikasi Biometrik</h2>
              <p className="text-sm text-[#9AA3B8]">Konfirmasi identitas dengan wajah Anda</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <FaceScanner 
            onSuccess={handleFaceVerified}
            title="Verifikasi Wajah"
            description="Posisikan wajah Anda di tengah untuk verifikasi"
            nik={nik}
          />
          <Button 
            variant="outline" 
            className="w-full mt-4 border-[#DDE6F4] hover:bg-[#DDE6F4]/50 text-[#3A3F52]"
            onClick={() => {
              setShowFaceScanner(false)
              setFaceVerified(false)
            }}
          >
            Kembali ke Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <> 
      <ErrorDialog 
        isOpen={isModalOpen} 
        message={modalMessage} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#3A3F52] tracking-tight">
            Selamat Datang
          </h1>
          <p className="text-[#9AA3B8]">
            Masuk ke akun Votely Anda untuk mulai voting
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-panel rounded-2xl overflow-hidden border-glow">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {faceVerified && (
                <Alert className="bg-[#1FD7BE]/10 border-[#1FD7BE]/30">
                  <Shield className="h-4 w-4 text-[#1FD7BE]" />
                  <AlertDescription className="text-[#0fa89a]">Identitas terverifikasi</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="nik" className="text-sm font-medium text-[#3A3F52]">
                  NIK (Nomor Induk Kependudukan)
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9AA3B8] group-focus-within:text-[#1FD7BE] transition-colors" />
                  <Input
                    id="nik"
                    placeholder="Masukkan 16 digit NIK Anda"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    className="pl-11 h-12 glass-input rounded-xl text-[#3A3F52] placeholder:text-[#9AA3B8]/60"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#3A3F52]">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9AA3B8] group-focus-within:text-[#1FD7BE] transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 glass-input rounded-xl text-[#3A3F52] placeholder:text-[#9AA3B8]/60"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white font-semibold rounded-xl shadow-lg shadow-[#1FD7BE]/25 hover:shadow-[#1FD7BE]/40 transition-all duration-300 group"
                disabled={isLoading || isConnectingWallet}
              >
                {isConnectingWallet ? (
                  <>
                    <Wallet className="w-4 h-4 mr-2 animate-pulse" />
                    Menghubungkan Wallet...
                  </>
                ) : isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memverifikasi...
                  </span>
                ) : (
                  <>
                    Masuk ke Akun
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Divider */}
          <div className="px-6 sm:px-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#DDE6F4]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/70 px-4 text-[#9AA3B8]">Belum punya akun?</span>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <div className="p-6 sm:p-8 pt-4">
            <Link 
              href="/auth/register"
              className="block w-full h-12 border-2 border-[#DDE6F4] hover:border-[#1FD7BE] hover:bg-[#1FD7BE]/5 text-[#3A3F52] font-medium rounded-xl transition-all duration-300 text-center leading-[44px]"
            >
              Daftar Sebagai Pemilih Baru
            </Link>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#9AA3B8]">
          <Shield className="w-3.5 h-3.5" />
          <span>Dilindungi oleh enkripsi end-to-end & blockchain verification</span>
        </div>
      </div>
    </>
  )
}