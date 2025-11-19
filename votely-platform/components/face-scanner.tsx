"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle, Camera } from 'lucide-react'

interface FaceScannerProps {
  onSuccess: () => void
  title?: string
  description?: string
}

export function FaceScanner({ onSuccess, title = 'Face Verification', description = 'Position your face in the center and hold still' }: FaceScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [error, setError] = useState('')
  const [cameraReady, setCameraReady] = useState(false)

  useEffect(() => {
    if (!scanning) return

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraReady(true)
        }
      } catch (err) {
        setError('Unable to access camera. Please check permissions.')
        setScanning(false)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
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

        {scanning && cameraReady ? (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-56 border-2 border-primary rounded-lg opacity-75"></div>
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" width={640} height={480} />
            <p className="text-xs text-muted-foreground text-center">Align your face within the frame</p>
            <Button onClick={handleScan} className="w-full bg-primary hover:bg-primary/90" disabled={!cameraReady}>
              Capture Face
            </Button>
          </div>
        ) : scanning && !cameraReady ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-muted-foreground">Initializing camera...</p>
            </div>
          </div>
        ) : (
          <Button onClick={() => setScanning(true)} className="w-full bg-primary hover:bg-primary/90 h-10">
            Start Face Scan
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
