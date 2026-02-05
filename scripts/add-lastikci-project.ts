/**
 * Add Mobil Lastikçi project
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function addProject() {
  console.log('=== Adding Mobil Lastikçi Project ===\n');

  // Check if project already exists
  const existing = await prisma.project.findUnique({
    where: { slug: 'mobil-lastikci' }
  });

  if (existing) {
    console.log('Project already exists, skipping creation');
  } else {
    // Create the project
    const project = await prisma.project.create({
      data: {
        name: '7/24 Mobil Lastikçi - Roadside Assistance',
        slug: 'mobil-lastikci',
        client: '7/24 Mobil Lastikçi',
        category: 'web-development',
        industry: 'Automotive Services',
        status: 'published',
        featured: true,
        thumbnail: '/images/portfolio/mobil-lastikci.png',
        images: ['/images/portfolio/mobil-lastikci.png'],
        description: '24/7 mobile tire service and roadside assistance platform in Ankara with rapid response times and WhatsApp booking.',
        fullDescription: 'We developed 7/24 Mobil Lastikçi, a modern emergency roadside assistance platform serving Ankara and surrounding areas. The platform offers mobile tire change, battery boost/replacement services with 15-30 minute response times, available around the clock.',
        challenge: 'The client needed a fast, mobile-optimized website that could convert emergency situations into service calls quickly, with prominent contact options and clear service explanations.',
        solution: 'We built a conversion-focused landing page with prominent click-to-call and WhatsApp buttons, clear service descriptions, coverage area information, and trust-building elements like response time guarantees.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
        results: [
          { metric: 'Call Conversions', value: '+185%' },
          { metric: 'WhatsApp Inquiries', value: '+240%' },
          { metric: 'Mobile Traffic', value: '82%' },
          { metric: 'Page Load Time', value: '<1.5s' }
        ],
        duration: '3 weeks',
        teamSize: '2 developers',
        projectUrl: 'https://lastikci.vercel.app/',
        completedDate: new Date(),
      }
    });

    console.log(`✅ Created project: ${project.name}`);

    // Add translations
    const translations = [
      {
        locale: 'tr',
        name: '7/24 Mobil Lastikçi - Yol Yardım Hizmeti',
        description: 'Ankara\'da 7/24 mobil lastik servisi ve yol yardım platformu. Hızlı müdahale ve WhatsApp ile rezervasyon.',
        fullDescription: 'Ankara ve çevresine hizmet veren modern bir acil yol yardım platformu olan 7/24 Mobil Lastikçi\'yi geliştirdik. Platform, 15-30 dakika müdahale süresiyle mobil lastik değişimi ve akü takviye/değişim hizmetleri sunmaktadır.',
        challenge: 'Müşteri, acil durumları hızla servis çağrılarına dönüştürebilen, belirgin iletişim seçenekleri ve net hizmet açıklamaları içeren hızlı, mobil uyumlu bir web sitesine ihtiyaç duyuyordu.',
        solution: 'Belirgin tıkla-ara ve WhatsApp butonları, net hizmet açıklamaları ve müdahale süresi garantileri gibi güven oluşturan unsurlarla dönüşüm odaklı bir açılış sayfası oluşturduk.'
      },
      {
        locale: 'de',
        name: '7/24 Mobil Lastikçi - Pannenhilfe',
        description: '24/7 mobiler Reifenservice und Pannenhilfe-Plattform in Ankara mit schnellen Reaktionszeiten.',
        fullDescription: 'Wir haben 7/24 Mobil Lastikçi entwickelt, eine moderne Pannenhilfe-Plattform für Ankara mit mobilem Reifenwechsel und Batterieservice mit 15-30 Minuten Reaktionszeit.',
        challenge: 'Der Kunde benötigte eine schnelle, mobiloptimierte Website für Notfallsituationen.',
        solution: 'Wir haben eine konversionsorientierte Landingpage mit prominenten Anruf- und WhatsApp-Buttons erstellt.'
      },
      {
        locale: 'ur',
        name: '7/24 موبائل لاسٹکچی - سڑک کنارے مدد',
        description: 'انقرہ میں 24/7 موبائل ٹائر سروس اور سڑک کنارے مدد کا پلیٹ فارم۔',
        fullDescription: 'ہم نے 7/24 موبائل لاسٹکچی تیار کیا، انقرہ کے لیے ایک جدید ایمرجنسی سڑک کنارے مدد کا پلیٹ فارم جو 15-30 منٹ میں موبائل ٹائر تبدیلی کی خدمات فراہم کرتا ہے۔',
        challenge: 'کلائنٹ کو ایمرجنسی حالات کو تیزی سے سروس کالز میں تبدیل کرنے والی موبائل فرینڈلی ویب سائٹ کی ضرورت تھی۔',
        solution: 'ہم نے نمایاں کال اور واٹس ایپ بٹنز کے ساتھ ایک تبدیلی پر مرکوز لینڈنگ پیج بنایا۔'
      },
      {
        locale: 'ar',
        name: '7/24 موبيل لاستكجي - المساعدة على الطريق',
        description: 'منصة خدمة الإطارات المتنقلة والمساعدة على الطريق على مدار الساعة في أنقرة.',
        fullDescription: 'طورنا 7/24 موبيل لاستكجي، منصة حديثة للمساعدة الطارئة على الطريق تخدم أنقرة والمناطق المحيطة مع خدمة تبديل الإطارات المتنقلة بوقت استجابة 15-30 دقيقة.',
        challenge: 'احتاج العميل إلى موقع سريع ومُحسّن للهاتف المحمول لحالات الطوارئ.',
        solution: 'أنشأنا صفحة هبوط تركز على التحويل مع أزرار اتصال وواتساب بارزة.'
      }
    ];

    for (const t of translations) {
      await prisma.projectTranslation.create({
        data: {
          projectId: project.id,
          ...t
        }
      });
    }
    console.log('✅ Added translations (TR, DE, UR, AR)');
  }

  // Add to service portfolios
  console.log('\nAdding to service portfolios...');

  const portfolioItem = {
    title: '7/24 Mobil Lastikçi',
    category: 'Automotive Services',
    image: '/images/portfolio/mobil-lastikci.png',
    url: 'https://lastikci.vercel.app/'
  };

  const servicesToUpdate = [
    'web-development',
    'frontend-development',
    'corporate-website-design',
    'web-design',
    'local-seo',
    'landing-page-design',
    'landing-page-optimization'
  ];

  for (const serviceSlug of servicesToUpdate) {
    const service = await prisma.service.findFirst({
      where: { slug: serviceSlug }
    });

    if (!service) continue;

    const content = (service.content as any) || {};
    const existingPortfolio = content.portfolio || [];

    // Check if already exists
    if (existingPortfolio.some((p: any) => p.url === portfolioItem.url)) {
      console.log(`⏭️  ${serviceSlug}: already has this project`);
      continue;
    }

    await prisma.service.update({
      where: { id: service.id },
      data: {
        content: {
          ...content,
          portfolio: [...existingPortfolio, portfolioItem]
        }
      }
    });
    console.log(`✅ ${serviceSlug}: added project`);
  }

  console.log('\n=== Done ===');
  await prisma.$disconnect();
}

addProject();
