/**
 * Check YouTube Ads fullDescription translations
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function checkYoutubeFullDesc() {
  const service = await prisma.service.findFirst({
    where: { slug: 'youtube-ads' },
    include: { translations: true }
  });

  if (!service) {
    console.log('Service not found');
    return;
  }

  console.log('=== YouTube Ads fullDescription Check ===\n');
  console.log('Base (EN):');
  console.log(`  fullDescription: ${service.fullDescription}`);

  for (const t of service.translations) {
    console.log(`\n${t.locale.toUpperCase()}:`);
    console.log(`  Name: ${t.name}`);
    console.log(`  fullDescription: ${t.fullDescription}`);
    console.log(`  Same as EN? ${t.fullDescription === service.fullDescription}`);
  }

  await prisma.$disconnect();
}

checkYoutubeFullDesc();
