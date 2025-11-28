'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowLeft, Calendar, MapPin, Plus, Trash2, Users } from 'lucide-react'

type Election = {
  id: string
  name: string
  description: string
  level: string
  city: string | null
  province: string | null
  startTime: string
  endTime: string
  candidates: Candidate[]
  _count?: {
    votes: number
  }
}

type Candidate = {
  id: string
  name: string
  party: string
  description: string | null
  photoUrl: string | null
  orderIndex: number
}

function getElectionStatus(startTime: string, endTime: string): string {
  const now = new Date()
  const start = new Date(startTime)
  const end = new Date(endTime)

  if (now < start) return 'upcoming'
  if (now >= start && now <= end) return 'active'
  return 'finished'
}

function getStatusColor(status: string) {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'finished':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateString
  }
}

export default function AdminElectionDetailPage({ params }: { params: Promise<{ electionsId: string }> }) {
  const router = useRouter()
  const [electionId, setElectionId] = useState('')
  const [election, setElection] = useState<Election | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddCandidate, setShowAddCandidate] = useState(false)
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    party: '',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [showEditElection, setShowEditElection] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    level: '',
    province: '',
    city: '',
    startTime: '',
    endTime: '',
  })

  useEffect(() => {
    params.then(p => {
      setElectionId(p.electionsId)
      fetchElection(p.electionsId)
    })
  }, [])

  const fetchElection = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/elections/${id}`)
      const data = await response.json()

      if (data.success) {
        setElection(data.data)
        // Populate edit form
        const election = data.data
        setEditForm({
          name: election.name,
          description: election.description,
          level: election.level,
          province: election.province || '',
          city: election.city || '',
          startTime: election.startTime.slice(0, 16), // Format for datetime-local
          endTime: election.endTime.slice(0, 16),
        })
      } else {
        setError(data.error || 'Failed to fetch election')
      }
    } catch (err) {
      setError('Failed to fetch election')
      console.error('Error fetching election:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!candidateForm.name || !candidateForm.party) {
      alert('Name and party are required')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`/api/admin/elections/${electionId}/candidates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateForm),
      })

      const data = await response.json()

      if (data.success) {
        setShowAddCandidate(false)
        setCandidateForm({ name: '', party: '', description: '' })
        fetchElection(electionId)
      } else {
        alert(data.error || 'Failed to add candidate')
      }
    } catch (err) {
      alert('Failed to add candidate')
      console.error('Error adding candidate:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteCandidate = async (candidateId: string) => {
    if (!confirm('Are you sure you want to delete this candidate?')) {
      return
    }

    try {
      const response = await fetch(
        `/api/admin/elections/${electionId}/candidates?candidateId=${candidateId}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (data.success) {
        fetchElection(electionId)
      } else {
        alert(data.error || 'Failed to delete candidate')
      }
    } catch (err) {
      alert('Failed to delete candidate')
      console.error('Error deleting candidate:', err)
    }
  }

  const handleEditElection = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editForm.name || !editForm.description || !editForm.startTime || !editForm.endTime) {
      alert('All fields are required')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`/api/admin/elections/${electionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          level: editForm.level,
          province: editForm.province || null,
          city: editForm.city || null,
          startTime: editForm.startTime,
          endTime: editForm.endTime,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setShowEditElection(false)
        fetchElection(electionId)
      } else {
        alert(data.error || 'Failed to update election')
      }
    } catch (err) {
      alert('Failed to update election')
      console.error('Error updating election:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteElection = async () => {
    if (!confirm('Are you sure you want to delete this election? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/elections/${electionId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin')
      } else {
        alert(data.error || 'Failed to delete election')
      }
    } catch (err) {
      alert('Failed to delete election')
      console.error('Error deleting election:', err)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (error || !election) {
    return (
      <div className="space-y-6">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-red-500">{error || 'Election not found'}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const status = getElectionStatus(election.startTime, election.endTime)
  const location = election.city || election.province || 'Nasional'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 text-red-600 hover:text-red-700"
          onClick={handleDeleteElection}
        >
          <Trash2 className="w-4 h-4" />
          Delete Election
        </Button>
      </div>

      {/* Election Info */}
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle>{election.name}</CardTitle>
              <CardDescription className="mt-1">{election.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(status)} border-0 capitalize`}>
                {status}
              </Badge>
              <Dialog open={showEditElection} onOpenChange={setShowEditElection}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Election</DialogTitle>
                    <DialogDescription>
                      Update election details, schedule, and location
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEditElection} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Election Name *</Label>
                      <Input
                        id="edit-name"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Description *</Label>
                      <Textarea
                        id="edit-description"
                        value={editForm.description}
                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-level">Level *</Label>
                        <Input
                          id="edit-level"
                          value={editForm.level}
                          onChange={(e) => setEditForm(prev => ({ ...prev, level: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-province">Province</Label>
                        <Input
                          id="edit-province"
                          value={editForm.province}
                          onChange={(e) => setEditForm(prev => ({ ...prev, province: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-city">City/Regency</Label>
                      <Input
                        id="edit-city"
                        value={editForm.city}
                        onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-startTime">Start Time *</Label>
                        <Input
                          id="edit-startTime"
                          type="datetime-local"
                          value={editForm.startTime}
                          onChange={(e) => setEditForm(prev => ({ ...prev, startTime: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-endTime">End Time *</Label>
                        <Input
                          id="edit-endTime"
                          type="datetime-local"
                          value={editForm.endTime}
                          onChange={(e) => setEditForm(prev => ({ ...prev, endTime: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowEditElection(false)}
                        disabled={submitting}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{election.level} - {location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{formatDate(election.startTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 shrink-0" />
              <span>{election._count?.votes || 0} votes cast</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Voting Period</p>
            <p className="text-foreground mt-1">{formatDate(election.startTime)} - {formatDate(election.endTime)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Candidates */}
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Candidates</CardTitle>
              <CardDescription>Manage candidates for this election</CardDescription>
            </div>
            <Dialog open={showAddCandidate} onOpenChange={setShowAddCandidate}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Candidate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Candidate</DialogTitle>
                  <DialogDescription>
                    Add a candidate to this election
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCandidate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Candidate Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      value={candidateForm.name}
                      onChange={(e) => setCandidateForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="party">Party *</Label>
                    <Input
                      id="party"
                      placeholder="e.g. Democratic Party"
                      value={candidateForm.party}
                      onChange={(e) => setCandidateForm(prev => ({ ...prev, party: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the candidate"
                      value={candidateForm.description}
                      onChange={(e) => setCandidateForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddCandidate(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Adding...' : 'Add Candidate'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {election.candidates.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No candidates added yet</p>
          ) : (
            <div className="space-y-3">
              {election.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">{candidate.party}</p>
                    {candidate.description && (
                      <p className="text-sm text-muted-foreground mt-1">{candidate.description}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteCandidate(candidate.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
