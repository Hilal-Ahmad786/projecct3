/**
 * Check hero section status for all services
 * - Translation status (name, shortDescription) in all 5 languages
 * - Animation configuration status
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];

interface AnimationConfig {
  heroVisual?: string;
  bgPattern?: string;
  decorations?: string;
  motion?: string;
  featureStyle?: string;
  processLayout?: string;
}

async function checkHeroStatus() {
  console.log('=== Service Hero Section Status Report ===\n');

  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    include: { translations: true },
    orderBy: { slug: 'asc' }
  });

  let withAnimation = 0;
  let withoutAnimation = 0;
  let fullyTranslated = 0;
  let partiallyTranslated = 0;

  const missingAnimations: string[] = [];
  const missingTranslations: { slug: string; missing: string[] }[] = [];

  for (const service of services) {
    // Check animation
    const content = service.content as any || {};
    const animation: AnimationConfig = content.animation || {};
    const hasAnimation = !!(animation.heroVisual && animation.bgPattern && animation.motion);

    if (hasAnimation) {
      withAnimation++;
    } else {
      withoutAnimation++;
      missingAnimations.push(service.slug);
    }

    // Check translations
    const missingLocales: string[] = [];

    // Check English (base service)
    if (!service.name || !service.shortDescription) {
      missingLocales.push('en');
    }

    // Check other locales
    for (const locale of ['tr', 'de', 'ur', 'ar']) {
      const translation = service.translations.find(t => t.locale === locale);
      if (!translation || !translation.name || !translation.shortDescription) {
        missingLocales.push(locale);
      } else if (translation.name === service.name) {
        // Name is same as English - not translated
        missingLocales.push(`${locale}(name)`);
      }
    }

    if (missingLocales.length === 0) {
      fullyTranslated++;
    } else {
      partiallyTranslated++;
      if (missingLocales.some(l => !l.includes('(name)'))) {
        missingTranslations.push({ slug: service.slug, missing: missingLocales });
      }
    }
  }

  // Summary
  console.log('=== SUMMARY ===\n');
  console.log(`Total services: ${services.length}`);
  console.log(`\n--- Animation Status ---`);
  console.log(`With animation: ${withAnimation} (${Math.round(withAnimation/services.length*100)}%)`);
  console.log(`Without animation: ${withoutAnimation} (${Math.round(withoutAnimation/services.length*100)}%)`);
  console.log(`\n--- Translation Status ---`);
  console.log(`Fully translated (all 5 locales): ${fullyTranslated}`);
  console.log(`Partially translated: ${partiallyTranslated}`);

  // Show services without animation
  if (missingAnimations.length > 0 && missingAnimations.length <= 50) {
    console.log(`\n=== Services WITHOUT Animation (${missingAnimations.length}) ===`);
    missingAnimations.forEach(s => console.log(`  - ${s}`));
  } else if (missingAnimations.length > 50) {
    console.log(`\n=== Services WITHOUT Animation (showing first 50 of ${missingAnimations.length}) ===`);
    missingAnimations.slice(0, 50).forEach(s => console.log(`  - ${s}`));
  }

  // Show services with missing translations
  if (missingTranslations.length > 0 && missingTranslations.length <= 20) {
    console.log(`\n=== Services with Missing Translations ===`);
    missingTranslations.forEach(({ slug, missing }) => {
      console.log(`  - ${slug}: missing ${missing.join(', ')}`);
    });
  }

  // Sample services with animation
  console.log(`\n=== Sample Services WITH Animation ===`);
  const withAnimSamples = services.filter(s => {
    const content = s.content as any || {};
    return content.animation?.heroVisual;
  }).slice(0, 5);

  for (const s of withAnimSamples) {
    const content = s.content as any;
    const anim = content.animation;
    console.log(`\n${s.slug}:`);
    console.log(`  heroVisual: ${anim.heroVisual}`);
    console.log(`  bgPattern: ${anim.bgPattern}`);
    console.log(`  decorations: ${anim.decorations}`);
    console.log(`  motion: ${anim.motion}`);
  }

  await prisma.$disconnect();
}

checkHeroStatus();
