# Petunjuk: Cara Menggunakan Sistem

Letakkan foto-foto reference Anda di folder ini dengan format:
- nama.jpg
- nama.png

Contoh:
- devon.jpg
- john.png
- sarah.jpg

Pastikan:
✅ Foto jelas dan wajah terlihat frontal
✅ Pencahayaan baik
✅ Satu wajah per foto (akan ambil wajah terbesar jika ada multiple)
✅ Format: jpg, jpeg, png, bmp, gif

Setelah itu jalankan:
python live_recognition.py

Program akan otomatis:
1. Load semua foto dari folder ini
2. Generate embeddings
3. Cache embeddings (tidak perlu regenerate setiap kali)
4. Start webcam
5. Compare wajah di webcam dengan database

Happy recognizing!
