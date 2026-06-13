import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { prisma } from '../src/lib/db/prisma';

async function main() {
  const dataDir = path.join(process.cwd(), 'data', 'services');
  if (!fs.existsSync(dataDir)) {
    console.error(`Directory not found: ${dataDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  if (files.length === 0) {
    console.log('No JSON files found in data/services to process.');
    return;
  }

  for (const file of files) {
    console.log(`\n--- Processing file: ${file} ---`);
    const filePath = path.join(dataDir, file);
    const contentStr = fs.readFileSync(filePath, 'utf8');
    
    let parsedData;
    try {
      parsedData = JSON.parse(contentStr);
    } catch (err) {
      console.error(`Failed to parse JSON in ${file}. Skipping...`);
      continue;
    }

    const slugs = Object.keys(parsedData);
    for (const slug of slugs) {
      console.log(`Saving ${slug} to the database...`);
      const serviceData = parsedData[slug];

      // We need to look up parent info if needed, but for manual seed, we'll assume it exists or isn't required.
      // If parent is required, we can try to extract it from the object if we included it, 
      // but otherwise we'll just upsert normally.
      
      const en = serviceData['en'];
      if (!en) {
        console.error(`No English (en) data found for ${slug}. Skipping database upsert.`);
        continue;
      }

      const upsertedService = await prisma.service.upsert({
        where: { slug: slug },
        update: {
          name: en.name,
          shortDescription: en.shortDescription,
          fullDescription: en.fullDescription,
          features: en.features || [],
          benefits: en.benefits || [],
          content: en.content as any
        },
        create: {
          slug: slug,
          name: en.name,
          shortDescription: en.shortDescription,
          fullDescription: en.fullDescription,
          features: en.features || [],
          benefits: en.benefits || [],
          content: en.content as any,
          status: 'published'
        }
      });

      // Upsert the translations
      const locales = ['en', 'tr', 'de', 'ur', 'ar'];
      for (const locale of locales) {
        const locData = serviceData[locale];
        if (!locData) continue;

        await prisma.serviceTranslation.upsert({
          where: {
            serviceId_locale: {
              serviceId: upsertedService.id,
              locale: locale
            }
          },
          update: {
            name: locData.name,
            shortDescription: locData.shortDescription,
            fullDescription: locData.fullDescription,
            features: locData.features || [],
            benefits: locData.benefits || [],
            content: locData.content as any,
            metaTitle: locData.metaTitle,
            metaDescription: locData.metaDescription
          },
          create: {
            serviceId: upsertedService.id,
            locale: locale,
            name: locData.name,
            shortDescription: locData.shortDescription,
            fullDescription: locData.fullDescription,
            features: locData.features || [],
            benefits: locData.benefits || [],
            content: locData.content as any,
            metaTitle: locData.metaTitle,
            metaDescription: locData.metaDescription
          }
        });
      }

      console.log(`Successfully saved ${slug}.`);
    }
  }

  console.log('\n--- Completed seeding all manual batch files ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
