import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

const LOCALES = ['tr', 'de', 'ur', 'ar'];

async function checkMissing() {
  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    include: { translations: true }
  });

  console.log('=== Services with missing translations ===\n');

  for (const service of services) {
    const translatedLocales = service.translations.filter(t => t.name !== service.name).map(t => t.locale);

    if (translatedLocales.length < 4 && translatedLocales.length > 0) {
      const missingOrEnglish = LOCALES.filter(l => !translatedLocales.includes(l));
      console.log(`${service.slug}:`);
      console.log(`  Translated: ${translatedLocales.join(', ')}`);
      console.log(`  Missing/English: ${missingOrEnglish.join(', ')}`);

      for (const locale of missingOrEnglish) {
        const t = service.translations.find(t => t.locale === locale);
        if (t) {
          console.log(`    ${locale}: "${t.name}" (same as English? ${t.name === service.name})`);
        } else {
          console.log(`    ${locale}: NO RECORD`);
        }
      }
      console.log('');
    }
  }

  await prisma.$disconnect();
}

checkMissing();
