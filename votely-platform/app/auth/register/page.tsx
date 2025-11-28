'use client'

import { useState, useEffect } from 'react'
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
import { Combobox } from '@/components/ui/combobox'

type Region = {
  id: string
  name: string
}

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
  const [faceEmbedding, setFaceEmbedding] = useState<number[] | null>(null)

  // Region data
  const [provinces, setProvinces] = useState<Region[]>([])
  const [regencies, setRegencies] = useState<Region[]>([])
  const [districts, setDistricts] = useState<Region[]>([])
  const [villages, setVillages] = useState<Region[]>([])
  const [selectedProvinceId, setSelectedProvinceId] = useState('')
  const [selectedRegencyId, setSelectedRegencyId] = useState('')
  const [selectedDistrictId, setSelectedDistrictId] = useState('')
  const [selectedVillageId, setSelectedVillageId] = useState('')
  const [loadingRegions, setLoadingRegions] = useState(false)

  // Load provinces on mount
  useEffect(() => {
    fetchProvinces()
  }, [])

  const fetchProvinces = async () => {
    try {
      const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      const data = await response.json()
      setProvinces(data)
    } catch (error) {
      console.error('Error fetching provinces:', error)
    }
  }

  const fetchRegencies = async (provinceId: string) => {
    setLoadingRegions(true)
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
      const data = await response.json()
      setRegencies(data)
      setDistricts([])
      setVillages([])
    } catch (error) {
      console.error('Error fetching regencies:', error)
    } finally {
      setLoadingRegions(false)
    }
  }

  const fetchDistricts = async (regencyId: string) => {
    setLoadingRegions(true)
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`)
      const data = await response.json()
      setDistricts(data)
      setVillages([])
    } catch (error) {
      console.error('Error fetching districts:', error)
    } finally {
      setLoadingRegions(false)
    }
  }

  const fetchVillages = async (districtId: string) => {
    setLoadingRegions(true)
    try {
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`)
      const data = await response.json()
      setVillages(data)
    } catch (error) {
      console.error('Error fetching villages:', error)
    } finally {
      setLoadingRegions(false)
    }
  }

  const handleProvinceChange = (value: string) => {
    const province = provinces.find(p => p.id === value)
    if (province) {
      setSelectedProvinceId(value)
      setFormData(prev => ({ ...prev, province: province.name, city: '', district: '', subDistrict: '' }))
      setSelectedRegencyId('')
      setSelectedDistrictId('')
      setSelectedVillageId('')
      setRegencies([])
      setDistricts([])
      setVillages([])
      fetchRegencies(value)
    }
  }

  const handleRegencyChange = (value: string) => {
    const regency = regencies.find(r => r.id === value)
    if (regency) {
      setSelectedRegencyId(value)
      setFormData(prev => ({ ...prev, city: regency.name, district: '', subDistrict: '' }))
      setSelectedDistrictId('')
      setSelectedVillageId('')
      setDistricts([])
      setVillages([])
      fetchDistricts(value)
    }
  }

  const handleDistrictChange = (value: string) => {
    const district = districts.find(d => d.id === value)
    if (district) {
      setSelectedDistrictId(value)
      setFormData(prev => ({ ...prev, district: district.name, subDistrict: '' }))
      setSelectedVillageId('')
      setVillages([])
      fetchVillages(value)
    }
  }

  const handleVillageChange = (value: string) => {
    const village = villages.find(v => v.id === value)
    if (village) {
      setSelectedVillageId(value)
      setFormData(prev => ({ ...prev, subDistrict: village.name }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Step 1: Validate form and proceed to face capture
  const handleProceedToFace = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsModalOpen(false);

    // VALIDASI DASAR
    if (!formData.nik || !formData.fullName || !formData.dob || !formData.city || !formData.province || !formData.password) {
        setError('Semua kolom wajib diisi');
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setError('Password konfirmasi tidak cocok');
        return;
    }

    if (formData.password.length < 6) {
        setError('Password minimal 6 karakter');
        return;
    }

    // Proceed to face capture (no DB registration yet)
    setCurrentStep('face');
    setShowFaceScanner(true);
  };

  // Step 2: After face captured, register account with embedding
  const handleFaceCapture = async (embedding: number[]) => {
    setFaceEmbedding(embedding)
    setFaceVerified(true)
    setShowFaceScanner(false)
    setIsLoading(true)

    try {
      // Now register with face embedding included
      const response = await fetch('/api/auth/register-with-face', {
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
          faceEmbedding: embedding,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registrasi gagal');
      }

      // Auto login after registration
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

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)

    } catch (error: any) {
      console.error("Error Registration:", error);
      setModalMessage(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
      setIsModalOpen(true);
      setCurrentStep('form')
      setShowFaceScanner(false)
      setFaceVerified(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Legacy handler for FaceScanner (will be updated)
  const handleFaceVerified = async () => {
    // This will be called by FaceScanner, but we need embedding
    // So we'll update FaceScanner to pass embedding
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
            onSuccessWithEmbedding={handleFaceCapture}
            title="Registrasi Wajah"
            description="Wajah Anda akan digunakan untuk memverifikasi identitas saat pemilihan"
            mode="register"
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
        <form onSubmit={handleProceedToFace} className="space-y-4">
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

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="province" className="text-sm font-medium">Provinsi</Label>
              <Combobox
                options={provinces}
                value={selectedProvinceId}
                onChange={handleProvinceChange}
                placeholder={provinces.length === 0 ? "Loading..." : "Pilih Provinsi"}
                searchPlaceholder="Cari provinsi..."
                emptyText="Provinsi tidak ditemukan."
                disabled={isLoading || provinces.length === 0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">Kota/Kabupaten</Label>
              <Combobox
                options={regencies}
                value={selectedRegencyId}
                onChange={handleRegencyChange}
                placeholder={
                  !selectedProvinceId ? "Pilih provinsi terlebih dahulu" : 
                  loadingRegions ? "Loading..." : 
                  "Pilih Kota/Kabupaten"
                }
                searchPlaceholder="Cari kota/kabupaten..."
                emptyText="Kota/Kabupaten tidak ditemukan."
                disabled={isLoading || !selectedProvinceId || loadingRegions}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="text-sm font-medium">Kecamatan</Label>
              <Combobox
                options={districts}
                value={selectedDistrictId}
                onChange={handleDistrictChange}
                placeholder={
                  !selectedRegencyId ? "Pilih kota/kabupaten terlebih dahulu" : 
                  loadingRegions ? "Loading..." : 
                  "Pilih Kecamatan"
                }
                searchPlaceholder="Cari kecamatan..."
                emptyText="Kecamatan tidak ditemukan."
                disabled={isLoading || !selectedRegencyId || loadingRegions}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subDistrict" className="text-sm font-medium">Kelurahan/Desa</Label>
              <Combobox
                options={villages}
                value={selectedVillageId}
                onChange={handleVillageChange}
                placeholder={
                  !selectedDistrictId ? "Pilih kecamatan terlebih dahulu" : 
                  loadingRegions ? "Loading..." : 
                  "Pilih Kelurahan/Desa"
                }
                searchPlaceholder="Cari kelurahan/desa..."
                emptyText="Kelurahan/Desa tidak ditemukan."
                disabled={isLoading || !selectedDistrictId || loadingRegions}
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
