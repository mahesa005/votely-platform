# Face Recognition Module - Minimal Testing Version

Modul Face Recognition lokal untuk testing similarity dengan foto reference.

## 🎯 Fitur

- **Face Detection**: MediaPipe Face Detection
- **Face Alignment**: Automatic face cropping, rotation, dan normalization  
- **Embedding Generation**: ArcFace (512-dim vector)
- **Similarity Calculation**: Cosine similarity dengan threshold verification
- **Local Processing**: Tidak memerlukan API atau server eksternal

## 📦 Instalasi

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Download model weights (otomatis saat pertama kali dijalankan)

## 🏗️ Struktur Module

```
face-recognition/
├── config.py                      # Konfigurasi
├── face_detector.py               # Deteksi wajah (MediaPipe)
├── face_aligner.py                # Alignment wajah
├── face_embedder.py               # Generate embedding (ArcFace)
├── similarity_calculator.py       # Hitung similarity (Cosine)
├── test_wete.py                   # ⭐ Main testing file (hardcoded)
├── requirements.txt               # Dependencies
├── data/                          # Folder untuk foto reference
│   ├── wete.jpg                   # Foto reference
│   └── embeddings/                # Cache embeddings (auto-generated)
└── .venv/                         # Virtual environment
```

## 🚀 Cara Penggunaan

### Step 1: Pastikan Foto Reference Ada
```bash
# Letakkan foto Anda di: data/wete.jpg
# Program sudah hardcoded untuk load foto ini
```

### Step 2: Jalankan Testing
```bash
.venv\Scripts\python.exe test_wete.py
```

### Step 3: Lihat Hasil
Program akan:
1. Load `data/wete.jpg`
2. Detect & extract face dari foto
3. Generate embedding (512-dim vector)
4. Start webcam
5. Real-time compare wajah Anda di webcam dengan foto reference
6. Display hasil:
   - **VERIFIED** (hijau) → similarity ≥ 0.80
   - **BORDERLINE** (orange) → similarity 0.70-0.80
   - **REJECTED** (merah) → similarity < 0.70

Tekan `q` untuk quit.

## 💻 Cara Kerja Internal

```python
# 1. Load reference photo
ref_image = cv2.imread("data/wete.jpg")

# 2. Detect face
detector = FaceDetector("mediapipe")
bbox = detector.get_largest_face(ref_image)  # (x, y, w, h)

# 3. Align face
aligner = FaceAligner()
aligned = aligner.align_face(ref_image, bbox)  # 112x112 normalized

# 4. Generate embedding
embedder = FaceEmbedder("ArcFace")
ref_embedding = embedder.get_embedding(aligned)  # 512-dim vector

# 5. Compare with webcam (loop)
webcam_embedding = embedder.get_embedding(webcam_aligned)
similarity = cosine_similarity(ref_embedding, webcam_embedding)

# 6. Threshold check
if similarity >= 0.80:
    status = "VERIFIED"  # Match!
elif similarity >= 0.70:
    status = "BORDERLINE"
else:
    status = "REJECTED"
```

## ⚙️ Konfigurasi

Edit `config.py` untuk mengubah parameter:

```python
# Face Detection
FACE_DETECTION_BACKEND = "mediapipe"
MIN_DETECTION_CONFIDENCE = 0.7

# Face Alignment
FACE_SIZE = (112, 112)

# Embedding Model
EMBEDDING_MODEL = "ArcFace"

# Similarity Thresholds
THRESHOLD_VERIFIED = 0.80    # >= 0.80 → VERIFIED
THRESHOLD_BORDERLINE = 0.70  # 0.70-0.80 → BORDERLINE
                             # < 0.70 → REJECTED
```

## 📊 Output Format

Verification result:

```python
{
    "status": "VERIFIED",           # VERIFIED / BORDERLINE / REJECTED
    "similarity": 0.85,             # Cosine similarity score
    "face_detected": True,
    "liveness_passed": True,
    "matched_name": "John Doe",
    "bbox": (x, y, w, h),
    "aligned_face": np.ndarray,
    "embedding": np.ndarray,
    "liveness_results": {
        "is_live": True,
        "blink_detected": True,
        "movement_detected": True,
        "ear": 0.28,
        "total_blinks": 3,
        "movement_magnitude": 0.025
    }
}
```

## 🔬 Model Support

### Face Detection
- **OpenCV Haar Cascade**: Cepat, less accurate
- **MediaPipe**: Balanced speed & accuracy (recommended)
- **MTCNN**: Most accurate, slower

### Face Embedding
- **ArcFace**: Best accuracy (recommended)
- **FaceNet**: Good balance
- **VGG-Face**: High dimensional
- **DeepFace**: Facebook's model

## 📝 Notes

1. **Liveness Detection**: Untuk production, sebaiknya require multiple frames (blink detection over time)
2. **Threshold Tuning**: Sesuaikan threshold berdasarkan use case Anda
3. **Model Download**: Models akan didownload otomatis saat pertama kali digunakan
4. **Performance**: ArcFace + MediaPipe memberikan balance terbaik antara speed dan accuracy

## 🐛 Troubleshooting

### Error: "No module named 'insightface'"
```bash
pip install insightface onnxruntime
```

### Error: "Could not open webcam"
- Check apakah webcam sudah terhubung
- Try different WEBCAM_INDEX di config.py

### Poor detection accuracy
- Pastikan pencahayaan cukup
- Gunakan backend MediaPipe atau MTCNN
- Sesuaikan MIN_DETECTION_CONFIDENCE

### Liveness not working
- Pastikan wajah terdeteksi dengan jelas
- Cek EAR_THRESHOLD di config.py
- Test dengan test_liveness.py terlebih dahulu

## 📄 License

MIT License

## 👥 Contributing

Feel free to submit issues or pull requests!
