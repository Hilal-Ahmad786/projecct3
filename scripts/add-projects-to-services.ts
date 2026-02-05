/**
 * Add portfolio projects to related service pages
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// Map of project slugs to the services they should appear in
const projectServiceMap: Record<string, string[]> = {
  'ankara-pert': ['web-development', 'frontend-development', 'next-js-development', 'corporate-websites'],
  'araban-nakit': ['web-development', 'frontend-development', 'next-js-development', 'corporate-websites', 'seo'],
  'maison-dorient': ['web-development', 'frontend-development', 'next-js-development', 'ui-design', 'ux-research'],
  'primetaxi-iceland': ['web-development', 'frontend-development', 'next-js-development', 'e-commerce', 'ui-design'],
  'window-specialist': ['e-commerce', 'web-development', 'frontend-development', 'next-js-development', 'ui-design', 'woocommerce-development'],
  'arsasat': ['web-development', 'frontend-development', 'next-js-development', 'corporate-websites'],
  'mutfak-mobilya': ['e-commerce', 'web-development', 'frontend-development', 'next-js-development', 'ui-design', 'woocommerce-development'],
};

// Project portfolio entries (for service content.portfolio)
const projectPortfolioEntries: Record<string, { title: string; category: string; image: string; url: string }> = {
  'ankara-pert': {
    title: 'Ankara PERT',
    category: 'Automotive Platform',
    image: '/images/portfolio/ankara-pert.jpg',
    url: 'https://ankarapert.com.tr/'
  },
  'araban-nakit': {
    title: 'Araban Nakit',
    category: 'Automotive Platform',
    image: '/images/portfolio/araban-nakit.jpg',
    url: 'https://arabannakit.com/'
  },
  'maison-dorient': {
    title: 'Maison d\'Orient',
    category: 'Luxury Real Estate',
    image: '/images/portfolio/maison-dorient.jpg',
    url: 'https://emlak-sitesi-six.vercel.app/'
  },
  'primetaxi-iceland': {
    title: 'PrimeTaxi & Tours',
    category: 'Transportation & Tourism',
    image: '/images/portfolio/primetaxi.jpg',
    url: 'https://www.primetaxi.is/'
  },
  'window-specialist': {
    title: 'Window Specialist',
    category: 'E-commerce',
    image: '/images/portfolio/window-specialist.jpg',
    url: 'https://sineklik-site-projesi.vercel.app/en'
  },
  'arsasat': {
    title: 'ArsaSat',
    category: 'Real Estate Platform',
    image: '/images/portfolio/arsasat.jpg',
    url: 'https://arsaalimi.com/'
  },
  'mutfak-mobilya': {
    title: 'Mutfak Mobilya',
    category: 'E-commerce',
    image: '/images/portfolio/mutfak-mobilya.jpg',
    url: 'https://ecommerece-project-red.vercel.app/'
  },
};

async function addProjectsToServices() {
  console.log('=== Adding Projects to Service Portfolios ===\n');

  // Invert the map: service -> projects
  const serviceProjectMap: Record<string, string[]> = {};
  for (const [projectSlug, services] of Object.entries(projectServiceMap)) {
    for (const serviceSlug of services) {
      if (!serviceProjectMap[serviceSlug]) {
        serviceProjectMap[serviceSlug] = [];
      }
      serviceProjectMap[serviceSlug].push(projectSlug);
    }
  }

  let updatedCount = 0;

  for (const [serviceSlug, projectSlugs] of Object.entries(serviceProjectMap)) {
    try {
      const service = await prisma.service.findFirst({
        where: { slug: serviceSlug }
      });

      if (!service) {
        console.log(`⚠️  Service not found: ${serviceSlug}`);
        continue;
      }

      const content = (service.content as any) || {};
      const existingPortfolio = content.portfolio || [];

      // Get existing portfolio URLs to avoid duplicates
      const existingUrls = new Set(existingPortfolio.map((p: any) => p.url));

      // Add new projects
      const newProjects = projectSlugs
        .map(slug => projectPortfolioEntries[slug])
        .filter(p => p && !existingUrls.has(p.url));

      if (newProjects.length === 0) {
        console.log(`⏭️  ${serviceSlug}: all projects already in portfolio`);
        continue;
      }

      const updatedPortfolio = [...existingPortfolio, ...newProjects];

      await prisma.service.update({
        where: { id: service.id },
        data: {
          content: {
            ...content,
            portfolio: updatedPortfolio
          }
        }
      });

      console.log(`✅ ${serviceSlug}: added ${newProjects.length} projects (total: ${updatedPortfolio.length})`);
      updatedCount++;

    } catch (error) {
      console.error(`❌ Error updating ${serviceSlug}:`, error);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Services updated: ${updatedCount}`);

  await prisma.$disconnect();
}

addProjectsToServices();
