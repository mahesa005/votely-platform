"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Camera } from 'lucide-react'

interface FaceScannerProps {
  onSuccess: () => void
  onSkip?: () => void
  title?: string
  description?: string
  nik?: string  // NIK for face verification against database
}

export function FaceScanner({ onSuccess, onSkip, title = 'Face Verification', description = 'Position your face in the center and hold still', nik }: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanned, setScanned] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [similarity, setSimilarity] = useState<number | null>(null)
  const [consecutiveSuccess, setConsecutiveSuccess] = useState(0)
  const verifyingRef = useRef(false)

  useEffect(() => {
    if (!scanning) return

    let mounted = true

    const startCamera = async () => {
      try {
        console.log('Requesting camera access...')
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        })
        
        console.log('Camera access granted, stream:', stream)
        console.log('videoRef.current:', videoRef.current)
        console.log('mounted:', mounted)
        
        if (videoRef.current && mounted) {
          console.log('Setting srcObject...')
          videoRef.current.srcObject = stream
          
          // Set ready immediately after setting srcObject
          // The autoPlay attribute will handle playing
          console.log('Scheduling camera ready in 500ms...')
          setTimeout(() => {
            console.log('setTimeout fired, mounted:', mounted)
            if (mounted) {
              console.log('Setting camera ready')
              setCameraReady(true)
            }
          }, 500)
        } else {
          console.log('Skipping srcObject - videoRef or mounted is false')
        }
      } catch (err) {
        console.error('Camera access error:', err)
        if (mounted) {
          setError('Unable to access camera. Please check permissions.')
          setScanning(false)
          setCameraReady(false)
        }
      }
    }

    startCamera()

    return () => {
      mounted = false
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
      setCameraReady(false)
    }
  }, [scanning])

  // Auto-verify every 500ms when camera is ready
  useEffect(() => {
    if (!cameraReady || scanned) return

    const interval = setInterval(async () => {
      // Skip if already verifying
      if (verifyingRef.current) return

      try {
        verifyingRef.current = true
        
        if (!videoRef.current || !canvasRef.current) {
          verifyingRef.current = false
          return
        }

        const canvas = canvasRef.current
        const video = videoRef.current
        const context = canvas.getContext('2d')

        if (!context) {
          verifyingRef.current = false
          return
        }

        // Capture frame from video
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = canvas.toDataURL('image/jpeg', 0.95) // High quality 95%

        // Send to backend API with NIK
        const response = await fetch('/api/face-verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData, nik })
        })

        if (!response.ok) {
          throw new Error('Verification failed')
        }

        const result = await response.json()
        const currentSimilarity = result.similarity

        setSimilarity(currentSimilarity)

        // Check if similarity meets threshold
        if (currentSimilarity >= 0.55) {
          setConsecutiveSuccess(prev => prev + 1)
          
          // Auto-verify after 3 consecutive successful frames
          if (consecutiveSuccess >= 2) { // Will be 3 after this increment
            // Stop camera immediately when verified
            if (videoRef.current?.srcObject) {
              const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
              tracks.forEach(track => track.stop())
              videoRef.current.srcObject = null
            }
            setScanned(true)
            setVerifying(false)
            setScanning(false)
            setCameraReady(false)
            onSuccess()
          }
        } else {
          setConsecutiveSuccess(0)
        }

        verifyingRef.current = false
        
      } catch (err) {
        console.error('Verification error:', err)
        verifyingRef.current = false
        // Don't set error for individual frame failures
      }
    }, 500) // Send frame every 500ms (2 fps)

    return () => clearInterval(interval)
  }, [cameraReady, scanned, consecutiveSuccess, onSuccess])

  const handleStartScan = () => {
    setError('')
    setScanning(true)
  }

  // Get status message based on similarity
  const getStatusMessage = () => {
    if (similarity === null) return 'Scanning...'
    if (similarity >= 0.55) return 'Almost there...'
    if (similarity >= 0.40) return 'Adjust position'
    return 'Move closer to camera'
  }

  // Get color indicator based on similarity
  const getColorClass = () => {
    if (similarity === null) return 'text-gray-400'
    if (similarity >= 0.55) return 'text-green-500'
    if (similarity >= 0.40) return 'text-yellow-500'
    return 'text-red-500'
  }

  if (scanned) {
    return (
      <Card className="w-full">
        <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Face Verified</h3>
          <p className="text-sm text-muted-foreground">Your identity has been verified successfully</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b border-border bg-secondary/50">
        <CardTitle className="text-lg flex items-center gap-2">
          <Camera className="w-5 h-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {scanning ? (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto mb-3"></div>
                    <p className="text-sm text-white">Initializing camera...</p>
                  </div>
                </div>
              )}
              {cameraReady && (
                <>
                  {/* Status overlay */}
                  <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                    <div className="inline-block bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                      {consecutiveSuccess > 0 && (
                        <p className="text-xs text-green-400 font-sans antialiased">
                          {consecutiveSuccess}/3 frames verified
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" width={1280} height={720} />
            {cameraReady && (
              <p className="text-xs text-muted-foreground text-center">
                Hold still while we verify your identity...
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleStartScan} className="w-full bg-primary hover:bg-primary/90 h-10">
              Start Face Scan
            </Button>
            {onSkip && (
              <Button onClick={onSkip} variant="outline" className="w-full h-10">
                Continue Without Verification
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
