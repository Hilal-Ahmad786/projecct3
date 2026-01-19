// Prisma Client Singleton
// Prevents multiple instances in development with hot reloading
// Prisma 7 with pg adapter for direct database connections

import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

const databaseUrl = process.env.DATABASE_URL

// Create Prisma client - lazy loaded to avoid build issues
function createPrismaClient(): PrismaClient {
  // During build or when no DATABASE_URL, return a basic client
  // This prevents build failures when the database isn't available
  if (!databaseUrl) {
    console.warn('DATABASE_URL not set. Database operations will fail.')
    // Return a client that will throw on actual queries
    // but won't crash during build/static generation
    return new PrismaClient()
  }

  // For Prisma 7 with driver adapters, we can use the connection URL directly
  // The adapter setup is handled automatically when DATABASE_URL is set
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
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
