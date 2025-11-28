'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, Fingerprint, Vote, Lock } from 'lucide-react'

function FloatingOrb({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div 
      className={`absolute rounded-full blur-3xl opacity-30 animate-pulse ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  )
}

function SecurityBadge({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium">
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  )
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Info */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-gradient-to-br from-[#0F1419] via-[#1a2332] to-[#0d2847]">
        {/* Animated Background Orbs */}
        <FloatingOrb className="w-96 h-96 bg-[#1FD7BE] -top-20 -left-20" delay={0} />
        <FloatingOrb className="w-80 h-80 bg-[#6366F1] bottom-20 right-10" delay={1} />
        <FloatingOrb className="w-64 h-64 bg-[#1FD7BE] top-1/2 left-1/3" delay={2} />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1FD7BE] to-[#0fa89a] flex items-center justify-center shadow-lg shadow-[#1FD7BE]/20 group-hover:shadow-[#1FD7BE]/40 transition-shadow">
                  <span className="text-white font-bold text-2xl tracking-tight">V</span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#1FD7BE] to-[#6366F1] opacity-0 group-hover:opacity-30 blur transition-opacity" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-tight">Votely</span>
                <span className="block text-xs text-[#1FD7BE] font-medium tracking-widest uppercase">Blockchain Voting</span>
              </div>
            </Link>
          </div>
          
          {/* Hero Content */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="space-y-4">
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Suara Anda,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FD7BE] to-[#6366F1]">
                  Terlindungi Selamanya
                </span>
              </h1>
              <p className="text-lg text-white/60 max-w-md leading-relaxed">
                Platform e-voting terdesentralisasi dengan teknologi blockchain dan verifikasi biometrik AI untuk pemilihan yang transparan dan aman.
              </p>
            </div>
            
            {/* Security Badges */}
            <div className="flex flex-wrap gap-3">
              <SecurityBadge icon={Shield} label="Blockchain Verified" />
              <SecurityBadge icon={Fingerprint} label="Biometric Auth" />
              <SecurityBadge icon={Lock} label="End-to-End Encrypted" />
            </div>
          </div>
          
          {/* Bottom Stats */}
          <div className={`transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-white/50">Immutable Records</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-sm text-white/50">Vote Manipulation</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-[#1FD7BE]">Sepolia</div>
                <div className="text-sm text-white/50">Ethereum Network</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1FD7BE" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="url(#grad1)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
      
      {/* Right Side - Auth Form */}
      <div className="flex-1 flex flex-col votely-bg relative">
        {/* Mobile Logo */}
        <div className="lg:hidden p-6 relative z-20">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1FD7BE] to-[#0fa89a] flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-xl font-bold text-[#3A3F52]">Votely</span>
          </Link>
        </div>
        
        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 relative z-20">
          <div className={`w-full max-w-md transition-all duration-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 text-center text-sm text-[#9AA3B8] relative z-20">
          <p>© 2025 Votely. Powered by Ethereum Blockchain.</p>
        </div>
      </div>
    </div>
  )
}
