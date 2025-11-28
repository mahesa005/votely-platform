# Face Recognition API Server

Flask API server yang menyediakan endpoint untuk face verification real-time.

## Setup

1. **Install dependencies:**
```bash
pip install -r api_requirements.txt
```

2. **Pastikan embedding sudah di-generate:**
```bash
# Jika belum, jalankan:
python generate_embedding.py
```

3. **Jalankan server:**
```bash
python api_server.py
```

Server akan running di `http://localhost:5000`

## Endpoints

### `POST /verify-face`
Verify wajah dari base64 image

**Request:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response:**
```json
{
  "similarity": 0.78,
  "message": "Success",
  "face_detected": true,
  "face_location": {
    "x": 200,
    "y": 150,
    "w": 300,
    "h": 300
  }
}
```

### `GET /health`
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Face recognition API is running",
  "embedding_loaded": true,
  "embedding_dimension": 512
}
```

## Architecture

```
Browser (React/Next.js)
    ↓ (setiap 500ms kirim frame)
Next.js API (/api/face-verify)
    ↓ (forward ke Python)
Flask API Server (:5000)
    ↓
Face Recognition Logic
    - Detect face (OpenCV)
    - Align face
    - Generate embedding (FaceNet)
    - Compare dengan reference embedding
    - Return similarity score
```

## Testing

Test API directly:
```bash
curl http://localhost:5000/health
```

## Troubleshooting

**Error: No module named 'flask'**
```bash
pip install -r api_requirements.txt
```

**Error: Embedding file not found**
```bash
python generate_embedding.py
```

**Error: Port 5000 already in use**
- Windows: Matikan proses di port 5000
- Atau ubah port di `api_server.py` line terakhir
