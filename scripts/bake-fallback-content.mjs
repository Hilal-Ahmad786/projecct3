// Rebake the static content fallback (src/lib/database/_fallback/services.json)
// from the LIVE database. The fallback is served whenever Neon is unreachable
// (or FORCE_BAKED_CONTENT=1), so it must mirror the DB: English on the base
// fields + per-locale rows in `translations` (tr/de/ur/ar).
//
// The July-2026 bake was taken from a pre-migration snapshot where base rows
// were still Turkish — which made /en (and every locale) show Turkish heroes
// whenever the fallback kicked in. Re-run this after any large content pass:
//
//   node scripts/bake-fallback-content.mjs
import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL,
    max: 2,
  }),
});

const OUT = new URL('../src/lib/database/_fallback/services.json', import.meta.url).pathname;

const services = await prisma.service.findMany({
  where: { status: { in: ['published', 'active'] } },
  include: {
    pricingPackages: { orderBy: { tier: 'asc' } },
    translations: {
      select: {
        locale: true,
        name: true,
        shortDescription: true,
        fullDescription: true,
        features: true,
        benefits: true,
        content: true,
        metaTitle: true,
        metaDescription: true,
      },
    },
  },
  orderBy: { order: 'asc' },
});

if (!services.length) {
  console.error('Refusing to bake: query returned 0 services (DB down?)');
  process.exit(1);
}

// Sanity check: base fields must be English. Turkish-specific characters in a
// base name mean the DB itself regressed — fail loudly instead of baking it in.
const trChars = /[ığüşöçİĞÜŞÖÇ]/;
const suspicious = services.filter((s) => trChars.test(s.name));
if (suspicious.length > 5) {
  console.error(`Refusing to bake: ${suspicious.length} base names look Turkish:`);
  suspicious.slice(0, 10).forEach((s) => console.error(`  ${s.slug}: ${s.name}`));
  process.exit(1);
}

// Base fields already carry English — drop redundant `en` translation rows.
for (const s of services) {
  s.translations = s.translations.filter((t) => t.locale !== 'en');
}

writeFileSync(OUT, JSON.stringify(services));
const locales = new Set(services.flatMap((s) => s.translations.map((t) => t.locale)));
console.log(
  `Baked ${services.length} services (locales: en base + ${[...locales].sort().join(', ')}) → ${OUT}`,
);
await prisma.$disconnect();
