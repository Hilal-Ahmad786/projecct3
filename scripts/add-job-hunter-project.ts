/**
 * Add Job Hunter Bot - AI-Powered Career Assistant project
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
  console.log('=== Adding Job Hunter Bot Project ===\n');

  const existing = await prisma.project.findUnique({
    where: { slug: 'job-hunter-bot' }
  });

  if (existing) {
    console.log('Project already exists, skipping creation');
  } else {
    const project = await prisma.project.create({
      data: {
        name: 'Job Hunter Bot - AI-Powered Career Assistant',
        slug: 'job-hunter-bot',
        client: 'Internal Project',
        category: 'desktop-application',
        industry: 'HR Tech & Automation',
        status: 'published',
        featured: true,
        thumbnail: '/images/portfolio/job-hunter-bot.png',
        images: ['/images/portfolio/job-hunter-bot.png'],
        description: 'Comprehensive desktop application for automating job search across 30+ platforms with AI-powered CV optimization using GPT-4.',
        fullDescription: 'We developed Job Hunter Bot, a sophisticated desktop application designed to automate and optimize the job hunting process. The platform scrapes job listings from 30+ job boards including LinkedIn, Indeed, Glassdoor, and regional sites. It features AI-powered CV optimization using OpenAI GPT-4 to match specific roles, application tracking with SQLite database, and analytics dashboard for job search performance insights.',
        challenge: 'Job searching across multiple platforms is time-consuming and repetitive. Managing applications, tailoring CVs for each role, and tracking progress across dozens of job boards requires significant manual effort.',
        solution: 'We built a desktop application with multi-platform scraping capabilities, AI-powered CV/Resume optimization, Kanban-style application tracker, and comprehensive analytics. The PyQt6 interface provides a clean dark theme with intuitive navigation for job search, applications tracking, and CV optimization workflows.',
        technologies: ['Python', 'PyQt6', 'Selenium', 'BeautifulSoup', 'Pandas', 'SQLite', 'OpenAI GPT-4', 'REST APIs'],
        results: [
          { metric: 'Job Boards Supported', value: '30+' },
          { metric: 'Time Saved', value: '80%' },
          { metric: 'CV Match Rate', value: '+45%' },
          { metric: 'Applications Tracked', value: 'Unlimited' }
        ],
        duration: '8 weeks',
        teamSize: '1 developer',
        projectUrl: null, // Internal tool, not publicly accessible
        completedDate: new Date(),
      }
    });

    console.log(`Created project: ${project.name}`);

    const translations = [
      {
        locale: 'tr',
        name: 'Job Hunter Bot - Yapay Zeka Destekli Kariyer Asistanı',
        description: 'GPT-4 ile yapay zeka destekli CV optimizasyonu ile 30+ platformda iş aramayı otomatikleştiren kapsamlı masaüstü uygulaması.',
        fullDescription: 'İş arama sürecini otomatikleştirmek ve optimize etmek için tasarlanmış sofistike bir masaüstü uygulaması olan Job Hunter Bot\'u geliştirdik. Platform, LinkedIn, Indeed, Glassdoor dahil 30+ iş sitesinden iş ilanlarını tarar. OpenAI GPT-4 kullanarak CV optimizasyonu, SQLite veritabanı ile başvuru takibi ve iş arama performansı için analitik panosu sunar.',
        challenge: 'Birden fazla platformda iş aramak zaman alıcı ve tekrarlayıcıdır. Başvuruları yönetmek, her rol için CV\'leri uyarlamak ve düzinelerce iş sitesinde ilerlemeyi takip etmek önemli manuel çaba gerektirir.',
        solution: 'Çoklu platform tarama özellikleri, yapay zeka destekli CV optimizasyonu, Kanban tarzı başvuru takipçisi ve kapsamlı analitik içeren bir masaüstü uygulaması oluşturduk.'
      },
      {
        locale: 'de',
        name: 'Job Hunter Bot - KI-gestützter Karriereassistent',
        description: 'Umfassende Desktop-Anwendung zur Automatisierung der Jobsuche auf 30+ Plattformen mit KI-gestützter Lebenslaufoptimierung durch GPT-4.',
        fullDescription: 'Wir haben Job Hunter Bot entwickelt, eine anspruchsvolle Desktop-Anwendung zur Automatisierung und Optimierung der Jobsuche. Die Plattform durchsucht Stellenangebote von 30+ Jobbörsen mit KI-gestützter CV-Optimierung.',
        challenge: 'Die Jobsuche auf mehreren Plattformen ist zeitaufwändig und repetitiv.',
        solution: 'Wir haben eine Desktop-Anwendung mit Multi-Plattform-Scraping, KI-gestützter Lebenslaufoptimierung und Bewerbungsverfolgung erstellt.'
      },
      {
        locale: 'ur',
        name: 'جاب ہنٹر بوٹ - AI سے چلنے والا کیریئر اسسٹنٹ',
        description: 'GPT-4 کا استعمال کرتے ہوئے AI سے چلنے والی CV آپٹیمائزیشن کے ساتھ 30+ پلیٹ فارمز پر جاب کی تلاش کو خودکار بنانے والی جامع ڈیسک ٹاپ ایپلیکیشن۔',
        fullDescription: 'ہم نے جاب ہنٹر بوٹ تیار کیا، جاب کی تلاش کے عمل کو خودکار اور بہتر بنانے کے لیے ڈیزائن کی گئی ایک نفیس ڈیسک ٹاپ ایپلیکیشن۔',
        challenge: 'متعدد پلیٹ فارمز پر جاب کی تلاش وقت طلب اور دہرائی جانے والی ہے۔',
        solution: 'ہم نے ملٹی پلیٹ فارم سکریپنگ اور AI سے چلنے والی CV آپٹیمائزیشن کے ساتھ ایک ڈیسک ٹاپ ایپلیکیشن بنائی۔'
      },
      {
        locale: 'ar',
        name: 'جوب هانتر بوت - مساعد مهني مدعوم بالذكاء الاصطناعي',
        description: 'تطبيق سطح مكتب شامل لأتمتة البحث عن وظائف عبر 30+ منصة مع تحسين السيرة الذاتية بالذكاء الاصطناعي باستخدام GPT-4.',
        fullDescription: 'طورنا جوب هانتر بوت، تطبيق سطح مكتب متطور مصمم لأتمتة وتحسين عملية البحث عن عمل مع تحسين السيرة الذاتية بالذكاء الاصطناعي.',
        challenge: 'البحث عن عمل عبر منصات متعددة يستغرق وقتًا طويلاً ومتكررًا.',
        solution: 'أنشأنا تطبيق سطح مكتب مع قدرات الكشط متعددة المنصات وتحسين السيرة الذاتية بالذكاء الاصطناعي.'
      }
    ];

    for (const t of translations) {
      await prisma.projectTranslation.create({
        data: { projectId: project.id, ...t }
      });
    }
    console.log('Added translations (TR, DE, UR, AR)');
  }

  console.log('\nAdding to service portfolios...');

  const portfolioItem = {
    title: 'Job Hunter Bot',
    category: 'Desktop Application / AI Automation',
    image: '/images/portfolio/job-hunter-bot.png',
    url: null // Internal tool
  };

  const servicesToUpdate = [
    'custom-business-software', 'enterprise-software', 'ai-solutions',
    'ai-chatbots', 'ai-automation', 'python-development', 'desktop-application',
    'data-automation', 'business-process-automation', 'web-scraping'
  ];

  for (const serviceSlug of servicesToUpdate) {
    const service = await prisma.service.findFirst({ where: { slug: serviceSlug } });
    if (!service) continue;

    const content = (service.content as any) || {};
    const existingPortfolio = content.portfolio || [];

    if (existingPortfolio.some((p: any) => p.title === portfolioItem.title)) {
      console.log(`⏭️  ${serviceSlug}: already has this project`);
      continue;
    }

    await prisma.service.update({
      where: { id: service.id },
      data: { content: { ...content, portfolio: [...existingPortfolio, portfolioItem] } }
    });
    console.log(`${serviceSlug}: added project`);
  }

  console.log('\n=== Done ===');
  await prisma.$disconnect();
}

addProject();
