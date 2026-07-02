// Rebuild content.portfolio for the four services whose portfolio arrays were
// wiped by the batch31 upsert. Items are derived from REAL rows in the
// Project table (name/industry/thumbnail), mapped to each service by
// relevance. Writes only when content.portfolio is empty — safe to re-run.
//
// Run: node --env-file=.env --env-file=.env.local scripts/restore-portfolio-items.mjs

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 2 }) });

// service slug -> project slugs (counts match the pre-wipe state: 4/4/3/2)
const MAP = {
  // interface-led builds
  'frontend-development': ['maison-dorient', '724-dijital', 'hextg', 'terrace-cafe-restaurant'],
  // data/API-heavy platforms
  'backend-development': ['bursapanorama', 'paper-market-world', 'speakup', 'arsasat'],
  // end-to-end platform builds
  'full-stack-development': ['araban-nakit', 'ankara-pert', 'sivtech-makina'],
  // content-driven sites
  'headless-cms-development': ['mazhar-dergisi', '100lesme-blog'],
};

const allProjectSlugs = [...new Set(Object.values(MAP).flat())];
const projects = await prisma.project.findMany({
  where: { slug: { in: allProjectSlugs }, status: 'published' },
  select: { slug: true, name: true, industry: true, category: true, thumbnail: true },
});
const bySlug = Object.fromEntries(projects.map(p => [p.slug, p]));

for (const [serviceSlug, projectSlugs] of Object.entries(MAP)) {
  const svc = await prisma.service.findFirst({ where: { slug: serviceSlug } });
  if (!svc) { console.log(`SKIP ${serviceSlug} (service not found)`); continue; }
  const content = { ...(svc.content ?? {}) };
  if (Array.isArray(content.portfolio) && content.portfolio.length > 0) {
    console.log(`KEEP ${serviceSlug} (portfolio already present: ${content.portfolio.length})`);
    continue;
  }
  const items = projectSlugs
    .map(ps => bySlug[ps])
    .filter(Boolean)
    .map(p => ({ title: p.name, category: p.industry || p.category || '', image: p.thumbnail || '' }));
  if (items.length === 0) { console.log(`SKIP ${serviceSlug} (no matching projects)`); continue; }
  content.portfolio = items;
  await prisma.service.update({ where: { id: svc.id }, data: { content } });
  console.log(`OK ${serviceSlug}: portfolio(${items.length}) = ${items.map(i => i.title.split(' - ')[0].split(' – ')[0]).join(' | ')}`);
}
await prisma.$disconnect();
