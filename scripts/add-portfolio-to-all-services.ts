/**
 * Add portfolio items to ALL services that don't have any
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// All portfolio projects with their categories
const allProjects = [
  {
    title: 'Ankara PERT',
    category: 'Automotive Platform',
    image: '/images/portfolio/ankara-pert.png',
    url: 'https://ankarapert.com.tr/'
  },
  {
    title: 'Araban Nakit',
    category: 'Automotive Platform',
    image: '/images/portfolio/araban-nakit.png',
    url: 'https://arabannakit.com/'
  },
  {
    title: 'Maison d\'Orient',
    category: 'Luxury Real Estate',
    image: '/images/portfolio/maison-dorient.png',
    url: 'https://emlak-sitesi-six.vercel.app/'
  },
  {
    title: 'PrimeTaxi & Tours',
    category: 'Transportation & Tourism',
    image: '/images/portfolio/primetaxi.png',
    url: 'https://www.primetaxi.is/'
  },
  {
    title: 'Window Specialist',
    category: 'E-commerce',
    image: '/images/portfolio/window-specialist.png',
    url: 'https://sineklik-site-projesi.vercel.app/en'
  },
  {
    title: 'ArsaSat',
    category: 'Real Estate Platform',
    image: '/images/portfolio/arsasat.png',
    url: 'https://arsaalimi.com/'
  },
  {
    title: 'Mutfak Mobilya',
    category: 'E-commerce',
    image: '/images/portfolio/mutfak-mobilya.png',
    url: 'https://ecommerece-project-red.vercel.app/'
  },
];

// Map service categories to relevant projects
function getRelevantProjects(serviceSlug: string, serviceName: string): typeof allProjects {
  const slug = serviceSlug.toLowerCase();
  const name = serviceName.toLowerCase();

  // E-commerce related
  if (slug.includes('ecommerce') || slug.includes('e-commerce') || slug.includes('shop') ||
      slug.includes('woocommerce') || slug.includes('shopify') || slug.includes('marketplace')) {
    return [allProjects[4], allProjects[6], allProjects[2]]; // Window Specialist, Mutfak Mobilya, Maison
  }

  // Real estate related
  if (slug.includes('real-estate') || slug.includes('property') || slug.includes('emlak')) {
    return [allProjects[2], allProjects[5], allProjects[0]]; // Maison, ArsaSat, Ankara PERT
  }

  // Transportation/booking related
  if (slug.includes('booking') || slug.includes('transport') || slug.includes('travel') || slug.includes('tourism')) {
    return [allProjects[3], allProjects[2], allProjects[0]]; // PrimeTaxi, Maison, Ankara PERT
  }

  // Automotive related
  if (slug.includes('auto') || slug.includes('vehicle') || slug.includes('car')) {
    return [allProjects[0], allProjects[1], allProjects[5]]; // Ankara PERT, Araban Nakit, ArsaSat
  }

  // Web development related
  if (slug.includes('web') || slug.includes('frontend') || slug.includes('next') ||
      slug.includes('react') || slug.includes('development')) {
    return [allProjects[0], allProjects[2], allProjects[4], allProjects[6]]; // All web projects
  }

  // UI/UX Design related
  if (slug.includes('ui') || slug.includes('ux') || slug.includes('design') ||
      slug.includes('prototyp') || slug.includes('wireframe')) {
    return [allProjects[2], allProjects[4], allProjects[6]]; // Maison, Window Specialist, Mutfak
  }

  // Mobile related
  if (slug.includes('mobile') || slug.includes('ios') || slug.includes('android') || slug.includes('app')) {
    return [allProjects[3], allProjects[0], allProjects[1]]; // PrimeTaxi, Ankara PERT, Araban Nakit
  }

  // SEO/Marketing related
  if (slug.includes('seo') || slug.includes('marketing') || slug.includes('ads') ||
      slug.includes('social') || slug.includes('content')) {
    return [allProjects[0], allProjects[1], allProjects[5]]; // Ankara PERT, Araban Nakit, ArsaSat
  }

  // API/Backend related
  if (slug.includes('api') || slug.includes('backend') || slug.includes('database') ||
      slug.includes('server') || slug.includes('graphql')) {
    return [allProjects[2], allProjects[3], allProjects[4]]; // Maison, PrimeTaxi, Window Specialist
  }

  // AI/ML related
  if (slug.includes('ai') || slug.includes('machine') || slug.includes('nlp') ||
      slug.includes('chatbot') || slug.includes('automation')) {
    return [allProjects[4], allProjects[2], allProjects[6]]; // Window Specialist, Maison, Mutfak
  }

  // Cloud/DevOps related
  if (slug.includes('cloud') || slug.includes('devops') || slug.includes('docker') ||
      slug.includes('kubernetes') || slug.includes('aws') || slug.includes('azure')) {
    return [allProjects[3], allProjects[4], allProjects[2]]; // PrimeTaxi, Window Specialist, Maison
  }

  // Default: return a mix of 3 projects
  return [allProjects[0], allProjects[2], allProjects[4]]; // Ankara PERT, Maison, Window Specialist
}

async function addPortfolioToAllServices() {
  console.log('=== Adding Portfolio to All Services ===\n');

  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    select: { id: true, slug: true, name: true, content: true }
  });

  let withPortfolio = 0;
  let withoutPortfolio = 0;
  let updated = 0;

  for (const service of services) {
    const content = (service.content as any) || {};
    const existingPortfolio = content.portfolio || [];

    if (existingPortfolio.length > 0) {
      withPortfolio++;
      continue;
    }

    withoutPortfolio++;

    // Get relevant projects for this service
    const projects = getRelevantProjects(service.slug, service.name);

    // Update service with portfolio
    await prisma.service.update({
      where: { id: service.id },
      data: {
        content: {
          ...content,
          portfolio: projects
        }
      }
    });

    console.log(`✅ ${service.slug}: added ${projects.length} projects`);
    updated++;
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total services: ${services.length}`);
  console.log(`Already had portfolio: ${withPortfolio}`);
  console.log(`Added portfolio to: ${updated}`);

  await prisma.$disconnect();
}

addPortfolioToAllServices();
