"""
Face Alignment Module
Performs face cropping, rotation, and normalization
"""

import cv2
import numpy as np
from typing import Tuple, Optional
import config


class FaceAligner:
    """Face alignment for preprocessing before embedding extraction"""
    
    def __init__(self, target_size: Tuple[int, int] = None):
        """
        Initialize face aligner
        
        Args:
            target_size: Target size for aligned face (width, height)
        """
        self.target_size = target_size or config.FACE_SIZE
        
        # Initialize facial landmark detector (MediaPipe)
        try:
            import mediapipe as mp
            self.mp_face_mesh = mp.solutions.face_mesh
            self.face_mesh = self.mp_face_mesh.FaceMesh(
                static_image_mode=True,
                max_num_faces=1,
                refine_landmarks=True,
                min_detection_confidence=0.5
            )
            self.use_landmarks = True
            print("[INFO] Initialized FaceAligner with MediaPipe landmarks")
        except:
            self.use_landmarks = False
            print("[INFO] Initialized FaceAligner without landmarks (basic alignment)")
    
    def align_face(self, image: np.ndarray, bbox: Tuple[int, int, int, int]) -> Optional[np.ndarray]:
        """
        Align face from bounding box
        
        Args:
            image: Input image (BGR)
            bbox: Bounding box (x, y, w, h)
            
        Returns:
            Aligned face image or None if alignment fails
        """
        if self.use_landmarks:
            return self._align_with_landmarks(image, bbox)
        else:
            return self._align_basic(image, bbox)
    
    def _align_basic(self, image: np.ndarray, bbox: Tuple[int, int, int, int]) -> np.ndarray:
        """
        Basic alignment: crop and resize
        
        Args:
            image: Input image
            bbox: Bounding box (x, y, w, h)
            
        Returns:
            Aligned face
        """
        x, y, w, h = bbox
        
        # Add margin (10%)
        margin = 0.1
        x_margin = int(w * margin)
        y_margin = int(h * margin)
        
        x1 = max(0, x - x_margin)
        y1 = max(0, y - y_margin)
        x2 = min(image.shape[1], x + w + x_margin)
        y2 = min(image.shape[0], y + h + y_margin)
        
        # Crop face
        face = image[y1:y2, x1:x2]
        
        if face.size == 0:
            return None
        
        # Resize to target size
        face = cv2.resize(face, self.target_size, interpolation=cv2.INTER_AREA)
        
        # Normalize if configured
        if config.NORMALIZE_FACE:
            face = self._normalize_face(face)
        
        return face
    
    def _align_with_landmarks(self, image: np.ndarray, bbox: Tuple[int, int, int, int]) -> Optional[np.ndarray]:
        """
        Align face using eye landmarks for rotation
        
        Args:
            image: Input image
            bbox: Bounding box (x, y, w, h)
            
        Returns:
            Aligned face or None
        """
        x, y, w, h = bbox
        
        # Crop region of interest with margin
        margin = 0.2
        x_margin = int(w * margin)
        y_margin = int(h * margin)
        
        x1 = max(0, x - x_margin)
        y1 = max(0, y - y_margin)
        x2 = min(image.shape[1], x + w + x_margin)
        y2 = min(image.shape[0], y + h + y_margin)
        
        face_roi = image[y1:y2, x1:x2]
        
        if face_roi.size == 0:
            return None
        
        # Get facial landmarks
        rgb_roi = cv2.cvtColor(face_roi, cv2.COLOR_BGR2RGB)
        results = self.face_mesh.process(rgb_roi)
        
        if not results.multi_face_landmarks:
            # Fallback to basic alignment
            return self._align_basic(image, bbox)
        
        # Extract eye landmarks (left eye: 33, right eye: 263)
        landmarks = results.multi_face_landmarks[0]
        h_roi, w_roi = face_roi.shape[:2]
        
        # Get left and right eye centers
        left_eye = landmarks.landmark[33]
        right_eye = landmarks.landmark[263]
        
        left_eye_x = int(left_eye.x * w_roi)
        left_eye_y = int(left_eye.y * h_roi)
        right_eye_x = int(right_eye.x * w_roi)
        right_eye_y = int(right_eye.y * h_roi)
        
        # Calculate rotation angle
        dy = right_eye_y - left_eye_y
        dx = right_eye_x - left_eye_x
        angle = np.degrees(np.arctan2(dy, dx))
        
        # Rotate image to align eyes horizontally
        center = (w_roi // 2, h_roi // 2)
        rotation_matrix = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(face_roi, rotation_matrix, (w_roi, h_roi),
                                  flags=cv2.INTER_CUBIC)
        
        # Calculate eye center for final crop
        eye_center_x = (left_eye_x + right_eye_x) // 2
        eye_center_y = (left_eye_y + right_eye_y) // 2
        
        # Rotate eye center coordinates
        eye_center = np.array([eye_center_x, eye_center_y, 1])
        rotated_center = rotation_matrix @ eye_center
        eye_center_x, eye_center_y = int(rotated_center[0]), int(rotated_center[1])
        
        # Crop centered on face
        crop_size = max(w, h)
        x_start = max(0, eye_center_x - crop_size // 2)
        y_start = max(0, eye_center_y - crop_size // 3)  # Eyes at upper third
        x_end = min(rotated.shape[1], x_start + crop_size)
        y_end = min(rotated.shape[0], y_start + crop_size)
        
        aligned_face = rotated[y_start:y_end, x_start:x_end]
        
        if aligned_face.size == 0:
            return self._align_basic(image, bbox)
        
        # Resize to target size
        aligned_face = cv2.resize(aligned_face, self.target_size, interpolation=cv2.INTER_AREA)
        
        # Normalize if configured
        if config.NORMALIZE_FACE:
            aligned_face = self._normalize_face(aligned_face)
        
        return aligned_face
    
    def _normalize_face(self, face: np.ndarray) -> np.ndarray:
        """
        Normalize face image
        
        Args:
            face: Face image
            
        Returns:
            Normalized face
        """
        # Convert to float32
        face = face.astype(np.float32)
        
        # Normalize to [-1, 1] range (common for face recognition models)
        face = (face - 127.5) / 128.0
        
        return face
    
    def preprocess_for_model(self, face: np.ndarray, model_name: str = "ArcFace") -> np.ndarray:
        """
        Preprocess face for specific embedding model
        
        Args:
            face: Aligned face image
            model_name: Name of the embedding model
            
        Returns:
            Preprocessed face
        """
        if model_name in ["ArcFace", "Facenet"]:
            # Normalize to [-1, 1]
            if face.dtype == np.uint8:
                face = face.astype(np.float32)
                face = (face - 127.5) / 128.0
        elif model_name in ["VGG-Face", "DeepFace"]:
            # VGG preprocessing
            if face.dtype == np.uint8:
                face = face.astype(np.float32)
                # Mean subtraction (VGG mean)
                face[..., 0] -= 93.5940
                face[..., 1] -= 104.7624
                face[..., 2] -= 129.1863
        
        return face
    
    def __del__(self):
        """Cleanup resources"""
        if self.use_landmarks and hasattr(self, 'face_mesh'):
            self.face_mesh.close()


if __name__ == "__main__":
    # Quick test
    from face_detector import FaceDetector
    
    print("Testing Face Alignment Module...")
    
    detector = FaceDetector("mediapipe")
    aligner = FaceAligner()
    
    # Test with webcam
    cap = cv2.VideoCapture(0)
    
    print("Press 'q' to quit")
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
                # Show original and aligned
                x, y, w, h = bbox
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                
                # Denormalize for display if needed
                if aligned.dtype == np.float32:
                    display_aligned = ((aligned * 128.0) + 127.5).astype(np.uint8)
                else:
                    display_aligned = aligned
                
                # Resize for display
                display_aligned = cv2.resize(display_aligned, (200, 200))
                
                # Place aligned face on frame
                frame[10:210, 10:210] = display_aligned
        
        cv2.imshow("Face Alignment Test", frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()
