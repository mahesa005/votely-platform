"""
Flask API Server for Face Recognition
Receives frames from Next.js frontend and returns similarity scores
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import json
from face_detector import FaceDetector
from face_aligner import FaceAligner
from face_embedder import FaceEmbedder
from similarity_calculator import SimilarityCalculator
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js requests

# Initialize face recognition components (once at startup)
print("[INFO] Initializing face recognition components...")
detector = FaceDetector(backend="mediapipe")  # MediaPipe more accurate than OpenCV
aligner = FaceAligner()
embedder = FaceEmbedder(model_name="FaceNet")
calculator = SimilarityCalculator()
print("[INFO] Components initialized successfully")

# Load reference embedding from JSON
EMBEDDING_FILE = "data/wete_embedding.json"
print(f"[INFO] Loading reference embedding from {EMBEDDING_FILE}...")

if not os.path.exists(EMBEDDING_FILE):
    print(f"[ERROR] Embedding file not found: {EMBEDDING_FILE}")
    print("[ERROR] Please generate embedding first using generate_embedding.py")
    exit(1)

with open(EMBEDDING_FILE, 'r') as f:
    embedding_data = json.load(f)
    ref_embedding = np.array(embedding_data['embedding_vector'])
    print(f"[INFO] Reference embedding loaded: {len(ref_embedding)}-dimensional vector")

def decode_base64_image(base64_string):
    """
    Decode base64 image string to OpenCV image (numpy array)
    """
    # Remove data:image/jpeg;base64, prefix if exists
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    
    # Decode base64
    img_data = base64.b64decode(base64_string)
    
    # Convert to numpy array
    nparr = np.frombuffer(img_data, np.uint8)
    
    # Decode image
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    return img

@app.route('/verify-face', methods=['POST'])
def verify_face():
    """
    Verify face from base64 image
    Returns similarity score
    """
    try:
        data = request.get_json()
        
        if 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400
        
        # Get reference embedding from request (from database) or use default
        if 'reference_embedding' in data and data['reference_embedding']:
            reference_embedding = np.array(data['reference_embedding'])
            print(f"[INFO] Using reference embedding from request (dimension: {len(reference_embedding)})")
        else:
            # Fallback to default reference embedding (wete_embedding.json)
            reference_embedding = ref_embedding
            print(f"[INFO] Using default reference embedding from file")
        
        # Decode base64 image
        image = decode_base64_image(data['image'])
        
        if image is None:
            return jsonify({'error': 'Failed to decode image'}), 400
        
        # Detect face
        faces = detector.detect_faces(image)
        
        if not faces or len(faces) == 0:
            return jsonify({
                'similarity': 0.0,
                'message': 'No face detected',
                'face_detected': False
            }), 200
        
        # Use the largest face (first one)
        face_bbox = faces[0]
        
        # Align face
        aligned_face = aligner.align_face(image, face_bbox)
        
        if aligned_face is None:
            return jsonify({
                'similarity': 0.0,
                'message': 'Face alignment failed',
                'face_detected': True
            }), 200
        
        # Generate embedding
        current_embedding = embedder.get_embedding(aligned_face)
        
        if current_embedding is None:
            return jsonify({
                'similarity': 0.0,
                'message': 'Embedding generation failed',
                'face_detected': True
            }), 200
        
        # Calculate similarity with reference
        similarity = calculator.calculate_similarity(reference_embedding, current_embedding)
        
        return jsonify({
            'similarity': float(similarity),
            'message': 'Success',
            'face_detected': True,
            'face_location': {
                'x': int(face_bbox[0]),
                'y': int(face_bbox[1]),
                'w': int(face_bbox[2]),
                'h': int(face_bbox[3])
            }
        }), 200
        
    except Exception as e:
        print(f"[ERROR] Verification failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route('/generate-embedding', methods=['POST'])
def generate_embedding():
    """
    Generate face embedding from base64 image
    Used during registration to store user's face embedding
    Returns the embedding vector to be saved in database
    """
    try:
        data = request.get_json()
        
        if 'image' not in data:
            return jsonify({'error': 'No image provided', 'success': False}), 400
        
        # Decode base64 image
        image = decode_base64_image(data['image'])
        
        if image is None:
            return jsonify({'error': 'Failed to decode image', 'success': False}), 400
        
        # Detect face
        faces = detector.detect_faces(image)
        
        if not faces or len(faces) == 0:
            return jsonify({
                'error': 'No face detected in image. Please try again.',
                'success': False,
                'face_detected': False
            }), 400
        
        # Use the largest face (first one)
        face_bbox = faces[0]
        
        # Align face
        aligned_face = aligner.align_face(image, face_bbox)
        
        if aligned_face is None:
            return jsonify({
                'error': 'Face alignment failed. Please try again.',
                'success': False,
                'face_detected': True
            }), 400
        
        # Generate embedding
        embedding = embedder.get_embedding(aligned_face)
        
        if embedding is None:
            return jsonify({
                'error': 'Embedding generation failed. Please try again.',
                'success': False,
                'face_detected': True
            }), 400
        
        # Convert embedding to list for JSON serialization
        embedding_list = embedding.tolist()
        
        print(f"[INFO] Generated embedding with dimension: {len(embedding_list)}")
        
        return jsonify({
            'success': True,
            'embedding': embedding_list,
            'face_detected': True,
            'face_location': {
                'x': int(face_bbox[0]),
                'y': int(face_bbox[1]),
                'w': int(face_bbox[2]),
                'h': int(face_bbox[3])
            },
            'embedding_dimension': len(embedding_list),
            'message': 'Face embedding generated successfully'
        }), 200
        
    except Exception as e:
        print(f"[ERROR] Embedding generation failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e), 'success': False}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'ok',
        'message': 'Face recognition API is running',
        'embedding_loaded': ref_embedding is not None,
        'embedding_dimension': len(ref_embedding) if ref_embedding is not None else 0
    }), 200

if __name__ == '__main__':
    print("\n" + "="*70)
    print("FACE RECOGNITION API SERVER")
    print("="*70)
    print(f"Server starting on http://localhost:5000")
    print(f"Reference embedding: {EMBEDDING_FILE}")
    print(f"Embedding dimension: {len(ref_embedding)}")
    print("="*70 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
