# Votely - Arsitektur Blockchain Voting dengan Thirdweb

## Konsep Arsitektur

### Kesalahan Konsep (Yang TIDAK Dilakukan)
**Server Signs untuk Semua User (Custodial - SALAH)**
- Admin wallet menandatangani semua transaksi voting
- Smart contract hanya melihat `msg.sender = 0xAdmin` untuk semua vote
- Tidak ada identitas unik per voter di blockchain
- Rawan manipulasi, tidak transparent

### Arsitektur yang Benar (Yang Dilakukan)
**Thirdweb In-App Wallet + Gasless Transaction**

```
┌─────────────────────────────────────────────────────────────┐
│                    USER LOGIN                                │
│  (Google/Email via Thirdweb In-App Wallet)                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │ Thirdweb Auto-Generate     │
        │ Wallet untuk User          │
        │ • Public Key: 0xUserA...   │
        │ • Private Key: Encrypted   │
        └────────────┬───────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                 USER VOTING                                  │
│                                                              │
│  1. User memilih kandidat                                   │
│  2. Client-side: prepareContractCall()                      │
│  3. User SIGNS transaction dengan wallet mereka sendiri    │
│  4. Transaction dikirim ke Thirdweb Relayer                 │
│                                                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │   Thirdweb Paymaster       │
        │   (Admin Wallet)           │
        │                            │
        │   Melihat signature valid? │
        │   ✓ Ya → Bayar gas         │
        │   ✗ Tidak → Reject         │
        └────────────┬───────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                SMART CONTRACT                                │
│                                                              │
│  msg.sender = 0xUserA (Voter Identity)                      │
│  Validation:                                                 │
│    • hasVoted[0xUserA][electionId] == false?                │
│    • Election is active?                                    │
│    • Candidate exists?                                      │
│                                                              │
│  ✓ Record: votes[electionId][candidateId]++                 │
│  ✓ Mark: hasVoted[0xUserA][electionId] = true               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Komponen Utama

### 1. **Thirdweb In-App Wallet**
```typescript
// User login dengan Google/Email
<ConnectButton
  client={client}
  wallets={[inAppWallet()]}
/>
```

**Yang Terjadi:**
- Thirdweb auto-generate key pair untuk user
- Private key dienkripsi dan di-shard (split storage)
- User tidak perlu install MetaMask
- User tidak perlu backup seed phrase
- **User tetap punya wallet address unik**

### 2. **Client-Side Transaction Signing**
```typescript
// User signs transaction di browser
const transaction = prepareContractCall({
  contract: votingContract,
  method: "function vote(uint256 electionId, uint256 candidateId)",
  params: [BigInt(electionId), BigInt(candidateId)],
})

const receipt = await sendTransaction({
  transaction,
  account, // ← User's In-App Wallet SIGNS disini
})
```

**Yang Terjadi:**
- User's private key signs transaction
- Signature membuktikan "Saya adalah 0xUserA dan saya ingin vote"
- Transaction dikirim dengan identitas user asli

### 3. **Gasless Transaction (Paymaster)**
```typescript
// Admin wallet bayar gas via Thirdweb
// Konfigurasi di Thirdweb Dashboard:
// - Enable Account Abstraction
// - Set Admin Wallet sebagai Paymaster
// - User transaksi gratis
```

**Yang Terjadi:**
- User submit signed transaction
- Thirdweb Relayer cek signature valid
- Admin wallet membayar biaya gas
- **msg.sender tetap 0xUserA** (bukan admin)

## Perbandingan untuk Presentasi

| Aspek | Server Signs (Salah) | Thirdweb In-App (Benar) |
|-------|------------------------|---------------------------|
| **Identitas Voter** | Semua vote dari 0xAdmin | Setiap voter punya address unik |
| **msg.sender** | 0xAdmin untuk semua | 0xUserA, 0xUserB, 0xUserC, ... |
| **Transparansi** | Tidak bisa audit siapa vote apa | Semua vote tercatat per address |
| **Security** | Admin bisa manipulasi | Smart contract enforce 1 vote per address |
| **User Experience** | Mudah (no wallet needed) | Mudah (auto wallet) |
| **Gas Fee** | Admin bayar | Admin bayar via Paymaster |
| **Private Key** | Server simpan semua key | User key encrypted di Thirdweb |

## Flow Lengkap

### Skenario: Mahasiswa A dan B Voting

1. **Mahasiswa A Login**
   ```
   Login → Thirdweb buat wallet → 0xUserA...123
   ```

2. **Mahasiswa A Vote Kandidat 1**
   ```
   Click Vote → Sign dengan 0xUserA...123 → Gas dibayar Admin
   → Smart Contract: hasVoted[0xUserA][1] = true
   → votes[1][candidateId1]++
   ```

3. **Mahasiswa B Login**
   ```
   Login → Thirdweb buat wallet → 0xUserB...456
   ```

4. **Mahasiswa B Vote Kandidat 2**
   ```
   Click Vote → Sign dengan 0xUserB...456 → Gas dibayar Admin
   → Smart Contract: hasVoted[0xUserB][1] = true
   → votes[1][candidateId2]++
   ```

5. **Mahasiswa A Coba Vote Lagi?**
   ```
   Click Vote → Sign dengan 0xUserA...123
   → Smart Contract: hasVoted[0xUserA][1] == true (REJECTED)
   → REVERT: "Already voted"
   ```

## Analogi untuk Juri

### Traditional Blockchain (MetaMask)
- Tamu bawa KTP sendiri (Install wallet)
- Tamu bayar tiket sendiri (Pay gas)

### Server Signing (Salah)
- Admin masuk bilik suara berkali-kali atas nama tamu
- Tidak ada bukti tamu asli yang voting
- **Curang dan tidak valid**

### Thirdweb In-App + Gasless (Benar)
- Panitia cetakkan ID Card unik untuk setiap tamu (Auto wallet)
- Tamu tanda tangan sendiri di kertas suara (Client-side sign)
- Panitia bayar tiket masuk (Gasless via Paymaster)
- **Identitas terjaga, gratis untuk user**

## Keamanan

1. **Setiap user punya wallet unik** → Tidak bisa vote lebih dari 1x
2. **Private key encrypted** → Tidak ada yang bisa akses kecuali user
3. **Smart contract enforce rules** → Admin tidak bisa manipulasi
4. **Blockchain immutable** → Audit trail permanent
5. **Gas paid by admin** → User tidak butuh crypto

## Kesimpulan untuk Presentasi

**Pertanyaan Juri:** "Kenapa tidak pakai 1 wallet admin saja?"

**Jawaban:**
> "Pak/Bu, di blockchain, identitas = wallet address. Jika admin signs semua transaksi, smart contract hanya melihat 1 address (admin) yang voting berkali-kali, sehingga akan reject vote kedua dan seterusnya.
> 
> Solusi kami: Menggunakan Thirdweb In-App Wallet. Setiap mahasiswa otomatis dibuatkan wallet unik saat login pertama kali. Mereka tidak perlu install MetaMask atau simpan seed phrase. Ketika voting, mereka sign transaction dengan wallet mereka sendiri, jadi di blockchain tercatat identitas unik per mahasiswa.
> 
> Admin wallet hanya berperan sebagai 'sponsor' yang membayar biaya gas melalui fitur Account Abstraction, bukan sebagai pengganti identitas pemilih. Jadi tetap transparent, secure, dan user-friendly."

---

**Poin Penting:**
- User tetap punya wallet unik (In-App Wallet otomatis)
- User sign transaction sendiri (Client-side)
- Admin hanya bayar gas (Paymaster)
- Smart contract enforce 1 vote per address
- Transparent dan auditable on-chain
