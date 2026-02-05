/**
 * Fix remaining service name translations
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// German names for tech terms
const germanNames: Record<string, string> = {
  'business-intelligence': 'Business Intelligence & Analysen',
  'docker-kubernetes': 'Docker & Kubernetes-Dienste',
  'headless-commerce': 'Headless Commerce-Entwicklung',
  'infrastructure-as-code': 'Infrastructure as Code (IaC)',
  'managed-services': 'Verwaltete IT-Services',
  'prototyping-wireframing': 'Prototyping & Wireframing-Design',
  'salesforce-marketing-cloud': 'Salesforce Marketing Cloud-Integration',
  'smart-contracts': 'Smart Contract-Entwicklung',
  'social-commerce': 'Social Commerce-Lösungen',
  'web3-blockchain': 'Web3 & Blockchain-Entwicklung',
  'whatsapp-business-api': 'WhatsApp Business API-Integration',
  'whatsapp-commerce': 'WhatsApp Commerce-Lösungen',
};

// Turkish name for whatsapp
const turkishNames: Record<string, string> = {
  'whatsapp-business-api': 'WhatsApp Business API Entegrasyonu',
};

async function fixRemainingNames() {
  console.log('=== Fixing Remaining Service Names ===\n');

  let updated = 0;

  // Fix German names
  for (const [slug, newName] of Object.entries(germanNames)) {
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
      if (translation.name === service.name) {
        await prisma.serviceTranslation.update({
          where: { id: translation.id },
          data: { name: newName }
        });
        console.log(`✅ DE ${slug}: "${service.name}" → "${newName}"`);
        updated++;
      } else {
        console.log(`⏭️  DE ${slug}: already has unique name`);
      }
    }
  }

  // Fix Turkish names
  for (const [slug, newName] of Object.entries(turkishNames)) {
    const service = await prisma.service.findFirst({
      where: { slug },
      include: { translations: { where: { locale: 'tr' } } }
    });

    if (service && service.translations[0]) {
      const t = service.translations[0];
      if (t.name === service.name) {
        await prisma.serviceTranslation.update({
          where: { id: t.id },
          data: { name: newName }
        });
        console.log(`✅ TR ${slug}: "${service.name}" → "${newName}"`);
        updated++;
      }
    }
  }

  console.log(`\nTotal updated: ${updated}`);
  await prisma.$disconnect();
}

fixRemainingNames();
