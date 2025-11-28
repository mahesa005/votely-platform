"""
Generate Face Embedding to JSON
Script to generate face embedding from wete.jpg and save as JSON
"""

import cv2
import json
import numpy as np
from pathlib import Path
from face_detector import FaceDetector
from face_aligner import FaceAligner
from face_embedder import FaceEmbedder


def generate_embedding_json(image_path: str, output_path: str = None):
    """
    Generate face embedding from image and save to JSON file
    
    Args:
        image_path: Path to input image (wete.jpg)
        output_path: Path to output JSON file (default: wete_embedding.json)
    """
    # Set default output path
    if output_path is None:
        image_name = Path(image_path).stem
        output_path = f"{image_name}_embedding.json"
    
    print(f"[INFO] Loading image from: {image_path}")
    
    # Load image
    image = cv2.imread(image_path)
    if image is None:
        print(f"[ERROR] Failed to load image: {image_path}")
        return None
    
    print(f"[INFO] Image loaded successfully. Size: {image.shape}")
    
    # Initialize components with OpenCV backend (more stable)
    print("[INFO] Initializing face detection, alignment, and embedding models...")
    detector = FaceDetector(backend="opencv")
    aligner = FaceAligner()
    embedder = FaceEmbedder()
    
    # Detect faces
    print("[INFO] Detecting faces...")
    faces = detector.detect_faces(image)
    
    if not faces:
        print("[ERROR] No face detected in the image")
        return None
    
    if len(faces) > 1:
        print(f"[WARNING] Multiple faces detected ({len(faces)}), using the first one")
    
    # Use the first detected face
    face_bbox = faces[0]
    x, y, w, h = face_bbox
    print(f"[INFO] Face detected at: x={x}, y={y}, w={w}, h={h}")
    
    # Align face
    print("[INFO] Aligning face...")
    aligned_face = aligner.align_face(image, face_bbox)
    
    if aligned_face is None:
        print("[ERROR] Face alignment failed")
        return None
    
    print(f"[INFO] Face aligned successfully. Size: {aligned_face.shape}")
    
    # Generate embedding
    print("[INFO] Generating face embedding...")
    embedding = embedder.get_embedding(aligned_face)
    
    if embedding is None:
        print("[ERROR] Failed to generate embedding")
        return None
    
    print(f"[INFO] Embedding generated successfully. Dimension: {len(embedding)}")
    
    # Prepare data for JSON
    embedding_data = {
        "image_path": str(Path(image_path).absolute()),
        "image_name": Path(image_path).name,
        "face_location": {
            "x": int(x),
            "y": int(y),
            "width": int(w),
            "height": int(h)
        },
        "embedding_dimension": len(embedding),
        "embedding_vector": embedding.tolist(),
        "model": embedder.model_name
    }
    
    # Save to JSON
    print(f"[INFO] Saving embedding to: {output_path}")
    with open(output_path, 'w') as f:
        json.dump(embedding_data, f, indent=2)
    
    print(f"[SUCCESS] Embedding saved successfully to {output_path}")
    print(f"[INFO] Embedding stats:")
    print(f"  - Dimension: {len(embedding)}")
    print(f"  - Min value: {np.min(embedding):.6f}")
    print(f"  - Max value: {np.max(embedding):.6f}")
    print(f"  - Mean: {np.mean(embedding):.6f}")
    print(f"  - Std: {np.std(embedding):.6f}")
    
    return embedding_data


def main():
    """Main function"""
    # Path to wete.jpg
    image_path = "C:\\Users\\devon\\votely-platform\\face-recognition\\data\\wete.jpg"
    output_path = "C:\\Users\\devon\\votely-platform\\face-recognition\\data\\wete_embedding.json"
    
    # Check if image exists
    if not Path(image_path).exists():
        print(f"[ERROR] Image not found: {image_path}")
        print(f"[INFO] Please place wete.jpg in the data/ folder")
        return
    
    # Generate embedding
    result = generate_embedding_json(image_path, output_path)
    
    if result:
        print("\n" + "="*60)
        print("EMBEDDING GENERATION COMPLETED")
        print("="*60)
        print(f"Output file: {output_path}")
        print(f"Embedding dimension: {result['embedding_dimension']}")
        print(f"Model: {result['model']}")
    else:
        print("\n" + "="*60)
        print("EMBEDDING GENERATION FAILED")
        print("="*60)


if __name__ == "__main__":
    main()
