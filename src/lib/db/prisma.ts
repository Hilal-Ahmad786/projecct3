// Prisma Client Singleton
// Prevents multiple instances in development with hot reloading
// Prisma 7 with pg adapter for direct database connections

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL

// Create Prisma client - lazy loaded to avoid build issues
function createPrismaClient(): PrismaClient {
  if (!databaseUrl) {
    console.warn('DATABASE_URL not set. Database operations will fail.')
    // Return a minimal client - will throw on actual queries but won't crash during build
    const adapter = new PrismaPg({ connectionString: 'postgresql://localhost:5432/dummy' })
    return new PrismaClient({ adapter })
  }

  // Neon pooler caps concurrent connections — keep this process's pool small
  // and release idle connections fast so dev server + Prisma Studio + scripts
  // can coexist without "timed out fetching a connection" errors.
  const adapter = new PrismaPg({
    connectionString: databaseUrl,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  })
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

// Lazy initialization
let prismaInstance: PrismaClient | null = null

export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = globalForPrisma.prisma ?? createPrismaClient()
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance
    }
  }
  return prismaInstance
}

// Export for backwards compatibility - uses lazy getter
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return getPrisma()[prop as keyof PrismaClient]
  },
})

export default prisma
