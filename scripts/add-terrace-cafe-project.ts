/**
 * Add My Terrace Cafe Restaurant project
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
  console.log('=== Adding My Terrace Cafe Restaurant Project ===\n');

  const existing = await prisma.project.findUnique({
    where: { slug: 'terrace-cafe-restaurant' }
  });

  if (existing) {
    console.log('Project already exists, skipping creation');
  } else {
    const project = await prisma.project.create({
      data: {
        name: 'My Terrace Cafe - Restaurant Website',
        slug: 'terrace-cafe-restaurant',
        client: 'My Terrace Cafe Restaurant',
        category: 'web-development',
        industry: 'Hospitality & Restaurant',
        status: 'published',
        featured: true,
        thumbnail: '/images/portfolio/terrace-cafe.png',
        images: ['/images/portfolio/terrace-cafe.png'],
        description: 'Elegant restaurant website for a Turkish cuisine establishment in Istanbul with online reservations, menu showcase, and multilingual support.',
        fullDescription: 'We developed My Terrace Cafe Restaurant website, an elegant digital presence for a traditional Turkish restaurant in Istanbul\'s historic Sultanahmet district. The website features online table reservations, interactive menu display, photo gallery, blog section, and multilingual support to serve international tourists.',
        challenge: 'The client needed a visually stunning website that could showcase their terrace views, traditional Turkish cuisine, and facilitate table reservations for both local and international guests visiting Istanbul.',
        solution: 'We created an elegant, responsive website with high-quality imagery, easy online booking system, detailed menu sections, WhatsApp integration for quick inquiries, and multilingual support (EN/TR) optimized for the tourism market.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'i18n', 'Vercel'],
        results: [
          { metric: 'Online Reservations', value: '+280%' },
          { metric: 'International Visitors', value: '65%' },
          { metric: 'Google Rating', value: '4.9/5' },
          { metric: 'Page Load Time', value: '<2s' }
        ],
        duration: '4 weeks',
        teamSize: '2 developers',
        projectUrl: 'https://myterracecaferestaurant.com/en',
        completedDate: new Date(),
      }
    });

    console.log(`✅ Created project: ${project.name}`);

    const translations = [
      {
        locale: 'tr',
        name: 'My Terrace Cafe - Restoran Web Sitesi',
        description: 'İstanbul\'da online rezervasyon, menü tanıtımı ve çok dilli destek sunan Türk mutfağı restoranı için zarif web sitesi.',
        fullDescription: 'İstanbul\'un tarihi Sultanahmet bölgesindeki geleneksel bir Türk restoranı için zarif bir dijital varlık olan My Terrace Cafe Restaurant web sitesini geliştirdik. Site, online masa rezervasyonu, interaktif menü, fotoğraf galerisi ve çok dilli destek sunmaktadır.',
        challenge: 'Müşteri, teras manzaralarını, geleneksel Türk mutfağını sergileyebilen ve hem yerel hem de uluslararası misafirler için masa rezervasyonlarını kolaylaştıran görsel açıdan çarpıcı bir web sitesine ihtiyaç duyuyordu.',
        solution: 'Yüksek kaliteli görsellerle zarif, duyarlı bir web sitesi, kolay online rezervasyon sistemi, detaylı menü bölümleri ve turizm pazarı için optimize edilmiş çok dilli destek oluşturduk.'
      },
      {
        locale: 'de',
        name: 'My Terrace Cafe - Restaurant-Website',
        description: 'Elegante Restaurant-Website für ein türkisches Küche-Establishment in Istanbul mit Online-Reservierungen und mehrsprachiger Unterstützung.',
        fullDescription: 'Wir haben die Website für My Terrace Cafe Restaurant entwickelt, eine elegante digitale Präsenz für ein traditionelles türkisches Restaurant im historischen Sultanahmet-Viertel von Istanbul.',
        challenge: 'Der Kunde benötigte eine visuell beeindruckende Website für Tischreservierungen.',
        solution: 'Wir haben eine elegante, responsive Website mit einfachem Online-Buchungssystem und mehrsprachiger Unterstützung erstellt.'
      },
      {
        locale: 'ur',
        name: 'مائی ٹیرس کیفے - ریستوراں ویب سائٹ',
        description: 'آن لائن ریزرویشن اور کثیر لسانی سپورٹ کے ساتھ استنبول میں ترک کھانوں کے ریستوراں کی خوبصورت ویب سائٹ۔',
        fullDescription: 'ہم نے مائی ٹیرس کیفے ریستوراں ویب سائٹ تیار کی، استنبول کے تاریخی سلطان احمد علاقے میں ایک روایتی ترک ریستوراں کی خوبصورت ڈیجیٹل موجودگی۔',
        challenge: 'کلائنٹ کو ٹیبل ریزرویشنز کے لیے ایک شاندار ویب سائٹ کی ضرورت تھی۔',
        solution: 'ہم نے آسان آن لائن بکنگ سسٹم اور کثیر لسانی سپورٹ کے ساتھ ایک خوبصورت ویب سائٹ بنائی۔'
      },
      {
        locale: 'ar',
        name: 'ماي تيراس كافيه - موقع المطعم',
        description: 'موقع أنيق لمطعم المأكولات التركية في إسطنبول مع حجوزات عبر الإنترنت ودعم متعدد اللغات.',
        fullDescription: 'طورنا موقع ماي تيراس كافيه، حضور رقمي أنيق لمطعم تركي تقليدي في حي السلطان أحمد التاريخي في إسطنبول.',
        challenge: 'احتاج العميل إلى موقع مذهل بصريًا لحجوزات الطاولات.',
        solution: 'أنشأنا موقعًا أنيقًا ومتجاوبًا مع نظام حجز سهل ودعم متعدد اللغات.'
      }
    ];

    for (const t of translations) {
      await prisma.projectTranslation.create({
        data: { projectId: project.id, ...t }
      });
    }
    console.log('✅ Added translations (TR, DE, UR, AR)');
  }

  console.log('\nAdding to service portfolios...');

  const portfolioItem = {
    title: 'My Terrace Cafe',
    category: 'Restaurant & Hospitality',
    image: '/images/portfolio/terrace-cafe.png',
    url: 'https://myterracecaferestaurant.com/en'
  };

  const servicesToUpdate = [
    'web-development', 'frontend-development', 'web-design', 'ui-design',
    'corporate-website-design', 'local-seo', 'international-seo'
  ];

  for (const serviceSlug of servicesToUpdate) {
    const service = await prisma.service.findFirst({ where: { slug: serviceSlug } });
    if (!service) continue;

    const content = (service.content as any) || {};
    const existingPortfolio = content.portfolio || [];

    if (existingPortfolio.some((p: any) => p.url === portfolioItem.url)) {
      console.log(`⏭️  ${serviceSlug}: already has this project`);
      continue;
    }

    await prisma.service.update({
      where: { id: service.id },
      data: { content: { ...content, portfolio: [...existingPortfolio, portfolioItem] } }
    });
    console.log(`✅ ${serviceSlug}: added project`);
  }

  console.log('\n=== Done ===');
  await prisma.$disconnect();
}

addProject();
