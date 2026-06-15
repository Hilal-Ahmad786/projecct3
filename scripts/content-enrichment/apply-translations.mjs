// Apply translation-only content into ServiceTranslation rows, without
// touching the base (English) Service. For services that were enriched
// English-only and need tr/de/ur/ar filled in.
//
// Usage:
//   node --env-file=.env scripts/content-enrichment/apply-translations.mjs <file|dir> [--apply]
// Input shape: { "<slug>": { tr:{...}, de:{...}, ur:{...}, ar:{...} } }
// Each locale object: { name, shortDescription, fullDescription, features[],
//   benefits[], metaTitle, metaDescription, content:{ process[], faq[], technologies[] } }

import { readFileSync, statSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const TR_LOCALES = ['tr', 'de', 'ur', 'ar'];
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const inPath = args.find(a => !a.startsWith('--'));
if (!inPath) { console.error('Usage: apply-translations.mjs <file|dir> [--apply]'); process.exit(1); }

function loadOne(p) {
  let raw = readFileSync(p, 'utf8').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  let d = JSON.parse(raw);
  if (d.services && typeof d.services === 'object') d = d.services;
  return d;
}
const full = resolve(process.cwd(), inPath);
let data = {};
if (statSync(full).isDirectory()) {
  for (const f of readdirSync(full).filter(f => f.endsWith('.json')).sort()) Object.assign(data, loadOne(join(full, f)));
} else { data = loadOne(full); }

const words = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
function validate(slug, loc, d, problems) {
  const p = (m) => problems.push(`${slug}/${loc}: ${m}`);
  if (!d.name) p('missing name');
  if (words(d.fullDescription) < 40) p(`fullDescription thin (${words(d.fullDescription)}w)`);
  if (!Array.isArray(d.content?.faq) || d.content.faq.length < 6) p(`faq < 6 (${d.content?.faq?.length ?? 0})`);
  if (!Array.isArray(d.content?.process) || d.content.process.length < 4) p(`process < 4`);
}

const problems = [];
for (const [slug, locs] of Object.entries(data)) {
  for (const loc of TR_LOCALES) if (locs[loc]) validate(slug, loc, locs[loc], problems);
}
if (problems.length) {
  console.error(`✗ Validation failed (${problems.length}):`); problems.forEach(p => console.error('  - ' + p));
  process.exit(1);
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL, max: 2 }) });
let changed = 0;
for (const [slug, locs] of Object.entries(data)) {
  const svc = await prisma.service.findUnique({ where: { slug }, include: { translations: true } });
  if (!svc) { console.error(`✗ ${slug}: not found`); continue; }
  const animation = svc.content?.animation;
  console.log(`── ${slug}`);
  for (const loc of TR_LOCALES) {
    const d = locs[loc];
    if (!d) continue;
    const existing = svc.translations.find(t => t.locale === loc);
    console.log(`   ${loc}: fullDesc ${words(existing?.fullDescription)}→${words(d.fullDescription)}w, faq ${(existing?.content?.faq || []).length}→${d.content.faq.length}`);
    if (apply) {
      const content = { ...(d.content || {}), animation: existing?.content?.animation ?? animation };
      const tData = {
        name: d.name, shortDescription: d.shortDescription, fullDescription: d.fullDescription,
        features: d.features || existing?.features || [], benefits: d.benefits || existing?.benefits || [],
        content, metaTitle: d.metaTitle, metaDescription: d.metaDescription,
      };
      await prisma.serviceTranslation.upsert({
        where: { serviceId_locale: { serviceId: svc.id, locale: loc } },
        create: { serviceId: svc.id, locale: loc, ...tData },
        update: tData,
      });
    }
  }
  changed += 1;
}
await prisma.$disconnect();
console.log(`\n${apply ? '✓ APPLIED' : '○ DRY RUN'} — ${changed} services`);
if (!apply) console.log('Re-run with --apply to write.');
