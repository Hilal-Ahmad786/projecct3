// Prisma Client Singleton
// Prevents multiple instances in development with hot reloading
// Prisma 7 with pg adapter for direct database connections

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined; pool: Pool | undefined }

const databaseUrl = process.env.DATABASE_URL

// Create Prisma client with pg adapter for Prisma 7
function createPrismaClient(): PrismaClient {
  // If no database URL is set during build, return a minimal client
  if (!databaseUrl) {
    console.warn('DATABASE_URL not set. Creating minimal Prisma client.')
    // Return a client that will fail on actual queries but won't crash during build
    const pool = new Pool({ connectionString: 'postgresql://localhost:5432/placeholder' })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  }

  // Create pg Pool
  const pool = new Pool({ connectionString: databaseUrl })
  globalForPrisma.pool = pool

  // Create adapter
  const adapter = new PrismaPg(pool)

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Helper for compatibility
export function getPrisma(): PrismaClient {
  return prisma
}

export default prisma
