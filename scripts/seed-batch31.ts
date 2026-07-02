// Targeted seeder: upserts ONLY the 18 web-software services in data/services/batch31.json.
// Mirrors scripts/seed-manual.ts upsert logic but scoped to a single file so existing
// services in the DB are never touched. Idempotent (upsert by slug).
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { prisma } from '../src/lib/db/prisma';

async function main() {
  const filePath = path.join(process.cwd(), 'data', 'services', 'batch31.json');
  const parsedData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const slugs = Object.keys(parsedData);
  console.log(`Seeding ${slugs.length} services from batch31.json...`);

  for (const slug of slugs) {
    const serviceData = parsedData[slug];
    const en = serviceData['en'];
    if (!en) {
      console.error(`No English (en) data for ${slug}. Skipping.`);
      continue;
    }

    const upsertedService = await prisma.service.upsert({
      where: { slug },
      update: {
        name: en.name,
        shortDescription: en.shortDescription,
        fullDescription: en.fullDescription,
        features: en.features || [],
        benefits: en.benefits || [],
        content: en.content as any,
      },
      create: {
        slug,
        name: en.name,
        shortDescription: en.shortDescription,
        fullDescription: en.fullDescription,
        features: en.features || [],
        benefits: en.benefits || [],
        content: en.content as any,
        status: 'published',
      },
    });

    for (const locale of ['en', 'tr', 'de', 'ur', 'ar']) {
      const locData = serviceData[locale];
      if (!locData) continue;
      await prisma.serviceTranslation.upsert({
        where: { serviceId_locale: { serviceId: upsertedService.id, locale } },
        update: {
          name: locData.name,
          shortDescription: locData.shortDescription,
          fullDescription: locData.fullDescription,
          features: locData.features || [],
          benefits: locData.benefits || [],
          content: locData.content as any,
          metaTitle: locData.metaTitle,
          metaDescription: locData.metaDescription,
        },
        create: {
          serviceId: upsertedService.id,
          locale,
          name: locData.name,
          shortDescription: locData.shortDescription,
          fullDescription: locData.fullDescription,
          features: locData.features || [],
          benefits: locData.benefits || [],
          content: locData.content as any,
          metaTitle: locData.metaTitle,
          metaDescription: locData.metaDescription,
        },
      });
    }
    console.log(`  ✓ ${slug}`);
  }
  console.log('--- Done seeding batch31 ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
