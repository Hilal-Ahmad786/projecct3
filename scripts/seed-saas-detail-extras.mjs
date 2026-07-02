// Detail-extras seed, batch 2: SaaS family (saas-development, mvp-development,
// multi-tenant-architecture, saas-migration). Same shapes as
// seed-webdev-detail-extras.mjs — merges keys into Service.content, never
// touches translations.
//
// NOTE: testimonials + case studies are DRAFT anonymized copy; prices are
// PLACEHOLDERS for review.
//
// Run: node --env-file=.env --env-file=.env.local scripts/seed-saas-detail-extras.mjs

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 2 }) });

const TESTIMONIAL_POOL = [
  { quote: 'They delivered exactly what was scoped, on the date they promised. Weekly demos meant there were zero surprises at launch.', author: 'Murat K.', role: 'CTO', company: 'Retail group, Istanbul', rating: 5 },
  { quote: 'Our old site took 6 seconds to load. The rebuild scores 95+ on Lighthouse and our bounce rate dropped by a third.', author: 'Sarah M.', role: 'Marketing Director', company: 'B2B SaaS, Berlin', rating: 5 },
  { quote: 'What impressed me most was the handover: clean repository, CI/CD set up, documentation our in-house team could actually use.', author: 'Ahmed R.', role: 'Engineering Manager', company: 'Logistics platform, Dubai', rating: 5 },
  { quote: 'They challenged our assumptions instead of just building what we asked. The final architecture saved us months of rework.', author: 'Elif T.', role: 'Product Owner', company: 'Fintech startup, Ankara', rating: 5 },
  { quote: 'Communication was in plain language, not jargon. We always knew what was done, what was next, and what it would cost.', author: 'Jonas W.', role: 'Managing Director', company: 'Manufacturing SME, Munich', rating: 5 },
  { quote: 'Post-launch support has been as good as the build itself. Issues are acknowledged within hours and fixed within days.', author: 'Fatima A.', role: 'Operations Lead', company: 'E-commerce brand, Riyadh', rating: 5 },
];
// offset 3 so this batch's rotation differs from the web-dev batch
const pick3 = (i) => [0, 1, 2].map((k) => TESTIMONIAL_POOL[(3 + i + k) % TESTIMONIAL_POOL.length]);

const SERVICES = {
  'saas-development': {
    startingFrom: '$9,500',
    factors: ['Product scope (MVP vs. full feature set)', 'Tenancy model and data isolation needs', 'Subscription billing & plan complexity', 'Third-party integrations and public API', 'Compliance scope (GDPR/KVKK, SOC 2 path)'],
    caseStudy: {
      title: 'Turning an internal tool into a subscription product',
      client: 'Field-services company', industry: 'B2B SaaS',
      challenge: 'A services firm ran scheduling and invoicing on spreadsheets plus a fragile internal tool. Competitors asked to buy it — but it was single-company, unlicensed, and unscalable.',
      solution: 'We productized it into a multi-tenant SaaS: tenant onboarding, Stripe subscription billing with plan limits, role-based access, and an admin console — shipped iteratively so their own team used each release first.',
      results: [
        { value: '14 wks', label: 'Internal tool to public launch' },
        { value: '40+', label: 'Paying tenants in year one' },
        { value: '99.95%', label: 'Uptime since launch' },
      ],
    },
    comparison: {
      title: 'Custom SaaS build vs. the alternatives',
      columns: ['', 'Custom SaaS (us)', 'No-code platform', 'Licensing off-the-shelf'],
      highlightColumn: 1,
      rows: [
        { label: 'Fits your exact workflow & pricing model', values: [true, 'Partly', false] },
        { label: 'You own the product and its roadmap', values: [true, false, false] },
        { label: 'Cost at 1,000+ users', values: ['Flat, predictable', 'Per-seat, grows', 'Per-seat, grows'] },
        { label: 'Defensible as a business asset', values: [true, 'Weak', false] },
        { label: 'Time to first version', values: ['Weeks', 'Days', 'Days'] },
      ],
    },
  },
  'mvp-development': {
    startingFrom: '$5,500',
    factors: ['Number of core features in scope', 'Auth, payments, and admin included or deferred', 'Design fidelity (wireframe vs. polished)', 'Analytics/validation instrumentation', 'Post-launch iteration support'],
    caseStudy: {
      title: 'An MVP lean enough to ship in 8 weeks, real enough to win funding',
      client: 'HR-tech founder', industry: 'SaaS startup',
      challenge: 'A founder had a validated waitlist but quotes for a "version 1" ran 6+ months — long enough to burn the runway and the momentum before anything reached users.',
      solution: 'We cut scope to the one workflow users signed up for, shipped an MVP with auth, billing, and analytics baked in, and instrumented every step so the funding pitch showed real usage data instead of mockups.',
      results: [
        { value: '8 wks', label: 'Kickoff to first users' },
        { value: '500+', label: 'Waitlist converted to beta' },
        { value: '✓', label: 'Pre-seed round closed on live metrics' },
      ],
    },
    comparison: {
      title: 'A focused MVP vs. the alternatives',
      columns: ['', 'Focused MVP (us)', 'Full v1 build', 'No-code prototype'],
      highlightColumn: 1,
      rows: [
        { label: 'Time to real user feedback', values: ['Weeks', '6+ months', 'Days'] },
        { label: 'Production-ready foundation to build on', values: [true, true, false] },
        { label: 'Risk of building unwanted features', values: ['Low', 'High', 'Low'] },
        { label: 'Survives investor technical due diligence', values: [true, true, 'Rarely'] },
        { label: 'Upfront cost', values: ['Contained', 'High', 'Lowest'] },
      ],
    },
  },
  'multi-tenant-architecture': {
    startingFrom: '$7,500',
    factors: ['Isolation model (shared schema / schema-per-tenant / DB-per-tenant)', 'Existing single-tenant code to migrate', 'Data-residency and compliance requirements', 'Role and permission complexity', 'Tenant-count and scale targets'],
    caseStudy: {
      title: 'Thirty client copies collapsed into one platform',
      client: 'Vertical software vendor', industry: 'Enterprise SaaS',
      challenge: 'Each new client meant deploying another copy of a single-tenant app — 30 deployments, 30 databases, 30 sets of hotfixes. Onboarding took a week and hosting costs scaled linearly with sales.',
      solution: 'We migrated to a shared-schema multi-tenant architecture with row-level isolation, per-tenant configuration and theming, and a zero-downtime data-consolidation plan executed tenant by tenant.',
      results: [
        { value: '30→1', label: 'Deployments to maintain' },
        { value: '-85%', label: 'Hosting cost' },
        { value: 'Minutes', label: 'New-tenant onboarding (was a week)' },
      ],
    },
    comparison: {
      title: 'Multi-tenant vs. the alternatives',
      columns: ['', 'Multi-tenant (us)', 'Instance per client', 'One shared account'],
      highlightColumn: 1,
      rows: [
        { label: 'Cost per additional customer', values: ['Near zero', 'Full stack each', 'Near zero'] },
        { label: 'Data isolation between customers', values: [true, true, false] },
        { label: 'One codebase, one deploy', values: [true, false, true] },
        { label: 'Per-customer customization', values: ['Config-driven', 'Unlimited but costly', 'None'] },
        { label: 'Operational overhead at 50+ customers', values: ['Low', 'Unmanageable', 'Low'] },
      ],
    },
  },
  'saas-migration': {
    startingFrom: '$6,500',
    factors: ['Data volume and allowed migration windows', 'Legacy architecture and licensing constraints', 'Integrations to re-point during cutover', 'Zero-downtime requirements', 'User migration and retraining plan'],
    caseStudy: {
      title: 'From on-prem licenses to subscriptions without losing a customer',
      client: 'Established software vendor', industry: 'B2B software',
      challenge: 'A desktop product with on-prem installs was losing deals to SaaS competitors. Existing customers were profitable but every version upgrade required site visits, and new buyers expected a browser and a monthly price.',
      solution: 'We ran a phased migration: web front-end over the existing core first, then tenantized data imports customer by customer, subscription billing in parallel with legacy licenses, and a cutover plan rehearsed on staging.',
      results: [
        { value: '0', label: 'Downtime during cutovers' },
        { value: '+38%', label: 'Recurring revenue in year one' },
        { value: '96%', label: 'Customers migrated within 6 months' },
      ],
    },
    comparison: {
      title: 'Phased SaaS migration vs. the alternatives',
      columns: ['', 'Phased migration (us)', 'Big-bang rewrite', 'Staying on-prem'],
      highlightColumn: 1,
      rows: [
        { label: 'Revenue keeps flowing during the move', values: [true, 'At risk', true] },
        { label: 'Wins subscription-first buyers', values: [true, true, false] },
        { label: 'Risk of losing legacy behavior', values: ['Low', 'High', 'None'] },
        { label: 'Time to first SaaS revenue', values: ['Months', '1–2 years', 'Never'] },
        { label: 'Long-term maintenance cost', values: ['Falls', 'Falls eventually', 'Rises'] },
      ],
    },
  },
};

let i = 0;
for (const [slug, def] of Object.entries(SERVICES)) {
  const svc = await prisma.service.findFirst({ where: { slug } });
  if (!svc) { console.log(`SKIP ${slug} (not found)`); continue; }
  const content = { ...(svc.content ?? {}) };
  content.testimonials = pick3(i);
  content.caseStudy = def.caseStudy;
  content.comparison = def.comparison;
  content.pricingMeta = { startingFrom: def.startingFrom, factors: def.factors };
  await prisma.service.update({ where: { id: svc.id }, data: { content } });
  console.log(`OK ${slug}: +testimonials(3) +caseStudy +comparison +pricingMeta(${def.startingFrom})`);
  i++;
}
await prisma.$disconnect();
