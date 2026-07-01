// Export near-bar services (fullDescription 60–89 words in any served locale, but
// otherwise at-bar) so their descriptions can be expanded to the 90–130 word target.
// English is served from the base Service; tr/de/ur/ar from translation rows.
// Writes one JSON file per category to the given output dir.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const LOCALES = ['en', 'tr', 'de', 'ur', 'ar'];
const words = s => (s || '').trim().split(/\s+/).filter(Boolean).length;
const outDir = process.argv[2];
if (!outDir) { console.error('Usage: export-nearbar.mjs <outDir> [category...]'); process.exit(1); }
const cats = process.argv.slice(3);
mkdirSync(outDir, { recursive: true });

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL, max: 2 }) });
const where = { isParent: false, ...(cats.length ? { category: { in: cats } } : {}) };
const svc = await prisma.service.findMany({ where, include: { translations: true }, orderBy: [{ category: 'asc' }, { slug: 'asc' }] });

const byCat = {};
for (const s of svc) {
  const by = Object.fromEntries(s.translations.map(t => [t.locale, t]));
  const desc = {};
  let minW = 999;
  for (const l of LOCALES) {
    const fd = l === 'en' ? s.fullDescription : (by[l]?.fullDescription || '');
    desc[l] = fd;
    minW = Math.min(minW, words(fd));
  }
  if (minW >= 90) continue;               // already at bar in every locale
  (byCat[s.category] ??= []).push({ slug: s.slug, name: s.name, minW, current: desc });
}

let total = 0;
for (const [cat, list] of Object.entries(byCat)) {
  writeFileSync(join(outDir, `${cat}.json`), JSON.stringify(list, null, 2));
  console.log(`${cat}: ${list.length} services -> ${cat}.json`);
  total += list.length;
}
console.log(`Total near-bar services exported: ${total}`);
await prisma.$disconnect();
