/**
 * Script to complete ALL missing translations
 * This checks each service for missing locales and adds them
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

// Service name translations
const serviceTranslations: Record<string, Record<string, string>> = {
  'ui-ux-design': { tr: 'UI/UX Tasarım', de: 'UI/UX Design', ur: 'یو آئی/یو ایکس ڈیزائن', ar: 'تصميم واجهة وتجربة المستخدم' },
  'seo': { tr: 'SEO', de: 'Suchmaschinenoptimierung', ur: 'ایس ای او', ar: 'تحسين محركات البحث' },
  'e-commerce': { tr: 'E-Ticaret', de: 'E-Commerce', ur: 'ای کامرس', ar: 'التجارة الإلكترونية' },
  'devops-cloud': { tr: 'DevOps ve Bulut', de: 'DevOps & Cloud', ur: 'ڈیوآپس اینڈ کلاؤڈ', ar: 'DevOps والسحابة' },
  'social-media-marketing': { tr: 'Sosyal Medya Pazarlaması', de: 'Social Media Marketing', ur: 'سوشل میڈیا مارکیٹنگ', ar: 'التسويق عبر وسائل التواصل الاجتماعي' },
  'computer-vision': { tr: 'Bilgisayarlı Görü', de: 'Computer Vision', ur: 'کمپیوٹر ویژن', ar: 'الرؤية الحاسوبية' },
  'prototyping-wireframing': { tr: 'Prototip ve Wireframe', de: 'Prototyping & Wireframing', ur: 'پروٹو ٹائپنگ اینڈ وائرفریمنگ', ar: 'النماذج الأولية والإطارات السلكية' },
  'social-media-management': { tr: 'Sosyal Medya Yönetimi', de: 'Social Media Management', ur: 'سوشل میڈیا مینجمنٹ', ar: 'إدارة وسائل التواصل الاجتماعي' },
  'docker-kubernetes': { tr: 'Docker ve Kubernetes', de: 'Docker & Kubernetes', ur: 'ڈاکر اینڈ کوبرنیٹس', ar: 'Docker و Kubernetes' },
  'business-intelligence': { tr: 'İş Zekası', de: 'Business Intelligence', ur: 'بزنس انٹیلی جنس', ar: 'ذكاء الأعمال' },
  'influencer-marketing': { tr: 'Influencer Pazarlaması', de: 'Influencer-Marketing', ur: 'انفلوئنسر مارکیٹنگ', ar: 'التسويق عبر المؤثرين' },
  'video-production-marketing': { tr: 'Video Prodüksiyon Pazarlaması', de: 'Videoproduktion & Marketing', ur: 'ویڈیو پروڈکشن مارکیٹنگ', ar: 'إنتاج الفيديو والتسويق' },
  'community-management': { tr: 'Topluluk Yönetimi', de: 'Community Management', ur: 'کمیونٹی مینجمنٹ', ar: 'إدارة المجتمع' },
  'explainer-videos': { tr: 'Açıklayıcı Videolar', de: 'Erklärvideos', ur: 'ایکسپلینر ویڈیوز', ar: 'فيديوهات توضيحية' },
  'social-animations': { tr: 'Sosyal Animasyonlar', de: 'Social Animationen', ur: 'سوشل اینیمیشنز', ar: 'رسوم متحركة للتواصل الاجتماعي' },
  'social-media-graphics': { tr: 'Sosyal Medya Grafikleri', de: 'Social Media Grafiken', ur: 'سوشل میڈیا گرافکس', ar: 'رسومات وسائل التواصل الاجتماعي' },
  'print-packaging-design': { tr: 'Baskı ve Ambalaj Tasarımı', de: 'Druck- & Verpackungsdesign', ur: 'پرنٹ اینڈ پیکیجنگ ڈیزائن', ar: 'تصميم الطباعة والتغليف' },
  'big-data-etl': { tr: 'Big Data ve ETL', de: 'Big Data & ETL', ur: 'بگ ڈیٹا اینڈ ای ٹی ایل', ar: 'البيانات الضخمة و ETL' },
  'data-visualization': { tr: 'Veri Görselleştirme', de: 'Datenvisualisierung', ur: 'ڈیٹا ویژولائزیشن', ar: 'تصور البيانات' },
  'maintenance-support': { tr: 'Bakım ve Destek', de: 'Wartung & Support', ur: 'مینٹیننس اینڈ سپورٹ', ar: 'الصيانة والدعم' },
  'disaster-recovery': { tr: 'Felaket Kurtarma', de: 'Disaster Recovery', ur: 'ڈیزاسٹر ریکوری', ar: 'التعافي من الكوارث' },
  'database-services': { tr: 'Veritabanı Hizmetleri', de: 'Datenbankdienste', ur: 'ڈیٹا بیس سروسز', ar: 'خدمات قواعد البيانات' },
  'database-optimization': { tr: 'Veritabanı Optimizasyonu', de: 'Datenbankoptimierung', ur: 'ڈیٹا بیس آپٹیمائزیشن', ar: 'تحسين قواعد البيانات' },
  'process-digitization': { tr: 'Süreç Dijitalleştirme', de: 'Prozessdigitalisierung', ur: 'پروسیس ڈیجیٹائزیشن', ar: 'رقمنة العمليات' },
  'tech-stack-assessment': { tr: 'Teknoloji Yığını Değerlendirmesi', de: 'Tech-Stack-Bewertung', ur: 'ٹیک اسٹیک اسیسمنٹ', ar: 'تقييم مجموعة التقنيات' },
  'architecture-design': { tr: 'Mimari Tasarım', de: 'Architekturdesign', ur: 'آرکیٹیکچر ڈیزائن', ar: 'تصميم البنية' },
  'ai-readiness-assessment': { tr: 'AI Hazırlık Değerlendirmesi', de: 'KI-Bereitschaftsbewertung', ur: 'اے آئی ریڈی نیس اسیسمنٹ', ar: 'تقييم الجاهزية للذكاء الاصطناعي' },
  'ai-roi-analysis': { tr: 'AI ROI Analizi', de: 'KI-ROI-Analyse', ur: 'اے آئی آر او آئی اینالیسس', ar: 'تحليل عائد الاستثمار للذكاء الاصطناعي' },
  'startup-services': { tr: 'Startup Hizmetleri', de: 'Startup-Dienste', ur: 'سٹارٹ اپ سروسز', ar: 'خدمات الشركات الناشئة' },
  'startup-mvp-development': { tr: 'Startup MVP Geliştirme', de: 'Startup MVP-Entwicklung', ur: 'سٹارٹ اپ ایم وی پی ڈویلپمنٹ', ar: 'تطوير MVP للشركات الناشئة' },
  'technical-cto': { tr: 'Teknik CTO', de: 'Technischer CTO', ur: 'ٹیکنیکل سی ٹی او', ar: 'CTO تقني' },
  'staff-augmentation': { tr: 'Personel Takviyesi', de: 'Personalverstärkung', ur: 'سٹاف آگمینٹیشن', ar: 'تعزيز الموظفين' },
  'model-deployment': { tr: 'Model Dağıtım', de: 'Modell-Bereitstellung', ur: 'ماڈل ڈیپلائمنٹ', ar: 'نشر النماذج' },
  'model-monitoring': { tr: 'Model İzleme', de: 'Modell-Monitoring', ur: 'ماڈل مانیٹرنگ', ar: 'مراقبة النماذج' },
  'ml-pipelines': { tr: 'ML Boru Hatları', de: 'ML-Pipelines', ur: 'ایم ایل پائپ لائنز', ar: 'خطوط ML' },
  'aws-migration': { tr: 'AWS Göçü', de: 'AWS-Migration', ur: 'اے ڈبلیو ایس مائیگریشن', ar: 'ترحيل AWS' },
  'azure-migration': { tr: 'Azure Göçü', de: 'Azure-Migration', ur: 'ایزور مائیگریشن', ar: 'ترحيل Azure' },
  'google-cloud-migration': { tr: 'Google Cloud Göçü', de: 'Google Cloud-Migration', ur: 'گوگل کلاؤڈ مائیگریشن', ar: 'ترحيل Google Cloud' },
  'managed-services': { tr: 'Yönetilen Hizmetler', de: 'Managed Services', ur: 'مینجڈ سروسز', ar: 'الخدمات المدارة' },
  'core-web-vitals': { tr: 'Core Web Vitals', de: 'Core Web Vitals', ur: 'کور ویب وائٹلز', ar: 'مؤشرات الويب الأساسية' },
  'brand-strategy': { tr: 'Marka Stratejisi', de: 'Markenstrategie', ur: 'برینڈ سٹریٹیجی', ar: 'استراتيجية العلامة التجارية' },
  'brand-positioning': { tr: 'Marka Konumlandırma', de: 'Markenpositionierung', ur: 'برینڈ پوزیشننگ', ar: 'تموضع العلامة التجارية' },
  'brand-guidelines': { tr: 'Marka Kılavuzları', de: 'Markenrichtlinien', ur: 'برینڈ گائیڈ لائنز', ar: 'إرشادات العلامة التجارية' },
  'rebranding': { tr: 'Yeniden Markalama', de: 'Rebranding', ur: 'ری برینڈنگ', ar: 'إعادة بناء العلامة التجارية' },
  '3d-ar-vr': { tr: '3D/AR/VR', de: '3D/AR/VR', ur: '3D/AR/VR', ar: '3D/AR/VR' },
  '3d-product-visualization': { tr: '3D Ürün Görselleştirme', de: '3D-Produktvisualisierung', ur: '3D پروڈکٹ ویژولائزیشن', ar: 'تصور المنتجات ثلاثية الأبعاد' },
  'ar-experiences': { tr: 'AR Deneyimleri', de: 'AR-Erlebnisse', ur: 'اے آر ایکسپیریئنسز', ar: 'تجارب الواقع المعزز' },
  'web-design': { tr: 'Web Tasarım', de: 'Webdesign', ur: 'ویب ڈیزائن', ar: 'تصميم الويب' },
  'corporate-website-design': { tr: 'Kurumsal Web Sitesi Tasarımı', de: 'Unternehmenswebsite-Design', ur: 'کارپوریٹ ویب سائٹ ڈیزائن', ar: 'تصميم مواقع الشركات' },
  'landing-page-design': { tr: 'Açılış Sayfası Tasarımı', de: 'Landingpage-Design', ur: 'لینڈنگ پیج ڈیزائن', ar: 'تصميم صفحات الهبوط' },
  'ecommerce-design': { tr: 'E-Ticaret Tasarımı', de: 'E-Commerce Design', ur: 'ای کامرس ڈیزائن', ar: 'تصميم التجارة الإلكترونية' },
  'motion-graphics': { tr: 'Hareketli Grafikler', de: 'Motion Graphics', ur: 'موشن گرافکس', ar: 'الرسوم المتحركة' },
  'graphic-design': { tr: 'Grafik Tasarım', de: 'Grafikdesign', ur: 'گرافک ڈیزائن', ar: 'التصميم الجرافيكي' },
  'marketplace-ads': { tr: 'Pazar Yeri Reklamları', de: 'Marktplatz-Anzeigen', ur: 'مارکیٹ پلیس ایڈز', ar: 'إعلانات السوق' },
  'cro': { tr: 'Dönüşüm Oranı Optimizasyonu', de: 'Conversion Rate Optimierung', ur: 'سی آر او', ar: 'تحسين معدل التحويل' },
  'marketing-automation': { tr: 'Pazarlama Otomasyonu', de: 'Marketing-Automatisierung', ur: 'مارکیٹنگ آٹومیشن', ar: 'أتمتة التسويق' },
};

const defaultDescriptions: Record<string, string> = {
  tr: 'Son teknoloji çözümlerle işletmenizi güçlendirin. Uzman ekibimiz, ihtiyaçlarınıza özel yenilikçi sonuçlar sunar.',
  de: 'Stärken Sie Ihr Unternehmen mit modernsten Lösungen. Unser Expertenteam liefert innovative Ergebnisse, die auf Ihre Bedürfnisse zugeschnitten sind.',
  ur: 'جدید ترین حل کے ساتھ اپنے کاروبار کو بااختیار بنائیں۔ ہماری ماہر ٹیم آپ کی ضروریات کے مطابق جدید نتائج فراہم کرتی ہے۔',
  ar: 'قم بتمكين عملك بأحدث الحلول. فريق خبرائنا يقدم نتائج مبتكرة مصممة خصيصًا لاحتياجاتك.'
};

async function completeAllTranslations() {
  console.log('🔧 Completing all partial translations...\n');

  try {
    const services = await prisma.service.findMany({
      where: { status: { in: ['published', 'active'] } },
      include: { translations: true }
    });

    let created = 0;
    let updated = 0;

    for (const service of services) {
      const existingLocales = service.translations.map(t => t.locale);
      const missingLocales = LOCALES.filter(l => !existingLocales.includes(l));
      const translations = serviceTranslations[service.slug];

      // Create missing translations
      for (const locale of missingLocales) {
        const name = translations?.[locale] || service.name;
        await prisma.serviceTranslation.create({
          data: {
            serviceId: service.id,
            locale,
            name,
            shortDescription: defaultDescriptions[locale],
            fullDescription: service.fullDescription,
            features: service.features || [],
            benefits: service.benefits || [],
            content: service.content as any,
            metaTitle: `${name} | PakSoft`,
            metaDescription: defaultDescriptions[locale]
          }
        });
        console.log(`✅ Created ${service.slug} [${locale.toUpperCase()}]: ${name}`);
        created++;
      }

      // Update existing translations that still have English names
      for (const t of service.translations) {
        const locale = t.locale;
        const translatedName = translations?.[locale];

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
          console.log(`✅ Updated ${service.slug} [${locale.toUpperCase()}]: ${translatedName}`);
          updated++;
        }
      }
    }

    console.log('\n═══════════════════════════════════════════');
    console.log(`✅ Complete!`);
    console.log(`   Created: ${created}`);
    console.log(`   Updated: ${updated}`);
    console.log('═══════════════════════════════════════════');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

completeAllTranslations();
