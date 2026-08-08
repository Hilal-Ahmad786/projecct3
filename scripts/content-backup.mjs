// Snapshot service rows (+ translations + pricing) to JSON before a content
// batch apply. Filenames carry a full timestamp so a later run can never
// overwrite an earlier snapshot.
//
// Usage:
//   node --env-file=.env scripts/content-backup.mjs web-development seo
//   node --env-file=.env scripts/content-backup.mjs --batch tier1a   # slugs from a batch dir
import { writeFileSync, readdirSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL not set (run with: node --env-file=.env ...)'); process.exit(1); }

const args = process.argv.slice(2);
let slugs = args.filter(a => !a.startsWith('--'));
const batchIdx = args.indexOf('--batch');
if (batchIdx !== -1) {
  const dir = `scripts/content-enrichment/batches/${args[batchIdx + 1]}`;
  slugs = readdirSync(dir).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, ''));
}
if (!slugs.length) { console.error('No slugs given. Pass slugs or --batch <name>.'); process.exit(1); }

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 2 }) });
const rows = await prisma.service.findMany({
  where: { slug: { in: slugs } },
  include: { translations: true, pricingPackages: true },
});
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const path = `scripts/content-enrichment/_backup-${stamp}.json`;
writeFileSync(path, JSON.stringify(rows, null, 2));
console.log(`Backed up ${rows.length} service(s) + ${rows.reduce((n, r) => n + r.translations.length, 0)} translations`);
console.log(`  → ${path}`);
for (const r of rows) console.log(`  ${r.slug}: content keys = ${Object.keys(r.content || {}).join(', ')}`);
if (rows.length !== slugs.length) {
  console.warn(`  ! ${slugs.length - rows.length} slug(s) not found: ${slugs.filter(s => !rows.some(r => r.slug === s)).join(', ')}`);
}
await prisma.$disconnect();
