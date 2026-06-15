import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
import { prisma } from './src/lib/db/prisma';

async function main() {
  const missingSlugs = ['wordpress-plugin-development', 'wordpress-optimization'];
  for (const slug of missingSlugs) {
    const service = await prisma.service.findUnique({ where: { slug } });
    if (!service) continue;
    
    await prisma.serviceTranslation.upsert({
      where: {
        serviceId_locale: {
          serviceId: service.id,
          locale: 'en',
        }
      },
      update: {},
      create: {
        serviceId: service.id,
        locale: 'en',
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        shortDescription: 'Custom ' + slug.replace('-', ' '),
        content: {},
      }
    });
    console.log(`Created 'en' locale for ${slug}`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
