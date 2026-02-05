/**
 * Add Paper Market World project
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
  console.log('=== Adding Paper Market World Project ===\n');

  const existing = await prisma.project.findUnique({
    where: { slug: 'paper-market-world' }
  });

  if (existing) {
    console.log('Project already exists, skipping creation');
  } else {
    const project = await prisma.project.create({
      data: {
        name: 'Paper Market World - Global B2B Trading Platform',
        slug: 'paper-market-world',
        client: 'Paper Market World',
        category: 'web-development',
        industry: 'B2B Trading & Manufacturing',
        status: 'published',
        featured: true,
        thumbnail: '/images/portfolio/paper-market-world.png',
        images: ['/images/portfolio/paper-market-world.png'],
        description: 'Global paper and board B2B trading platform connecting 500+ suppliers across 23 countries with real-time market data.',
        fullDescription: 'We developed Paper Market World, a sophisticated B2B trading platform for paper and containerboard products connecting Europe, Turkey, and Asia. The platform features real-time market pricing, supplier networks across 23 countries, multilingual support, and handles 50,000+ tons monthly trading volume.',
        challenge: 'The client needed a professional B2B platform that could display real-time market prices, connect global suppliers and buyers, handle multiple languages, and streamline quote requests for industrial paper products.',
        solution: 'We built a modern trading platform with live price tickers, product catalogs, regional supplier directories, multilingual support (EN, TR, DE, AR), integrated quote system, and WhatsApp/chat support for immediate assistance.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'i18n', 'Vercel'],
        results: [
          { metric: 'Quote Requests', value: '+340%' },
          { metric: 'Global Reach', value: '23 countries' },
          { metric: 'Monthly Volume', value: '50K+ tons' },
          { metric: 'Response Time', value: '<24 hours' }
        ],
        duration: '10 weeks',
        teamSize: '4 developers',
        projectUrl: 'https://www.papermarketworld.com/en',
        completedDate: new Date(),
      }
    });

    console.log(`✅ Created project: ${project.name}`);

    const translations = [
      {
        locale: 'tr',
        name: 'Paper Market World - Global B2B Ticaret Platformu',
        description: '23 ülkede 500+ tedarikçiyi gerçek zamanlı piyasa verileriyle birbirine bağlayan global kağıt ve karton B2B ticaret platformu.',
        fullDescription: 'Avrupa, Türkiye ve Asya\'yı birbirine bağlayan kağıt ve konteyner karton ürünleri için sofistike bir B2B ticaret platformu olan Paper Market World\'ü geliştirdik. Platform, gerçek zamanlı piyasa fiyatlandırması ve çok dilli destek sunmaktadır.',
        challenge: 'Müşteri, gerçek zamanlı piyasa fiyatlarını görüntüleyebilen, küresel tedarikçileri ve alıcıları birbirine bağlayabilen profesyonel bir B2B platformuna ihtiyaç duyuyordu.',
        solution: 'Canlı fiyat göstergeleri, ürün katalogları, bölgesel tedarikçi dizinleri ve çok dilli destek ile modern bir ticaret platformu oluşturduk.'
      },
      {
        locale: 'de',
        name: 'Paper Market World - Globale B2B-Handelsplattform',
        description: 'Globale B2B-Handelsplattform für Papier und Karton, die 500+ Lieferanten in 23 Ländern mit Echtzeit-Marktdaten verbindet.',
        fullDescription: 'Wir haben Paper Market World entwickelt, eine anspruchsvolle B2B-Handelsplattform für Papier- und Containerboard-Produkte mit Echtzeit-Marktpreisen und mehrsprachiger Unterstützung.',
        challenge: 'Der Kunde benötigte eine professionelle B2B-Plattform mit Echtzeit-Marktpreisen.',
        solution: 'Wir haben eine moderne Handelsplattform mit Live-Preistickern und mehrsprachiger Unterstützung erstellt.'
      },
      {
        locale: 'ur',
        name: 'پیپر مارکیٹ ورلڈ - گلوبل B2B ٹریڈنگ پلیٹ فارم',
        description: '23 ممالک میں 500+ سپلائرز کو ریئل ٹائم مارکیٹ ڈیٹا کے ساتھ جوڑنے والا گلوبل کاغذ اور بورڈ B2B ٹریڈنگ پلیٹ فارم۔',
        fullDescription: 'ہم نے پیپر مارکیٹ ورلڈ تیار کیا، یورپ، ترکی اور ایشیا کو جوڑنے والا کاغذ کی مصنوعات کے لیے ایک نفیس B2B ٹریڈنگ پلیٹ فارم۔',
        challenge: 'کلائنٹ کو ریئل ٹائم مارکیٹ قیمتوں کے ساتھ ایک پیشہ ور B2B پلیٹ فارم کی ضرورت تھی۔',
        solution: 'ہم نے لائیو پرائس ٹکرز اور کثیر لسانی سپورٹ کے ساتھ ایک جدید ٹریڈنگ پلیٹ فارم بنایا۔'
      },
      {
        locale: 'ar',
        name: 'بيبر ماركت وورلد - منصة تداول B2B عالمية',
        description: 'منصة تداول B2B عالمية للورق والكرتون تربط أكثر من 500 مورد في 23 دولة مع بيانات السوق الفورية.',
        fullDescription: 'طورنا بيبر ماركت وورلد، منصة تداول B2B متطورة لمنتجات الورق والكرتون تربط أوروبا وتركيا وآسيا مع أسعار السوق الفورية.',
        challenge: 'احتاج العميل إلى منصة B2B احترافية مع أسعار السوق الفورية.',
        solution: 'أنشأنا منصة تداول حديثة مع مؤشرات أسعار حية ودعم متعدد اللغات.'
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
    title: 'Paper Market World',
    category: 'B2B Trading Platform',
    image: '/images/portfolio/paper-market-world.png',
    url: 'https://www.papermarketworld.com/en'
  };

  const servicesToUpdate = [
    'web-development', 'frontend-development', 'web-design', 'ui-design',
    'b2b-ecommerce', 'e-commerce', 'international-seo', 'corporate-website-design'
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
