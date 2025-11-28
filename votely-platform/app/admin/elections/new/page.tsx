'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import ElectionForm, { type ElectionFormData } from '@/components/admin/ElectionForm'

export default function CreateElectionPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (data: ElectionFormData) => {
    try {
      const response = await fetch('/api/admin/elections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        // Redirect to the newly created election's detail page
        router.push(`/admin/elections/${result.data.id}`)
      } else {
        throw new Error(result.error || 'Failed to create election')
      }
    } catch (err: any) {
      setError(err.message)
      throw err
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create New Election</h1>
        <p className="text-muted-foreground">Set up a new election with candidates</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <ElectionForm onSubmit={handleSubmit} submitLabel="Create Election" />
    </div>
  )
}
