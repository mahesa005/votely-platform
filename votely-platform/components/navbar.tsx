'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut, Home, User } from 'lucide-react'

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
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
        <Link href={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-semibold text-foreground">Votely</span>
        </Link>

        {!pathname.startsWith('/auth') && (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2 cursor-pointer">
                    <Home className="w-4 h-4" />
                    <span>{isAdmin ? 'Admin Dashboard' : 'Dashboard'}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    <span>Profil Saya</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  )
}
