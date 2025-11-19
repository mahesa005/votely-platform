"""
Configuration file for Face Recognition Module
"""

# Face Detection Configuration
FACE_DETECTION_BACKEND = "mediapipe"  # Options: "opencv", "mediapipe", "mtcnn"
MIN_DETECTION_CONFIDENCE = 0.7

# Face Alignment Configuration
FACE_SIZE = (112, 112)  # Target size for aligned face
NORMALIZE_FACE = True

# Embedding Configuration
EMBEDDING_MODEL = "ArcFace"  # Options: "ArcFace", "Facenet", "VGG-Face", "DeepFace"
EMBEDDING_DIM = 512  # Depends on model

# Similarity Threshold Configuration
# Threshold sangat toleran untuk user experience (no borderline)
THRESHOLD_VERIFIED = 0.55    # >= 0.55 = VERIFIED (hijau)
THRESHOLD_BORDERLINE = 0.54  # Tidak digunakan (no borderline)
# < 0.55 = REJECTED (gray)
# Note: 0.55 sangat toleran, cocok untuk variasi besar (kacamata, lighting, angle)

# Liveness Detection Configuration
LIVENESS_ENABLED = True
EAR_THRESHOLD = 0.25  # Eye Aspect Ratio threshold for blink
BLINK_CONSECUTIVE_FRAMES = 3
HEAD_MOVEMENT_THRESHOLD = 0.02  # Threshold for head pose change

# Webcam Configuration
WEBCAM_INDEX = 0
FRAME_WIDTH = 640
FRAME_HEIGHT = 480
