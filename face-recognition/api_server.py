"""
Flask API Server for Face Recognition
Optimized for Low-Memory Environments (Railway Free Tier)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import json
import os

# --- [PERUBAHAN 1] IMPORT WAJIB UNTUK MEMORY MANAGEMENT ---
import gc
import tensorflow as tf

# --- [PERUBAHAN 2] KONFIGURASI TENSORFLOW HEMAT MEMORI ---
# Ini harus dijalankan sebelum model diload!
try:
    # 1. Matikan pencarian GPU (Gunakan CPU saja)
    tf.config.set_visible_devices([], 'GPU')
    # 2. Batasi penggunaan thread CPU agar tidak rebutan resource dengan Gunicorn
    tf.config.threading.set_inter_op_parallelism_threads(1)
    tf.config.threading.set_intra_op_parallelism_threads(1)
    print("[INFO] TensorFlow configured for CPU-only and Single Thread")
except Exception as e:
    print(f"[WARNING] Failed to configure TensorFlow: {e}")

from face_detector import FaceDetector
from face_aligner import FaceAligner
from face_embedder import FaceEmbedder
from similarity_calculator import SimilarityCalculator

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js requests

# Initialize face recognition components (once at startup)
print("[INFO] Initializing face recognition components...")
detector = FaceDetector(backend="mediapipe")  # MediaPipe is memory efficient
aligner = FaceAligner()
embedder = FaceEmbedder(model_name="FaceNet")
calculator = SimilarityCalculator()
print("[INFO] Components initialized successfully")

# Load reference embedding
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EMBEDDING_FILE = os.path.join(BASE_DIR, "data", "wete_embedding.json")
print(f"[INFO] Looking for reference embedding at {EMBEDDING_FILE}...")

ref_embedding = None

if os.path.exists(EMBEDDING_FILE):
    try:
        with open(EMBEDDING_FILE, 'r') as f:
            embedding_data = json.load(f)
            ref_embedding = np.array(embedding_data['embedding_vector'])
            print(f"[INFO] Reference embedding loaded: {len(ref_embedding)}-dimensional vector")
    except Exception as e:
        print(f"[WARNING] Failed to load reference embedding: {e}")
else:
    print(f"[INFO] No default embedding file found. Will use embeddings from requests.")

def decode_base64_image(base64_string):
    """
    Decode base64 image string to OpenCV image (numpy array)
    """
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    img_data = base64.b64decode(base64_string)
    nparr = np.frombuffer(img_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

@app.route('/verify-face', methods=['POST'])
def verify_face():
    # Inisialisasi variabel dengan None agar aman saat dihapus di finally
    image = None
    faces = None
    aligned_face = None
    current_embedding = None
    reference_embedding = None

    try:
        data = request.get_json()
        
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400
        
        if 'reference_embedding' in data and data['reference_embedding']:
            reference_embedding = np.array(data['reference_embedding'])
            print(f"[INFO] Using reference embedding from request (dimension: {len(reference_embedding)})")
        elif ref_embedding is not None:
            reference_embedding = ref_embedding
            print(f"[INFO] Using default reference embedding from file")
        else:
            return jsonify({'error': 'No reference embedding provided'}), 400
        
        image = decode_base64_image(data['image'])
        if image is None:
            return jsonify({'error': 'Failed to decode image'}), 400
        
        faces = detector.detect_faces(image)
        if not faces or len(faces) == 0:
            return jsonify({
                'similarity': 0.0,
                'message': 'No face detected',
                'face_detected': False
            }), 200
        
        face_bbox = faces[0]
        aligned_face = aligner.align_face(image, face_bbox)
        
        if aligned_face is None:
            return jsonify({
                'similarity': 0.0,
                'message': 'Face alignment failed',
                'face_detected': True
            }), 200
        
        current_embedding = embedder.get_embedding(aligned_face)
        if current_embedding is None:
            return jsonify({
                'similarity': 0.0,
                'message': 'Embedding generation failed',
                'face_detected': True
            }), 200
        
        similarity = calculator.calculate_similarity(reference_embedding, current_embedding)
        
        return jsonify({
            'similarity': float(similarity),
            'message': 'Success',
            'face_detected': True,
            'face_location': {
                'x': int(face_bbox[0]), 'y': int(face_bbox[1]),
                'w': int(face_bbox[2]), 'h': int(face_bbox[3])
            }
        }), 200
        
    except Exception as e:
        print(f"[ERROR] Verification failed: {str(e)}")
        return jsonify({'error': str(e)}), 500

    finally:
        # --- [PERUBAHAN 3] BERSIH-BERSIH MEMORI (GARBAGE COLLECTION) ---
        # Hapus variabel besar secara manual
        if image is not None: del image
        if faces is not None: del faces
        if aligned_face is not None: del aligned_face
        if current_embedding is not None: del current_embedding
        if reference_embedding is not None: del reference_embedding
        
        # Paksa Python membuang sampah memori SEKARANG JUGA
        gc.collect()
        
        # Bersihkan session keras backend jika perlu
        try:
            tf.keras.backend.clear_session()
        except:
            pass

@app.route('/generate-embedding', methods=['POST'])
def generate_embedding():
    # Sama seperti di atas, inisialisasi variabel untuk cleanup
    image = None
    faces = None
    aligned_face = None
    embedding = None

    try:
        data = request.get_json()
        if 'image' not in data:
            return jsonify({'error': 'No image provided', 'success': False}), 400
        
        image = decode_base64_image(data['image'])
        if image is None:
            return jsonify({'error': 'Failed to decode image', 'success': False}), 400
        
        faces = detector.detect_faces(image)
        if not faces or len(faces) == 0:
            return jsonify({'error': 'No face detected', 'success': False}), 400
        
        face_bbox = faces[0]
        aligned_face = aligner.align_face(image, face_bbox)
        if aligned_face is None:
            return jsonify({'error': 'Face alignment failed', 'success': False}), 400
        
        embedding = embedder.get_embedding(aligned_face)
        if embedding is None:
            return jsonify({'error': 'Embedding generation failed', 'success': False}), 400
        
        embedding_list = embedding.tolist()
        print(f"[INFO] Generated embedding with dimension: {len(embedding_list)}")
        
        return jsonify({
            'success': True,
            'embedding': embedding_list,
            'face_detected': True,
            'message': 'Face embedding generated successfully'
        }), 200
        
    except Exception as e:
        print(f"[ERROR] Embedding generation failed: {str(e)}")
        return jsonify({'error': str(e), 'success': False}), 500
        
    finally:
        # --- [PERUBAHAN 3] BERSIH-BERSIH MEMORI JUGA DI SINI ---
        if image is not None: del image
        if faces is not None: del faces
        if aligned_face is not None: del aligned_face
        if embedding is not None: del embedding
        gc.collect()
        try:
            tf.keras.backend.clear_session()
        except:
            pass

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'message': 'Face recognition API is running (Optimized Mode)',
        'embedding_loaded': ref_embedding is not None
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)