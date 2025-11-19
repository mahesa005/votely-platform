'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockElections } from '@/lib/mock-data'
import { ArrowRight, Plus, BarChart3, Calendar } from 'lucide-react'

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

export default function AdminDashboard() {
  const [elections] = useState(mockElections)

  const stats = [
    { label: 'Total Elections', value: elections.length },
    { label: 'Active Elections', value: elections.filter(e => e.status === 'Active').length },
    { label: 'Finished Elections', value: elections.filter(e => e.status === 'Finished').length },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage elections and view voting statistics</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-gradient-to-br from-secondary to-card">
            <CardHeader className="pb-2">
              <CardDescription className="text-sm">{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
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
          {elections.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No elections created yet</p>
          ) : (
            <div className="space-y-2">
              {elections.map((election) => (
                <div
                  key={election.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted transition-colors border border-border"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{election.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{election.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm">
                      <p className="font-medium text-foreground">{election.level}</p>
                      <p className="text-xs text-muted-foreground">{election.location}</p>
                    </div>
                    <Badge className={`${getStatusColor(election.status)} border-0 whitespace-nowrap`}>
                      {election.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Link href={`/admin/elections/${election.id}`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <span className="hidden sm:inline">View</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                      <Link href={`/admin/elections/${election.id}/stats`}>
                        <Button variant="outline" size="sm" className="gap-1">
                          <BarChart3 className="w-3 h-3" />
                          <span className="hidden sm:inline">Stats</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
