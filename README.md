# Votely Platform

Platform e-voting berbasis blockchain dengan verifikasi biometrik wajah untuk pemilu yang aman dan transparan.

## 🎯 Fitur Utama

- **Autentikasi Biometrik** - Verifikasi wajah real-time menggunakan FaceNet
- **Blockchain Voting** - Suara dicatat di Ethereum (Sepolia Testnet)
- **Multi-level Election** - Mendukung pemilu Nasional, Provinsi, dan Kota
- **Admin Dashboard** - Kelola pemilu dan kandidat
- **Real-time Results** - Hasil voting langsung dari blockchain

## 🏗️ Arsitektur

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Next.js App   │────▶│  Face Recog API │────▶│   PostgreSQL    │
│   (Frontend)    │     │    (Python)     │     │   (Supabase)    │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Ethereum      │
│   (Sepolia)     │
└─────────────────┘
```

## 📁 Struktur Project

```
votely-platform/
├── votely-platform/      # Next.js Frontend
│   ├── app/              # App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities & services
│   ├── contracts/        # Solidity smart contracts
│   └── prisma/           # Database schema
│
└── face-recognition/     # Python Face Recognition API
    ├── api_server.py     # Flask API server
    ├── face_detector.py  # MediaPipe face detection
    ├── face_embedder.py  # FaceNet embeddings
    └── Dockerfile        # Docker configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker (optional)
- PostgreSQL (atau Supabase)

### 1. Clone Repository

```bash
git clone https://github.com/mahesa005/votely-platform.git
cd votely-platform
```

### 2. Setup Next.js App

```bash
cd votely-platform
npm install
cp .env.example .env  # Edit dengan credentials Anda
npx prisma generate
npm run dev
```

### 3. Setup Face Recognition API

**Option A: Docker (Recommended)**

```bash
cd face-recognition
docker-compose up -d --build
```

**Option B: Manual**

```bash
cd face-recognition
python -m venv venv
venv/Scripts/activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python api_server.py
```

### 4. Environment Variables

Buat file `.env` di folder `votely-platform/`:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# JWT
JWT_SECRET="your-secret-key"

# Blockchain
NEXT_PUBLIC_CONTRACT_ADDRESS="0x..."
PRIVATE_KEY="your-wallet-private-key"
NEXT_PUBLIC_ALCHEMY_API_KEY="your-alchemy-key"

# Face Recognition API
FACE_RECOGNITION_API_URL="http://localhost:5000"
```

## 🐳 Docker Deployment

### Face Recognition API

```bash
cd face-recognition

# Build & Run
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

### Health Check

```bash
curl http://localhost:5000/health
```

## 📡 API Endpoints

### Face Recognition API (Port 5000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/verify-face` | POST | Verify face against reference |
| `/generate-embedding` | POST | Generate face embedding |

### Next.js API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | User login |
| `/api/auth/register` | POST | User registration |
| `/api/elections` | GET/POST | List/Create elections |
| `/api/vote/cast` | POST | Cast vote to blockchain |

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Face Verification** - 512-dim FaceNet embeddings
- **Blockchain Immutability** - Votes cannot be altered
- **HTTPOnly Cookies** - XSS protection

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- shadcn/ui

**Backend:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Supabase)

**Face Recognition:**
- Python Flask
- TensorFlow / Keras
- MediaPipe
- FaceNet (512-dim)

**Blockchain:**
- Solidity
- Hardhat
- Ethers.js
- Sepolia Testnet

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 👥 Contributors

- Mahesa - [@mahesa005](https://github.com/mahesa005)