// Merge Gemini-generated additional FAQs into existing service content,
// PRESERVING animation and all other content (base Service for `en`,
// ServiceTranslation for tr/de/ur/ar).
//
// Usage:
//   node --env-file=.env scripts/content-enrichment/merge-faqs.mjs <faqs.json> [--apply]
// Input shape: { "<slug>": { en:[{question,answer}...], tr:[...], de:[...], ur:[...], ar:[...] } }
// Default is a DRY RUN; pass --apply to write.

import { readFileSync, statSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const inPath = args.find(a => !a.startsWith('--'));
if (!inPath) { console.error('Usage: merge-faqs.mjs <faqs.json|dir> [--apply]'); process.exit(1); }

function loadOne(p) {
  let raw = readFileSync(p, 'utf8').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  let d = JSON.parse(raw);
  if (d.services && typeof d.services === 'object') d = d.services;
  return d;
}

// Accept a single JSON file OR a directory of slug-keyed batch files.
const full = resolve(process.cwd(), inPath);
let data = {};
if (statSync(full).isDirectory()) {
  for (const f of readdirSync(full).filter(f => f.endsWith('.json')).sort()) {
    Object.assign(data, loadOne(join(full, f)));
  }
} else {
  data = loadOne(full);
}

const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];
const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 2 }) });

function dedupeAppend(existing, additions) {
  const have = new Set((existing || []).map(f => (f.question || '').trim().toLowerCase()));
  const merged = [...(existing || [])];
  for (const f of additions || []) {
    const key = (f.question || '').trim().toLowerCase();
    if (f.question && f.answer && !have.has(key)) { merged.push(f); have.add(key); }
  }
  return merged;
}

let changed = 0, problems = [];
for (const [slug, locales] of Object.entries(data)) {
  const svc = await prisma.service.findUnique({ where: { slug }, include: { translations: true } });
  if (!svc) { problems.push(`${slug}: not found`); continue; }

  // validate: each locale should bring it to >=6 (ideally 8)
  const before = (svc.content?.faq || []).length;
  const enMerged = dedupeAppend(svc.content?.faq, locales.en);
  console.log(`${slug}: en faq ${before} -> ${enMerged.length}` + (enMerged.length < 6 ? '  ⚠ still < 6' : ''));

  if (apply) {
    const baseContent = { ...(svc.content || {}), faq: enMerged, animation: svc.content?.animation };
    await prisma.service.update({ where: { slug }, data: { content: baseContent } });
    for (const loc of ['tr', 'de', 'ur', 'ar']) {
      const tr = svc.translations.find(t => t.locale === loc);
      if (!tr) { problems.push(`${slug}/${loc}: no translation row`); continue; }
      const trMerged = dedupeAppend(tr.content?.faq, locales[loc]);
      const trContent = { ...(tr.content || {}), faq: trMerged, animation: tr.content?.animation ?? svc.content?.animation };
      await prisma.serviceTranslation.update({ where: { serviceId_locale: { serviceId: svc.id, locale: loc } }, data: { content: trContent } });
    }
  }
  changed += 1;
}

await prisma.$disconnect();
console.log(`\n${apply ? '✓ APPLIED' : '○ DRY RUN'} — ${changed} services merged`);
if (problems.length) { console.log('problems:'); problems.forEach(p => console.log('  - ' + p)); }
if (!apply) console.log('Re-run with --apply to write.');
