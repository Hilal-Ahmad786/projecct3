/**
 * Verify translations were applied correctly
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

const LOCALES = ['tr', 'de', 'ur', 'ar'];

async function verify() {
  console.log('=== Translation Verification Report ===\n');

  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    include: { translations: true }
  });

  let fullyTranslated = 0;
  let partiallyTranslated = 0;

  for (const service of services) {
    // Check if all 4 non-English locales have proper translations
    // A proper translation has either a different name OR has German description (for technical terms)
    let hasAllLocales = true;

    for (const locale of LOCALES) {
      const t = service.translations.find(t => t.locale === locale);
      if (!t) {
        hasAllLocales = false;
        break;
      }
      // Check if translation has localized content (shortDescription or metaDescription in that locale)
      if (!t.shortDescription && !t.metaDescription) {
        hasAllLocales = false;
        break;
      }
    }

    if (hasAllLocales) {
      fullyTranslated++;
    } else {
      partiallyTranslated++;
    }
  }

  console.log(`Total services: ${services.length}`);
  console.log(`Fully translated (all 4 locales with content): ${fullyTranslated}`);
  console.log(`Partially translated or missing content: ${partiallyTranslated}`);

  // Show some examples of fully translated services
  console.log('\n=== Sample Translations ===\n');

  const samples = ['e-commerce', 'computer-vision', 'whatsapp-business-api', 'web-development'];

  for (const slug of samples) {
    const service = services.find(s => s.slug === slug);
    if (service) {
      console.log(`${slug} (EN: ${service.name}):`);
      for (const locale of LOCALES) {
        const t = service.translations.find(t => t.locale === locale);
        if (t) {
          console.log(`  [${locale.toUpperCase()}] ${t.name} - Has desc: ${!!t.shortDescription}`);
        } else {
          console.log(`  [${locale.toUpperCase()}] MISSING`);
        }
      }
      console.log('');
    }
  }

  await prisma.$disconnect();
}

verify();
