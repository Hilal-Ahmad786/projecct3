// Restore content.animation for the 18 services whose configs were wiped by
// the batch31 upsert (seed-batch31.ts replaced the whole content JSON).
// Scene names/patterns are valid ServiceAnimation values from
// src/components/services/hero-visuals/index.tsx, chosen to fit each service
// and respect the ≤10-per-scene balance from rebalance-animations.mjs.
// Only writes when content.animation is absent — safe to re-run.
//
// Run: node --env-file=.env --env-file=.env.local scripts/restore-batch31-animations.mjs

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 2 }) });

const A = (heroVisual, bgPattern, decorations, motion, featureStyle, processLayout) =>
  ({ heroVisual, bgPattern, decorations, motion, featureStyle, processLayout });

const CONFIGS = {
  'frontend-development':          A('browser-window', 'grid', 'squares', 'float', 'icon-top', 'timeline'),
  'backend-development':           A('server-stack', 'dots', 'hexagons', 'pulse', 'icon-left', 'cards'),
  'full-stack-development':        A('layers-stack', 'grid', 'mixed', 'cascade', 'numbered', 'zigzag'),
  'progressive-web-apps':          A('app-screens', 'circles', 'circles', 'float', 'icon-top', 'steps-horizontal'),
  'headless-cms-development':      A('cms-blocks', 'dots', 'squares', 'morph', 'bordered', 'timeline'),
  'accessibility-compliance':      A('shield-lock', 'circles', 'dots', 'pulse', 'minimal', 'steps-horizontal'),
  'real-time-applications':        A('data-flow', 'waves', 'lines', 'wave', 'icon-left', 'timeline'),
  'android-development':           A('mobile-device', 'grid', 'circles', 'float', 'icon-top', 'cards'),
  'api-development':               A('network-nodes', 'hexagons', 'hexagons', 'orbit', 'icon-left', 'timeline'),
  'rest-api-development':          A('terminal', 'grid', 'lines', 'type', 'numbered', 'steps-horizontal'),
  'graphql-api-development':       A('circuit-board', 'hexagons', 'triangles', 'pulse', 'bordered', 'cards'),
  'api-gateway':                   A('workflow-diagram', 'diagonal-lines', 'squares', 'cascade', 'icon-left', 'zigzag'),
  'api-rate-limiting-throttling':  A('gauge-meter', 'dots', 'circles', 'pulse', 'minimal', 'timeline'),
  'api-security-authentication':   A('shield-lock', 'hexagons', 'hexagons', 'pulse', 'icon-left', 'cards'),
  'wordpress-plugin-development':  A('puzzle-pieces', 'dots', 'squares', 'morph', 'icon-top', 'timeline'),
  'wordpress-optimization':        A('gauge-meter', 'grid', 'dots', 'pulse', 'numbered', 'steps-horizontal'),
  'crm-development':               A('kpi-cards', 'grid', 'squares', 'cascade', 'icon-left', 'timeline'),
  'airtable-solutions':            A('kanban-board', 'dots', 'circles', 'float', 'icon-top', 'cards'),
};

for (const [slug, animation] of Object.entries(CONFIGS)) {
  const svc = await prisma.service.findFirst({ where: { slug } });
  if (!svc) { console.log(`SKIP ${slug} (not found)`); continue; }
  const content = { ...(svc.content ?? {}) };
  if (content.animation) { console.log(`KEEP ${slug} (animation already present)`); continue; }
  content.animation = animation;
  await prisma.service.update({ where: { id: svc.id }, data: { content } });
  console.log(`OK ${slug}: animation = ${animation.heroVisual}`);
}
await prisma.$disconnect();
