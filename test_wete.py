"""
Simple Face Recognition Test
Hardcoded untuk testing similarity dengan wete.jpg
"""

import cv2
import numpy as np
from face_detector import FaceDetector
from face_aligner import FaceAligner
from face_embedder import FaceEmbedder
from similarity_calculator import SimilarityCalculator
import os


def test_similarity_with_reference():
    """
    Test similarity antara webcam dan foto reference (wete.jpg)
    """
    
    # === HARDCODED REFERENCE PHOTO ===
    REFERENCE_PHOTO = "data/wete.jpg"
    REFERENCE_NAME = "WETE"
    
    print("=" * 70)
    print("FACE RECOGNITION TEST - Hardcoded Mode")
    print("=" * 70)
    print()
    print(f"Reference Photo: {REFERENCE_PHOTO}")
    print(f"Reference Name: {REFERENCE_NAME}")
    print()
    
    # Check if reference photo exists
    if not os.path.exists(REFERENCE_PHOTO):
        print(f"ERROR: File {REFERENCE_PHOTO} tidak ditemukan!")
        print("Pastikan file wete.jpg ada di folder data/")
        return
    
    # Initialize modules
    print("[1/5] Initializing modules...")
    detector = FaceDetector(backend="mediapipe")
    aligner = FaceAligner()
    embedder = FaceEmbedder(model_name="ArcFace")
    calculator = SimilarityCalculator()
    print("     OK - Modules ready")
    
    # Load reference photo
    print(f"[2/5] Loading reference photo: {REFERENCE_PHOTO}")
    ref_image = cv2.imread(REFERENCE_PHOTO)
    
    if ref_image is None:
        print(f"     ERROR: Cannot read {REFERENCE_PHOTO}")
        return
    
    print(f"     OK - Image loaded: {ref_image.shape}")
    
    # Detect face in reference photo
    print("[3/5] Detecting face in reference photo...")
    ref_bbox = detector.get_largest_face(ref_image)
    
    if ref_bbox is None:
        print("     ERROR: No face detected in reference photo!")
        print("     Tip: Pastikan foto jelas dan wajah terlihat frontal")
        return
    
    print(f"     OK - Face detected at: {ref_bbox}")
    
    # Generate reference embedding
    print("[4/5] Generating reference embedding...")
    ref_aligned = aligner.align_face(ref_image, ref_bbox)
    
    if ref_aligned is None:
        print("     ERROR: Face alignment failed!")
        return
    
    ref_embedding = embedder.get_embedding(ref_aligned)
    
    if ref_embedding is None:
        print("     ERROR: Cannot generate reference embedding!")
        return
    
    print(f"     OK - Embedding generated: shape {ref_embedding.shape}")
    print(f"     OK - Embedding L2 norm: {np.linalg.norm(ref_embedding):.4f}")
    
    # Start webcam
    print("[5/5] Starting webcam...")
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("     ERROR: Cannot open webcam!")
        return
    
    print("     OK - Webcam ready")
    print()
    print("=" * 70)
    print("WEBCAM ACTIVE - Press 'q' to quit")
    print("=" * 70)
    print()
    print("Similarity Threshold (Updated - More Tolerant):")
    print("  >= 0.70 = VERIFIED   (orang yang sama)")
    print("  0.60-0.70 = BORDERLINE (ragu-ragu)")
    print("  < 0.60 = REJECTED    (orang berbeda)")
    print()
    
    frame_count = 0
    last_similarity = None
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame_count += 1
        display_frame = frame.copy()
        
        # Detect face in webcam frame (every 3 frames for performance)
        if frame_count % 3 == 0:
            bbox = detector.get_largest_face(frame)
            
            if bbox is not None:
                x, y, w, h = bbox
                
                # Align and get embedding
                aligned = aligner.align_face(frame, bbox)
                
                if aligned is not None:
                    embedding = embedder.get_embedding(aligned)
                    
                    if embedding is not None:
                        # Calculate similarity
                        similarity = calculator.calculate_similarity(ref_embedding, embedding)
                        status = calculator.get_verification_status(similarity)
                        
                        # Determine color based on status
                        if status == "VERIFIED":
                            color = (0, 255, 0)  # Green
                            box_color = (0, 255, 0)
                        elif status == "BORDERLINE":
                            color = (0, 165, 255)  # Orange
                            box_color = (0, 165, 255)
                        else:
                            color = (0, 0, 255)  # Red
                            box_color = (0, 0, 255)
                        
                        # Draw bounding box
                        cv2.rectangle(display_frame, (x, y), (x+w, y+h), box_color, 2)
                        
                        # Display results on frame
                        # Background rectangle for text
                        cv2.rectangle(display_frame, (x, y-80), (x+w, y), (0, 0, 0), -1)
                        
                        # Name
                        if status == "VERIFIED":
                            name_text = f"Name: {REFERENCE_NAME}"
                        else:
                            name_text = "Name: UNKNOWN"
                        
                        cv2.putText(display_frame, name_text, 
                                   (x+5, y-55), cv2.FONT_HERSHEY_SIMPLEX, 
                                   0.6, (255, 255, 255), 2)
                        
                        # Similarity
                        sim_text = f"Similarity: {similarity:.4f}"
                        cv2.putText(display_frame, sim_text, 
                                   (x+5, y-35), cv2.FONT_HERSHEY_SIMPLEX, 
                                   0.6, (255, 255, 255), 2)
                        
                        # Status
                        cv2.putText(display_frame, status, 
                                   (x+5, y-10), cv2.FONT_HERSHEY_SIMPLEX, 
                                   0.6, color, 2)
                        
                        # Print to console only if similarity changed significantly
                        if last_similarity is None or abs(similarity - last_similarity) > 0.05:
                            if status == "VERIFIED":
                                icon = "OK"
                            elif status == "BORDERLINE":
                                icon = "?"
                            else:
                                icon = "X"
                            
                            print(f"[Frame {frame_count}] [{icon}] {name_text} | Similarity: {similarity:.4f} | {status}")
                            last_similarity = similarity
            
            else:
                # No face detected
                cv2.putText(display_frame, "No face detected", 
                           (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 
                           0.7, (0, 0, 255), 2)
        
        # Info panel
        cv2.rectangle(display_frame, (0, display_frame.shape[0]-50), 
                     (300, display_frame.shape[0]), (0, 0, 0), -1)
        cv2.putText(display_frame, f"Reference: {REFERENCE_NAME}", 
                   (5, display_frame.shape[0]-30), cv2.FONT_HERSHEY_SIMPLEX, 
                   0.5, (255, 255, 255), 1)
        cv2.putText(display_frame, "Press 'q' to quit", 
                   (5, display_frame.shape[0]-10), cv2.FONT_HERSHEY_SIMPLEX, 
                   0.5, (255, 255, 255), 1)
        
        # Display frame
        cv2.imshow("Face Recognition Test - wete.jpg", display_frame)
        
        # Quit on 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("\nQuitting...")
            break
    
    # Cleanup
    cap.release()
    cv2.destroyAllWindows()
    
    print()
    print("=" * 70)
    print("Test completed!")
    print("=" * 70)


if __name__ == "__main__":
    test_similarity_with_reference()
