"""
Face Recognition - Main Program
Real-time face recognition dengan webcam
"""

import cv2
import numpy as np
import json
from face_detector import FaceDetector
from face_aligner import FaceAligner
from face_embedder import FaceEmbedder
from similarity_calculator import SimilarityCalculator
import os


def main():
    """
    Program utama face recognition
    """
    
    # ========================================================================
    # KONFIGURASI - UBAH DI SINI UNTUK GANTI EMBEDDING REFERENCE
    # ========================================================================
    
    # Path ke file embedding JSON - GANTI NAMA FILE DI SINI jika mau pakai embedding lain
    # Contoh:
    #   - "data/wete_embedding.json"       → File wete_embedding.json di folder data/
    #   - "data/john_embedding.json"       → File john_embedding.json di folder data/
    #   - "data/embeddings/mary_embedding.json" → File di subfolder embeddings/
    EMBEDDING_FILE = "C:\\Users\\devon\\votely-platform\\face-recognition\\data\\wete_embedding.json"  # ← UBAH NAMA FILE DI SINI
    
    # Nama yang akan ditampilkan saat wajah terdeteksi - GANTI NAMA DI SINI
    REFERENCE_NAME = "WETE"  # ← UBAH NAMA DI SINI
    
    # ========================================================================
    # END KONFIGURASI
    # ========================================================================
    
    print("=" * 70)
    print("FACE RECOGNITION SYSTEM")
    print("=" * 70)
    print()
    print(f"Embedding File: {EMBEDDING_FILE}")
    print(f"Reference Name: {REFERENCE_NAME}")
    print()
    
    # Check if embedding file exists
    if not os.path.exists(EMBEDDING_FILE):
        print(f"ERROR: File '{EMBEDDING_FILE}' tidak ditemukan!")
        print()
        print("Pastikan:")
        print("1. File embedding JSON ada di folder yang benar")
        print("2. Nama file ditulis dengan benar (case-sensitive)")
        print("3. Ekstensi file adalah .json")
        print()
        print(f"Contoh struktur folder:")
        print(f"  face-recognition/")
        print(f"  ├── main.py")
        print(f"  └── data/")
        print(f"      └── wete_embedding.json  ← File harus di sini")
        return
    
    # Initialize modules
    print("[1/4] Initializing modules...")
    detector = FaceDetector(backend="mediapipe")
    aligner = FaceAligner()
    embedder = FaceEmbedder(model_name="FaceNet")
    calculator = SimilarityCalculator()
    print("     ✓ Modules ready")
    
    # Load embedding from JSON file
    print(f"[2/4] Loading reference embedding from: {EMBEDDING_FILE}")
    try:
        with open(EMBEDDING_FILE, 'r') as f:
            embedding_data = json.load(f)
        
        ref_embedding = np.array(embedding_data['embedding_vector'])
        embedding_dim = embedding_data['embedding_dimension']
        
        print(f"     ✓ Embedding loaded: {embedding_dim}-dimensional vector")
        print(f"     ✓ Original image: {embedding_data['image_name']}")
        print(f"     ✓ Embedding quality: {np.linalg.norm(ref_embedding):.4f}")
        
    except FileNotFoundError:
        print(f"     ERROR: File {EMBEDDING_FILE} tidak ditemukan!")
        return
    except KeyError as e:
        print(f"     ERROR: Format JSON tidak valid! Missing key: {e}")
        return
    except Exception as e:
        print(f"     ERROR: Gagal membaca embedding: {e}")
        return
    
    # Start webcam
    print("[3/4] Starting webcam...")
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("     ERROR: Cannot open webcam!")
        print("     Pastikan:")
        print("     - Webcam terhubung dengan benar")
        print("     - Tidak ada aplikasi lain yang menggunakan webcam")
        print("     - Driver webcam terinstall")
        return
    
    print("     ✓ Webcam ready")
    print()
    print("[4/4] Initialization complete!")
    print()
    print("=" * 70)
    print("WEBCAM ACTIVE - Press 'q' to quit")
    print("=" * 70)
    print()
    print("Similarity Threshold (Simple Mode):")
    print("  ✓ >= 55% = VERIFIED   (hijau - orang yang sama)")
    print("  ✗ < 55% = REJECTED    (gray - orang berbeda)")
    print()
    
    frame_count = 0
    last_similarity = None
    
    # Smoothing: simpan 10 frame terakhir untuk rata-rata similarity
    from collections import deque
    similarity_history = deque(maxlen=10)  # Keep last 10 similarities
    
    # Get frame dimensions
    ret, test_frame = cap.read()
    if test_frame is not None:
        frame_height, frame_width = test_frame.shape[:2]
    else:
        frame_height, frame_width = 480, 640
    
    # Calculate circular frame position (center of screen) - DIGESER 5px KE ATAS
    circle_radius = 150  # Radius of circular frame (dikecilkan 30% dari 200)
    center_x = frame_width // 2
    center_y = frame_height // 2 + 35  # Offset slightly down (dari 40 → 35, geser 5px ke atas)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame_count += 1
        
        # Create white background
        display_frame = np.ones((frame_height, frame_width, 3), dtype=np.uint8) * 255
        
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
                        # Calculate similarity untuk frame ini
                        current_similarity = calculator.calculate_similarity(ref_embedding, embedding)
                        
                        # Tambahkan ke history untuk smoothing
                        similarity_history.append(current_similarity)
                        
                        # Gunakan rata-rata dari 10 frame terakhir untuk display dan status
                        if len(similarity_history) > 0:
                            similarity = np.mean(similarity_history)  # RATA-RATA 10 FRAME
                        else:
                            similarity = current_similarity
                        
                        # Simple threshold: >= 0.55 = VERIFIED (hijau), < 0.55 = REJECTED (gray)
                        # Gunakan rata-rata similarity untuk menentukan warna
                        if similarity >= 0.55:
                            status = "VERIFIED"
                            circle_color = (0, 200, 0)  # Green
                        else:
                            status = "REJECTED"
                            circle_color = (100, 100, 100)  # Gray
                        
                        # Print to console only if similarity changed significantly
                        if last_similarity is None or abs(similarity - last_similarity) > 0.05:
                            if status == "VERIFIED":
                                icon = "✓"
                            else:
                                icon = "✗"
                            
                            name_display = REFERENCE_NAME if status == "VERIFIED" else "UNKNOWN"
                            print(f"[Frame {frame_count}] [{icon}] Name: {name_display} | Avg Similarity: {similarity:.4f} ({len(similarity_history)} frames) | {status}")
                            last_similarity = similarity
                    else:
                        circle_color = (100, 100, 100)
                else:
                    circle_color = (100, 100, 100)
            else:
                circle_color = (100, 100, 100)
        else:
            # Use previous color if not processing this frame
            if 'circle_color' not in locals():
                circle_color = (100, 100, 100)
        
        # Create circular mask for face
        mask = np.zeros((frame_height, frame_width), dtype=np.uint8)
        cv2.circle(mask, (center_x, center_y), circle_radius, 255, -1)
        
        # Apply mask to webcam frame
        frame_masked = cv2.bitwise_and(frame, frame, mask=mask)
        
        # Blend masked frame with white background
        mask_inv = cv2.bitwise_not(mask)
        background = cv2.bitwise_and(display_frame, display_frame, mask=mask_inv)
        display_frame = cv2.add(background, frame_masked)
        
        # Draw circular border (thick border)
        cv2.circle(display_frame, (center_x, center_y), circle_radius, circle_color, 8)
        
        # Draw instruction text at top - DIGESER 5px KE ATAS
        instruction_text = "Look at the camera"
        text_size = cv2.getTextSize(instruction_text, cv2.FONT_HERSHEY_SIMPLEX, 1.2, 2)[0]
        text_x = (frame_width - text_size[0]) // 2
        text_y = 75  # Dari 80 → 75 (geser 5px ke atas)
        
        cv2.putText(display_frame, instruction_text, 
                   (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 
                   1.2, (50, 50, 50), 2)
        
        # Display RATA-RATA similarity score below circle (dari 10 frame terakhir)
        if 'similarity' in locals() and similarity is not None:
            similarity_text = f"Similarity: {similarity:.2%}"  # Rata-rata dari 10 frame
            sim_text_size = cv2.getTextSize(similarity_text, cv2.FONT_HERSHEY_SIMPLEX, 0.8, 2)[0]
            sim_text_x = (frame_width - sim_text_size[0]) // 2
            sim_text_y = center_y + circle_radius + 45  # Dari 50 → 45 (geser 5px ke atas)
            
            cv2.putText(display_frame, similarity_text, 
                       (sim_text_x, sim_text_y), cv2.FONT_HERSHEY_SIMPLEX, 
                       0.8, (50, 50, 50), 2)
        
        # Display frame
        cv2.imshow("Face Verification", display_frame)
        
        # Quit on 'q'
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("\nQuitting...")
            break
    
    # Cleanup
    cap.release()
    cv2.destroyAllWindows()
    
    print()
    print("=" * 70)
    print("Face Recognition System stopped")
    print("=" * 70)


if __name__ == "__main__":
    main()
