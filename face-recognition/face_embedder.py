"""
Face Embedding Module
Generates face embeddings using pretrained models
"""

import cv2
import numpy as np
from typing import Optional
import config


class FaceEmbedder:
    """Face embedding generator using Keras FaceNet"""
    
    def __init__(self, model_name: str = None):
        """
        Initialize face embedder
        
        Args:
            model_name: Model name (ignored, always uses FaceNet)
        """
        self.model_name = "FaceNet"
        self.model = None
        self._initialize_model()
    
    def _initialize_model(self):
        """Initialize FaceNet model"""
        print(f"[INFO] Initializing FaceNet model...")
        
        try:
            from keras_facenet import FaceNet
            self.model = FaceNet()
            print(f"[INFO] FaceNet model loaded successfully (512-dim embeddings)")
        except Exception as e:
            print(f"[ERROR] Failed to load FaceNet: {e}")
            raise
    
    def get_embedding(self, face_image: np.ndarray, normalize: bool = True) -> Optional[np.ndarray]:
        """
        Generate embedding from aligned face image
        
        Args:
            face_image: Aligned face image (BGR or normalized)
            normalize: Whether to L2-normalize the embedding
            
        Returns:
            128-dimensional face embedding vector or None if extraction fails
        """
        try:
            # Denormalize if needed
            if face_image.dtype == np.float32:
                if face_image.min() < 0:  # Normalized to [-1, 1]
                    face_image = ((face_image * 128.0) + 127.5).astype(np.uint8)
                else:
                    face_image = (face_image * 255).astype(np.uint8)
            
            # FaceNet expects RGB
            rgb_image = cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB)
            
            # Ensure correct shape (160x160 for FaceNet)
            if rgb_image.shape[:2] != (160, 160):
                rgb_image = cv2.resize(rgb_image, (160, 160))
            
            # Add batch dimension
            face_batch = np.expand_dims(rgb_image, axis=0)
            
            # Extract embedding
            embeddings = self.model.embeddings(face_batch)
            embedding = embeddings[0]
            
            # L2 normalization
            if normalize:
                embedding = self._l2_normalize(embedding)
            
            return embedding
            
        except Exception as e:
            print(f"[ERROR] Failed to extract embedding: {e}")
            return None
    
    def _l2_normalize(self, embedding: np.ndarray) -> np.ndarray:
        """
        L2 normalize embedding vector
        
        Args:
            embedding: Embedding vector
            
        Returns:
            Normalized embedding
        """
        norm = np.linalg.norm(embedding)
        if norm == 0:
            return embedding
        return embedding / norm
    
    def get_embedding_dim(self) -> int:
        """
        Get embedding dimension
        
        Returns:
            Embedding dimension (128 for FaceNet)
        """
        return 128


def save_embedding(embedding: np.ndarray, filepath: str):
    """
    Save embedding to file
    
    Args:
        embedding: Embedding vector
        filepath: Path to save file (.npy)
    """
    np.save(filepath, embedding)
    print(f"[INFO] Embedding saved to {filepath}")


def load_embedding(filepath: str) -> np.ndarray:
    """
    Load embedding from file
    
    Args:
        filepath: Path to embedding file (.npy)
        
    Returns:
        Embedding vector
    """
    embedding = np.load(filepath)
    print(f"[INFO] Embedding loaded from {filepath}")
    return embedding


if __name__ == "__main__":
    # Quick test
    from face_detector import FaceDetector
    from face_aligner import FaceAligner
    
    print("Testing Face Embedding Module...")
    
    detector = FaceDetector("mediapipe")
    aligner = FaceAligner()
    embedder = FaceEmbedder()
    
    print(f"Embedding dimension: {embedder.get_embedding_dim()}")
    
    # Test with webcam
    cap = cv2.VideoCapture(0)
    
    print("Press 's' to save embedding, 'q' to quit")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Detect face
        bbox = detector.get_largest_face(frame)
        
        if bbox:
            # Align face
            aligned = aligner.align_face(frame, bbox)
            
            if aligned is not None:
                # Show detection
                x, y, w, h = bbox
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(frame, "Face detected", (x, y - 10),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        cv2.imshow("Embedding Test", frame)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('s') and bbox:
            print("Generating embedding...")
            embedding = embedder.get_embedding(aligned)
            if embedding is not None:
                print(f"Embedding shape: {embedding.shape}")
                print(f"Embedding L2 norm: {np.linalg.norm(embedding):.4f}")
                save_embedding(embedding, "test_embedding.npy")
                print("Embedding saved!")
    
    cap.release()
    cv2.destroyAllWindows()
