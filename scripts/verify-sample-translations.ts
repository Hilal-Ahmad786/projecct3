/**
 * Verify sample translations are working correctly
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

const SAMPLES = ['youtube-ads', 'facebook-ads', 'web-development', 'seo', 'e-commerce'];
const LOCALES = ['de', 'tr', 'ur', 'ar'];

async function verifySamples() {
  console.log('=== Sample Translation Verification ===\n');

  for (const slug of SAMPLES) {
    const service = await prisma.service.findFirst({
      where: { slug },
      include: { translations: true }
    });

    if (!service) continue;

    console.log(`\n${'='.repeat(60)}`);
    console.log(`SERVICE: ${service.name} (${slug})`);
    console.log(`${'='.repeat(60)}`);
    console.log(`Base Features: ${service.features?.slice(0, 2).join(', ')}...`);
    console.log(`Base Benefits: ${service.benefits?.slice(0, 2).join(', ')}...`);

    for (const locale of LOCALES) {
      const t = service.translations.find(t => t.locale === locale);
      if (t) {
        console.log(`\n[${locale.toUpperCase()}] ${t.name}`);
        console.log(`  Features: ${t.features?.slice(0, 2).join(', ') || 'NONE'}...`);
        console.log(`  Benefits: ${t.benefits?.slice(0, 2).join(', ') || 'NONE'}...`);
        const content = t.content as any;
        if (content?.process?.[0]) {
          console.log(`  Process[0]: ${content.process[0].title}`);
        }
        if (content?.faq?.[0]) {
          console.log(`  FAQ[0]: ${content.faq[0].question}`);
        }
      }
    }
  }

  // Summary stats
  console.log('\n\n=== OVERALL STATISTICS ===\n');

  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    include: { translations: true }
  });

  let withTranslatedFeatures = 0;
  let withTranslatedBenefits = 0;
  let withTranslatedProcess = 0;
  let withTranslatedFAQ = 0;

  for (const service of services) {
    for (const locale of LOCALES) {
      const t = service.translations.find(t => t.locale === locale);
      if (t) {
        if (t.features && t.features.length > 0) withTranslatedFeatures++;
        if (t.benefits && t.benefits.length > 0) withTranslatedBenefits++;
        const content = t.content as any;
        if (content?.process?.length > 0) withTranslatedProcess++;
        if (content?.faq?.length > 0) withTranslatedFAQ++;
      }
    }
  }

  const totalTranslations = services.length * 4;
  console.log(`Total services: ${services.length}`);
  console.log(`Total locale translations: ${totalTranslations}`);
  console.log(`Translations with features: ${withTranslatedFeatures} (${Math.round(withTranslatedFeatures/totalTranslations*100)}%)`);
  console.log(`Translations with benefits: ${withTranslatedBenefits} (${Math.round(withTranslatedBenefits/totalTranslations*100)}%)`);
  console.log(`Translations with process: ${withTranslatedProcess} (${Math.round(withTranslatedProcess/totalTranslations*100)}%)`);
  console.log(`Translations with FAQ: ${withTranslatedFAQ} (${Math.round(withTranslatedFAQ/totalTranslations*100)}%)`);

  await prisma.$disconnect();
}

verifySamples();
