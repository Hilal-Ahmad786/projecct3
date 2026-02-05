/**
 * Add portfolio projects to additional related services
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

// Additional services to add projects to
const additionalServiceMap: Record<string, string[]> = {
  'corporate-website-design': ['ankara-pert', 'araban-nakit', 'arsasat'],
  'progressive-web-apps': ['primetaxi-iceland', 'window-specialist', 'maison-dorient'],
  'web-design': ['ankara-pert', 'araban-nakit', 'maison-dorient', 'primetaxi-iceland', 'arsasat', 'mutfak-mobilya', 'window-specialist'],
};

// Project portfolio entries
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

async function addProjectsToAdditionalServices() {
  console.log('=== Adding Projects to Additional Services ===\n');

  let updatedCount = 0;

  for (const [serviceSlug, projectSlugs] of Object.entries(additionalServiceMap)) {
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

addProjectsToAdditionalServices();
