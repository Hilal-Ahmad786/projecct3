/**
 * Fix German service names that stayed as English
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// German translations for technical terms
const germanNames: Record<string, string> = {
  'amazon-ppc': 'Amazon PPC-Werbung',
  'big-data-etl': 'Big Data & ETL-Verarbeitung',
  'business-intelligence': 'Business Intelligence',
  'computer-vision': 'Computer Vision & Bildverarbeitung',
  'core-web-vitals': 'Core Web Vitals-Optimierung',
  'devops-cloud': 'DevOps & Cloud-Services',
  'docker-kubernetes': 'Docker & Kubernetes',
  'e-commerce': 'E-Commerce-Entwicklung',
  'google-shopping': 'Google Shopping-Anzeigen',
  'headless-commerce': 'Headless Commerce',
  'infrastructure-as-code': 'Infrastructure as Code',
  'managed-services': 'Managed Services',
  'performance-max': 'Performance Max-Kampagnen',
  'prototyping-wireframing': 'Prototyping & Wireframing',
  'rebranding': 'Marken-Rebranding',
  'salesforce-marketing-cloud': 'Salesforce Marketing Cloud',
  'smart-contracts': 'Smart Contracts',
  'social-commerce': 'Social Commerce',
  'tiktok-shop': 'TikTok Shop-Integration',
  'ui-design': 'UI-Design',
  'ux-research': 'UX-Forschung',
  'video-ads-facebook-instagram': 'Video-Anzeigen für Facebook & Instagram',
};

// Turkish name fix
const turkishNames: Record<string, string> = {
  'performance-max': 'Performance Max Kampanyaları',
};

async function fixGermanNames() {
  console.log('=== Fixing German Service Names ===\n');

  let updated = 0;

  for (const [slug, germanName] of Object.entries(germanNames)) {
    const service = await prisma.service.findFirst({
      where: { slug },
      include: { translations: { where: { locale: 'de' } } }
    });

    if (!service) {
      console.log(`⚠️  ${slug}: service not found`);
      continue;
    }

    const translation = service.translations[0];
    if (translation) {
      // Update if name is same as English
      if (translation.name === service.name) {
        await prisma.serviceTranslation.update({
          where: { id: translation.id },
          data: { name: germanName }
        });
        console.log(`✅ ${slug}: DE "${service.name}" → "${germanName}"`);
        updated++;
      } else {
        console.log(`⏭️  ${slug}: DE already has unique name "${translation.name}"`);
      }
    } else {
      console.log(`⚠️  ${slug}: no German translation record`);
    }
  }

  // Fix Turkish performance-max
  for (const [slug, turkishName] of Object.entries(turkishNames)) {
    const service = await prisma.service.findFirst({
      where: { slug },
      include: { translations: { where: { locale: 'tr' } } }
    });

    if (service && service.translations[0]) {
      const t = service.translations[0];
      if (t.name === service.name) {
        await prisma.serviceTranslation.update({
          where: { id: t.id },
          data: { name: turkishName }
        });
        console.log(`✅ ${slug}: TR "${service.name}" → "${turkishName}"`);
        updated++;
      }
    }
  }

  console.log(`\nTotal updated: ${updated}`);
  await prisma.$disconnect();
}

fixGermanNames();
