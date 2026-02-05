import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Find Next.js related services
  const nextServices = await prisma.service.findMany({
    where: {
      slug: { contains: 'next' },
      status: { in: ['published', 'active'] }
    },
    select: { slug: true, name: true }
  });
  console.log('Next.js related:', nextServices);

  // Find corporate/business related services
  const corporateServices = await prisma.service.findMany({
    where: {
      OR: [
        { slug: { contains: 'corporate' } },
        { slug: { contains: 'business' } },
        { name: { contains: 'Corporate' } }
      ],
      status: { in: ['published', 'active'] }
    },
    select: { slug: true, name: true }
  });
  console.log('Corporate related:', corporateServices);

  // Find all web development related
  const webServices = await prisma.service.findMany({
    where: {
      OR: [
        { slug: { contains: 'web' } },
        { slug: { contains: 'website' } },
      ],
      status: { in: ['published', 'active'] }
    },
    select: { slug: true, name: true }
  });
  console.log('Web related:', webServices);

  await prisma.$disconnect();
}
main();
