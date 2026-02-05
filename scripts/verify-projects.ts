/**
 * Verify portfolio projects are properly added
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString: databaseUrl! });
const prisma = new PrismaClient({ adapter });

async function verifyProjects() {
  console.log('=== Portfolio Projects Summary ===\n');

  // Get all projects
  const projects = await prisma.project.findMany({
    where: { status: 'published' },
    include: { translations: true },
    orderBy: { createdAt: 'desc' }
  });

  console.log(`Total Projects: ${projects.length}\n`);

  for (const project of projects) {
    console.log(`📁 ${project.name}`);
    console.log(`   Slug: ${project.slug}`);
    console.log(`   Category: ${project.category}`);
    console.log(`   Industry: ${project.industry}`);
    console.log(`   URL: ${project.projectUrl}`);
    console.log(`   Featured: ${project.featured ? 'Yes' : 'No'}`);
    console.log(`   Translations: ${project.translations.map(t => t.locale.toUpperCase()).join(', ')}`);
    console.log(`   Technologies: ${project.technologies.slice(0, 4).join(', ')}...`);
    console.log('');
  }

  // Check services with portfolio items
  console.log('\n=== Services with Portfolio ===\n');

  const servicesWithPortfolio = await prisma.service.findMany({
    where: {
      status: { in: ['published', 'active'] },
    },
    select: { slug: true, name: true, content: true }
  });

  const withPortfolio = servicesWithPortfolio
    .filter(s => {
      const content = s.content as any;
      return content?.portfolio?.length > 0;
    })
    .map(s => ({
      slug: s.slug,
      name: s.name,
      count: ((s.content as any)?.portfolio || []).length
    }))
    .sort((a, b) => b.count - a.count);

  console.log(`Services with portfolio: ${withPortfolio.length}\n`);

  for (const service of withPortfolio.slice(0, 15)) {
    console.log(`  ${service.slug}: ${service.count} projects`);
  }

  if (withPortfolio.length > 15) {
    console.log(`  ... and ${withPortfolio.length - 15} more`);
  }

  await prisma.$disconnect();
}

verifyProjects();
