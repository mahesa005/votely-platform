'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { FaceScanner } from '@/components/face-scanner'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nik: '',
    fullName: '',
    dob: '',
    city: '',
    province: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [faceVerified, setFaceVerified] = useState(false)
  const [showFaceScanner, setShowFaceScanner] = useState(false)
  const [currentStep, setCurrentStep] = useState<'form' | 'face'>('form')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.nik || !formData.fullName || !formData.dob || !formData.city || !formData.province || !formData.password) {
      setError('All fields are required')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setCurrentStep('face')
    setShowFaceScanner(true)
  }

  const handleFaceVerified = async () => {
    setFaceVerified(true)
    setShowFaceScanner(false)
    setIsLoading(true)

    // Simulate registration completion
    await new Promise(r => setTimeout(r, 800))
    setSuccess(true)

    setTimeout(() => {
      router.push('/auth/login')
    }, 2000)
  }

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-12 pb-12 flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Registration Successful</h2>
          <p className="text-muted-foreground mb-6">Your account has been created and verified. You'll be redirected to login shortly.</p>
        </CardContent>
      </Card>
    )
  }

  if (currentStep === 'face' && showFaceScanner) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="border-b border-border bg-secondary/50 py-6">
          <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
          <CardDescription>We need to scan your face to secure your account</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <FaceScanner 
            onSuccess={handleFaceVerified}
            title="Face Registration"
            description="Your face will be used to verify your identity during voting"
          />
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => {
              setShowFaceScanner(false)
              setCurrentStep('form')
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
        <CardTitle className="text-2xl">Register as Voter</CardTitle>
        <CardDescription>Create your account to participate in elections</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="nik" className="text-sm font-medium">NIK</Label>
            <Input
              id="nik"
              name="nik"
              placeholder="16-digit NIK"
              value={formData.nik}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-medium">Date of Birth</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">City</Label>
              <Input
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province" className="text-sm font-medium">Province</Label>
              <Input
                id="province"
                name="province"
                placeholder="Province"
                value={formData.province}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-10"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Proceed to Verification'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">Already have an account?</p>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full mt-3" disabled={isLoading}>
              Back to Login
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
