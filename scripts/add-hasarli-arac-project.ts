/**
 * Add Hasarlı Araç Noktası project
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
  console.log('=== Adding Hasarlı Araç Noktası Project ===\n');

  // Check if project already exists
  const existing = await prisma.project.findUnique({
    where: { slug: 'hasarli-arac-noktasi' }
  });

  if (existing) {
    console.log('Project already exists, skipping creation');
  } else {
    // Create the project
    const project = await prisma.project.create({
      data: {
        name: 'Hasarlı Araç Noktası - Damaged Vehicle Center',
        slug: 'hasarli-arac-noktasi',
        client: 'Hasarlı Araç Alım Merkezi',
        category: 'web-development',
        industry: 'Automotive',
        status: 'published',
        featured: true,
        thumbnail: '/images/portfolio/hasarli-arac-noktasi.png',
        images: ['/images/portfolio/hasarli-arac-noktasi.png'],
        description: 'Turkey\'s trusted damaged vehicle purchasing platform with 24/7 service, same-day cash payments, and nationwide coverage.',
        fullDescription: 'We developed Hasarlı Araç Noktası, a comprehensive platform for purchasing damaged, accident-damaged, scrap, and insurance total-loss vehicles across Turkey. The platform offers instant quotes, free towing, same-day cash payments, and operates 24/7 with coverage in all 81 provinces.',
        challenge: 'The client needed a professional, trustworthy platform to compete in the competitive Turkish vehicle purchasing market while emphasizing their best price guarantee and nationwide 24/7 service.',
        solution: 'We created a modern, conversion-optimized website with prominent CTAs, WhatsApp integration, city-based service pages for SEO, and trust-building elements. The design emphasizes speed, reliability, and the best price guarantee.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
        results: [
          { metric: 'Quote Requests', value: '+220%' },
          { metric: 'Organic Traffic', value: '+180%' },
          { metric: 'Conversion Rate', value: '+50%' },
          { metric: 'Mobile Users', value: '78%' }
        ],
        duration: '6 weeks',
        teamSize: '3 developers',
        projectUrl: 'https://www.hasarliaracnoktasi.com/',
        completedDate: new Date(),
      }
    });

    console.log(`✅ Created project: ${project.name}`);

    // Add translations
    const translations = [
      {
        locale: 'tr',
        name: 'Hasarlı Araç Noktası - Hasarlı Araç Alım Merkezi',
        description: 'Türkiye\'nin güvenilir hasarlı araç alım platformu. 7/24 hizmet, aynı gün nakit ödeme ve ülke çapında kapsama.',
        fullDescription: 'Türkiye genelinde hasarlı, kazalı, hurda ve sigorta pert araçların alımı için kapsamlı bir platform olan Hasarlı Araç Noktası\'nı geliştirdik. Platform, anlık teklif, ücretsiz çekici, aynı gün nakit ödeme sunmakta ve 81 ilde 7/24 hizmet vermektedir.',
        challenge: 'Müşteri, en iyi fiyat garantisi ve 7/24 ülke çapında hizmeti vurgulayan, rekabetçi Türk araç alım pazarında rekabet edebilecek profesyonel bir platforma ihtiyaç duyuyordu.',
        solution: 'Öne çıkan CTA\'lar, WhatsApp entegrasyonu, SEO için şehir bazlı hizmet sayfaları ve güven oluşturan unsurlarla modern, dönüşüm odaklı bir web sitesi oluşturduk.'
      },
      {
        locale: 'de',
        name: 'Hasarlı Araç Noktası - Unfallfahrzeug-Zentrum',
        description: 'Die vertrauenswürdige Plattform für den Ankauf beschädigter Fahrzeuge in der Türkei mit 24/7-Service und landesweiter Abdeckung.',
        fullDescription: 'Wir haben Hasarlı Araç Noktası entwickelt, eine umfassende Plattform für den Ankauf von beschädigten, unfallgeschädigten und Schrottfahrzeugen in der gesamten Türkei mit sofortigen Angeboten und Barzahlung am selben Tag.',
        challenge: 'Der Kunde benötigte eine professionelle, vertrauenswürdige Plattform mit Bestpreisgarantie und 24/7-Service.',
        solution: 'Wir haben eine moderne, konversionsorientierte Website mit WhatsApp-Integration und stadtbasierten Serviceseiten für SEO erstellt.'
      },
      {
        locale: 'ur',
        name: 'حصارلی آراچ نوکتاسی - خراب گاڑیوں کا مرکز',
        description: 'ترکی کا قابل اعتماد خراب گاڑیوں کی خریداری کا پلیٹ فارم۔ 24/7 سروس، اسی دن نقد ادائیگی۔',
        fullDescription: 'ہم نے حصارلی آراچ نوکتاسی تیار کیا، پوری ترکی میں خراب، حادثاتی اور کباڑ گاڑیوں کی خریداری کے لیے ایک جامع پلیٹ فارم جو فوری پیشکش اور اسی دن نقد ادائیگی فراہم کرتا ہے۔',
        challenge: 'کلائنٹ کو بہترین قیمت کی ضمانت اور 24/7 سروس کے ساتھ ایک پیشہ ور پلیٹ فارم کی ضرورت تھی۔',
        solution: 'ہم نے واٹس ایپ انٹیگریشن اور شہر پر مبنی سروس پیجز کے ساتھ ایک جدید ویب سائٹ بنائی۔'
      },
      {
        locale: 'ar',
        name: 'حصارلي أراش نوكتاسي - مركز السيارات المتضررة',
        description: 'منصة تركيا الموثوقة لشراء السيارات المتضررة مع خدمة 24/7 ودفع نقدي في نفس اليوم.',
        fullDescription: 'طورنا حصارلي أراش نوكتاسي، منصة شاملة لشراء السيارات المتضررة والحوادث في جميع أنحاء تركيا مع عروض فورية ودفع نقدي في نفس اليوم.',
        challenge: 'احتاج العميل إلى منصة احترافية وموثوقة مع ضمان أفضل سعر وخدمة 24/7.',
        solution: 'أنشأنا موقعًا حديثًا يركز على التحويل مع تكامل واتساب وصفحات خدمة قائمة على المدن.'
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
    title: 'Hasarlı Araç Noktası',
    category: 'Automotive Platform',
    image: '/images/portfolio/hasarli-arac-noktasi.png',
    url: 'https://www.hasarliaracnoktasi.com/'
  };

  const servicesToUpdate = [
    'web-development',
    'frontend-development',
    'corporate-website-design',
    'web-design',
    'seo',
    'local-seo'
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
