// Seed testimonials / case studies / comparison tables / pricing meta into
// Service.content for the 12 web-development-family services.
// Merges keys into the existing content JSON — never overwrites other keys,
// never touches ServiceTranslation rows (locales fall back to EN until
// translated by the enrichment pipeline).
//
// NOTE: testimonials + case studies are DRAFT marketing copy (anonymized,
// illustrative). Replace with real client data before treating as factual.
// Prices in pricingMeta are PLACEHOLDERS for review.
//
// Run: node --env-file=.env --env-file=.env.local scripts/seed-webdev-detail-extras.mjs

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url, max: 2 }) });

// ── Shared testimonial pool (rotated 3-per-service so siblings differ) ──
const TESTIMONIAL_POOL = [
  { quote: 'They delivered exactly what was scoped, on the date they promised. Weekly demos meant there were zero surprises at launch.', author: 'Murat K.', role: 'CTO', company: 'Retail group, Istanbul', rating: 5 },
  { quote: 'Our old site took 6 seconds to load. The rebuild scores 95+ on Lighthouse and our bounce rate dropped by a third.', author: 'Sarah M.', role: 'Marketing Director', company: 'B2B SaaS, Berlin', rating: 5 },
  { quote: 'What impressed me most was the handover: clean repository, CI/CD set up, documentation our in-house team could actually use.', author: 'Ahmed R.', role: 'Engineering Manager', company: 'Logistics platform, Dubai', rating: 5 },
  { quote: 'They challenged our assumptions instead of just building what we asked. The final architecture saved us months of rework.', author: 'Elif T.', role: 'Product Owner', company: 'Fintech startup, Ankara', rating: 5 },
  { quote: 'Communication was in plain language, not jargon. We always knew what was done, what was next, and what it would cost.', author: 'Jonas W.', role: 'Managing Director', company: 'Manufacturing SME, Munich', rating: 5 },
  { quote: 'Post-launch support has been as good as the build itself. Issues are acknowledged within hours and fixed within days.', author: 'Fatima A.', role: 'Operations Lead', company: 'E-commerce brand, Riyadh', rating: 5 },
];
const pick3 = (i) => [0, 1, 2].map((k) => TESTIMONIAL_POOL[(i + k) % TESTIMONIAL_POOL.length]);

// ── Per-service content ────────────────────────────────────────────────
const SERVICES = {
  'web-development': {
    caseStudy: {
      title: 'Replatforming a retail site that was losing mobile customers',
      client: 'European home-goods retailer', industry: 'E-commerce',
      challenge: 'A 7-year-old themed storefront loaded in 6+ seconds on mobile, could not be safely extended, and every campaign landing page required developer time. Mobile conversion sat far below the industry benchmark.',
      solution: 'We rebuilt the storefront on Next.js with a headless commerce backend, componentized the design system so marketing could assemble landing pages themselves, and set up CI/CD with automated performance budgets.',
      results: [
        { value: '-68%', label: 'Mobile load time' },
        { value: '+23%', label: 'Conversion rate' },
        { value: '95+', label: 'Lighthouse score' },
      ],
    },
    comparison: {
      title: 'Custom development vs. the alternatives',
      columns: ['', 'Custom build (us)', 'Website builder', 'Off-the-shelf theme'],
      highlightColumn: 1,
      rows: [
        { label: 'Matches your exact workflow', values: [true, false, false] },
        { label: 'Page speed under your control', values: [true, false, 'Partly'] },
        { label: 'Scales with traffic & features', values: [true, 'Limited', 'Limited'] },
        { label: 'You own the code', values: [true, false, 'Partly'] },
        { label: 'Upfront cost', values: ['Higher', 'Low', 'Low'] },
        { label: 'Cost after year 2', values: ['Low', 'Grows', 'Grows'] },
      ],
    },
  },
  'frontend-development': {
    startingFrom: '$3,500',
    factors: ['Number of unique screens and states', 'Design system from scratch vs. existing', 'Animation and interaction depth', 'Browser/device support matrix', 'Accessibility target (WCAG level)'],
    caseStudy: {
      title: 'Rebuilding a data-heavy dashboard the team had stopped trusting',
      client: 'Analytics SaaS', industry: 'B2B software',
      challenge: 'A legacy jQuery dashboard froze with real-world data volumes; charts took 8–10 seconds to render and users exported to Excel instead of using the product.',
      solution: 'We rebuilt the frontend in React with virtualized tables, memoized chart pipelines, and skeleton loading — plus a component library the in-house team now extends on their own.',
      results: [
        { value: '10x', label: 'Faster chart rendering' },
        { value: '-41%', label: 'Support tickets' },
        { value: '2 wks', label: 'To first release' },
      ],
    },
    comparison: {
      title: 'Dedicated frontend build vs. the alternatives',
      columns: ['', 'Custom frontend (us)', 'Admin template', 'Low-code UI'],
      highlightColumn: 1,
      rows: [
        { label: 'Pixel-perfect to your brand', values: [true, false, false] },
        { label: 'Performance with large datasets', values: [true, 'Varies', false] },
        { label: 'Component reuse across products', values: [true, 'Limited', false] },
        { label: 'Vendor lock-in', values: ['None', 'Low', 'High'] },
        { label: 'Best for', values: ['Products & portals', 'Internal MVPs', 'Simple forms'] },
      ],
    },
  },
  'backend-development': {
    startingFrom: '$4,500',
    factors: ['Number of integrations (payment, ERP, CRM…)', 'Data model complexity and migrations', 'Expected traffic and scaling needs', 'Auth & security requirements', 'Compliance (GDPR/KVKK) scope'],
    caseStudy: {
      title: 'An API that stopped falling over on campaign days',
      client: 'Ticketing platform', industry: 'Events',
      challenge: 'Flash-sale traffic spiked 40x and the monolithic API returned timeouts at exactly the moments that mattered most, costing real revenue per incident.',
      solution: 'We introduced queue-based order processing, read replicas with per-endpoint caching, and load-tested autoscaling — without a risky big-bang rewrite.',
      results: [
        { value: '40x', label: 'Peak traffic handled' },
        { value: '99.98%', label: 'Uptime since launch' },
        { value: '<150ms', label: 'p95 response time' },
      ],
    },
    comparison: {
      title: 'Custom backend vs. the alternatives',
      columns: ['', 'Custom API (us)', 'Backend-as-a-Service', 'CMS plugins'],
      highlightColumn: 1,
      rows: [
        { label: 'Fits complex business rules', values: [true, 'Partly', false] },
        { label: 'Cost at scale', values: ['Predictable', 'Grows steeply', 'Low'] },
        { label: 'Own your data & infrastructure', values: [true, false, 'Partly'] },
        { label: 'Deep integrations (ERP, legacy)', values: [true, 'Limited', 'Limited'] },
        { label: 'Time to first version', values: ['Weeks', 'Days', 'Days'] },
      ],
    },
  },
  'full-stack-development': {
    startingFrom: '$6,500',
    factors: ['Product scope (MVP vs. full feature set)', 'Web only vs. web + admin + API', 'Third-party integrations', 'Team handover and documentation depth', 'Post-launch support level'],
    caseStudy: {
      title: 'From idea to paying customers in one quarter',
      client: 'HR-tech founder', industry: 'B2B SaaS',
      challenge: 'A non-technical founder had validated demand but quotes from other agencies split the work across separate frontend, backend, and DevOps teams — tripling coordination cost and timeline.',
      solution: 'One full-stack team shipped the MVP end-to-end: Next.js app, Postgres backend, Stripe billing, and a lightweight admin — with weekly releases the founder could show investors.',
      results: [
        { value: '11 wks', label: 'Idea to launch' },
        { value: '1 team', label: 'No coordination overhead' },
        { value: '30+', label: 'Paying customers in month 1' },
      ],
    },
    comparison: {
      title: 'One full-stack team vs. the alternatives',
      columns: ['', 'Full-stack team (us)', 'Separate specialists', 'Solo freelancer'],
      highlightColumn: 1,
      rows: [
        { label: 'Single point of accountability', values: [true, false, true] },
        { label: 'Coordination overhead', values: ['None', 'High', 'None'] },
        { label: 'Covers frontend, API, DevOps', values: [true, true, 'Rarely'] },
        { label: 'Bus-factor risk', values: ['Low', 'Low', 'High'] },
        { label: 'Speed to MVP', values: ['Fast', 'Slower', 'Varies'] },
      ],
    },
  },
  'progressive-web-apps': {
    startingFrom: '$5,500',
    factors: ['Offline scope (read-only vs. full sync)', 'Push notification strategy', 'Existing site reuse vs. rebuild', 'App-store wrapping (TWA) needs', 'Device API usage (camera, GPS…)'],
    caseStudy: {
      title: 'App-like ordering without the app-store tax',
      client: 'Restaurant chain', industry: 'Food & beverage',
      challenge: 'Native apps for iOS and Android cost two codebases to maintain, and 70% of customers refused to install them for occasional orders.',
      solution: 'We shipped a PWA with offline menus, push-notification offers, and one-tap home-screen install — one codebase, no store review cycle, instant updates.',
      results: [
        { value: '+58%', label: 'Repeat orders' },
        { value: '1', label: 'Codebase instead of 3' },
        { value: '-100%', label: 'App-store fees' },
      ],
    },
    comparison: {
      title: 'PWA vs. native app vs. responsive site',
      columns: ['', 'PWA (us)', 'Native app', 'Responsive site'],
      highlightColumn: 1,
      rows: [
        { label: 'Works offline', values: [true, true, false] },
        { label: 'Push notifications', values: [true, true, false] },
        { label: 'No install friction', values: [true, false, true] },
        { label: 'One codebase for all platforms', values: [true, false, true] },
        { label: 'App-store fees & review', values: ['None', '15–30%', 'None'] },
        { label: 'Full device-hardware access', values: ['Most APIs', true, 'Limited'] },
      ],
    },
  },
  'headless-cms-development': {
    startingFrom: '$4,500',
    factors: ['Content model complexity', 'Number of channels (web, app, kiosk…)', 'Editor workflow & roles', 'Migration volume from the old CMS', 'CMS licence tier (open-source vs. SaaS)'],
    caseStudy: {
      title: 'One content hub feeding web, app, and in-store screens',
      client: 'Multi-brand retailer', industry: 'Retail',
      challenge: 'Three teams maintained the same product stories in three systems — the website CMS, the mobile app backend, and a spreadsheet for in-store displays. Updates took days and drifted out of sync.',
      solution: 'We modeled content once in a headless CMS and delivered it via a single API to the Next.js site, the mobile app, and digital signage — with editorial workflows and preview for the content team.',
      results: [
        { value: '3→1', label: 'Content systems' },
        { value: '-90%', label: 'Time to publish everywhere' },
        { value: '0', label: 'Out-of-sync incidents' },
      ],
    },
    comparison: {
      title: 'Headless CMS vs. the alternatives',
      columns: ['', 'Headless CMS (us)', 'Traditional CMS', 'Hard-coded content'],
      highlightColumn: 1,
      rows: [
        { label: 'Publish to web + app + more', values: [true, 'Web only', false] },
        { label: 'Editors work independently', values: [true, true, false] },
        { label: 'Frontend performance ceiling', values: ['None', 'Theme-limited', 'None'] },
        { label: 'Security surface', values: ['Small', 'Plugins = risk', 'Smallest'] },
        { label: 'Best for', values: ['Multi-channel content', 'Simple blogs', 'Static pages'] },
      ],
    },
  },
  'jamstack-development': {
    startingFrom: '$4,000',
    factors: ['Page count and content sources', 'Build-time vs. runtime data needs', 'Forms, search, and dynamic islands', 'Preview workflow for editors', 'Hosting/CDN choice'],
    caseStudy: {
      title: 'A marketing site that survives every traffic spike — for pennies',
      client: 'Venture-backed startup', industry: 'Technology',
      challenge: 'Every product-launch mention took the WordPress site down, and the monthly hosting-plus-maintenance bill kept climbing despite caching plugins.',
      solution: 'We migrated to a statically generated Jamstack site served from a global CDN, with content still editable in a familiar CMS and dynamic pieces (forms, search) as isolated serverless functions.',
      results: [
        { value: '100%', label: 'Uptime through launches' },
        { value: '-85%', label: 'Hosting cost' },
        { value: '<1s', label: 'Global load time' },
      ],
    },
    comparison: {
      title: 'Jamstack vs. the alternatives',
      columns: ['', 'Jamstack (us)', 'WordPress', 'Server-rendered app'],
      highlightColumn: 1,
      rows: [
        { label: 'Survives traffic spikes by default', values: [true, false, 'With effort'] },
        { label: 'Hosting cost', values: ['Minimal', 'Medium', 'Higher'] },
        { label: 'Security patching burden', values: ['Near zero', 'Constant', 'Ongoing'] },
        { label: 'Heavy dynamic features', values: ['Via functions', 'Plugins', true] },
        { label: 'Best for', values: ['Content & marketing sites', 'Quick blogs', 'Complex apps'] },
      ],
    },
  },
  'accessibility-compliance': {
    startingFrom: '$2,500',
    factors: ['Target level (WCAG 2.2 A / AA / AAA)', 'Number of unique page templates', 'Audit only vs. audit + remediation', 'Assistive-technology test matrix', 'Ongoing monitoring needs'],
    caseStudy: {
      title: 'Winning a public-sector tender that required WCAG 2.2 AA',
      client: 'Software vendor', industry: 'GovTech',
      challenge: 'A public tender required documented WCAG 2.2 AA conformance; an automated scan showed hundreds of issues and the vendor had three months before submission.',
      solution: 'We ran a manual + assistive-technology audit, fixed issues at the design-system level so they stayed fixed, and delivered a signed conformance report (VPAT-style) with retest evidence.',
      results: [
        { value: 'AA', label: 'WCAG 2.2 conformance' },
        { value: '0', label: 'Blocker issues at retest' },
        { value: '✓', label: 'Tender requirement met' },
      ],
    },
    comparison: {
      title: 'Real remediation vs. the alternatives',
      columns: ['', 'Audit + remediation (us)', 'Overlay widget', 'Doing nothing'],
      highlightColumn: 1,
      rows: [
        { label: 'Actually usable with screen readers', values: [true, false, false] },
        { label: 'Stands up in legal review', values: [true, 'Contested', false] },
        { label: 'Fixes root causes in code', values: [true, false, false] },
        { label: 'SEO side-benefits', values: [true, false, false] },
        { label: 'Ongoing cost', values: ['One-time + checks', 'Subscription forever', 'Risk grows'] },
      ],
    },
  },
  'blockchain-development': {
    startingFrom: '$8,500',
    factors: ['Chain choice (EVM, Solana, private)', 'Smart-contract complexity & audit scope', 'Wallet/custody UX requirements', 'On-chain vs. off-chain data split', 'Regulatory constraints in your market'],
    caseStudy: {
      title: 'A loyalty program customers can actually trust',
      client: 'Retail loyalty operator', industry: 'Retail / Web3',
      challenge: 'Partners disputed loyalty-point balances monthly, and reconciliation between merchants took a full-time employee. Customers had no visibility into their own points.',
      solution: 'We implemented tokenized loyalty points on an EVM chain with audited smart contracts, a gasless wallet experience customers never notice, and a merchant dashboard replacing manual reconciliation.',
      results: [
        { value: '0', label: 'Balance disputes since launch' },
        { value: '-1 FTE', label: 'Reconciliation effort' },
        { value: '100%', label: 'Auditable transactions' },
      ],
    },
    comparison: {
      title: 'Custom smart contracts vs. the alternatives',
      columns: ['', 'Custom contracts (us)', 'White-label platform', 'No-code tools'],
      highlightColumn: 1,
      rows: [
        { label: 'Fits your exact token economics', values: [true, 'Partly', false] },
        { label: 'Independent security audit', values: [true, 'Shared', 'Rarely'] },
        { label: 'Platform fees on every transaction', values: ['None', true, true] },
        { label: 'Exit/migration freedom', values: [true, 'Limited', false] },
        { label: 'Time to launch', values: ['Weeks', 'Days', 'Days'] },
      ],
    },
  },
  'code-review-refactoring': {
    startingFrom: '$1,800',
    factors: ['Codebase size (LOC / modules)', 'Test coverage as a starting point', 'Review only vs. hands-on refactoring', 'Framework/version upgrades in scope', 'Knowledge-transfer sessions'],
    caseStudy: {
      title: 'Making a "nobody touches that module" codebase safe to ship again',
      client: 'Insurance software team', industry: 'InsurTech',
      challenge: 'A core pricing module had no tests and two developers who refused to modify it. Releases were monthly at best, and every deploy needed a rollback plan.',
      solution: 'We added characterization tests to freeze current behavior, refactored the module incrementally behind feature flags, and set up CI quality gates — pairing with the in-house team throughout.',
      results: [
        { value: '0→87%', label: 'Test coverage (core module)' },
        { value: '4x', label: 'Release frequency' },
        { value: '-70%', label: 'Hotfix deployments' },
      ],
    },
    comparison: {
      title: 'Incremental refactoring vs. the alternatives',
      columns: ['', 'Review + refactor (us)', 'Full rewrite', 'Living with it'],
      highlightColumn: 1,
      rows: [
        { label: 'Business keeps shipping meanwhile', values: [true, false, true] },
        { label: 'Risk of losing hidden behavior', values: ['Low', 'High', 'None'] },
        { label: 'Cost', values: ['Incremental', 'Very high', 'Grows silently'] },
        { label: 'Team learns the codebase', values: [true, 'Partly', false] },
        { label: 'Payoff timeline', values: ['Weeks', '6–18 months', 'Never'] },
      ],
    },
  },
  'desktop-application-development': {
    startingFrom: '$7,500',
    factors: ['Platforms (Windows / macOS / Linux)', 'Cross-platform vs. native per OS', 'Hardware/peripheral integrations', 'Offline data & sync strategy', 'Auto-update and distribution setup'],
    caseStudy: {
      title: 'Replacing a 2005-era VB tool the whole factory depended on',
      client: 'Manufacturing SME', industry: 'Industrial',
      challenge: 'Production planning ran on an unmaintainable Visual Basic app tied to one aging PC. It could not talk to the new ERP and the only developer who understood it had retired.',
      solution: 'We rebuilt it as a cross-platform desktop app (Tauri) with offline-first local data, background ERP sync, and silent auto-updates — rolled out to 40 workstations without downtime.',
      results: [
        { value: '40', label: 'Workstations migrated' },
        { value: '0', label: 'Days of production downtime' },
        { value: '15 min', label: 'ERP sync (was manual, daily)' },
      ],
    },
    comparison: {
      title: 'Cross-platform desktop vs. the alternatives',
      columns: ['', 'Cross-platform (us)', 'Native per OS', 'Web app only'],
      highlightColumn: 1,
      rows: [
        { label: 'One codebase, all platforms', values: [true, false, true] },
        { label: 'Works fully offline', values: [true, true, 'Limited'] },
        { label: 'Deep OS & hardware access', values: [true, true, false] },
        { label: 'Development cost', values: ['Medium', 'High (×3)', 'Low'] },
        { label: 'Best for', values: ['Business tools', 'Perf-critical apps', 'Always-online use'] },
      ],
    },
  },
  'real-time-applications': {
    startingFrom: '$6,500',
    factors: ['Concurrent-connection targets', 'Latency requirements (ms budget)', 'Delivery guarantees (at-least-once…)', 'Presence/collaboration features', 'Self-hosted vs. managed infrastructure'],
    caseStudy: {
      title: 'Live fleet tracking that dispatchers stopped double-checking by phone',
      client: 'Regional logistics company', industry: 'Logistics',
      challenge: 'Dispatchers refreshed a map that updated every 5 minutes, then called drivers to confirm — the "tracking system" was effectively a phone workflow with extra steps.',
      solution: 'We built a WebSocket-based tracking layer with sub-second position updates, automatic reconnection for spotty vehicle networks, and geofenced alerts — handling the full fleet on modest infrastructure.',
      results: [
        { value: '<1s', label: 'Position update latency' },
        { value: '-80%', label: 'Confirmation calls' },
        { value: '500+', label: 'Concurrent vehicles' },
      ],
    },
    comparison: {
      title: 'Custom real-time layer vs. the alternatives',
      columns: ['', 'WebSockets (us)', 'Polling', 'Managed SaaS'],
      highlightColumn: 1,
      rows: [
        { label: 'True sub-second updates', values: [true, false, true] },
        { label: 'Server load at scale', values: ['Low', 'Very high', 'N/A'] },
        { label: 'Cost at high message volume', values: ['Flat', 'Wasteful', 'Per-message, grows'] },
        { label: 'Data stays on your infrastructure', values: [true, true, false] },
        { label: 'Best for', values: ['Core product features', 'Rare updates', 'Quick prototypes'] },
      ],
    },
  },
};

const slugs = Object.keys(SERVICES);
let i = 0;
for (const slug of slugs) {
  const svc = await prisma.service.findFirst({ where: { slug } });
  if (!svc) { console.log(`SKIP ${slug} (not found)`); continue; }
  const def = SERVICES[slug];
  const content = { ...(svc.content ?? {}) };

  content.testimonials = pick3(i);
  content.caseStudy = def.caseStudy;
  content.comparison = def.comparison;
  if (def.startingFrom) {
    content.pricingMeta = { startingFrom: def.startingFrom, factors: def.factors };
  }

  await prisma.service.update({ where: { id: svc.id }, data: { content } });
  console.log(`OK ${slug}: +testimonials(3) +caseStudy +comparison${def.startingFrom ? ' +pricingMeta(' + def.startingFrom + ')' : ''}`);
  i++;
}
await prisma.$disconnect();
