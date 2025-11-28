import { prisma } from "@/lib/prisma";
import type { Election, Candidate, Vote } from "@prisma/client";

/**
 * Get all elections
 */
export async function getAllElections() {
  return await prisma.election.findMany({
    include: {
      candidates: true,
      creator: {
        include: {
          penduduk: true
        }
      }
    },
    orderBy: {
      startTime: 'desc'
    }
  });
}

/**
 * Get election by ID
 */
export async function getElectionById(id: string) {
  return await prisma.election.findUnique({
    where: { id: BigInt(id) },
    include: {
      candidates: true,
      creator: {
        include: {
          penduduk: true
        }
      }
    }
  });
}

/**
 * Get elections by level (NASIONAL, PROVINSI, KOTA, KECAMATAN)
 */
export async function getElectionsByLevel(level: string) {
  return await prisma.election.findMany({
    where: { level },
    include: {
      candidates: true
    },
    orderBy: {
      startTime: 'desc'
    }
  });
}

/**
 * Get elections by province
 */
export async function getElectionsByProvince(province: string) {
  return await prisma.election.findMany({
    where: {
      OR: [
        { level: 'NASIONAL' },
        { province }
      ]
    },
    include: {
      candidates: true
    },
    orderBy: {
      startTime: 'desc'
    }
  });
}

/**
 * Get elections by city
 */
export async function getElectionsByCity(city: string, province: string) {
  return await prisma.election.findMany({
    where: {
      OR: [
        { level: 'NASIONAL' },
        { 
          level: 'PROVINSI',
          province 
        },
        { 
          level: 'KOTA',
          city,
          province
        }
      ]
    },
    include: {
      candidates: true
    },
    orderBy: {
      startTime: 'desc'
    }
  });
}

/**
 * Get elections for a specific user based on their location
 */
export async function getElectionsForUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      penduduk: true
    }
  });

  if (!user || !user.penduduk) {
    throw new Error('User or citizen data not found');
  }

  return await prisma.election.findMany({
    where: {
      OR: [
        { level: 'NASIONAL' },
        { 
          level: 'PROVINSI',
          province: user.penduduk.provinsi
        },
        {
          level: 'KOTA',
          city: user.penduduk.kabKota,
          province: user.penduduk.provinsi
        }
      ]
    },
    include: {
      candidates: true
    },
    orderBy: {
      startTime: 'desc'
    }
  });
}

/**
 * Get active elections (currently ongoing)
 */
export async function getActiveElections() {
  const now = new Date();
  return await prisma.election.findMany({
    where: {
      startTime: { lte: now },
      endTime: { gte: now }
    },
    include: {
      candidates: true
    },
    orderBy: {
      startTime: 'desc'
    }
  });
}

/**
 * Get upcoming elections
 */
export async function getUpcomingElections() {
  const now = new Date();
  return await prisma.election.findMany({
    where: {
      startTime: { gt: now }
    },
    include: {
      candidates: true
    },
    orderBy: {
      startTime: 'asc'
    }
  });
}

/**
 * Get finished elections
 */
export async function getFinishedElections() {
  const now = new Date();
  return await prisma.election.findMany({
    where: {
      endTime: { lt: now }
    },
    include: {
      candidates: true
    },
    orderBy: {
      endTime: 'desc'
    }
  });
}

/**
 * Create new election
 */
export async function createElection(data: {
  name: string;
  description: string;
  level: string;
  city?: string;
  province?: string;
  startTime: Date;
  endTime: Date;
  createdBy: string;
  chainElectionId?: bigint;
}) {
  return await prisma.election.create({
    data,
    include: {
      candidates: true
    }
  });
}

/**
 * Update election
 */
export async function updateElection(id: string, data: Partial<Election>) {
  return await prisma.election.update({
    where: { id: BigInt(id) },
    data,
    include: {
      candidates: true
    }
  });
}

/**
 * Delete election
 */
export async function deleteElection(id: string) {
  return await prisma.election.delete({
    where: { id: BigInt(id) }
  });
}

/**
 * Add candidate to election
 */
export async function addCandidate(data: {
  electionId: string;
  name: string;
  party: string;
  description?: string;
  photoUrl?: string;
  orderIndex: number;
}) {
  return await prisma.candidate.create({
    data: {
      electionId: BigInt(data.electionId),
      name: data.name,
      party: data.party,
      description: data.description,
      photoUrl: data.photoUrl,
      orderIndex: data.orderIndex
    }
  });
}

/**
 * Get candidates for an election
 */
export async function getCandidatesByElection(electionId: string) {
  return await prisma.candidate.findMany({
    where: { electionId: BigInt(electionId) },
    orderBy: {
      orderIndex: 'asc'
    }
  });
}

/**
 * Check if user has voted in an election
 */
export async function hasUserVoted(userId: string, electionId: string) {
  const vote = await prisma.vote.findUnique({
    where: {
      userId_electionId: {
        userId,
        electionId: BigInt(electionId)
      }
    }
  });
  return !!vote;
}

/**
 * Record a vote
 */
export async function recordVote(data: {
  userId: string;
  electionId: string;
  candidateId: string;
  txHash?: string;
  sourceIp?: string;
  userAgent?: string;
}) {
  return await prisma.vote.create({
    data: {
      userId: data.userId,
      electionId: BigInt(data.electionId),
      candidateId: BigInt(data.candidateId),
      txHash: data.txHash,
      sourceIp: data.sourceIp,
      userAgent: data.userAgent
    }
  });
}

/**
 * Get vote results for an election
 */
export async function getElectionResults(electionId: string) {
  const votes = await prisma.vote.groupBy({
    by: ['candidateId'],
    where: {
      electionId: BigInt(electionId)
    },
    _count: {
      candidateId: true
    }
  });

  const candidates = await getCandidatesByElection(electionId);
  
  return candidates.map(candidate => ({
    candidate,
    voteCount: votes.find(v => v.candidateId === candidate.id)?._count.candidateId || 0
  }));
}

/**
 * Get election status
 */
export function getElectionStatus(election: Election): 'upcoming' | 'active' | 'finished' {
  const now = new Date();
  
  if (election.statusOverride) {
    return election.statusOverride as 'upcoming' | 'active' | 'finished';
  }
  
  if (now < election.startTime) {
    return 'upcoming';
  } else if (now >= election.startTime && now <= election.endTime) {
    return 'active';
  } else {
    return 'finished';
  }
}
