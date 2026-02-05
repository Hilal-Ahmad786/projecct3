/**
 * Script to fix partially translated services
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// Additional translations for partially translated services
const additionalTranslations: Record<string, { tr?: string; de?: string; ur?: string; ar?: string }> = {
  'ui-ux-design': { ar: 'تصميم واجهة وتجربة المستخدم' },
  'seo': { de: 'Suchmaschinenoptimierung', ar: 'تحسين محركات البحث' },
  'e-commerce': { ar: 'التجارة الإلكترونية' },
  'devops-cloud': { ar: 'DevOps والسحابة' },
  'social-media-marketing': { ar: 'التسويق عبر وسائل التواصل الاجتماعي' },
  'computer-vision': { ar: 'الرؤية الحاسوبية' },
  'prototyping-wireframing': { ar: 'النماذج الأولية والإطارات السلكية' },
  'social-media-management': { ar: 'إدارة وسائل التواصل الاجتماعي' },
  'docker-kubernetes': { ar: 'Docker و Kubernetes' },
  'business-intelligence': { ar: 'ذكاء الأعمال' },
  'influencer-marketing': { ar: 'التسويق عبر المؤثرين' },
  'video-production-marketing': { ar: 'إنتاج الفيديو والتسويق' },
  'community-management': { ar: 'إدارة المجتمع' },
  'explainer-videos': { ar: 'فيديوهات توضيحية' },
  'social-animations': { ar: 'رسوم متحركة للتواصل الاجتماعي' },
  'social-media-graphics': { ar: 'رسومات وسائل التواصل الاجتماعي' },
  'print-packaging-design': { ar: 'تصميم الطباعة والتغليف' },
  'big-data-etl': { ar: 'البيانات الضخمة و ETL' },
  'data-visualization': { ar: 'تصور البيانات' },
  'maintenance-support': { ar: 'الصيانة والدعم' },
  'disaster-recovery': { ar: 'التعافي من الكوارث' },
  'database-services': { ar: 'خدمات قواعد البيانات' },
  'database-optimization': { ar: 'تحسين قواعد البيانات' },
  'process-digitization': { ar: 'رقمنة العمليات' },
  'tech-stack-assessment': { ar: 'تقييم مجموعة التقنيات' },
  'architecture-design': { ar: 'تصميم البنية' },
  'ai-readiness-assessment': { ar: 'تقييم الجاهزية للذكاء الاصطناعي' },
  'ai-roi-analysis': { ar: 'تحليل عائد الاستثمار للذكاء الاصطناعي' },
  'startup-services': { ar: 'خدمات الشركات الناشئة' },
  'startup-mvp-development': { ar: 'تطوير MVP للشركات الناشئة' },
  'technical-cto': { ar: 'CTO تقني' },
  'staff-augmentation': { ar: 'تعزيز الموظفين' },
  'model-deployment': { ar: 'نشر النماذج' },
  'model-monitoring': { ar: 'مراقبة النماذج' },
  'ml-pipelines': { ar: 'خطوط ML' },
  'aws-migration': { ar: 'ترحيل AWS' },
  'azure-migration': { ar: 'ترحيل Azure' },
  'google-cloud-migration': { ar: 'ترحيل Google Cloud' },
  'managed-services': { ar: 'الخدمات المدارة' },
  'core-web-vitals': { ar: 'مؤشرات الويب الأساسية' },
  'brand-strategy': { ar: 'استراتيجية العلامة التجارية' },
  'brand-positioning': { ar: 'تموضع العلامة التجارية' },
  'brand-guidelines': { ar: 'إرشادات العلامة التجارية' },
  'rebranding': { ar: 'إعادة بناء العلامة التجارية' },
  '3d-ar-vr': { ar: '3D/AR/VR' },
  '3d-product-visualization': { ar: 'تصور المنتجات ثلاثية الأبعاد' },
  'ar-experiences': { ar: 'تجارب الواقع المعزز' },
  'web-design': { ar: 'تصميم الويب' },
  'corporate-website-design': { ar: 'تصميم مواقع الشركات' },
  'landing-page-design': { ar: 'تصميم صفحات الهبوط' },
  'ecommerce-design': { ar: 'تصميم التجارة الإلكترونية' },
  'motion-graphics': { ar: 'الرسوم المتحركة' },
  'graphic-design': { ar: 'التصميم الجرافيكي' },
  'marketplace-ads': { ar: 'إعلانات السوق' },
  'cro': { ar: 'تحسين معدل التحويل' },
  'marketing-automation': { ar: 'أتمتة التسويق' },
};

const defaultDescriptions = {
  tr: 'Son teknoloji çözümlerle işletmenizi güçlendirin. Uzman ekibimiz, ihtiyaçlarınıza özel yenilikçi sonuçlar sunar.',
  de: 'Stärken Sie Ihr Unternehmen mit modernsten Lösungen. Unser Expertenteam liefert innovative Ergebnisse, die auf Ihre Bedürfnisse zugeschnitten sind.',
  ur: 'جدید ترین حل کے ساتھ اپنے کاروبار کو بااختیار بنائیں۔ ہماری ماہر ٹیم آپ کی ضروریات کے مطابق جدید نتائج فراہم کرتی ہے۔',
  ar: 'قم بتمكين عملك بأحدث الحلول. فريق خبرائنا يقدم نتائج مبتكرة مصممة خصيصًا لاحتياجاتك.'
};

async function fixPartialTranslations() {
  console.log('🔧 Fixing partially translated services...\n');

  try {
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } },
      include: { translations: true }
    });

    let fixed = 0;

    for (const service of services) {
      const extraTranslations = additionalTranslations[service.slug];
      if (!extraTranslations) continue;

      for (const t of service.translations) {
        const locale = t.locale as 'tr' | 'de' | 'ur' | 'ar';
        const translatedName = extraTranslations[locale];

        if (translatedName && t.name === service.name) {
          await prisma.serviceTranslation.update({
            where: { id: t.id },
            data: {
              name: translatedName,
              shortDescription: defaultDescriptions[locale],
              metaTitle: `${translatedName} | PakSoft`,
              metaDescription: defaultDescriptions[locale]
            }
          });
          console.log(`✅ ${service.slug} [${locale.toUpperCase()}]: ${translatedName}`);
          fixed++;
        }
      }
    }

    console.log(`\n✅ Fixed ${fixed} partial translations`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixPartialTranslations();
