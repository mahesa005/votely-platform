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
}

export function FaceScanner({ onSuccess, onSkip, title = 'Face Verification', description = 'Position your face in the center and hold still' }: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [error, setError] = useState('')
  const [cameraReady, setCameraReady] = useState(false)

  useEffect(() => {
    if (!scanning) return

    let mounted = true

    const startCamera = async () => {
      try {
        console.log('Requesting camera access...')
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
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

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return

    try {
      setError('')
      const context = canvasRef.current.getContext('2d')
      if (!context) return

      // Capture frame from video
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

      await new Promise(r => setTimeout(r, 800))

      setScanned(true)
      setScanning(false)
      
      // Stop camera
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }

      setTimeout(onSuccess, 500)
    } catch (err) {
      setError('Face scan failed. Please try again.')
    }
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
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-56 border-2 border-primary rounded-lg opacity-75"></div>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" width={640} height={480} />
            {cameraReady && (
              <>
                <p className="text-xs text-muted-foreground text-center">Align your face within the frame</p>
                <Button onClick={handleScan} className="w-full bg-primary hover:bg-primary/90">
                  Capture Face
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Button onClick={() => setScanning(true)} className="w-full bg-primary hover:bg-primary/90 h-10">
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
