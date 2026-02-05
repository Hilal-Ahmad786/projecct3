/**
 * Script to initialize translations for all services
 *
 * This script copies English content to all supported locales for services
 * that don't have translations yet.
 *
 * Usage:
 *   npx ts-node scripts/init-translations.ts
 *
 * Or via npm:
 *   npm run init-translations
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL or POSTGRES_PRISMA_URL not set');
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

const SUPPORTED_LOCALES = ['tr', 'de', 'ur', 'ar'];

async function initializeTranslations() {
  console.log('🌍 Initializing translations for all services...\n');

  try {
    // Get all published services
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } },
      include: { translations: true },
    });

    console.log(`Found ${services.length} published services\n`);

    let totalCreated = 0;
    let totalSkipped = 0;

    for (const service of services) {
      console.log(`📦 Processing: ${service.name} (${service.slug})`);

      const existingLocales = service.translations.map((t) => t.locale);

      for (const locale of SUPPORTED_LOCALES) {
        if (existingLocales.includes(locale)) {
          console.log(`   ⏭️  ${locale.toUpperCase()}: Already exists, skipping`);
          totalSkipped++;
          continue;
        }

        // Create translation with English content as placeholder
        await prisma.serviceTranslation.create({
          data: {
            serviceId: service.id,
            locale,
            name: service.name,
            shortDescription: service.shortDescription,
            fullDescription: service.fullDescription,
            features: service.features || [],
            benefits: service.benefits || [],
            content: service.content as any,
            metaTitle: `${service.name} | PakSoft`,
            metaDescription: service.shortDescription || service.description,
          },
        });

        console.log(`   ✅ ${locale.toUpperCase()}: Created with English content`);
        totalCreated++;
      }

      console.log('');
    }

    console.log('═══════════════════════════════════════════');
    console.log(`✅ Initialization complete!`);
    console.log(`   Created: ${totalCreated} translations`);
    console.log(`   Skipped: ${totalSkipped} (already existed)`);
    console.log('═══════════════════════════════════════════');
    console.log('\n📝 Next steps:');
    console.log('   1. Go to Admin Panel → Services');
    console.log('   2. Edit each service → Translations tab');
    console.log('   3. Translate content for each language');
    console.log('');

  } catch (error) {
    console.error('❌ Error initializing translations:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
initializeTranslations();
