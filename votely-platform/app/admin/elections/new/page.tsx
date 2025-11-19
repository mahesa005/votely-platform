'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Trash2, Plus, CheckCircle } from 'lucide-react'

export default function CreateElectionPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'City',
    location: '',
    city: '',
    province: '',
    startDateTime: '',
    endDateTime: '',
  })

  const [candidates, setCandidates] = useState([
    { id: '1', name: '', party: '', description: '' },
  ])

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCandidateChange = (index: number, field: string, value: string) => {
    const updated = [...candidates]
    updated[index] = { ...updated[index], [field]: value }
    setCandidates(updated)
  }

  const addCandidate = () => {
    setCandidates([...candidates, { id: String(candidates.length + 1), name: '', party: '', description: '' }])
  }

  const removeCandidate = (index: number) => {
    if (candidates.length > 1) {
      setCandidates(candidates.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.description || !formData.location || !formData.province || !formData.startDateTime || !formData.endDateTime) {
      setError('All election fields are required')
      return
    }

    if (candidates.some(c => !c.name || !c.party)) {
      setError('All candidates must have name and party')
      return
    }

    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSuccess(true)

    setTimeout(() => {
      router.push('/admin')
    }, 2000)
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="py-12 flex flex-col items-center text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Election Created</h2>
            <p className="text-muted-foreground mb-6">Your election has been successfully created</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create New Election</h1>
        <p className="text-muted-foreground">Set up a new election with candidates and voting period</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Election details and scope</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Election Name</Label>
              <Input
                id="name"
                placeholder="e.g., Presidential Election 2024"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the election purpose and details"
                value={formData.description}
                onChange={(e) => handleFormChange('description', e.target.value)}
                disabled={isLoading}
                className="h-24"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(v) => handleFormChange('level', v)}>
                  <SelectTrigger id="level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="City">City</SelectItem>
                    <SelectItem value="Province">Province</SelectItem>
                    <SelectItem value="National">National</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City/Province name"
                  value={formData.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Input
                id="province"
                placeholder="Province"
                value={formData.province}
                onChange={(e) => handleFormChange('province', e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDateTime">Start Date & Time</Label>
                <Input
                  id="startDateTime"
                  type="datetime-local"
                  value={formData.startDateTime}
                  onChange={(e) => handleFormChange('startDateTime', e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDateTime">End Date & Time</Label>
                <Input
                  id="endDateTime"
                  type="datetime-local"
                  value={formData.endDateTime}
                  onChange={(e) => handleFormChange('endDateTime', e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates */}
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Candidates</CardTitle>
                <CardDescription>Add candidates running for this election</CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCandidate}
                className="gap-2"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4" />
                Add Candidate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {candidates.map((candidate, idx) => (
              <div key={idx} className="p-4 border border-border rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${idx}`} className="text-sm">Name</Label>
                    <Input
                      id={`name-${idx}`}
                      placeholder="Candidate name"
                      value={candidate.name}
                      onChange={(e) => handleCandidateChange(idx, 'name', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`party-${idx}`} className="text-sm">Party</Label>
                    <Input
                      id={`party-${idx}`}
                      placeholder="Political party"
                      value={candidate.party}
                      onChange={(e) => handleCandidateChange(idx, 'party', e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`desc-${idx}`} className="text-sm">Description</Label>
                  <Textarea
                    id={`desc-${idx}`}
                    placeholder="Brief description of candidate"
                    value={candidate.description}
                    onChange={(e) => handleCandidateChange(idx, 'description', e.target.value)}
                    disabled={isLoading}
                    className="h-20"
                  />
                </div>
                {candidates.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCandidate(idx)}
                    className="w-full gap-2 text-destructive hover:text-destructive"
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove Candidate
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-3">
          <Link href="/admin" className="flex-1">
            <Button variant="outline" className="w-full" disabled={isLoading}>
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Election'}
          </Button>
        </div>
      </form>
    </div>
  )
}
