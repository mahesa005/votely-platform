'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Vote, Shield, Fingerprint, Link as LinkIcon, ChevronRight, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen votely-bg overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#DDE6F4]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center shadow-lg shadow-[#1FD7BE]/25">
              <Vote className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#3A3F52] tracking-tight">Votely</span>
              <span className="text-[10px] text-[#9AA3B8] -mt-1 font-medium tracking-wider uppercase">E-Voting Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-[#3A3F52] hover:text-[#1FD7BE] hover:bg-[#1FD7BE]/5 rounded-lg transition-colors"
            >
              Masuk
            </Link>
            <Link 
              href="/auth/register"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white shadow-lg shadow-[#1FD7BE]/25 hover:shadow-[#1FD7BE]/40 rounded-lg transition-all"
            >
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#1FD7BE]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C8FF4D]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${mounted ? 'animate-float-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C8FF4D]/20 rounded-full border border-[#C8FF4D]/30">
                <Sparkles className="w-4 h-4 text-[#7cb300]" />
                <span className="text-sm font-medium text-[#3A3F52]">Platform E-Voting Terdesentralisasi</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#3A3F52] leading-tight">
                Masa Depan
                <span className="block bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] bg-clip-text text-transparent">
                  Pemilihan Digital
                </span>
                yang Aman
              </h1>

              <p className="text-lg text-[#9AA3B8] max-w-lg leading-relaxed">
                Sistem voting berbasis blockchain dengan verifikasi biometrik wajah. 
                Transparan, aman, dan tidak dapat dimanipulasi.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/auth/register"
                  className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white font-semibold rounded-xl shadow-xl shadow-[#1FD7BE]/30 hover:shadow-[#1FD7BE]/50 transition-all duration-300 group flex items-center justify-center gap-2"
                >
                  Mulai Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/auth/login"
                  className="w-full sm:w-auto h-14 px-8 border-2 border-[#DDE6F4] hover:border-[#1FD7BE] hover:bg-[#1FD7BE]/5 text-[#3A3F52] font-semibold rounded-xl flex items-center justify-center transition-colors"
                >
                  Sudah Punya Akun
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-[#9AA3B8]">
                  <CheckCircle className="w-5 h-5 text-[#1FD7BE]" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#9AA3B8]">
                  <CheckCircle className="w-5 h-5 text-[#1FD7BE]" />
                  <span>Verifikasi Biometrik</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Visual */}
            <div className={`relative ${mounted ? 'animate-float-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <div className="relative">
                {/* Main Card */}
                <div className="glass-panel rounded-3xl p-8 border-glow">
                  <div className="aspect-square max-w-sm mx-auto relative">
                    {/* Animated Rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border border-[#1FD7BE]/20 animate-ping" style={{ animationDuration: '3s' }} />
                    </div>
                    <div className="absolute inset-8 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border-2 border-[#1FD7BE]/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                    </div>
                    
                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center shadow-2xl shadow-[#1FD7BE]/40">
                        <Vote className="w-16 h-16 text-white" />
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 glass-panel rounded-xl p-3 animate-bounce" style={{ animationDuration: '3s' }}>
                      <Shield className="w-6 h-6 text-[#1FD7BE]" />
                    </div>
                    <div className="absolute bottom-4 left-4 glass-panel rounded-xl p-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}>
                      <Fingerprint className="w-6 h-6 text-[#C8FF4D]" />
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 glass-panel rounded-xl p-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                      <LinkIcon className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#3A3F52] mb-4">
              Keunggulan Votely
            </h2>
            <p className="text-[#9AA3B8] max-w-2xl mx-auto">
              Teknologi terdepan untuk memastikan setiap suara dihitung dengan benar dan tidak dapat dimanipulasi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="glass-panel rounded-2xl p-6 border-glow hover:shadow-xl hover:shadow-[#1FD7BE]/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center mb-4 shadow-lg shadow-[#1FD7BE]/25 group-hover:scale-110 transition-transform">
                <LinkIcon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#3A3F52] mb-2">Blockchain Ethereum</h3>
              <p className="text-[#9AA3B8]">
                Setiap suara tercatat permanen di blockchain, tidak dapat diubah atau dihapus oleh siapapun
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel rounded-2xl p-6 border-glow hover:shadow-xl hover:shadow-[#1FD7BE]/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C8FF4D] to-[#a8d700] flex items-center justify-center mb-4 shadow-lg shadow-[#C8FF4D]/25 group-hover:scale-110 transition-transform">
                <Fingerprint className="w-7 h-7 text-[#3A3F52]" />
              </div>
              <h3 className="text-xl font-bold text-[#3A3F52] mb-2">Verifikasi Biometrik</h3>
              <p className="text-[#9AA3B8]">
                Face recognition dengan AI memastikan hanya pemilih sah yang dapat memberikan suara
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel rounded-2xl p-6 border-glow hover:shadow-xl hover:shadow-[#1FD7BE]/10 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#3A3F52] mb-2">Enkripsi End-to-End</h3>
              <p className="text-[#9AA3B8]">
                Data pribadi dan pilihan Anda dilindungi dengan enkripsi tingkat militer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border-glow text-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1FD7BE]/10 via-transparent to-[#C8FF4D]/10" />
            
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#3A3F52] mb-4">
                Siap Menggunakan Votely?
              </h2>
              <p className="text-[#9AA3B8] max-w-2xl mx-auto mb-8">
                Bergabunglah dengan ribuan pemilih yang sudah mempercayakan suara mereka pada platform voting teraman di Indonesia
              </p>
              <Link 
                href="/auth/register"
                className="inline-flex items-center gap-2 h-14 px-10 bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white font-semibold rounded-xl shadow-xl shadow-[#1FD7BE]/30 hover:shadow-[#1FD7BE]/50 transition-all duration-300 group"
              >
                Daftar Gratis Sekarang
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-[#DDE6F4]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] flex items-center justify-center">
              <Vote className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#3A3F52]">Votely</span>
          </div>
          <p className="text-sm text-[#9AA3B8]">
            © 2025 Votely. Secure E-Voting Platform.
          </p>
        </div>
      </footer>
    </div>
  )
}
