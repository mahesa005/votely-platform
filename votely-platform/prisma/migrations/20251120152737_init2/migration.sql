-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'WARGA');

-- CreateTable
CREATE TABLE "Penduduk" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'WARGA',
    "pendudukId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "elections" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "level" VARCHAR(20) NOT NULL,
    "city" VARCHAR(100),
    "province" VARCHAR(100),
    "start_time" TIMESTAMPTZ NOT NULL,
    "end_time" TIMESTAMPTZ NOT NULL,
    "chain_election_id" BIGINT,
    "status_override" VARCHAR(20),
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "elections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidates" (
    "id" BIGSERIAL NOT NULL,
    "election_id" BIGINT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "party" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "photo_url" TEXT,
    "order_index" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "election_id" BIGINT NOT NULL,
    "candidate_id" BIGINT NOT NULL,
    "tx_hash" VARCHAR(100),
    "cast_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source_ip" INET,
    "user_agent" TEXT,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "election_stats_cache" (
    "election_id" BIGINT NOT NULL,
    "candidate_id" BIGINT NOT NULL,
    "votes_count" BIGINT NOT NULL DEFAULT 0,
    "last_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "election_stats_cache_pkey" PRIMARY KEY ("election_id","candidate_id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" BIGSERIAL NOT NULL,
    "user_id" TEXT,
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" VARCHAR(100) NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Penduduk_nik_key" ON "Penduduk"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "User_pendudukId_key" ON "User"("pendudukId");

-- CreateIndex
CREATE INDEX "elections_level_city_province_idx" ON "elections"("level", "city", "province");

-- CreateIndex
CREATE INDEX "elections_start_time_idx" ON "elections"("start_time");

-- CreateIndex
CREATE INDEX "elections_end_time_idx" ON "elections"("end_time");

-- CreateIndex
CREATE INDEX "candidates_election_id_order_index_idx" ON "candidates"("election_id", "order_index");

-- CreateIndex
CREATE INDEX "votes_election_id_candidate_id_idx" ON "votes"("election_id", "candidate_id");

-- CreateIndex
CREATE INDEX "votes_tx_hash_idx" ON "votes"("tx_hash");

-- CreateIndex
CREATE UNIQUE INDEX "votes_user_id_election_id_key" ON "votes"("user_id", "election_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elections" ADD CONSTRAINT "elections_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_election_id_fkey" FOREIGN KEY ("election_id") REFERENCES "elections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_election_id_fkey" FOREIGN KEY ("election_id") REFERENCES "elections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "election_stats_cache" ADD CONSTRAINT "election_stats_cache_election_id_fkey" FOREIGN KEY ("election_id") REFERENCES "elections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "election_stats_cache" ADD CONSTRAINT "election_stats_cache_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
