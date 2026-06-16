// Generate a Gemini enrichment prompt for a category's thin services.
// Reuses the proven web-software prompt boilerplate (header → translation
// rules), swaps in a category-appropriate GOLD EXAMPLE pulled live from the
// DB, and appends the SERVICES TO WRITE list (thin services only).
//
// Usage:
//   node --env-file=.env.local scripts/content-enrichment/gen-category-prompt.mjs \
//     <category> <goldSlug> <DomainLabel> > scripts/content-enrichment/GEMINI_PROMPT_<category>.md
// e.g.
//   ... marketing linkedin-ads "Marketing" > .../GEMINI_PROMPT_marketing.md
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const [category = 'marketing', goldSlug = 'linkedin-ads', domain = 'Marketing'] = process.argv.slice(2);
const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];
const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const faqN = (c) => (Array.isArray(c?.faq) ? c.faq.length : 0);

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL, max: 2 }) });

// ---- 1. boilerplate header from the web-software prompt (proven) ----
const src = readFileSync(resolve('scripts/content-enrichment/GEMINI_PROMPT_web-software.md'), 'utf8');
let header = src.slice(0, src.indexOf('## GOLD EXAMPLE'));
header = header
  .replaceAll('Web & Software services', `${domain} services`)
  .replaceAll('Web & Software', domain)
  // re-point the FAQ "teach something" examples at marketing domains
  .replace(
    /- \*\*FAQ answers must TEACH something true\*\*.*?No generic filler[^\n]*\n/s,
    '- **FAQ answers must TEACH something true** about the domain — e.g. for Google Ads: Quality Score vs. bid tradeoffs and realistic CPC ranges; for SEO: how long indexing/ranking actually takes; for email: deliverability, warm-up, and list hygiene; for paid social: iOS 14.5 attribution limits and creative-testing cadence. No generic filler ("we provide quality service", "our expert team delivers excellence").\n'
  );

// ---- 2. GOLD EXAMPLE pulled live from the DB ----
function localeObj(t) {
  const c = t.content || {};
  return {
    name: t.name,
    shortDescription: t.shortDescription,
    fullDescription: t.fullDescription,
    features: t.features || [],
    benefits: t.benefits || [],
    metaTitle: t.metaTitle,
    metaDescription: t.metaDescription,
    content: {
      process: c.process || [],
      faq: c.faq || [],
      technologies: c.technologies || [],
    },
  };
}
const gold = await prisma.service.findUnique({ where: { slug: goldSlug }, include: { translations: true } });
if (!gold) { console.error(`gold slug ${goldSlug} not found`); process.exit(1); }
const goldByLoc = Object.fromEntries(gold.translations.map(t => [t.locale, t]));
const goldEn = goldByLoc.en || { name: gold.name, shortDescription: gold.shortDescription, fullDescription: gold.fullDescription, features: gold.features, benefits: gold.benefits, metaTitle: gold.metaTitle, metaDescription: gold.metaDescription, content: gold.content };
const goldOut = { slug: goldSlug };
goldOut.en = localeObj(goldEn);
for (const l of ['tr', 'de', 'ur', 'ar']) if (goldByLoc[l]) goldOut[l] = localeObj(goldByLoc[l]);

const goldBlock = `## GOLD EXAMPLE — match this structure, depth, and 5-language translation quality EXACTLY

This is one finished ${domain} service (\`${goldSlug}\`), straight from our database. Your output for every service must reach this level in all five languages.

\`\`\`json
${JSON.stringify(goldOut, null, 2)}
\`\`\`
`;

// ---- 3. SERVICES TO WRITE (thin services only) ----
const services = await prisma.service.findMany({
  where: { category, isParent: false },
  include: { translations: true },
  orderBy: { slug: 'asc' },
});
const thin = [];
for (const s of services) {
  const byLoc = Object.fromEntries(s.translations.map(t => [t.locale, t]));
  const en = byLoc.en;
  const enFd = words(en?.fullDescription ?? s.fullDescription);
  const enFq = faqN(en?.content ?? s.content);
  const transThin = ['tr', 'de', 'ur', 'ar'].some(l => !byLoc[l] || faqN(byLoc[l].content) < 6 || words(byLoc[l].fullDescription) < 40);
  if (enFq < 8 || enFd < 90 || transThin) {
    const techNames = ((en?.content ?? s.content)?.technologies || []).map(t => t.name).filter(Boolean);
    thin.push({
      slug: s.slug,
      name: en?.name || s.name,
      parent: s.parentSlug || null,
      currentShort: en?.shortDescription || s.shortDescription || '',
      currentFeatures: (en?.features?.length ? en.features : s.features) || [],
      currentTech: techNames,
    });
  }
}

const servicesBlock = `## SERVICES TO WRITE

There are ${thin.length} ${domain} services. For each, the \`slug\` is the object key you must use. \`name\` is the current service name (translate/keep as appropriate). \`currentShort\`, \`currentFeatures\`, \`currentTech\` are the existing skeletal data — expand and improve on them, do not contradict. \`parent\` is the parent service for context only.

\`\`\`json
${JSON.stringify(thin, null, 1)}
\`\`\`
`;

process.stdout.write(header + '\n' + goldBlock + '\n---\n\n' + servicesBlock + '\n');
process.stderr.write(`\n✓ ${domain}: ${thin.length} thin services embedded; gold=${goldSlug} (locales: ${Object.keys(goldOut).filter(k=>k!=='slug').join(',')})\n`);
await prisma.$disconnect();
