"""
Face Detection Module
Supports multiple backends: OpenCV, MediaPipe, MTCNN
"""

import cv2
import numpy as np
from typing import List, Tuple, Optional
import config


class FaceDetector:
    """Face detector with multiple backend support"""
    
    def __init__(self, backend: str = None):
        """
        Initialize face detector
        
        Args:
            backend: Detection backend ("opencv", "mediapipe", "mtcnn")
        """
        self.backend = backend or config.FACE_DETECTION_BACKEND
        self._initialize_detector()
    
    def _initialize_detector(self):
        """Initialize the selected detection backend"""
        if self.backend == "opencv":
            self._init_opencv()
        elif self.backend == "mediapipe":
            self._init_mediapipe()
        elif self.backend == "mtcnn":
            self._init_mtcnn()
        else:
            raise ValueError(f"Unknown backend: {self.backend}")
    
    def _init_opencv(self):
        """Initialize OpenCV Haar Cascade detector"""
        cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        self.detector = cv2.CascadeClassifier(cascade_path)
        print(f"[INFO] Initialized OpenCV Haar Cascade detector")
    
    def _init_mediapipe(self):
        """Initialize MediaPipe Face Detection"""
        import mediapipe as mp
        self.mp_face_detection = mp.solutions.face_detection
        self.detector = self.mp_face_detection.FaceDetection(
            min_detection_confidence=config.MIN_DETECTION_CONFIDENCE
        )
        print(f"[INFO] Initialized MediaPipe Face Detection")
    
    def _init_mtcnn(self):
        """Initialize MTCNN detector"""
        from mtcnn import MTCNN
        self.detector = MTCNN()
        print(f"[INFO] Initialized MTCNN detector")
    
    def detect_faces(self, image: np.ndarray) -> List[Tuple[int, int, int, int]]:
        """
        Detect faces in an image
        
        Args:
            image: Input image (BGR format)
            
        Returns:
            List of bounding boxes [(x, y, w, h), ...]
        """
        if self.backend == "opencv":
            return self._detect_opencv(image)
        elif self.backend == "mediapipe":
            return self._detect_mediapipe(image)
        elif self.backend == "mtcnn":
            return self._detect_mtcnn(image)
    
    def _detect_opencv(self, image: np.ndarray) -> List[Tuple[int, int, int, int]]:
        """Detect faces using OpenCV"""
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = self.detector.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
        )
        return [tuple(face) for face in faces]
    
    def _detect_mediapipe(self, image: np.ndarray) -> List[Tuple[int, int, int, int]]:
        """Detect faces using MediaPipe"""
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = self.detector.process(rgb_image)
        
        faces = []
        if results.detections:
            h, w, _ = image.shape
            for detection in results.detections:
                bbox = detection.location_data.relative_bounding_box
                x = int(bbox.xmin * w)
                y = int(bbox.ymin * h)
                width = int(bbox.width * w)
                height = int(bbox.height * h)
                
                # Ensure bbox is within image bounds
                x = max(0, x)
                y = max(0, y)
                width = min(width, w - x)
                height = min(height, h - y)
                
                faces.append((x, y, width, height))
        
        return faces
    
    def _detect_mtcnn(self, image: np.ndarray) -> List[Tuple[int, int, int, int]]:
        """Detect faces using MTCNN"""
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = self.detector.detect_faces(rgb_image)
        
        faces = []
        for result in results:
            if result['confidence'] >= config.MIN_DETECTION_CONFIDENCE:
                x, y, w, h = result['box']
                # Ensure positive values
                x = max(0, x)
                y = max(0, y)
                w = max(0, w)
                h = max(0, h)
                faces.append((x, y, w, h))
        
        return faces
    
    def get_largest_face(self, image: np.ndarray) -> Optional[Tuple[int, int, int, int]]:
        """
        Detect and return the largest face in the image
        
        Args:
            image: Input image (BGR format)
            
        Returns:
            Bounding box (x, y, w, h) or None if no face detected
        """
        faces = self.detect_faces(image)
        if not faces:
            return None
        
        # Return the largest face by area
        return max(faces, key=lambda f: f[2] * f[3])
    
    def draw_faces(self, image: np.ndarray, faces: List[Tuple[int, int, int, int]]) -> np.ndarray:
        """
        Draw bounding boxes on faces
        
        Args:
            image: Input image
            faces: List of bounding boxes
            
        Returns:
            Image with drawn bounding boxes
        """
        output = image.copy()
        for (x, y, w, h) in faces:
            cv2.rectangle(output, (x, y), (x + w, y + h), (0, 255, 0), 2)
        return output
    
    def __del__(self):
        """Cleanup resources"""
        if self.backend == "mediapipe" and hasattr(self, 'detector'):
            self.detector.close()


if __name__ == "__main__":
    # Quick test
    print("Testing Face Detection Module...")
    
    detector = FaceDetector("mediapipe")
    
    # Test with webcam
    cap = cv2.VideoCapture(0)
    
    print("Press 'q' to quit")
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        faces = detector.detect_faces(frame)
        output = detector.draw_faces(frame, faces)
        
        cv2.putText(output, f"Faces: {len(faces)}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        cv2.imshow("Face Detection Test", output)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()
