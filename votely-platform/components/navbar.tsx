'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, Home, User, Shield, ChevronDown, Vote, Settings } from 'lucide-react'

function getInitials(name?: string) {
  if (!name) return 'US'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function Navbar({ isAdmin = false }: { isAdmin?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userInitials, setUserInitials] = useState<string>(isAdmin ? 'AD' : 'US')
  const [userName, setUserName] = useState<string>(isAdmin ? 'Admin' : 'User')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchUserData() {
      if (pathname.startsWith('/auth')) return
      
      try {
        const userResponse = await fetch('/api/auth/me')
        const userData = await userResponse.json()

        if (userData.success && userData.data?.penduduk?.nik) {
          const nik = userData.data.penduduk.nik
          const pendudukResponse = await fetch(`/api/penduduk?nik=${nik}`)
          const pendudukData = await pendudukResponse.json()

          if (pendudukData.success && pendudukData.data?.namaLengkap) {
            setUserInitials(getInitials(pendudukData.data.namaLengkap))
            setUserName(pendudukData.data.namaLengkap.split(' ')[0])
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [pathname])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      router.push('/auth/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      router.push('/auth/login')
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-[#DDE6F4]/50 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link href={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-3 group">
          <Image 
            src="/logo-with-text.png" 
            alt="Votely Logo" 
            width={140} 
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Navigation Links - Center */}
        {!pathname.startsWith('/auth') && (
          <div className="hidden md:flex items-center gap-1">
            <Link 
              href={isAdmin ? '/admin' : '/dashboard'}
              className={`h-9 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center ${
                pathname === (isAdmin ? '/admin' : '/dashboard')
                  ? 'bg-[#1FD7BE]/10 text-[#1FD7BE]' 
                  : 'text-[#9AA3B8] hover:text-[#3A3F52] hover:bg-[#DDE6F4]/50'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
            {isAdmin && (
              <button 
                onClick={() => {
                  if (pathname !== '/admin') {
                    router.push('/admin#elections-section')
                  } else {
                    document.getElementById('elections-section')?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="h-9 px-4 text-sm font-medium rounded-lg transition-all duration-200 flex items-center text-[#9AA3B8] hover:text-[#3A3F52] hover:bg-[#DDE6F4]/50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Kelola Pemilihan
              </button>
            )}
          </div>
        )}

        {/* User Menu */}
        {!pathname.startsWith('/auth') && (
          <div className="flex items-center gap-3">
            {/* Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1FD7BE]/10 rounded-full">
              <Shield className="w-3.5 h-3.5 text-[#1FD7BE]" />
              <span className="text-xs font-medium text-[#1FD7BE]">Terverifikasi</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-11 pl-2 pr-3 rounded-full bg-white/50 hover:bg-white border border-[#DDE6F4] hover:border-[#1FD7BE]/30 transition-all duration-200 shadow-sm"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-gradient-to-br from-[#1FD7BE] to-[#17c5ae] text-white text-xs font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-sm font-medium text-[#3A3F52] hidden sm:inline">{userName}</span>
                  <ChevronDown className="w-4 h-4 ml-1 text-[#9AA3B8]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 p-2 bg-white/95 backdrop-blur-xl border border-[#DDE6F4] shadow-xl shadow-[#3A3F52]/5 rounded-xl"
              >
                <div className="px-3 py-2 mb-1">
                  <p className="text-sm font-semibold text-[#3A3F52]">{userName}</p>
                  <p className="text-xs text-[#9AA3B8]">{isAdmin ? 'Administrator' : 'Pemilih Terdaftar'}</p>
                </div>
                <DropdownMenuSeparator className="bg-[#DDE6F4]" />
                <DropdownMenuItem asChild>
                  <Link 
                    href={isAdmin ? '/admin' : '/dashboard'} 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-[#3A3F52] hover:bg-[#1FD7BE]/10 hover:text-[#1FD7BE] transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span className="text-sm font-medium">{isAdmin ? 'Admin Dashboard' : 'Dashboard'}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    href="/user" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-[#3A3F52] hover:bg-[#1FD7BE]/10 hover:text-[#1FD7BE] transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Profil Saya</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#DDE6F4]" />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  )
}
