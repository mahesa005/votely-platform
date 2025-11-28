"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Camera } from 'lucide-react'

interface FaceScannerProps {
  onSuccess?: () => void
  onSuccessWithEmbedding?: (embedding: number[]) => void  // For register mode - returns embedding
  onSkip?: () => void
  title?: string
  description?: string
  nik?: string  // NIK for face verification against database
  mode?: 'verify' | 'register'  // 'verify' = compare with existing, 'register' = capture embedding only
}

export function FaceScanner({ 
  onSuccess, 
  onSuccessWithEmbedding,
  onSkip, 
  title = 'Face Verification', 
  description = 'Position your face in the center and hold still', 
  nik,
  mode = 'verify'
}: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanned, setScanned] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [similarity, setSimilarity] = useState<number | null>(null)
  const [consecutiveSuccess, setConsecutiveSuccess] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
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
        
        if (videoRef.current && mounted) {
          console.log('Setting srcObject...')
          videoRef.current.srcObject = stream
          
          setTimeout(() => {
            if (mounted) {
              console.log('Setting camera ready')
              setCameraReady(true)
            }
          }, 500)
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

  // Auto-verify/register every 500ms when camera is ready
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
        const imageData = canvas.toDataURL('image/jpeg', 0.95)

        if (mode === 'register') {
          // Registration mode: Generate embedding only (don't save to DB yet)
          setStatusMessage('Detecting face...')
          
          const response = await fetch('/api/face-verify/generate-embedding', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData })
          })

          const result = await response.json()

          if (!response.ok || !result.success) {
            const errorMsg = result.error || 'Face detection failed'
            if (errorMsg.includes('No face detected') || errorMsg.includes('face')) {
              setStatusMessage('No face detected - adjust position')
            } else {
              setStatusMessage(`Error: ${errorMsg}`)
              console.error('Face capture error:', result)
            }
            verifyingRef.current = false
            return
          }

          if (result.success && result.embedding) {
            // Stop camera immediately when face captured
            if (videoRef.current?.srcObject) {
              const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
              tracks.forEach(track => track.stop())
              videoRef.current.srcObject = null
            }
            setStatusMessage('Face captured!')
            setScanned(true)
            setVerifying(false)
            setScanning(false)
            setCameraReady(false)
            
            // Return embedding to parent
            if (onSuccessWithEmbedding) {
              onSuccessWithEmbedding(result.embedding)
            } else if (onSuccess) {
              onSuccess()
            }
          }
        } else {
          // Verification mode: Compare with existing embedding
          const response = await fetch('/api/face-verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData, nik })
          })

          if (!response.ok) {
            const result = await response.json()
            if (result.error?.includes('No face embedding found')) {
              setStatusMessage('Face not registered yet')
              verifyingRef.current = false
              return
            }
            throw new Error('Verification failed')
          }

          const result = await response.json()
          
          if (!result.face_detected) {
            setStatusMessage('No face detected - adjust position')
            setConsecutiveSuccess(0)
            verifyingRef.current = false
            return
          }

          const currentSimilarity = result.similarity
          setSimilarity(currentSimilarity)

          // Check if similarity meets threshold
          if (currentSimilarity >= 0.55) {
            setStatusMessage('Almost there...')
            setConsecutiveSuccess(prev => prev + 1)
            
            // Auto-verify after 3 consecutive successful frames
            if (consecutiveSuccess >= 2) {
              if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
                tracks.forEach(track => track.stop())
                videoRef.current.srcObject = null
              }
              setScanned(true)
              setVerifying(false)
              setScanning(false)
              setCameraReady(false)
              if (onSuccess) onSuccess()
            }
          } else if (currentSimilarity >= 0.40) {
            setStatusMessage('Adjust position')
            setConsecutiveSuccess(0)
          } else {
            setStatusMessage('Move closer to camera')
            setConsecutiveSuccess(0)
          }
        }

        verifyingRef.current = false
        
      } catch (err) {
        console.error('Face scan error:', err)
        setStatusMessage('Error - retrying...')
        verifyingRef.current = false
      }
    }, 500)

    return () => clearInterval(interval)
  }, [cameraReady, scanned, consecutiveSuccess, onSuccess, mode, nik])

  const handleStartScan = () => {
    setError('')
    setStatusMessage('')
    setScanning(true)
  }

  if (scanned) {
    return (
      <Card className="w-full">
        <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {mode === 'register' ? 'Face Registered' : 'Face Verified'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {mode === 'register' 
              ? 'Your face has been registered successfully' 
              : 'Your identity has been verified successfully'}
          </p>
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
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <div className="inline-block bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                    {statusMessage && (
                      <p className={`text-xs font-sans antialiased ${
                        statusMessage.includes('Almost') || statusMessage.includes('registered') || statusMessage.includes('Verified')
                          ? 'text-green-400' 
                          : statusMessage.includes('Error') 
                            ? 'text-red-400'
                            : 'text-yellow-400'
                      }`}>
                        {statusMessage}
                      </p>
                    )}
                    {mode === 'verify' && consecutiveSuccess > 0 && (
                      <p className="text-xs text-green-400 font-sans antialiased">
                        {consecutiveSuccess}/3 frames verified
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" width={1280} height={720} />
            {cameraReady && (
              <p className="text-xs text-muted-foreground text-center">
                {mode === 'register' 
                  ? 'Hold still while we capture your face...' 
                  : 'Hold still while we verify your identity...'}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Button onClick={handleStartScan} className="w-full bg-primary hover:bg-primary/90 h-10">
              {mode === 'register' ? 'Start Face Registration' : 'Start Face Scan'}
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
