'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

type ElectionFormProps = {
  onSubmit: (data: ElectionFormData) => Promise<void>
  initialData?: Partial<ElectionFormData>
  submitLabel?: string
}

export type ElectionFormData = {
  name: string
  description: string
  level: string
  province: string
  city: string
  startTime: string
  endTime: string
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
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field: keyof ElectionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
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
