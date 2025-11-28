'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Plus, BarChart3, Calendar, Users } from 'lucide-react'

type Election = {
  id: string
  name: string
  description: string
  level: string
  city: string | null
  province: string | null
  startTime: string
  endTime: string
  chainElectionId: bigint | null
  candidates: any[]
  _count?: {
    votes: number
  }
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

function getElectionStatus(startTime: string, endTime: string): string {
  const now = new Date()
  const start = new Date(startTime)
  const end = new Date(endTime)

  if (now < start) return 'upcoming'
  if (now >= start && now <= end) return 'active'
  return 'finished'
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

export default function AdminDashboard() {
  const [elections, setElections] = useState<Election[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchElections()
  }, [])

  const fetchElections = async () => {
    try {
      const response = await fetch('/api/admin/elections')
      const data = await response.json()

      if (data.success) {
        setElections(data.data)
      } else {
        setError(data.error || 'Failed to fetch elections')
      }
    } catch (err) {
      setError('Failed to fetch elections')
      console.error('Error fetching elections:', err)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { 
      label: 'Total Elections', 
      value: elections.length,
      icon: Calendar
    },
    { 
      label: 'Active Elections', 
      value: elections.filter(e => getElectionStatus(e.startTime, e.endTime) === 'active').length,
      icon: BarChart3
    },
    { 
      label: 'Total Votes Cast', 
      value: elections.reduce((sum, e) => sum + (e._count?.votes || 0), 0),
      icon: Users
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage elections and view voting statistics</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-sm">{stat.label}</CardDescription>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Create Button */}
      <div className="flex justify-end">
        <Link href="/admin/elections/new">
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Create New Election
          </Button>
        </Link>
      </div>

      {/* Elections Table */}
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Elections</CardTitle>
          <CardDescription>Manage all elections and view their status</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <p className="text-muted-foreground text-center py-8">Loading elections...</p>
          ) : error ? (
            <p className="text-red-500 text-center py-8">{error}</p>
          ) : elections.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No elections created yet</p>
          ) : (
            <div className="space-y-2">
              {elections.map((election) => {
                const status = getElectionStatus(election.startTime, election.endTime)
                const location = election.city || election.province || 'Nasional'
                
                return (
                  <div
                    key={election.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted transition-colors border border-border"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">{election.name}</h3>
                        {election.chainElectionId && (
                          <Badge className="bg-purple-100 text-purple-800 border-0 text-xs">
                            On-chain
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(election.startTime)} - {formatDate(election.endTime)}</span>
                        {election.chainElectionId && (
                          <span className="text-purple-600">• Chain ID: {election.chainElectionId.toString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <p className="font-medium text-foreground">{election.level}</p>
                        <p className="text-xs text-muted-foreground">{location}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium text-foreground">{election.candidates.length}</p>
                        <p className="text-xs text-muted-foreground">Candidates</p>
                      </div>
                      <Badge className={`${getStatusColor(status)} border-0 whitespace-nowrap capitalize`}>
                        {status}
                      </Badge>
                      <div className="flex gap-2">
                        <Link href={`/admin/elections/${election.id}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <span className="hidden sm:inline">Manage</span>
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
