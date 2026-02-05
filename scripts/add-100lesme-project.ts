/**
 * Add 100leşme - Personal Development Blog project
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
  console.log('=== Adding 100leşme Project ===\n');

  const existing = await prisma.project.findUnique({
    where: { slug: '100lesme-blog' }
  });

  if (existing) {
    console.log('Project already exists, skipping creation');
  } else {
    const project = await prisma.project.create({
      data: {
        name: '100leşme - Personal Development Blog',
        slug: '100lesme-blog',
        client: '100leşme',
        category: 'web-development',
        industry: 'Personal Development & Coaching',
        status: 'published',
        featured: true,
        thumbnail: '/images/portfolio/100lesme.png',
        images: ['/images/portfolio/100lesme.png'],
        description: 'Modern personal development and leadership blog platform with categories, success stories, newsletter, and dark mode support.',
        fullDescription: 'We developed 100leşme, a beautifully designed personal development and leadership blog documenting a journey of self-improvement. The platform features categorized articles, success stories section, newsletter subscriptions, search functionality, social media integration, and responsive design with light/dark mode support.',
        challenge: 'The client needed an elegant, content-focused blog platform that could organize articles by categories, engage readers through newsletters, and provide a seamless reading experience across all devices.',
        solution: 'We created a modern, minimalist blog with intuitive navigation, category-based content organization, newsletter integration, RSS feed support, social sharing capabilities, and a beautiful light/dark mode toggle for comfortable reading.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX', 'Vercel'],
        results: [
          { metric: 'Monthly Readers', value: '+350%' },
          { metric: 'Newsletter Subs', value: '+220%' },
          { metric: 'Avg. Read Time', value: '5.2 min' },
          { metric: 'Social Shares', value: '+180%' }
        ],
        duration: '4 weeks',
        teamSize: '2 developers',
        projectUrl: 'https://www.100lesme.com/',
        completedDate: new Date(),
      }
    });

    console.log(`✅ Created project: ${project.name}`);

    const translations = [
      {
        locale: 'tr',
        name: '100leşme - Kişisel Gelişim Blogu',
        description: 'Kategoriler, başarı hikayeleri, bülten ve karanlık mod desteği ile modern kişisel gelişim ve liderlik blog platformu.',
        fullDescription: 'Kişisel gelişim yolculuğunu belgeleyen, güzel tasarlanmış bir kişisel gelişim ve liderlik blogu olan 100leşme\'yi geliştirdik. Platform, kategorize edilmiş makaleler, başarı hikayeleri, bülten abonelikleri ve açık/koyu mod desteği sunmaktadır.',
        challenge: 'Müşteri, makaleleri kategorilere göre düzenleyebilen, okuyucuları bültenler aracılığıyla etkileşime sokabilen zarif, içerik odaklı bir blog platformuna ihtiyaç duyuyordu.',
        solution: 'Sezgisel navigasyon, kategori bazlı içerik organizasyonu, bülten entegrasyonu ve güzel açık/koyu mod geçişi ile modern, minimalist bir blog oluşturduk.'
      },
      {
        locale: 'de',
        name: '100leşme - Persönlichkeitsentwicklung Blog',
        description: 'Moderne Plattform für persönliche Entwicklung und Führung mit Kategorien, Erfolgsgeschichten und Dark Mode.',
        fullDescription: 'Wir haben 100leşme entwickelt, einen schön gestalteten Blog für persönliche Entwicklung und Führung mit kategorisierten Artikeln und Newsletter-Integration.',
        challenge: 'Der Kunde benötigte eine elegante, inhaltsorientierte Blog-Plattform.',
        solution: 'Wir haben einen modernen, minimalistischen Blog mit intuitiver Navigation und Dark Mode erstellt.'
      },
      {
        locale: 'ur',
        name: '100leşme - ذاتی ترقی کا بلاگ',
        description: 'زمرے، کامیابی کی کہانیوں، نیوز لیٹر اور ڈارک موڈ سپورٹ کے ساتھ جدید ذاتی ترقی اور قیادت کا بلاگ پلیٹ فارم۔',
        fullDescription: 'ہم نے 100leşme تیار کیا، خود کو بہتر بنانے کے سفر کو دستاویز کرنے والا ایک خوبصورت ڈیزائن شدہ ذاتی ترقی اور قیادت کا بلاگ۔',
        challenge: 'کلائنٹ کو ایک خوبصورت، مواد پر مرکوز بلاگ پلیٹ فارم کی ضرورت تھی۔',
        solution: 'ہم نے سہل نیویگیشن اور ڈارک موڈ کے ساتھ ایک جدید، مینیملسٹ بلاگ بنایا۔'
      },
      {
        locale: 'ar',
        name: '100leşme - مدونة التطوير الشخصي',
        description: 'منصة مدونة حديثة للتطوير الشخصي والقيادة مع فئات وقصص نجاح ووضع داكن.',
        fullDescription: 'طورنا 100leşme، مدونة مصممة بشكل جميل للتطوير الشخصي والقيادة مع مقالات مصنفة ودعم النشرة الإخبارية.',
        challenge: 'احتاج العميل إلى منصة مدونة أنيقة تركز على المحتوى.',
        solution: 'أنشأنا مدونة حديثة وبسيطة مع تنقل سهل ووضع داكن.'
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
    title: '100leşme Blog',
    category: 'Personal Development',
    image: '/images/portfolio/100lesme.png',
    url: 'https://www.100lesme.com/'
  };

  const servicesToUpdate = [
    'web-development', 'frontend-development', 'web-design', 'ui-design',
    'blog-copywriting', 'content-strategy', 'wordpress-development', 'seo'
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
