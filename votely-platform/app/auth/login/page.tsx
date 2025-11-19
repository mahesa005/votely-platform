'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Lock, User } from 'lucide-react'
import { FaceScanner } from '@/components/face-scanner'

export default function LoginPage() {
  const router = useRouter()
  const [nik, setNik] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [faceVerified, setFaceVerified] = useState(false)
  const [showFaceScanner, setShowFaceScanner] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!faceVerified) {
      setShowFaceScanner(true)
      return
    }

    setIsLoading(true)
    await new Promise(r => setTimeout(r, 500))

    const adminNik = '1234567890123456'
    if (nik === adminNik && password) {
      router.push('/admin')
    } else if (nik && password) {
      router.push('/dashboard')
    } else {
      setError('Please enter both NIK and password')
    }

    setIsLoading(false)
  }

  if (showFaceScanner && !faceVerified) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="border-b border-border bg-secondary/50 py-6">
          <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
          <CardDescription>Facial recognition is required for security</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <FaceScanner 
            onSuccess={() => {
              setFaceVerified(true)
              setShowFaceScanner(false)
            }}
            title="Face Verification"
            description="Position your face in the center for verification"
          />
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => {
              setShowFaceScanner(false)
              setFaceVerified(false)
            }}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="border-b border-border bg-secondary/50 py-6">
        <CardTitle className="text-2xl">Welcome to Votely</CardTitle>
        <CardDescription>Sign in to participate in elections or manage the voting process</CardDescription>
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
              <AlertDescription className="text-green-800 text-sm">✓ Face verified successfully</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="nik" className="text-sm font-medium">NIK (National Identification)</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="nik"
                placeholder="Enter your NIK"
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

          <div className="bg-secondary/60 rounded-lg p-4 text-sm text-secondary-foreground">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs">Admin: 1234567890123456 / any password</p>
            <p className="text-xs">Voter: any other NIK / any password</p>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : faceVerified ? 'Complete Login' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center mb-4">Don't have an account?</p>
          <Link href="/auth/register">
            <Button variant="outline" className="w-full" disabled={isLoading}>
              Register as Voter
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
