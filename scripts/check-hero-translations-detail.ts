/**
 * Detailed check of hero translations
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function checkHeroTranslations() {
  console.log('=== Hero Section Translation Status ===\n');

  const services = await prisma.service.findMany({
    where: {
      status: { in: ['published', 'active'] },
      slug: { not: 'something' } // Exclude test service
    },
    include: { translations: true },
    orderBy: { slug: 'asc' }
  });

  const issues: { slug: string; issues: string[] }[] = [];

  for (const service of services) {
    const serviceIssues: string[] = [];

    // Check English base
    if (!service.shortDescription) {
      serviceIssues.push('EN: missing shortDescription');
    }

    // Check other locales
    for (const locale of ['tr', 'de', 'ur', 'ar']) {
      const t = service.translations.find(t => t.locale === locale);
      if (!t) {
        serviceIssues.push(`${locale.toUpperCase()}: no translation record`);
      } else {
        if (!t.shortDescription) {
          serviceIssues.push(`${locale.toUpperCase()}: missing shortDescription`);
        }
      }
    }

    if (serviceIssues.length > 0) {
      issues.push({ slug: service.slug, issues: serviceIssues });
    }
  }

  // Summary
  console.log(`Total services checked: ${services.length}`);
  console.log(`Services with issues: ${issues.length}`);
  console.log(`Services fully translated: ${services.length - issues.length}`);

  if (issues.length > 0) {
    console.log('\n=== Services with Translation Issues ===\n');
    issues.forEach(({ slug, issues: i }) => {
      console.log(`${slug}:`);
      i.forEach(issue => console.log(`  - ${issue}`));
    });
  }

  // Sample of fully working services
  console.log('\n=== Sample Fully Translated Services ===\n');
  const samples = services
    .filter(s => !issues.find(i => i.slug === s.slug))
    .slice(0, 5);

  for (const s of samples) {
    console.log(`\n${s.slug} (${s.name}):`);
    console.log(`  EN: ${s.shortDescription?.substring(0, 50)}...`);
    for (const locale of ['tr', 'de', 'ur', 'ar']) {
      const t = s.translations.find(t => t.locale === locale);
      if (t) {
        console.log(`  ${locale.toUpperCase()}: ${t.name} - ${t.shortDescription?.substring(0, 40)}...`);
      }
    }
  }

  await prisma.$disconnect();
}

checkHeroTranslations();
