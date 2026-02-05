/**
 * Verify all hero section translations are properly in place
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

async function verifyHeroTranslations() {
  console.log('=== Verifying Hero Section Translations ===\n');

  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    include: { translations: true },
    orderBy: { slug: 'asc' }
  });

  let totalChecked = 0;
  let fullyTranslated = 0;
  const issues: { slug: string; problems: string[] }[] = [];

  for (const service of services) {
    totalChecked++;
    const problems: string[] = [];

    // Check if English has fullDescription
    if (!service.fullDescription) {
      problems.push('EN: missing fullDescription');
    }

    // Check each locale
    for (const locale of LOCALES) {
      const t = service.translations.find(t => t.locale === locale);

      if (!t) {
        problems.push(`${locale.toUpperCase()}: no translation record`);
      } else {
        // Check name
        if (!t.name || t.name === service.name) {
          problems.push(`${locale.toUpperCase()}: name not translated`);
        }

        // Check fullDescription (hero description)
        if (!t.fullDescription) {
          problems.push(`${locale.toUpperCase()}: missing fullDescription`);
        } else if (t.fullDescription === service.fullDescription) {
          problems.push(`${locale.toUpperCase()}: fullDescription same as English`);
        }
      }
    }

    if (problems.length === 0) {
      fullyTranslated++;
    } else {
      issues.push({ slug: service.slug, problems });
    }
  }

  // Summary
  console.log(`Total services: ${totalChecked}`);
  console.log(`Fully translated (name + fullDescription in all locales): ${fullyTranslated}`);
  console.log(`With issues: ${issues.length}`);

  // Show services with issues (limit to first 20)
  if (issues.length > 0) {
    console.log('\n=== Services with Hero Translation Issues ===\n');
    const toShow = issues.slice(0, 20);
    for (const { slug, problems } of toShow) {
      console.log(`${slug}:`);
      problems.forEach(p => console.log(`  - ${p}`));
    }
    if (issues.length > 20) {
      console.log(`\n... and ${issues.length - 20} more services with issues`);
    }
  }

  // Sample of fully working services
  console.log('\n=== Sample Fully Translated Services ===\n');
  const working = services.filter(s => !issues.find(i => i.slug === s.slug));
  const samples = working.slice(0, 5);

  for (const s of samples) {
    console.log(`\n${s.slug}:`);
    console.log(`  EN: ${s.fullDescription?.substring(0, 60)}...`);

    for (const locale of LOCALES) {
      const t = s.translations.find(t => t.locale === locale);
      if (t) {
        console.log(`  ${locale.toUpperCase()}: ${t.fullDescription?.substring(0, 50)}...`);
      }
    }
  }

  await prisma.$disconnect();
}

verifyHeroTranslations();
