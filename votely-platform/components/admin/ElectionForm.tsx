'use client'

import { useState } from 'react'
import { Plus, Trash2, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Image from 'next/image'

type ElectionFormProps = {
  onSubmit: (data: ElectionFormData) => Promise<void>
  initialData?: Partial<ElectionFormData>
  submitLabel?: string
}

export type CandidateFormData = {
  name: string
  party: string
  description: string
  photoUrl?: string
  photoFile?: File
}

export type ElectionFormData = {
  name: string
  description: string
  level: string
  province: string
  city: string
  startTime: string
  endTime: string
  candidates: CandidateFormData[]
}

const PROVINCES = [
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Banten',
  'Yogyakarta',
  'Bali',
  'Sumatera Utara',
  'Sumatera Barat',
  'Sumatera Selatan',
  'Kalimantan Timur',
  'Kalimantan Selatan',
  'Sulawesi Selatan',
  'Sulawesi Utara',
]

export default function ElectionForm({ onSubmit, initialData, submitLabel = 'Create Election' }: ElectionFormProps) {
  const [formData, setFormData] = useState<ElectionFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    level: initialData?.level || 'NASIONAL',
    province: initialData?.province || '',
    city: initialData?.city || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    candidates: initialData?.candidates || [],
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: keyof ElectionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const addCandidate = () => {
    setFormData(prev => ({
      ...prev,
      candidates: [...prev.candidates, { name: '', party: '', description: '', photoUrl: '' }]
    }))
  }

  const removeCandidate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      candidates: prev.candidates.filter((_, i) => i !== index)
    }))
  }

  const updateCandidate = (index: number, field: keyof CandidateFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      candidates: prev.candidates.map((c, i) => 
        i === index ? { ...c, [field]: value } : c
      )
    }))
  }

  const handlePhotoUpload = async (index: number, file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/candidate-photo', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Upload failed')
      }

      // Update candidate with photo URL
      setFormData(prev => ({
        ...prev,
        candidates: prev.candidates.map((c, i) => 
          i === index ? { ...c, photoUrl: result.data.url } : c
        )
      }))
    } catch (err: any) {
      alert(err.message || 'Failed to upload photo')
    }
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      candidates: prev.candidates.map((c, i) => 
        i === index ? { ...c, photoUrl: '' } : c
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate
    if (!formData.name || !formData.description || !formData.level || !formData.startTime || !formData.endTime) {
      setError('Please fill in all required fields')
      return
    }

    // Validate dates
    const start = new Date(formData.startTime)
    const end = new Date(formData.endTime)
    
    if (end <= start) {
      setError('End time must be after start time')
      return
    }

    // Validate location based on level
    if (formData.level === 'PROVINSI' && !formData.province) {
      setError('Province is required for provincial elections')
      return
    }

    if (formData.level === 'KOTA' && (!formData.province || !formData.city)) {
      setError('Province and city are required for city elections')
      return
    }

    setLoading(true)
    
    try {
      await onSubmit(formData)
    } catch (err: any) {
      setError(err.message || 'Failed to submit form')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Election Details</CardTitle>
          <CardDescription>Basic information about the election</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Election Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Pemilihan Presiden 2024"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose and details of this election"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Election Level *</Label>
            <Select value={formData.level} onValueChange={(value) => handleChange('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NASIONAL">Nasional</SelectItem>
                <SelectItem value="PROVINSI">Provinsi</SelectItem>
                <SelectItem value="KOTA">Kota/Kabupaten</SelectItem>
                <SelectItem value="KECAMATAN">Kecamatan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.level === 'PROVINSI' || formData.level === 'KOTA' || formData.level === 'KECAMATAN') && (
            <div className="space-y-2">
              <Label htmlFor="province">Province *</Label>
              <Select value={formData.province} onValueChange={(value) => handleChange('province', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  {PROVINCES.map(prov => (
                    <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {(formData.level === 'KOTA' || formData.level === 'KECAMATAN') && (
            <div className="space-y-2">
              <Label htmlFor="city">City/Regency *</Label>
              <Input
                id="city"
                placeholder="e.g. Kota Bandung"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                required={formData.level === 'KOTA' || formData.level === 'KECAMATAN'}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Candidates Section */}
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Candidates</CardTitle>
              <CardDescription>Add candidates for this election (optional - can add later)</CardDescription>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addCandidate} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Candidate
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {formData.candidates.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No candidates added yet. You can add candidates now or after creating the election.
            </p>
          ) : (
            <div className="space-y-4">
              {formData.candidates.map((candidate, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-muted-foreground">Candidate #{index + 1}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeCandidate(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label>Photo</Label>
                    {candidate.photoUrl ? (
                      <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                        <Image
                          src={candidate.photoUrl}
                          alt={candidate.name || 'Candidate'}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Input
                          id={`candidate-photo-${index}`}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              handlePhotoUpload(index, file)
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`candidate-photo-${index}`)?.click()}
                          className="gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Photo
                        </Button>
                        <span className="text-xs text-muted-foreground">Max 5MB (JPEG, PNG, WebP)</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`candidate-name-${index}`}>Name *</Label>
                      <Input
                        id={`candidate-name-${index}`}
                        placeholder="e.g. John Doe"
                        value={candidate.name}
                        onChange={(e) => updateCandidate(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`candidate-party-${index}`}>Party *</Label>
                      <Input
                        id={`candidate-party-${index}`}
                        placeholder="e.g. Democratic Party"
                        value={candidate.party}
                        onChange={(e) => updateCandidate(index, 'party', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`candidate-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`candidate-desc-${index}`}
                      placeholder="Brief description of the candidate"
                      value={candidate.description}
                      onChange={(e) => updateCandidate(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
          <CardDescription>When will voting take place</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Date & Time *</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Date & Time *</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => window.history.back()} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
