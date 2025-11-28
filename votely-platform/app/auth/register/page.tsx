'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorDialog } from '@/components/ui/error-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Shield, Scan, ArrowRight, User, Lock, MapPin, Calendar } from 'lucide-react'
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

  const handleProceedToFace = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsModalOpen(false);

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

    setCurrentStep('face');
    setShowFaceScanner(true);
  };

  const handleFaceCapture = async (embedding: number[]) => {
    setFaceEmbedding(embedding)
    setFaceVerified(true)
    setShowFaceScanner(false)
    setIsLoading(true)

    try {
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

  const handleFaceVerified = async () => {}

  if (success) {
    return (
      <div className="glass-panel rounded-2xl overflow-hidden p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#1FD7BE]/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-[#1FD7BE]" />
          </div>
          <h2 className="text-2xl font-bold text-[#3A3F52]">Registrasi Berhasil!</h2>
          <p className="text-[#9AA3B8] max-w-sm">
            Akun Anda telah dibuat dan diverifikasi. Mengalihkan ke dashboard...
          </p>
          <div className="flex items-center gap-2 text-sm text-[#1FD7BE]">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Memuat dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'face' && showFaceScanner) {
    return (
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-[#DDE6F4]/50 bg-gradient-to-r from-[#1FD7BE]/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1FD7BE]/10 flex items-center justify-center">
              <Scan className="w-5 h-5 text-[#1FD7BE]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#3A3F52]">Registrasi Biometrik</h2>
              <p className="text-sm text-[#9AA3B8]">Langkah terakhir untuk mengamankan akun Anda</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <FaceScanner 
            onSuccessWithEmbedding={handleFaceCapture}
            title="Registrasi Wajah"
            description="Wajah Anda akan digunakan untuk verifikasi saat voting"
            mode="register"
          />
          <Button 
            variant="outline" 
            className="w-full mt-4 border-[#DDE6F4] hover:bg-[#DDE6F4]/50 text-[#3A3F52]"
            onClick={() => {
              setShowFaceScanner(false)
              setCurrentStep('form')
            }}
          >
            Kembali ke Form
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
            Daftar Akun Baru
          </h1>
          <p className="text-[#9AA3B8]">
            Buat akun untuk berpartisipasi dalam voting yang aman
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-panel rounded-2xl overflow-hidden border-glow">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleProceedToFace} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Personal Info Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium text-[#3A3F52]">
                  <User className="w-4 h-4 text-[#1FD7BE]" />
                  <span>Informasi Pribadi</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nik" className="text-sm font-medium text-[#3A3F52]">NIK</Label>
                  <Input
                    id="nik"
                    name="nik"
                    placeholder="16 digit NIK Anda"
                    value={formData.nik}
                    onChange={handleChange}
                    className="h-11 glass-input rounded-xl text-[#3A3F52] placeholder:text-[#9AA3B8]/60"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-[#3A3F52]">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Nama sesuai KTP"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="h-11 glass-input rounded-xl text-[#3A3F52] placeholder:text-[#9AA3B8]/60"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob" className="text-sm font-medium text-[#3A3F52]">Tanggal Lahir</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="h-11 glass-input rounded-xl text-[#3A3F52]"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-medium text-[#3A3F52]">
                  <MapPin className="w-4 h-4 text-[#1FD7BE]" />
                  <span>Alamat Domisili</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#3A3F52]">Provinsi</Label>
                    <Combobox
                      options={provinces}
                      value={selectedProvinceId}
                      onChange={handleProvinceChange}
                      placeholder={provinces.length === 0 ? "Loading..." : "Pilih Provinsi"}
                      searchPlaceholder="Cari provinsi..."
                      emptyText="Tidak ditemukan."
                      disabled={isLoading || provinces.length === 0}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#3A3F52]">Kota/Kabupaten</Label>
                    <Combobox
                      options={regencies}
                      value={selectedRegencyId}
                      onChange={handleRegencyChange}
                      placeholder={!selectedProvinceId ? "Pilih provinsi dulu" : loadingRegions ? "Loading..." : "Pilih Kota"}
                      searchPlaceholder="Cari kota..."
                      emptyText="Tidak ditemukan."
                      disabled={isLoading || !selectedProvinceId || loadingRegions}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#3A3F52]">Kecamatan</Label>
                    <Combobox
                      options={districts}
                      value={selectedDistrictId}
                      onChange={handleDistrictChange}
                      placeholder={!selectedRegencyId ? "Pilih kota dulu" : loadingRegions ? "Loading..." : "Pilih Kecamatan"}
                      searchPlaceholder="Cari kecamatan..."
                      emptyText="Tidak ditemukan."
                      disabled={isLoading || !selectedRegencyId || loadingRegions}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#3A3F52]">Kelurahan</Label>
                    <Combobox
                      options={villages}
                      value={selectedVillageId}
                      onChange={handleVillageChange}
                      placeholder={!selectedDistrictId ? "Pilih kecamatan dulu" : loadingRegions ? "Loading..." : "Pilih Kelurahan"}
                      searchPlaceholder="Cari kelurahan..."
                      emptyText="Tidak ditemukan."
                      disabled={isLoading || !selectedDistrictId || loadingRegions}
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-sm font-medium text-[#3A3F52]">
                  <Lock className="w-4 h-4 text-[#1FD7BE]" />
                  <span>Keamanan Akun</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-[#3A3F52]">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Min. 6 karakter"
                      value={formData.password}
                      onChange={handleChange}
                      className="h-11 glass-input rounded-xl text-[#3A3F52] placeholder:text-[#9AA3B8]/60"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#3A3F52]">Konfirmasi</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Ulangi password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="h-11 glass-input rounded-xl text-[#3A3F52] placeholder:text-[#9AA3B8]/60"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#1FD7BE] to-[#17c5ae] hover:from-[#17c5ae] hover:to-[#0fa89a] text-white font-semibold rounded-xl shadow-lg shadow-[#1FD7BE]/25 hover:shadow-[#1FD7BE]/40 transition-all duration-300 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  <>
                    Lanjut Verifikasi Wajah
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Login Link */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <div className="pt-4 border-t border-[#DDE6F4]">
              <p className="text-sm text-[#9AA3B8] text-center mb-3">Sudah punya akun?</p>
              <Link 
                href="/auth/login"
                className="block w-full h-11 border-2 border-[#DDE6F4] hover:border-[#1FD7BE] hover:bg-[#1FD7BE]/5 text-[#3A3F52] font-medium rounded-xl transition-all duration-300 text-center leading-[40px]"
              >
                Masuk ke Akun
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#9AA3B8]">
          <Shield className="w-3.5 h-3.5" />
          <span>Data Anda dilindungi dengan enkripsi tingkat tinggi</span>
        </div>
      </div>
    </>
  )
}
