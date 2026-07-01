// Apply expanded fullDescription ONLY — every other field is left untouched.
// English updates the base Service; tr/de/ur/ar update their ServiceTranslation row.
// Input: a JSON file OR a directory of them, shape:
//   { "<slug>": { "en": "...", "tr": "...", "de": "...", "ur": "...", "ar": "..." } }
// Any locale may be omitted. Default is DRY RUN; pass --apply to write.
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const words = s => (s || '').trim().split(/\s+/).filter(Boolean).length;
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const inPath = args.find(a => !a.startsWith('--'));
if (!inPath) { console.error('Usage: apply-fulldesc.mjs <file|dir> [--apply]'); process.exit(1); }

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
} else data = loadOne(full);

const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 2 }) });

let changed = 0, problems = [], warns = [];
for (const [slug, locales] of Object.entries(data)) {
  const svc = await prisma.service.findUnique({ where: { slug }, include: { translations: true } });
  if (!svc) { problems.push(`${slug}: not found`); continue; }
  const parts = [];
  for (const [loc, text] of Object.entries(locales)) {
    if (!text || typeof text !== 'string') continue;
    const w = words(text);
    if (w < 90 || w > 140) warns.push(`${slug}/${loc}: ${w}w (target 90-130)`);
    if (loc === 'en') {
      parts.push(`en ${words(svc.fullDescription)}->${w}`);
      if (apply) await prisma.service.update({ where: { slug }, data: { fullDescription: text } });
    } else {
      const tr = svc.translations.find(t => t.locale === loc);
      if (!tr) { problems.push(`${slug}/${loc}: no translation row`); continue; }
      parts.push(`${loc} ${words(tr.fullDescription)}->${w}`);
      if (apply) await prisma.serviceTranslation.update({ where: { serviceId_locale: { serviceId: svc.id, locale: loc } }, data: { fullDescription: text } });
    }
  }
  console.log(`${slug}: ${parts.join(', ')}`);
  changed++;
}
await prisma.$disconnect();
console.log(`\n${apply ? '✓ APPLIED' : '○ DRY RUN'} — ${changed} services`);
if (warns.length) { console.log(`\n⚠ word-count warnings (${warns.length}):`); warns.forEach(w => console.log('  - ' + w)); }
if (problems.length) { console.log('\nproblems:'); problems.forEach(p => console.log('  - ' + p)); }
if (!apply) console.log('\nRe-run with --apply to write.');
