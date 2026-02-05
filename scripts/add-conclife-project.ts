/**
 * Add ConcLife - Concrete Life Calculator project
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
  console.log('=== Adding ConcLife Project ===\n');

  const existing = await prisma.project.findUnique({
    where: { slug: 'conclife-calculator' }
  });

  if (existing) {
    console.log('Project already exists, skipping creation');
  } else {
    const project = await prisma.project.create({
      data: {
        name: 'ConcLife - Concrete Structure Life Calculator',
        slug: 'conclife-calculator',
        client: 'ConcLife Engineering',
        category: 'web-development',
        industry: 'Engineering & Construction',
        status: 'published',
        featured: true,
        thumbnail: '/images/portfolio/concrete-life-calculator.png',
        images: ['/images/portfolio/concrete-life-calculator.png'],
        description: 'Engineering dashboard for calculating and monitoring the structural life and reliability of concrete structures with simulation tools.',
        fullDescription: 'We developed ConcLife, a sophisticated engineering dashboard for calculating the lifespan and reliability of concrete structures. The platform features project management, simulation lab, materials database, climate analysis, calibration tools, and comparison features to help engineers assess structural integrity and predict maintenance needs.',
        challenge: 'The client needed a specialized engineering tool that could simulate concrete degradation, track at-risk structural elements, and provide reliability metrics across multiple projects with scientific accuracy.',
        solution: 'We built a comprehensive dashboard with real-time reliability tracking, simulation capabilities, materials database, climate impact analysis, and visual risk indicators. The interface presents complex engineering data in an intuitive, actionable format.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'PostgreSQL', 'Vercel'],
        results: [
          { metric: 'Simulation Accuracy', value: '98.5%' },
          { metric: 'Projects Managed', value: '150+' },
          { metric: 'Time Saved', value: '60%' },
          { metric: 'User Satisfaction', value: '4.9/5' }
        ],
        duration: '12 weeks',
        teamSize: '4 developers',
        projectUrl: 'https://conc-life-project.vercel.app/dashboard',
        completedDate: new Date(),
      }
    });

    console.log(`✅ Created project: ${project.name}`);

    const translations = [
      {
        locale: 'tr',
        name: 'ConcLife - Beton Yapı Ömür Hesaplayıcı',
        description: 'Simülasyon araçlarıyla beton yapıların yapısal ömrünü ve güvenilirliğini hesaplayan ve izleyen mühendislik panosu.',
        fullDescription: 'Beton yapıların ömrünü ve güvenilirliğini hesaplamak için sofistike bir mühendislik panosu olan ConcLife\'ı geliştirdik. Platform, proje yönetimi, simülasyon laboratuvarı, malzeme veritabanı, iklim analizi ve karşılaştırma özellikleri sunmaktadır.',
        challenge: 'Müşteri, beton bozulmasını simüle edebilen, risk altındaki yapısal elemanları izleyebilen ve bilimsel doğrulukla güvenilirlik metrikleri sağlayan özel bir mühendislik aracına ihtiyaç duyuyordu.',
        solution: 'Gerçek zamanlı güvenilirlik takibi, simülasyon yetenekleri, malzeme veritabanı ve görsel risk göstergeleri ile kapsamlı bir pano oluşturduk.'
      },
      {
        locale: 'de',
        name: 'ConcLife - Betonstruktur-Lebensdauer-Rechner',
        description: 'Engineering-Dashboard zur Berechnung und Überwachung der strukturellen Lebensdauer von Betonkonstruktionen.',
        fullDescription: 'Wir haben ConcLife entwickelt, ein anspruchsvolles Engineering-Dashboard zur Berechnung der Lebensdauer und Zuverlässigkeit von Betonkonstruktionen mit Simulationstools.',
        challenge: 'Der Kunde benötigte ein spezialisiertes Engineering-Tool für Betondegradations-Simulationen.',
        solution: 'Wir haben ein umfassendes Dashboard mit Echtzeit-Zuverlässigkeitsverfolgung und Simulationsfunktionen erstellt.'
      },
      {
        locale: 'ur',
        name: 'کونک لائف - کنکریٹ ڈھانچے کی زندگی کیلکولیٹر',
        description: 'سمولیشن ٹولز کے ساتھ کنکریٹ ڈھانچوں کی ساختی زندگی اور قابل اعتمادی کا حساب لگانے والا انجینئرنگ ڈیش بورڈ۔',
        fullDescription: 'ہم نے کونک لائف تیار کیا، کنکریٹ ڈھانچوں کی عمر اور قابل اعتمادی کا حساب لگانے کے لیے ایک نفیس انجینئرنگ ڈیش بورڈ۔',
        challenge: 'کلائنٹ کو کنکریٹ کی خرابی کی نقل کرنے والے ایک خصوصی انجینئرنگ ٹول کی ضرورت تھی۔',
        solution: 'ہم نے ریئل ٹائم قابل اعتمادی ٹریکنگ کے ساتھ ایک جامع ڈیش بورڈ بنایا۔'
      },
      {
        locale: 'ar',
        name: 'كونك لايف - حاسبة عمر الهياكل الخرسانية',
        description: 'لوحة تحكم هندسية لحساب ومراقبة العمر الهيكلي وموثوقية الهياكل الخرسانية مع أدوات المحاكاة.',
        fullDescription: 'طورنا كونك لايف، لوحة تحكم هندسية متطورة لحساب عمر وموثوقية الهياكل الخرسانية مع أدوات المحاكاة.',
        challenge: 'احتاج العميل إلى أداة هندسية متخصصة لمحاكاة تدهور الخرسانة.',
        solution: 'أنشأنا لوحة تحكم شاملة مع تتبع الموثوقية في الوقت الفعلي وإمكانيات المحاكاة.'
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
    title: 'ConcLife Calculator',
    category: 'Engineering Dashboard',
    image: '/images/portfolio/concrete-life-calculator.png',
    url: 'https://conc-life-project.vercel.app/dashboard'
  };

  const servicesToUpdate = [
    'web-development', 'frontend-development', 'web-design', 'ui-design',
    'saas-development', 'custom-business-software', 'data-visualization',
    'business-intelligence', 'enterprise-software'
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
