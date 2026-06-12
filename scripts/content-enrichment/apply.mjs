// Service content enrichment — batch apply script.
// Usage:
//   node scripts/content-enrichment/apply.mjs <batch-dir>            (dry run)
//   node scripts/content-enrichment/apply.mjs <batch-dir> --apply    (write to DB)
//
// Reads batch JSON files (see README.md for format), validates them against
// the quality bar, prints a change summary, and upserts into Service (en)
// and ServiceTranslation (tr/de/ur/ar). content.animation is always
// preserved from the existing DB row.

import { readdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];
const TRANSLATION_LOCALES = ['tr', 'de', 'ur', 'ar'];

// ── args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const dirArg = args.find(a => !a.startsWith('--'));
if (!dirArg) {
  console.error('Usage: node apply.mjs <batch-dir> [--apply]');
  process.exit(1);
}
const batchDir = resolve(process.cwd(), dirArg.startsWith('scripts/') || dirArg.startsWith('/')
  ? dirArg
  : join('scripts/content-enrichment', dirArg));

// ── validation ───────────────────────────────────────────────────────
function validateLocale(slug, locale, d, problems) {
  const p = (msg) => problems.push(`${slug} [${locale}] ${msg}`);
  if (!d.name) p('missing name');
  const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
  if (words(d.shortDescription) < 12) p(`shortDescription too short (${words(d.shortDescription)} words)`);
  if (words(d.fullDescription) < 60) p(`fullDescription too short (${words(d.fullDescription)} words)`);
  if (!Array.isArray(d.features) || d.features.length < 6) p(`features < 6 (${d.features?.length ?? 0})`);
  if (!Array.isArray(d.benefits) || d.benefits.length < 5) p(`benefits < 5 (${d.benefits?.length ?? 0})`);
  if (!d.metaTitle || d.metaTitle.length > 70) p(`metaTitle missing or > 70 chars`);
  if (!d.metaDescription || d.metaDescription.length < 100) p(`metaDescription missing or < 100 chars`);
  const c = d.content || {};
  if (!Array.isArray(c.process) || c.process.length < 4) p(`process < 4 steps (${c.process?.length ?? 0})`);
  (c.process || []).forEach((s, i) => { if (words(s.description) < 10) p(`process step ${i + 1} description thin`); });
  if (!Array.isArray(c.faq) || c.faq.length < 6) p(`faq < 6 (${c.faq?.length ?? 0})`);
  (c.faq || []).forEach((f, i) => { if (words(f.answer) < 12) p(`faq ${i + 1} answer thin`); });
  if (!Array.isArray(c.technologies) || c.technologies.length < 4) p(`technologies < 4 (${c.technologies?.length ?? 0})`);
}

// ── load batch ───────────────────────────────────────────────────────
const files = readdirSync(batchDir).filter(f => f.endsWith('.json'));
if (files.length === 0) {
  console.error(`No JSON files found in ${batchDir}`);
  process.exit(1);
}

const entries = files.map(f => {
  const data = JSON.parse(readFileSync(join(batchDir, f), 'utf8'));
  if (!data.slug) throw new Error(`${f}: missing "slug"`);
  return { file: f, data };
});

const problems = [];
for (const { data } of entries) {
  for (const locale of LOCALES) {
    if (data[locale]) validateLocale(data.slug, locale, data[locale], problems);
  }
  if (!data.en) problems.push(`${data.slug}: missing "en" (required)`);
}

if (problems.length) {
  console.error(`\n✗ Validation failed (${problems.length} problems):\n`);
  problems.forEach(p => console.error('  - ' + p));
  process.exit(1);
}
console.log(`✓ ${entries.length} file(s) validated against the quality bar\n`);

// ── DB ───────────────────────────────────────────────────────────────
const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL not set (run with: node --env-file=.env ...)'); process.exit(1); }
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 2 }) });

function mergedContent(existing, incoming) {
  // Preserve animation (and any keys the batch doesn't provide).
  return { ...(existing || {}), ...(incoming || {}), animation: (existing || {}).animation };
}

let changed = 0;
for (const { data } of entries) {
  const svc = await prisma.service.findUnique({
    where: { slug: data.slug },
    include: { translations: true },
  });
  if (!svc) {
    console.error(`✗ ${data.slug}: not found in DB — skipping`);
    continue;
  }

  const en = data.en;
  const enContent = mergedContent(svc.content, en.content);

  console.log(`── ${data.slug} (${svc.name})`);
  console.log(`   en: fullDescription ${ (svc.fullDescription || '').split(/\s+/).length }→${ en.fullDescription.split(/\s+/).length } words,` +
    ` faq ${ (svc.content?.faq || []).length }→${ en.content.faq.length },` +
    ` process ${ (svc.content?.process || []).length }→${ en.content.process.length } steps`);

  if (apply) {
    await prisma.service.update({
      where: { slug: data.slug },
      data: {
        name: en.name,
        shortDescription: en.shortDescription,
        fullDescription: en.fullDescription,
        features: en.features,
        benefits: en.benefits,
        content: enContent,
      },
    });
  }

  for (const locale of TRANSLATION_LOCALES) {
    const d = data[locale];
    if (!d) continue;
    const existing = svc.translations.find(t => t.locale === locale);
    console.log(`   ${locale}: ${existing ? 'update' : 'create'} translation (faq ${d.content.faq.length}, process ${d.content.process.length})`);
    if (apply) {
      const tData = {
        name: d.name,
        shortDescription: d.shortDescription,
        fullDescription: d.fullDescription,
        features: d.features,
        benefits: d.benefits,
        content: mergedContent(existing?.content ?? svc.content, d.content),
        metaTitle: d.metaTitle,
        metaDescription: d.metaDescription,
      };
      await prisma.serviceTranslation.upsert({
        where: { serviceId_locale: { serviceId: svc.id, locale } },
        create: { serviceId: svc.id, locale, ...tData },
        update: tData,
      });
    }
  }
  changed += 1;
}

await prisma.$disconnect();
console.log(`\n${apply ? '✓ APPLIED' : '○ DRY RUN (no writes)'} — ${changed}/${entries.length} services processed`);
if (!apply) console.log('Re-run with --apply to write to the database.');
