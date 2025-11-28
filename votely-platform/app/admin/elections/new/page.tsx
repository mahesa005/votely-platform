'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import ElectionForm, { type ElectionFormData } from '@/components/admin/ElectionForm'

export default function CreateElectionPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [progress, setProgress] = useState('')
  const [success, setSuccess] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)

  const handleSubmit = async (data: ElectionFormData) => {
    setIsDeploying(true)
    setError('')
    setSuccess('')
    
    try {
      // Use atomic API - creates database AND blockchain in one call
      // If blockchain fails, nothing is saved to database
      setProgress('Creating election and deploying to blockchain...')
      
      const response = await fetch('/api/admin/elections/create-and-deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to create election')
      }

      const electionId = result.data.id

      setProgress('')
      setSuccess(`Election created and deployed successfully! Tx: ${result.blockchain?.transactionHash?.slice(0, 10)}...`)
      
      // Redirect to the newly created election's detail page
      setTimeout(() => {
        router.push(`/admin/elections/${electionId}`)
      }, 2000)
      
    } catch (err: any) {
      setProgress('')
      setError(err.message + '. No data was saved to database.')
      setIsDeploying(false)
      throw err
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="gap-2" disabled={isDeploying}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create New Election</h1>
        <p className="text-muted-foreground">Set up a new election and deploy to blockchain</p>
      </div>

      {progress && (
        <Alert className="bg-blue-50 border-blue-200">
          <Loader2 className="w-4 h-4 animate-spin" />
          <AlertDescription className="ml-2 text-blue-800">{progress}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <AlertDescription className="ml-2 text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert className="bg-red-50 border-red-200">
          <XCircle className="w-4 h-4 text-red-600" />
          <AlertDescription className="ml-2 text-red-600">{error}</AlertDescription>
        </Alert>
      )}

      <ElectionForm 
        onSubmit={handleSubmit} 
        submitLabel={isDeploying ? "Deploying..." : "Create & Deploy Election"}
      />
    </div>
  )
}
