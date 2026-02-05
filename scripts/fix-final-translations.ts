/**
 * Script to fix all remaining missing translations
 * Targets services that have placeholder English text in some locales
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// All missing translations organized by slug -> locale -> translated name
const missingTranslations: Record<string, Record<string, string>> = {
  // Missing Turkish (tr)
  'seo': { tr: 'SEO (Arama Motoru Optimizasyonu)' },
  'linkedin-lead-gen': { tr: 'LinkedIn Potansiyel Müşteri Oluşturma' },
  'api-gateway': { tr: 'API Geçidi' },

  // Missing German (de) - single locale
  'social-media-marketing': { de: 'Social-Media-Marketing' },
  'computer-vision': { de: 'Computer Vision' },
  'e-commerce': { de: 'E-Commerce' },
  'ui-ux-design': { de: 'UI/UX-Design' },
  'devops-cloud': { de: 'DevOps & Cloud' },
  'payment-gateway-integration': { de: 'Zahlungs-Gateway-Integration' },
  'docker-kubernetes': { de: 'Docker & Kubernetes' },
  'motion-graphics': { de: 'Motion-Grafiken' },
  'prototyping-wireframing': { de: 'Prototyping & Wireframing' },
  'social-media-management': { de: 'Social-Media-Verwaltung' },
  'business-intelligence': { de: 'Business Intelligence' },
  'big-data-etl': { de: 'Big Data & ETL' },
  'social-media-integration': { de: 'Social-Media-Integration' },
  'event-driven-architecture': { de: 'Ereignisgesteuerte Architektur' },
  'headless-commerce': { de: 'Headless Commerce' },
  'code-review-refactoring': { de: 'Code-Review & Refactoring' },
  'smart-contracts': { de: 'Smart Contracts' },
  'google-shopping': { de: 'Google Shopping' },
  'rebranding': { de: 'Rebranding' },
  'b2b-ecommerce': { de: 'B2B-E-Commerce' },
  'whatsapp-commerce': { de: 'WhatsApp Commerce' },
  'social-commerce': { de: 'Social Commerce' },
  'community-management': { de: 'Community-Management' },
  'managed-services': { de: 'Managed Services' },
  'disaster-recovery': { de: 'Notfallwiederherstellung' },
  'mobile-app-design': { de: 'Mobile-App-Design' },
  'infrastructure-as-code': { de: 'Infrastructure as Code' },

  // Missing multiple locales
  'tiktok-shop': {
    tr: 'TikTok Mağaza',
    de: 'TikTok Shop'
  },
  'web3-blockchain': {
    tr: 'Web3 ve Blockchain',
    de: 'Web3 & Blockchain'
  },
  'whatsapp-business-api': {
    tr: 'WhatsApp Business API',
    de: 'WhatsApp Business API',
    ar: 'واجهة برمجة تطبيقات واتساب للأعمال'
  },
  'performance-max': {
    tr: 'Performance Max',
    de: 'Performance Max',
    ar: 'أداء ماكس'
  },
  'salesforce-marketing-cloud': {
    tr: 'Salesforce Pazarlama Bulutu',
    de: 'Salesforce Marketing Cloud',
    ar: 'سحابة تسويق Salesforce'
  },
  'core-web-vitals': {
    tr: 'Temel Web Metrikleri',
    de: 'Core Web Vitals'
  },
  'amazon-ppc': {
    tr: 'Amazon PPC Reklamları',
    de: 'Amazon PPC',
    ar: 'إعلانات أمازون PPC'
  }
};

// Default descriptions for each locale
const defaultDescriptions: Record<string, string> = {
  tr: 'Son teknoloji çözümlerle işletmenizi güçlendirin. Uzman ekibimiz, ihtiyaçlarınıza özel yenilikçi sonuçlar sunar.',
  de: 'Stärken Sie Ihr Unternehmen mit modernsten Lösungen. Unser Expertenteam liefert innovative Ergebnisse, die auf Ihre Bedürfnisse zugeschnitten sind.',
  ur: 'جدید ترین حل کے ساتھ اپنے کاروبار کو بااختیار بنائیں۔ ہماری ماہر ٹیم آپ کی ضروریات کے مطابق جدید نتائج فراہم کرتی ہے۔',
  ar: 'قم بتمكين عملك بأحدث الحلول. فريق خبرائنا يقدم نتائج مبتكرة مصممة خصيصًا لاحتياجاتك.'
};

async function fixFinalTranslations() {
  console.log('🔧 Fixing all remaining missing translations...\n');

  try {
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } },
      include: { translations: true }
    });

    let fixed = 0;

    for (const service of services) {
      const translations = missingTranslations[service.slug];
      if (!translations) continue;

      for (const [locale, translatedName] of Object.entries(translations)) {
        // Find the translation record for this locale
        const existingTranslation = service.translations.find(t => t.locale === locale);

        if (existingTranslation && existingTranslation.name === service.name) {
          // Update existing placeholder translation
          await prisma.serviceTranslation.update({
            where: { id: existingTranslation.id },
            data: {
              name: translatedName,
              shortDescription: defaultDescriptions[locale],
              metaTitle: `${translatedName} | PakSoft`,
              metaDescription: defaultDescriptions[locale]
            }
          });
          console.log(`✅ ${service.slug} [${locale.toUpperCase()}]: "${translatedName}"`);
          fixed++;
        } else if (!existingTranslation) {
          // Create new translation record if it doesn't exist
          await prisma.serviceTranslation.create({
            data: {
              serviceId: service.id,
              locale: locale,
              name: translatedName,
              shortDescription: defaultDescriptions[locale],
              fullDescription: defaultDescriptions[locale],
              metaTitle: `${translatedName} | PakSoft`,
              metaDescription: defaultDescriptions[locale]
            }
          });
          console.log(`✅ ${service.slug} [${locale.toUpperCase()}]: "${translatedName}" (NEW)`);
          fixed++;
        }
      }
    }

    console.log(`\n✅ Fixed ${fixed} translations`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixFinalTranslations();
