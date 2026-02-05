import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function report() {
  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    include: { translations: true },
    orderBy: { order: 'asc' }
  });

  const fullyTranslated: string[] = [];
  const partiallyTranslated: string[] = [];
  const notTranslated: string[] = [];

  for (const service of services) {
    const translatedCount = service.translations.filter(t => t.name !== service.name).length;
    const totalTranslations = service.translations.length;

    if (translatedCount === 4) {
      fullyTranslated.push(service.slug);
    } else if (translatedCount > 0) {
      partiallyTranslated.push(`${service.slug} (${translatedCount}/4)`);
    } else if (totalTranslations > 0) {
      notTranslated.push(service.slug);
    }
  }

  console.log('=== TRANSLATION REPORT ===\n');

  console.log(`✅ FULLY TRANSLATED (${fullyTranslated.length} services):`);
  fullyTranslated.slice(0, 20).forEach(s => console.log('   ' + s));
  if (fullyTranslated.length > 20) console.log(`   ... and ${fullyTranslated.length - 20} more`);

  console.log(`\n⚠️  PARTIALLY TRANSLATED (${partiallyTranslated.length} services):`);
  partiallyTranslated.slice(0, 10).forEach(s => console.log('   ' + s));
  if (partiallyTranslated.length > 10) console.log(`   ... and ${partiallyTranslated.length - 10} more`);

  console.log(`\n❌ NOT TRANSLATED - English placeholders (${notTranslated.length} services):`);
  notTranslated.slice(0, 10).forEach(s => console.log('   ' + s));
  if (notTranslated.length > 10) console.log(`   ... and ${notTranslated.length - 10} more`);

  console.log('\n=== SUMMARY ===');
  console.log(`Total services: ${services.length}`);
  console.log(`Fully translated: ${fullyTranslated.length}`);
  console.log(`Partially translated: ${partiallyTranslated.length}`);
  console.log(`Not translated (placeholders): ${notTranslated.length}`);

  await prisma.$disconnect();
}

report();
