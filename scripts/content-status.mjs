// Content status report — which services clear the indexation quality gate.
//
// The public site noindexes thin services (src/lib/service-quality.ts) and
// drops them from the sitemap; they rejoin automatically once enriched. This
// script shows where every service stands so you can pick what to work on.
//
// Usage:
//   node scripts/content-status.mjs              # summary + services below bar
//   node scripts/content-status.mjs --all        # every service
//   node scripts/content-status.mjs web-development e-commerce   # specific slugs
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const MIN_TOTAL_WORDS = 250; // keep in sync with src/lib/service-quality.ts

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL,
    max: 2,
  }),
});

const args = process.argv.slice(2);
const showAll = args.includes('--all');
const slugFilter = args.filter(a => !a.startsWith('--'));

const w = t => (t || '').trim().split(/\s+/).filter(Boolean).length;

function contentWords(row) {
  const c = row.content || {};
  let total = w(row.fullDescription) + w(row.shortDescription);
  for (const f of c.faq || []) total += w(f?.question) + w(f?.answer);
  for (const p of c.process || []) total += w(p?.title) + w(p?.description);
  return total;
}

const rows = await prisma.service.findMany({
  where: {
    status: { in: ['published', 'active'] },
    ...(slugFilter.length ? { slug: { in: slugFilter } } : {}),
  },
  select: {
    slug: true, isParent: true, shortDescription: true, fullDescription: true,
    features: true, benefits: true, content: true,
    pricingPackages: { select: { id: true }, take: 1 },
    translations: { select: { locale: true, fullDescription: true } },
  },
  orderBy: { order: 'asc' },
});

let indexed = 0;
const report = rows.map(r => {
  const words = contentWords(r);
  const c = r.content || {};
  const passes = r.isParent || r.pricingPackages.length > 0 || words >= MIN_TOTAL_WORDS || c.trustApproved === true;
  if (passes) indexed++;
  const locales = r.translations.filter(t => w(t.fullDescription) >= 60).map(t => t.locale).sort().join(',') || '—';
  return { slug: r.slug, words, passes, isParent: r.isParent,
           faq: (c.faq || []).length, feat: (r.features || []).length,
           ben: (r.benefits || []).length, locales };
});

const show = showAll || slugFilter.length ? report : report.filter(r => !r.passes);
for (const r of show) {
  console.log(
    `${r.passes ? '✓' : '·'} ${r.slug.padEnd(34)} ${String(r.words).padStart(4)}w ` +
    `faq=${String(r.faq).padStart(2)} feat=${String(r.feat).padStart(2)} ben=${String(r.ben).padStart(2)} ` +
    `${r.isParent ? 'HUB ' : '    '}[${r.locales}]`
  );
}
console.log(`\n${indexed}/${rows.length} services clear the gate (indexed + in sitemap).`);
if (!showAll && !slugFilter.length) console.log(`Listed above: ${show.length} below the bar. Use --all to see everything.`);

await prisma.$disconnect();
