/**
 * Singleton Prisma client wrapper
 *
 * Purpose:
 * - Create and export a single PrismaClient instance for the app.
 * - During local development (hot reload) reuse the same instance so we don't
 *   create a new DB connection on every module reload.
 *
 * Why this is important:
 * - Prevents connection exhaustion when the dev server reloads frequently.
 * - Keeps a single, central DB client for all code to import: `import { prisma } from '@/lib/prisma'`
 */

import { PrismaClient } from '../generated/prisma/client' // generated client (adjust path if you use @prisma/client)

// Extend the global scope so TypeScript knows about the cached client.
// Use `__prisma` to store a single client instance across module reloads.
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

// If there is already a cached client in the global object reuse it,
// otherwise create a new PrismaClient instance.
const prisma = global.__prisma ?? new PrismaClient()

// Only cache the instance in non-production environments to avoid issues
// with long-running serverless handlers / platform expectations in production.
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma

// Export the shared client for the rest of the application to use.
export { prisma }