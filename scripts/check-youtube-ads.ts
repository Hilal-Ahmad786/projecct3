/**
 * Check YouTube Ads service translations in detail
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function checkYoutubeAds() {
  const service = await prisma.service.findFirst({
    where: { slug: 'youtube-ads' },
    include: { translations: true }
  });

  if (!service) {
    console.log('Service not found');
    return;
  }

  console.log('=== YouTube Ads Service ===\n');
  console.log('Base (EN):');
  console.log(`  Name: ${service.name}`);
  console.log(`  Short Description: ${service.shortDescription}`);
  console.log(`  Full Description: ${service.fullDescription?.substring(0, 100)}...`);

  for (const t of service.translations) {
    console.log(`\n${t.locale.toUpperCase()}:`);
    console.log(`  Name: ${t.name}`);
    console.log(`  Short Description: ${t.shortDescription}`);
    console.log(`  Same as EN? ${t.shortDescription === service.shortDescription}`);
  }

  await prisma.$disconnect();
}

checkYoutubeAds();
