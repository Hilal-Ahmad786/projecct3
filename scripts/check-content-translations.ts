/**
 * Check which services have untranslated detailed content
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

async function checkContentTranslations() {
  console.log('=== Checking Content Translation Status ===\n');

  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    include: { translations: true }
  });

  let servicesWithContent = 0;
  let translationsWithContent = 0;
  let translationsNeedingContent = 0;

  const needsTranslation: string[] = [];

  for (const service of services) {
    // Check if base service has detailed content
    const hasContent = service.features?.length > 0 ||
                       service.benefits?.length > 0 ||
                       (service.content as any)?.process?.length > 0 ||
                       (service.content as any)?.faq?.length > 0;

    if (hasContent) {
      servicesWithContent++;

      // Check each locale translation
      for (const locale of LOCALES) {
        const t = service.translations.find(t => t.locale === locale);
        if (t) {
          const hasTranslatedContent =
            (t.features?.length > 0 && t.features[0] !== service.features?.[0]) ||
            (t.benefits?.length > 0 && t.benefits[0] !== service.benefits?.[0]) ||
            ((t.content as any)?.process?.[0]?.title !== (service.content as any)?.process?.[0]?.title);

          if (hasTranslatedContent) {
            translationsWithContent++;
          } else {
            translationsNeedingContent++;
            if (!needsTranslation.includes(service.slug)) {
              needsTranslation.push(service.slug);
            }
          }
        }
      }
    }
  }

  console.log(`Services with detailed content: ${servicesWithContent}`);
  console.log(`Translations with translated content: ${translationsWithContent}`);
  console.log(`Translations needing content translation: ${translationsNeedingContent}`);
  console.log(`\nServices needing content translation: ${needsTranslation.length}`);

  // Show sample of what content looks like
  console.log('\n=== Sample Service Content (youtube-ads) ===\n');

  const sample = services.find(s => s.slug === 'youtube-ads');
  if (sample) {
    console.log('Features:', sample.features?.slice(0, 3));
    console.log('Benefits:', sample.benefits?.slice(0, 3));
    const content = sample.content as any;
    console.log('Process:', content?.process?.slice(0, 2));
    console.log('FAQ:', content?.faq?.slice(0, 2));

    // Check DE translation
    const deTrans = sample.translations.find(t => t.locale === 'de');
    if (deTrans) {
      console.log('\n--- DE Translation ---');
      console.log('Features:', deTrans.features?.slice(0, 3));
      console.log('Benefits:', deTrans.benefits?.slice(0, 3));
      const deContent = deTrans.content as any;
      console.log('Process:', deContent?.process?.slice(0, 2));
    }
  }

  await prisma.$disconnect();
}

checkContentTranslations();
