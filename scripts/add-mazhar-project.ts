/**
 * Add Mazhar Dergisi project
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
  console.log('=== Adding Mazhar Dergisi Project ===\n');

  // Check if project already exists
  const existing = await prisma.project.findUnique({
    where: { slug: 'mazhar-dergisi' }
  });

  if (existing) {
    console.log('Project already exists, skipping creation');
  } else {
    // Create the project
    const project = await prisma.project.create({
      data: {
        name: 'Mazhar Dergisi - Digital Literary Magazine',
        slug: 'mazhar-dergisi',
        client: 'Mazhar Dergisi',
        category: 'web-development',
        industry: 'Media & Publishing',
        status: 'published',
        featured: true,
        thumbnail: '/images/portfolio/mazhar-dergisi.png',
        images: ['/images/portfolio/mazhar-dergisi.png'],
        description: 'Contemporary Turkish literature, culture, and arts digital magazine with author profiles, issue archives, and newsletter subscriptions.',
        fullDescription: 'We developed Mazhar Dergisi, a sophisticated digital literary magazine platform featuring contemporary Turkish literature, culture, and arts content. The platform includes article management, author profiles, magazine issue archives, newsletter integration, and a modern dark-themed responsive design.',
        challenge: 'The client needed an elegant, content-focused platform that could showcase literary works, manage multiple authors, organize content by issues, and engage readers through newsletter subscriptions.',
        solution: 'We built a modern CMS-powered magazine website with a striking dark theme, featured article sections, author directory, issue-based content organization, search functionality, and newsletter integration for reader engagement.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel'],
        results: [
          { metric: 'Monthly Readers', value: '+320%' },
          { metric: 'Newsletter Signups', value: '+180%' },
          { metric: 'Avg. Read Time', value: '4.5 min' },
          { metric: 'Author Submissions', value: '+250%' }
        ],
        duration: '8 weeks',
        teamSize: '3 developers',
        projectUrl: 'https://www.mazhardergisi.com/',
        completedDate: new Date(),
      }
    });

    console.log(`✅ Created project: ${project.name}`);

    // Add translations
    const translations = [
      {
        locale: 'tr',
        name: 'Mazhar Dergisi - Dijital Edebiyat Dergisi',
        description: 'Yazar profilleri, sayı arşivleri ve bülten abonelikleri ile çağdaş Türk edebiyatı, kültür ve sanat dijital dergisi.',
        fullDescription: 'Çağdaş Türk edebiyatı, kültür ve sanat içeriklerini sergileyen sofistike bir dijital edebiyat dergisi platformu olan Mazhar Dergisi\'ni geliştirdik. Platform, makale yönetimi, yazar profilleri, dergi sayı arşivleri ve modern karanlık temalı duyarlı tasarım içermektedir.',
        challenge: 'Müşteri, edebi eserleri sergileyebilen, birden fazla yazarı yönetebilen ve okuyucularla bülten abonelikleri aracılığıyla etkileşim kurabilen zarif, içerik odaklı bir platforma ihtiyaç duyuyordu.',
        solution: 'Çarpıcı karanlık tema, öne çıkan makale bölümleri, yazar dizini, sayı bazlı içerik organizasyonu ve bülten entegrasyonu ile modern bir CMS destekli dergi web sitesi oluşturduk.'
      },
      {
        locale: 'de',
        name: 'Mazhar Dergisi - Digitales Literaturmagazin',
        description: 'Zeitgenössisches türkisches Literatur-, Kultur- und Kunstmagazin mit Autorenprofilen und Newsletter.',
        fullDescription: 'Wir haben Mazhar Dergisi entwickelt, eine anspruchsvolle digitale Literaturmagazin-Plattform mit zeitgenössischer türkischer Literatur, Kultur und Kunst.',
        challenge: 'Der Kunde benötigte eine elegante, inhaltsorientierte Plattform für literarische Werke.',
        solution: 'Wir haben eine moderne CMS-gestützte Magazin-Website mit dunklem Theme und Newsletter-Integration erstellt.'
      },
      {
        locale: 'ur',
        name: 'مظہر درگیسی - ڈیجیٹل ادبی میگزین',
        description: 'مصنف پروفائلز اور نیوز لیٹر کے ساتھ عصری ترک ادب، ثقافت اور فنون کا ڈیجیٹل میگزین۔',
        fullDescription: 'ہم نے مظہر درگیسی تیار کیا، عصری ترک ادب، ثقافت اور فنون کے مواد کو پیش کرنے والا ایک نفیس ڈیجیٹل ادبی میگزین پلیٹ فارم۔',
        challenge: 'کلائنٹ کو ادبی تخلیقات پیش کرنے والے ایک خوبصورت، مواد پر مرکوز پلیٹ فارم کی ضرورت تھی۔',
        solution: 'ہم نے ڈارک تھیم اور نیوز لیٹر انٹیگریشن کے ساتھ ایک جدید CMS میگزین ویب سائٹ بنائی۔'
      },
      {
        locale: 'ar',
        name: 'مظهر درگيسي - مجلة أدبية رقمية',
        description: 'مجلة رقمية للأدب والثقافة والفنون التركية المعاصرة مع ملفات المؤلفين والنشرة الإخبارية.',
        fullDescription: 'طورنا مظهر درگيسي، منصة مجلة أدبية رقمية متطورة تعرض الأدب والثقافة والفنون التركية المعاصرة.',
        challenge: 'احتاج العميل إلى منصة أنيقة تركز على المحتوى للأعمال الأدبية.',
        solution: 'أنشأنا موقع مجلة حديث مدعوم بنظام إدارة المحتوى مع سمة داكنة وتكامل النشرة الإخبارية.'
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
    title: 'Mazhar Dergisi',
    category: 'Media & Publishing',
    image: '/images/portfolio/mazhar-dergisi.png',
    url: 'https://www.mazhardergisi.com/'
  };

  const servicesToUpdate = [
    'web-development',
    'frontend-development',
    'web-design',
    'ui-design',
    'blog-copywriting',
    'content-strategy',
    'wordpress-development'
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
