/**
 * Replace ALL service portfolios with only real projects (no placeholders)
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// All REAL projects with actual screenshots
const realProjects = {
  'ankara-pert': {
    title: 'Ankara PERT',
    category: 'Automotive Platform',
    image: '/images/portfolio/ankara-pert.png',
    url: 'https://ankarapert.com.tr/'
  },
  'araban-nakit': {
    title: 'Araban Nakit',
    category: 'Automotive Platform',
    image: '/images/portfolio/araban-nakit.png',
    url: 'https://arabannakit.com/'
  },
  'arsasat': {
    title: 'ArsaSat',
    category: 'Real Estate Platform',
    image: '/images/portfolio/arsasat.png',
    url: 'https://arsaalimi.com/'
  },
  'hasarli-arac': {
    title: 'Hasarlı Araç Noktası',
    category: 'Automotive Platform',
    image: '/images/portfolio/hasarli-arac-noktasi.png',
    url: 'https://www.hasarliaracnoktasi.com/'
  },
  'maison-dorient': {
    title: 'Maison d\'Orient',
    category: 'Luxury Real Estate',
    image: '/images/portfolio/maison-dorient.png',
    url: 'https://emlak-sitesi-six.vercel.app/'
  },
  'mutfak-mobilya': {
    title: 'Mutfak Mobilya',
    category: 'E-commerce',
    image: '/images/portfolio/mutfak-mobilya.png',
    url: 'https://ecommerece-project-red.vercel.app/'
  },
  'primetaxi': {
    title: 'PrimeTaxi & Tours',
    category: 'Transportation & Tourism',
    image: '/images/portfolio/primetaxi.png',
    url: 'https://www.primetaxi.is/'
  },
  'window-specialist': {
    title: 'Window Specialist',
    category: 'E-commerce',
    image: '/images/portfolio/window-specialist.png',
    url: 'https://sineklik-site-projesi.vercel.app/en'
  },
  'mobil-lastikci': {
    title: '7/24 Mobil Lastikçi',
    category: 'Automotive Services',
    image: '/images/portfolio/mobil-lastikci.png',
    url: 'https://lastikci.vercel.app/'
  },
  'mazhar-dergisi': {
    title: 'Mazhar Dergisi',
    category: 'Media & Publishing',
    image: '/images/portfolio/mazhar-dergisi.png',
    url: 'https://www.mazhardergisi.com/'
  },
  'paper-market': {
    title: 'Paper Market World',
    category: 'B2B Trading Platform',
    image: '/images/portfolio/paper-market-world.png',
    url: 'https://www.papermarketworld.com/en'
  },
  'conclife': {
    title: 'ConcLife Calculator',
    category: 'Engineering Dashboard',
    image: '/images/portfolio/concrete-life-calculator.png',
    url: 'https://conc-life-project.vercel.app/dashboard'
  },
  'terrace-cafe': {
    title: 'My Terrace Cafe',
    category: 'Restaurant & Hospitality',
    image: '/images/portfolio/terrace-cafe.png',
    url: 'https://myterracecaferestaurant.com/en'
  },
  '100lesme': {
    title: '100leşme Blog',
    category: 'Personal Development',
    image: '/images/portfolio/100lesme.png',
    url: 'https://www.100lesme.com/'
  },
};

// Get relevant projects based on service type
function getProjectsForService(slug: string, name: string): typeof realProjects[keyof typeof realProjects][] {
  const s = slug.toLowerCase();
  const n = name.toLowerCase();

  // E-commerce related
  if (s.includes('ecommerce') || s.includes('e-commerce') || s.includes('shop') ||
      s.includes('woocommerce') || s.includes('shopify') || s.includes('marketplace') ||
      s.includes('headless-commerce') || s.includes('b2b-ecommerce')) {
    return [realProjects['window-specialist'], realProjects['mutfak-mobilya'], realProjects['paper-market']];
  }

  // Real estate related
  if (s.includes('real-estate') || s.includes('property') || s.includes('emlak')) {
    return [realProjects['maison-dorient'], realProjects['arsasat'], realProjects['ankara-pert']];
  }

  // Restaurant/hospitality
  if (s.includes('restaurant') || s.includes('hospitality') || s.includes('booking') ||
      s.includes('reservation') || s.includes('hotel')) {
    return [realProjects['terrace-cafe'], realProjects['primetaxi'], realProjects['maison-dorient']];
  }

  // Transportation/tourism
  if (s.includes('transport') || s.includes('travel') || s.includes('tourism') || s.includes('taxi')) {
    return [realProjects['primetaxi'], realProjects['terrace-cafe'], realProjects['ankara-pert']];
  }

  // Automotive related
  if (s.includes('auto') || s.includes('vehicle') || s.includes('car')) {
    return [realProjects['ankara-pert'], realProjects['araban-nakit'], realProjects['hasarli-arac'], realProjects['mobil-lastikci']];
  }

  // Blog/content/media
  if (s.includes('blog') || s.includes('content') || s.includes('copywriting') ||
      s.includes('media') || s.includes('publishing') || s.includes('newsletter')) {
    return [realProjects['mazhar-dergisi'], realProjects['100lesme'], realProjects['terrace-cafe']];
  }

  // SaaS/Dashboard/BI
  if (s.includes('saas') || s.includes('dashboard') || s.includes('analytics') ||
      s.includes('business-intelligence') || s.includes('data-visual') || s.includes('enterprise')) {
    return [realProjects['conclife'], realProjects['paper-market'], realProjects['window-specialist']];
  }

  // B2B
  if (s.includes('b2b') || s.includes('trading') || s.includes('wholesale')) {
    return [realProjects['paper-market'], realProjects['conclife'], realProjects['window-specialist']];
  }

  // UI/UX Design
  if (s.includes('ui') || s.includes('ux') || s.includes('design') || s.includes('prototyp')) {
    return [realProjects['maison-dorient'], realProjects['window-specialist'], realProjects['mazhar-dergisi'], realProjects['100lesme']];
  }

  // Mobile/App
  if (s.includes('mobile') || s.includes('ios') || s.includes('android') || s.includes('app') || s.includes('flutter')) {
    return [realProjects['primetaxi'], realProjects['mobil-lastikci'], realProjects['ankara-pert']];
  }

  // SEO/Marketing
  if (s.includes('seo') || s.includes('marketing') || s.includes('ads') || s.includes('social') ||
      s.includes('ppc') || s.includes('google') || s.includes('facebook') || s.includes('instagram')) {
    return [realProjects['ankara-pert'], realProjects['araban-nakit'], realProjects['hasarli-arac'], realProjects['terrace-cafe']];
  }

  // API/Backend
  if (s.includes('api') || s.includes('backend') || s.includes('database') || s.includes('graphql') ||
      s.includes('microservice') || s.includes('server')) {
    return [realProjects['paper-market'], realProjects['conclife'], realProjects['window-specialist']];
  }

  // AI/ML
  if (s.includes('ai') || s.includes('machine') || s.includes('nlp') || s.includes('chatbot') ||
      s.includes('automation') || s.includes('llm') || s.includes('gpt')) {
    return [realProjects['conclife'], realProjects['paper-market'], realProjects['window-specialist']];
  }

  // Cloud/DevOps
  if (s.includes('cloud') || s.includes('devops') || s.includes('docker') || s.includes('kubernetes') ||
      s.includes('aws') || s.includes('azure') || s.includes('infrastructure')) {
    return [realProjects['paper-market'], realProjects['conclife'], realProjects['primetaxi']];
  }

  // Landing page / Corporate
  if (s.includes('landing') || s.includes('corporate') || s.includes('business')) {
    return [realProjects['mobil-lastikci'], realProjects['terrace-cafe'], realProjects['ankara-pert']];
  }

  // Default: mix of different types
  return [
    realProjects['ankara-pert'],
    realProjects['maison-dorient'],
    realProjects['window-specialist'],
    realProjects['conclife']
  ];
}

async function replaceAllPortfolios() {
  console.log('=== Replacing ALL Service Portfolios with Real Projects ===\n');

  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    select: { id: true, slug: true, name: true, content: true }
  });

  let updated = 0;

  for (const service of services) {
    const content = (service.content as any) || {};

    // Get relevant real projects for this service
    const projects = getProjectsForService(service.slug, service.name);

    // Replace portfolio completely with real projects
    await prisma.service.update({
      where: { id: service.id },
      data: {
        content: {
          ...content,
          portfolio: projects
        }
      }
    });

    console.log(`✅ ${service.slug}: ${projects.length} real projects`);
    updated++;
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total services updated: ${updated}`);
  console.log(`All portfolios now use only real projects with actual screenshots`);

  await prisma.$disconnect();
}

replaceAllPortfolios();
