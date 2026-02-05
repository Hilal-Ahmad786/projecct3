/**
 * Update portfolio image paths in database
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

const imageMap: Record<string, string> = {
  'ankara-pert': '/images/portfolio/ankara-pert.png',
  'araban-nakit': '/images/portfolio/araban-nakit.png',
  'maison-dorient': '/images/portfolio/maison-dorient.png',
  'primetaxi-iceland': '/images/portfolio/primetaxi.png', // Not provided yet
  'window-specialist': '/images/portfolio/window-specialist.png',
  'arsasat': '/images/portfolio/arsasat.png',
  'mutfak-mobilya': '/images/portfolio/mutfak-mobilya.png',
};

const urlToImageMap: Record<string, string> = {
  'https://ankarapert.com.tr/': '/images/portfolio/ankara-pert.png',
  'https://arabannakit.com/': '/images/portfolio/araban-nakit.png',
  'https://emlak-sitesi-six.vercel.app/': '/images/portfolio/maison-dorient.png',
  'https://www.primetaxi.is/': '/images/portfolio/primetaxi.png',
  'https://sineklik-site-projesi.vercel.app/en': '/images/portfolio/window-specialist.png',
  'https://arsaalimi.com/': '/images/portfolio/arsasat.png',
  'https://ecommerece-project-red.vercel.app/': '/images/portfolio/mutfak-mobilya.png',
};

async function updateImages() {
  console.log('=== Updating Portfolio Images ===\n');

  // Update project thumbnails
  console.log('Updating project thumbnails...');
  for (const [slug, imagePath] of Object.entries(imageMap)) {
    const result = await prisma.project.updateMany({
      where: { slug },
      data: { thumbnail: imagePath, images: [imagePath] }
    });
    if (result.count > 0) {
      console.log(`  ✅ ${slug}: ${imagePath}`);
    }
  }

  // Update service portfolio images
  console.log('\nUpdating service portfolio images...');
  const services = await prisma.service.findMany({
    where: { status: { in: ['published', 'active'] } },
    select: { id: true, slug: true, content: true }
  });

  let updatedServices = 0;
  for (const service of services) {
    const content = (service.content as any) || {};
    const portfolio = content.portfolio || [];

    if (portfolio.length === 0) continue;

    let updated = false;
    const updatedPortfolio = portfolio.map((item: any) => {
      const newImage = urlToImageMap[item.url];
      if (newImage && item.image !== newImage) {
        updated = true;
        return { ...item, image: newImage };
      }
      return item;
    });

    if (updated) {
      await prisma.service.update({
        where: { id: service.id },
        data: {
          content: {
            ...content,
            portfolio: updatedPortfolio
          }
        }
      });
      updatedServices++;
    }
  }

  console.log(`  ✅ Updated ${updatedServices} services with correct image paths`);

  console.log('\n=== Done ===');
  await prisma.$disconnect();
}

updateImages();
