'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { ErrorDialog } from '@/components/ui/error-dialog'
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
    district: '',
    subDistrict: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [faceVerified, setFaceVerified] = useState(false)
  const [showFaceScanner, setShowFaceScanner] = useState(false)
  const [currentStep, setCurrentStep] = useState<'form' | 'face'>('form')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsModalOpen(false);
    // 1. Mulai Loading
    setIsLoading(true); 

    // VALIDASI DASAR
    if (!formData.nik || !formData.fullName || !formData.dob || !formData.city || !formData.province || !formData.password) {
        setError('Semua kolom wajib diisi');
        setIsLoading(false); // Stop loading jika error
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setError('Password konfirmasi tidak cocok');
        setIsLoading(false);
        return;
    }

    if (formData.password.length < 6) {
        setError('Password minimal 6 karakter');
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nik: formData.nik,
                password: formData.password,
                namaLengkap: formData.fullName, 
                dob: formData.dob, 
                provinsi: formData.province,
                kabKota: formData.city,      
                kecamatan: formData.district,
                kelurahan: formData.subDistrict,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registrasi gagal');
        }

        const loginResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nik: formData.nik, 
                password: formData.password 
            }),
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
            throw new Error(loginData.error || 'Login gagal setelah registrasi');
        }

        setIsLoading(false);
        
        // Skip face scanner untuk sementara
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);

    } catch (error: any) {
        console.error("Error Registration:", error);
        setModalMessage(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
        setIsModalOpen(true);
        setIsLoading(false);
    }
};

  const handleFaceVerified = async () => {
    setFaceVerified(true)
    setShowFaceScanner(false)
    setIsLoading(true)

    await new Promise(r => setTimeout(r, 800))
    setSuccess(true)

    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-12 pb-12 flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Registrasi Berhasil</h2>
          <p className="text-muted-foreground mb-6">Akun Anda telah dibuat dan diverifikasi. Anda akan diarahkan ke halaman dashboard dalam beberapa saat.</p>
        </CardContent>
      </Card>
    )
  }

  if (currentStep === 'face' && showFaceScanner) {
    return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="border-b border-border bg-secondary/50 py-6">
          <CardTitle className="text-2xl">Verifikasi Identitas Anda</CardTitle>
          <CardDescription>Kami perlu memindai wajah Anda untuk mengamankan akun Anda</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <FaceScanner 
            onSuccess={handleFaceVerified}
            onSkip={handleFaceVerified}
            title="Registrasi Wajah"
            description="Wajah Anda akan digunakan untuk memverifikasi identitas saat pemilihan"
          />
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => {
              setShowFaceScanner(false)
              setCurrentStep('form')
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
        <CardTitle className="text-2xl">Daftar sebagai Pemilih</CardTitle>
        <CardDescription>Buat akun Anda untuk berpartisipasi dalam pemilihan</CardDescription>
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
            <Label htmlFor="fullName" className="text-sm font-medium">Nama Lengkap</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Nama lengkap Anda"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob" className="text-sm font-medium">Tanggal Lahir</Label>
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
              <Label htmlFor="city" className="text-sm font-medium">Kota/Kabupaten</Label>
              <Input
                id="city"
                name="city"
                placeholder="Kota/Kabupaten"
                value={formData.city}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="province" className="text-sm font-medium">Provinsi</Label>
              <Input
                id="province"
                name="province"
                placeholder="Provinsi"
                value={formData.province}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="text-sm font-medium">Kecamatan</Label>
              <Input
                id="district"
                name="district"
                placeholder="Kecamatan"
                value={formData.district}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subDistrict" className="text-sm font-medium">Kelurahan</Label>
              <Input
                id="subDistrict"
                name="subDistrict"
                placeholder="Kelurahan"
                value={formData.subDistrict}
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
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Konfirmasi Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Konfirmasi password Anda"
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
            {isLoading ? 'Mendaftar...' : 'Lanjut ke Verifikasi'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">Sudah punya akun?</p>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full mt-3" disabled={isLoading}>
              Kembali ke Login
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
    </>
  )
}
