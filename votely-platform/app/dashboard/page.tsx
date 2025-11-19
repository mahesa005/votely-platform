'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import { mockElections } from '@/lib/mock-data'
import { Calendar, MapPin, ChevronRight } from 'lucide-react'

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

export default function DashboardPage() {
  const [elections] = useState(mockElections)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Elections</h1>
        <p className="text-muted-foreground">View and participate in upcoming and active elections in your region</p>
      </div>

      {elections.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No elections available at this time</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {elections.map((election) => (
            <Card key={election.id} className="hover:shadow-md transition-shadow flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-2">{election.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">{election.level} Level</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(election.status)} border-0 whitespace-nowrap`}>
                    {election.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between pb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{election.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{election.date}</span>
                  </div>
                </div>
                <Link href={`/elections/${election.id}`} className="mt-4">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
