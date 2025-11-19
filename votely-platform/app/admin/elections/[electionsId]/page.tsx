'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockElections, mockCandidates } from '@/lib/mock-data'
import { ArrowRight, Calendar, MapPin } from 'lucide-react'

function getStatusColor(status: string) {
  switch (status) {
    case 'Upcoming':
      return 'bg-blue-100 text-blue-800'
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Finished':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function AdminElectionDetailPage() {
  const params = useParams()
  const election = mockElections.find(e => e.id === params.electionId as string)
  const candidates = mockCandidates[election?.id || ''] || []

  if (!election) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Election not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{election.name}</h1>
            <p className="text-muted-foreground">{election.description}</p>
          </div>
          <Badge className={`${getStatusColor(election.status)} border-0`}>
            {election.status}
          </Badge>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{election.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{election.date}</span>
          </div>
        </div>
      </div>

      {/* Blockchain ID */}
      <Card className="bg-secondary/50">
        <CardHeader>
          <CardTitle className="text-base">Blockchain Election ID</CardTitle>
          <CardDescription>For future blockchain verification</CardDescription>
        </CardHeader>
        <CardContent>
          <code className="text-xs bg-card px-3 py-2 rounded-md font-mono text-foreground break-all">
            0x{election.id.padEnd(64, '0')}
          </code>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Election details and setup</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Election Name</p>
              <p className="text-foreground mt-1">{election.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Level</p>
              <p className="text-foreground mt-1">{election.level}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Location</p>
              <p className="text-foreground mt-1">{election.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p className="text-foreground mt-1">{election.date}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-foreground mt-1">{election.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Candidates */}
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Candidates</CardTitle>
          <CardDescription>{candidates.length} candidates running</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.party}</p>
                  <p className="text-sm text-foreground mt-2">{candidate.description}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats Link */}
      <Link href={`/admin/elections/${election.id}/stats`}>
        <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
          View Statistics
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  )
}
