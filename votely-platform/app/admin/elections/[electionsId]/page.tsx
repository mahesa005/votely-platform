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
import { ArrowLeft, Calendar, MapPin, Plus, Trash2, Users, Upload, Loader2, BarChart3, RefreshCw, Lock, AlertTriangle, X } from 'lucide-react'
import Image from 'next/image'

type Election = {
  id: string
  name: string
  description: string
  level: string
  city: string | null
  province: string | null
  startTime: string
  endTime: string
  chainElectionId: string | null
  deletedAt: string | null
  candidates: Candidate[]
  totalVotes?: number
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
  chainCandidateId: string | null
  voteCount?: number
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
    photoUrl: '',
  })
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const [deployingCandidates, setDeployingCandidates] = useState(false)
  const [refreshingResults, setRefreshingResults] = useState(false)
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

  const fetchElection = async (id: string, showRefreshLoader = false) => {
    if (showRefreshLoader) setRefreshingResults(true)
    try {
      const response = await fetch(`/api/admin/elections/${id}?includeResults=true`)
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
      setRefreshingResults(false)
    }
  }

  const handleRefreshResults = () => {
    if (electionId) {
      fetchElection(electionId, true)
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
        setCandidateForm({ name: '', party: '', description: '', photoUrl: '' })
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

  // Deploy election to blockchain (includes existing candidates)
  const handleDeployBlockchain = async () => {
    if (!election) return

    if (election.candidates.length === 0) {
      if (!confirm('No candidates added yet. Deploy election without candidates? You can deploy candidates later.')) {
        return
      }
    }

    setDeploying(true)
    try {
      const response = await fetch('/api/admin/elections/deploy-blockchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ electionId: election.id }),
      })

      const data = await response.json()

      if (data.success) {
        alert(`Election deployed to blockchain!\n\nChain Election ID: ${data.data.chainElectionId}\nCandidates deployed: ${data.data.candidatesDeployed}\nTx: ${data.data.transactionHash}`)
        fetchElection(electionId)
      } else {
        alert(data.error || 'Failed to deploy to blockchain')
      }
    } catch (err) {
      alert('Failed to deploy to blockchain')
      console.error('Error deploying:', err)
    } finally {
      setDeploying(false)
    }
  }

  // Deploy new candidates to already deployed election
  const handleDeployCandidates = async () => {
    if (!election) return

    const undeployedCount = election.candidates.filter(c => !c.chainCandidateId).length
    if (undeployedCount === 0) {
      alert('All candidates are already deployed to blockchain')
      return
    }

    if (!confirm(`Deploy ${undeployedCount} candidate(s) to blockchain?`)) {
      return
    }

    setDeployingCandidates(true)
    try {
      const response = await fetch('/api/admin/elections/deploy-candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ electionId: election.id }),
      })

      const data = await response.json()

      if (data.success) {
        alert(`Candidates deployed!\n\n${data.data.candidatesDeployed} candidate(s) deployed to blockchain.`)
        fetchElection(electionId)
      } else {
        alert(data.error || 'Failed to deploy candidates')
      }
    } catch (err) {
      alert('Failed to deploy candidates')
      console.error('Error deploying candidates:', err)
    } finally {
      setDeployingCandidates(false)
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
        <Link 
          href="/admin"
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
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
  
  // Determine what actions are allowed based on status
  const isDeployed = !!election.chainElectionId
  const isDeleted = !!election.deletedAt
  const canEdit = !isDeployed && !isDeleted && status === 'upcoming'
  const canAddCandidates = !isDeleted && status === 'upcoming'
  const canDeleteCandidates = !isDeployed && !isDeleted && status === 'upcoming'
  const canDelete = !isDeleted && status !== 'active'
  const canDeploy = !isDeployed && !isDeleted && status === 'upcoming'

  return (
    <div className="space-y-6">
      {/* Deleted Banner */}
      {isDeleted && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <div>
            <p className="font-medium text-red-800">This election has been deleted</p>
            <p className="text-sm text-red-600">It is no longer visible to voters but data is preserved.</p>
          </div>
        </div>
      )}

      {/* Locked Banner */}
      {isDeployed && !isDeleted && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
          <Lock className="w-5 h-5 text-amber-600" />
          <div>
            <p className="font-medium text-amber-800">Election is locked (deployed to blockchain)</p>
            <p className="text-sm text-amber-600">
              {status === 'upcoming' 
                ? 'You can only add candidates until voting starts.' 
                : status === 'active'
                ? 'Voting is in progress. No changes allowed.'
                : 'Voting has ended. You can only soft delete this election.'}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin"
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        {canDelete && (
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 text-red-600 hover:text-red-700"
            onClick={handleDeleteElection}
          >
            <Trash2 className="w-4 h-4" />
            Delete Election
          </Button>
        )}
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
              {isDeleted && (
                <Badge className="bg-red-100 text-red-800 border-0">
                  Deleted
                </Badge>
              )}
              {election.chainElectionId ? (
                <Badge className="bg-purple-100 text-purple-800 border-0">
                  On-chain #{election.chainElectionId}
                </Badge>
              ) : canDeploy ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleDeployBlockchain}
                  disabled={deploying}
                >
                  {deploying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Deploy to Blockchain
                    </>
                  )}
                </Button>
              ) : null}
              {canEdit && (
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
              )}
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
              <span>{election.totalVotes || election._count?.votes || 0} votes cast</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Voting Period</p>
            <p className="text-foreground mt-1">{formatDate(election.startTime)} - {formatDate(election.endTime)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Voting Results */}
      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <div>
                <CardTitle>Voting Results</CardTitle>
                <CardDescription>Live vote distribution</CardDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshResults}
              disabled={refreshingResults}
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshingResults ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {(election.totalVotes || 0) === 0 ? (
            <p className="text-muted-foreground text-center py-8">No votes yet</p>
          ) : (
            <div className="space-y-4">
              {election.candidates
                .sort((a, b) => (b.voteCount || 0) - (a.voteCount || 0))
                .map((candidate, index) => {
                  const voteCount = candidate.voteCount || 0
                  const totalVotes = election.totalVotes || 0
                  const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0

                  return (
                    <div key={candidate.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {index === 0 && totalVotes > 0 && (
                            <Badge className="bg-yellow-100 text-yellow-800 border-0">Leading</Badge>
                          )}
                          <span className="font-medium">{candidate.name}</span>
                          <span className="text-sm text-muted-foreground">({candidate.party})</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">{percentage.toFixed(1)}%</span>
                          <span className="text-sm text-muted-foreground ml-2">({voteCount} votes)</span>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          )}
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
            <div className="flex items-center gap-2">
              {/* Deploy Candidates button - only show if election is deployed but has undeployed candidates */}
              {election.chainElectionId && election.candidates.some(c => !c.chainCandidateId) && canAddCandidates && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleDeployCandidates}
                  disabled={deployingCandidates}
                >
                  {deployingCandidates ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deploying...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Deploy Candidates ({election.candidates.filter(c => !c.chainCandidateId).length})
                    </>
                  )}
                </Button>
              )}
              {canAddCandidates && (
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
                    <div className="space-y-2">
                      <Label>Photo</Label>
                      {candidateForm.photoUrl ? (
                        <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                          <Image
                            src={candidateForm.photoUrl}
                            alt={candidateForm.name || 'Candidate'}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => setCandidateForm(prev => ({ ...prev, photoUrl: '' }))}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Input
                            id="candidate-photo"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                setUploadingPhoto(true)
                                try {
                                  const formData = new FormData()
                                  formData.append('file', file)
                                  const response = await fetch('/api/upload/candidate-photo', {
                                    method: 'POST',
                                    body: formData,
                                  })
                                  const result = await response.json()
                                  if (result.success) {
                                    setCandidateForm(prev => ({ ...prev, photoUrl: result.data.url }))
                                  } else {
                                    alert(result.error || 'Upload failed')
                                  }
                                } catch (err) {
                                  alert('Failed to upload photo')
                                } finally {
                                  setUploadingPhoto(false)
                                }
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('candidate-photo')?.click()}
                            className="gap-2"
                            disabled={uploadingPhoto}
                          >
                            {uploadingPhoto ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                Upload Photo
                              </>
                            )}
                          </Button>
                          <span className="text-xs text-muted-foreground">Max 5MB</span>
                        </div>
                      )}
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
              )}
              {!canAddCandidates && (
                <Badge className="bg-gray-100 text-gray-600 border-0 gap-1">
                  <Lock className="w-3 h-3" />
                  {status === 'active' ? 'Voting in progress' : status === 'finished' ? 'Election ended' : 'Deleted'}
                </Badge>
              )}
            </div>
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
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  {candidate.photoUrl && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={candidate.photoUrl}
                        alt={candidate.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{candidate.name}</h3>
                      {candidate.chainCandidateId ? (
                        <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                          On-chain #{candidate.chainCandidateId}
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 border-0 text-xs">
                          Not deployed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{candidate.party}</p>
                    {candidate.description && (
                      <p className="text-sm text-muted-foreground mt-1">{candidate.description}</p>
                    )}
                  </div>
                  {canDeleteCandidates && !candidate.chainCandidateId && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteCandidate(candidate.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
