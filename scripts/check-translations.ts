import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function check() {
  // Get a sample service with translations
  const service = await prisma.service.findFirst({
    where: { slug: 'web-development' },
    include: { translations: true }
  });

  if (!service) {
    console.log('Service not found');
    return;
  }

  console.log('=== Sample: web-development ===');
  console.log('English (base):', service.name);
  console.log('');

  for (const t of service.translations) {
    console.log(`${t.locale.toUpperCase()} Translation:`);
    console.log('  Name:', t.name);
    console.log('  Short Desc:', (t.shortDescription || '').slice(0, 60) + '...');
  }

  console.log('');

  // Count translations status
  const allTranslations = await prisma.serviceTranslation.findMany({
    include: { service: true }
  });

  let sameAsEnglish = 0;
  let translated = 0;

  for (const t of allTranslations) {
    if (t.name === t.service.name) {
      sameAsEnglish++;
    } else {
      translated++;
    }
  }

  console.log('=== Translation Status Summary ===');
  console.log('Total translation records:', allTranslations.length);
  console.log('Still English (placeholders):', sameAsEnglish);
  console.log('Actually translated:', translated);
  console.log('');

  if (sameAsEnglish > 0 && translated === 0) {
    console.log('⚠️  All translations are currently English placeholders.');
    console.log('   You need to add actual translations via Admin Panel.');
  }

  await prisma.$disconnect();
}

check();
