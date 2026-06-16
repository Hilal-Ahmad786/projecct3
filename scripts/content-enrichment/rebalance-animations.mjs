// Rebalance hero animation scenes so no scene is used by more than ~10
// services. Reassigns `content.animation.heroVisual` only — every other
// animation/content field is preserved. Dry-run by default; pass --apply.
//
// Usage: node --env-file=.env.local scripts/content-enrichment/rebalance-animations.mjs [--apply]
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const apply = process.argv.includes('--apply');

// slug -> [expectedFrom, to]   (semantic-fit reassignments)
const MOVES = {
  // chart-graph 16 -> 10
  'database-optimization':        ['chart-graph', 'database-rings'],
  'ab-testing':                   ['chart-graph', 'funnel'],
  'amazon-ppc':                   ['chart-graph', 'megaphone-3d'],
  'anomaly-detection':            ['chart-graph', 'brain-network'],
  'ai-readiness-assessment':      ['chart-graph', 'lightbulb'],
  'ai-roi-analysis':              ['chart-graph', 'lightbulb'],
  // gear-system 16 -> 10
  'whatsapp-business-api':        ['gear-system', 'chat-bubbles'],
  'rpa-solutions':                ['gear-system', 'kanban-board'],
  'custom-marketing-automation':  ['gear-system', 'megaphone-3d'],
  'kubernetes-orchestration':     ['gear-system', 'server-stack'],
  'product-animations':           ['gear-system', 'video-player'],
  'wordpress-plugin-development':  ['gear-system', 'puzzle-pieces'],
  // shopping-cart-3d 14 -> 10
  'tiktok-shop':                  ['shopping-cart-3d', 'social-feed'],
  'whatsapp-commerce':            ['shopping-cart-3d', 'chat-bubbles'],
  'google-shopping':              ['shopping-cart-3d', 'target-bullseye'],
  'marketplace-ads':              ['shopping-cart-3d', 'megaphone-3d'],
  // palette-canvas 13 -> 10
  'newsletter-design':            ['palette-canvas', 'email-inbox'],
  'motion-graphics':              ['palette-canvas', 'video-player'],
  'social-animations':            ['palette-canvas', 'social-feed'],
  // dashboard 13 -> 10
  'presentation-design':          ['dashboard', 'video-player'],
  'company-page-management':      ['dashboard', 'megaphone-3d'],
  'hrms-development':             ['dashboard', 'kanban-board'],
  // mobile-device 12 -> 10
  'app-store-optimization':       ['mobile-device', 'serp-ranking'],
  'ar-experiences':               ['mobile-device', 'globe'],
  // rocket-launch 11 -> 10
  'wordpress-optimization':       ['rocket-launch', 'code-editor'],
  // data-flow 11 -> 10
  'web-scraping':                 ['data-flow', 'terminal'],
  // cloud-stack 11 -> 10
  'salesforce-marketing-cloud':   ['cloud-stack', 'email-inbox'],
  // layers-stack 11 -> 10
  'docker-kubernetes':            ['layers-stack', 'server-stack'],
};

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL, max: 2 }) });

const all = await prisma.service.findMany({ select: { id: true, slug: true, content: true } });
const before = {};
for (const s of all) { const hv = s.content?.animation?.heroVisual || '(none)'; before[hv] = (before[hv] || 0) + 1; }

let changed = 0, skipped = 0;
for (const [slug, [from, to]] of Object.entries(MOVES)) {
  const svc = all.find(s => s.slug === slug);
  if (!svc) { console.log(`✗ ${slug}: not found`); skipped++; continue; }
  const cur = svc.content?.animation?.heroVisual;
  if (cur !== from) { console.log(`⚠ ${slug}: expected '${from}' but is '${cur}' — skipping (manual review)`); skipped++; continue; }
  console.log(`  ${slug.padEnd(32)} ${from} → ${to}`);
  if (apply) {
    const content = { ...(svc.content || {}), animation: { ...(svc.content?.animation || {}), heroVisual: to } };
    await prisma.service.update({ where: { id: svc.id }, data: { content } });
  }
  changed++;
}

// projected distribution (before-counts adjusted by the moves that ran)
const after = { ...before };
for (const [slug, [from, to]] of Object.entries(MOVES)) {
  const svc = all.find(s => s.slug === slug);
  if (svc && svc.content?.animation?.heroVisual === from) { after[from]--; after[to] = (after[to] || 0) + 1; }
}
console.log(`\n${apply ? '✓ APPLIED' : '○ DRY RUN'} — ${changed} moved, ${skipped} skipped`);
console.log('\nProjected over-10 scenes after rebalance:');
const over = Object.entries(after).filter(([, n]) => n > 10).sort((a, b) => b[1] - a[1]);
console.log(over.length ? over.map(([k, n]) => `  ${n} ${k}`).join('\n') : '  (none — all scenes ≤ 10) ✓');
await prisma.$disconnect();
