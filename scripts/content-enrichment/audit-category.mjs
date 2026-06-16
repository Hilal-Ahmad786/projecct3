// Audit a service category's content depth across all locales.
// Usage: node --env-file=.env.local scripts/content-enrichment/audit-category.mjs <category>
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const category = process.argv[2] || 'marketing';
const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];
const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const faqN = (c) => Array.isArray(c?.faq) ? c.faq.length : 0;

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL, max: 2 }) });

const services = await prisma.service.findMany({
  where: { category, isParent: false },
  include: { translations: true },
  orderBy: { slug: 'asc' },
});

// "Thin" if any locale lacks 8 FAQs or <90-word fullDescription (en) / <40 (translations)
const thin = [];
console.log(`\n${category}: ${services.length} services\n`);
console.log('slug'.padEnd(34), LOCALES.map(l => l.padStart(7)).join(''));
for (const s of services) {
  const byLoc = Object.fromEntries(s.translations.map(t => [t.locale, t]));
  // English base lives on Service itself if no en translation row
  const cells = LOCALES.map(l => {
    let fd, fq;
    if (l === 'en') {
      const en = byLoc.en;
      fd = words(en?.fullDescription ?? s.fullDescription);
      fq = faqN(en?.content ?? s.content);
    } else {
      const t = byLoc[l];
      if (!t) return '   —   ';
      fd = words(t.fullDescription);
      fq = faqN(t.content);
    }
    return `${fq}f/${fd}w`.padStart(7);
  });
  const enFq = faqN(byLoc.en?.content ?? s.content);
  const missingLoc = ['tr','de','ur','ar'].some(l => !byLoc[l] || faqN(byLoc[l].content) < 6 || words(byLoc[l].fullDescription) < 40);
  const thinEn = enFq < 8 || words(byLoc.en?.fullDescription ?? s.fullDescription) < 90;
  const flag = (thinEn || missingLoc) ? '  ‹thin' : '';
  if (thinEn || missingLoc) thin.push(s.slug);
  console.log(s.slug.padEnd(34), cells.join(''), flag);
}
console.log(`\nThin (need work): ${thin.length}/${services.length}`);
console.log(thin.join(', '));
await prisma.$disconnect();
