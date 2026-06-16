// Simulation only (no writes): plan a ≤6-per-scene rebalance that introduces
// 14 new scenes. Prints the resulting distribution and flags any scene > 6.
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL, max: 2 }) });

// slug -> new target scene
const MOVE = {
  // kpi-cards (BI / analytics)
  'business-intelligence':'kpi-cards','business-intelligence-solutions':'kpi-cards','data-analytics':'kpi-cards','data-visualization':'kpi-cards','real-time-analytics':'kpi-cards','model-monitoring':'kpi-cards',
  // gauge-meter (performance / monitoring / speed)
  'core-web-vitals':'gauge-meter','performance-optimization':'gauge-meter','performance-testing-optimization':'gauge-meter','website-speed-optimization':'gauge-meter','continuous-monitoring':'gauge-meter','server-optimization':'gauge-meter',
  // browser-window (web design & dev)
  'web-development':'browser-window','web-design':'browser-window','frontend-development':'browser-window','corporate-website-design':'browser-window','jamstack-development':'browser-window','progressive-web-apps':'browser-window',
  // cms-blocks (CMS / WordPress / content)
  'wordpress-development':'cms-blocks','custom-wordpress-themes':'cms-blocks','headless-cms-development':'cms-blocks','wordpress-optimization':'cms-blocks','wordpress-plugin-development':'cms-blocks','webflow-development':'cms-blocks',
  // color-swatch (branding)
  'logo-brand-identity':'color-swatch','rebranding':'color-swatch','brand-guidelines':'color-swatch','brand-strategy':'color-swatch','brand-positioning':'color-swatch','graphic-design':'color-swatch',
  // wireframe (UI / UX / prototyping)
  'ui-design':'wireframe','ui-ux-design':'wireframe','prototyping-wireframing':'wireframe','mobile-app-design':'wireframe','ux-research':'wireframe','ux-analytics':'wireframe',
  // neural-layers (LLM / AI models)
  'custom-llm-development':'neural-layers','llm-finetuning':'neural-layers','llm-services':'neural-layers','custom-ai-development':'neural-layers','natural-language-processing':'neural-layers','nlp-text-processing':'neural-layers',
  // product-grid (storefront)
  'e-commerce':'product-grid','custom-ecommerce':'product-grid','shopify-development':'product-grid','woocommerce-development':'product-grid','magento-development':'product-grid','ecommerce-design':'product-grid',
  // checkout-flow (checkout / payment)
  'payment-gateway-integration':'checkout-flow','b2b-ecommerce':'checkout-flow','headless-commerce':'checkout-flow','marketplace-development':'checkout-flow','social-commerce':'checkout-flow','google-shopping':'checkout-flow',
  // container-grid (containers / infra-as-code)
  'docker-kubernetes':'container-grid','kubernetes-orchestration':'container-grid','terraform-infrastructure':'container-grid','infrastructure-as-code':'container-grid','microservices-architecture':'container-grid','serverless-architecture':'container-grid',
  // app-screens (mobile apps)
  'android-development':'app-screens','ios-development':'app-screens','react-native-development':'app-screens','flutter-development':'app-screens','cross-platform-apps':'app-screens','mobile-development':'app-screens',
  // ad-creative (paid ads)
  'facebook-ads':'ad-creative','instagram-ads':'ad-creative','meta-ads':'ad-creative','google-display-ads':'ad-creative','google-search-ads':'ad-creative','youtube-ads':'ad-creative',
  // film-strip (video / media)
  'video-marketing':'film-strip','video-production-marketing':'film-strip','explainer-videos':'film-strip','motion-graphics':'film-strip','product-animations':'film-strip','podcast-production':'film-strip',
  // automation-bot (RPA / workflow automation)
  'rpa-solutions':'automation-bot','workflow-automation':'automation-bot','ai-workflow-automation':'automation-bot','zapier-automation':'automation-bot','process-digitization':'automation-bot','custom-marketing-automation':'automation-bot',

  // --- second-pass moves onto existing under-6 scenes to clear leftovers ---
  // chat-bubbles 10 -> 6
  'prompt-engineering':'code-editor','voice-assistant-development':'mobile-device','telemedicine-platforms':'mobile-device','whatsapp-commerce':'megaphone-3d',
  // gear-system 10 -> 6
  'ai-agents':'brain-network','autonomous-agents':'brain-network','technology-consulting':'capability-hub','hubspot-implementation':'kanban-board',
  // data-flow 10 -> 6
  'api-development':'code-editor','rest-api-development':'code-editor','graphql-development':'code-editor','google-cloud-migration':'server-stack',
  // social-feed 9 -> 6
  'social-animations':'palette-canvas','influencer-marketing':'megaphone-3d','tiktok-shop':'megaphone-3d',
  // layers-stack 9 -> 6
  'design-systems':'palette-canvas','knowledge-base-ai':'capability-hub','rag-solutions':'microscope',
  // lightbulb 9 -> 6
  'blog-copywriting':'capability-hub','content-marketing':'capability-hub','content-strategy':'kanban-board',
  // shield-lock 8 -> 6
  'fraud-detection-systems':'microscope','disaster-recovery':'server-stack',
  // cloud-stack 8 -> 6
  'saas-migration':'server-stack','disaster-recovery-planning':'server-stack',
  // puzzle-pieces 7 -> 6
  'unity-game-development':'video-player',
  // crypto-chain 7 -> 6
  'tokenization':'database-rings',
  // brain-network overflow -> chart-graph
  'anomaly-detection':'chart-graph',
  // network-nodes 7 -> 6
  'api-rate-limiting-throttling':'terminal',
  // target-bullseye 7 -> 6 / ad balance
  'recommendation-systems':'brain-network',
  'amazon-ppc':'ad-creative','marketplace-ads':'ad-creative','google-display-ads':'target-bullseye','google-search-ads':'target-bullseye',
  // database-migration -> chart-graph
  'database-migration':'chart-graph',
};

const NEW_SCENES = new Set(['kpi-cards','gauge-meter','browser-window','cms-blocks','color-swatch','wireframe','neural-layers','product-grid','checkout-flow','container-grid','app-screens','ad-creative','film-strip','automation-bot']);

const apply = process.argv.includes('--apply');
const all = await prisma.service.findMany({ select: { id:true, slug:true, content:true } });
const bySlug = Object.fromEntries(all.map(s => [s.slug, s]));
const cur = {}; for (const s of all) cur[s.slug] = s.content?.animation?.heroVisual || '(none)';
let unknown = 0;
for (const [slug,to] of Object.entries(MOVE)) { if (!(slug in cur)) { console.log(`! unknown slug: ${slug}`); unknown++; } cur[slug] = to; }
const dist = {}; for (const hv of Object.values(cur)) dist[hv]=(dist[hv]||0)+1;
const sorted = Object.entries(dist).sort((a,b)=>b[1]-a[1]);
console.log('total scenes:', sorted.length, '| services:', all.length, '| moves:', Object.keys(MOVE).length, '| new scenes:', NEW_SCENES.size);
const over = sorted.filter(([,n])=>n>6);
console.log('\nOVER 6:', over.length ? over.map(([k,n])=>`${k}=${n}`).join(', ') : 'NONE ✓');
console.log('\nfull distribution:');
sorted.forEach(([k,n])=>console.log(String(n).padStart(2), NEW_SCENES.has(k)?'*':' ', k));

if (apply && over.length === 0 && unknown === 0) {
  let n = 0;
  for (const [slug, to] of Object.entries(MOVE)) {
    const svc = bySlug[slug];
    const content = { ...(svc.content || {}), animation: { ...(svc.content?.animation || {}), heroVisual: to } };
    await prisma.service.update({ where: { id: svc.id }, data: { content } });
    n++;
  }
  console.log(`\n✓ APPLIED ${n} heroVisual reassignments`);
} else if (apply) {
  console.log('\n✗ NOT applied — resolve OVER-6 / unknown slugs first');
} else {
  console.log('\n○ DRY RUN — re-run with --apply to write');
}
await prisma.$disconnect();
