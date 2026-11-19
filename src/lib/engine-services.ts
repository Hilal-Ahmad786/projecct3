// Turkish services served by the shared service engine (SeoServiceEngine) from content/<slug>/tr.
// `instagram-ads` has its own page file; every other entry is generated from
// content/<slug>/tr/{spec.json,metadata.json,*.md} by getGeneratedService().
// Keep this module light: it is imported by the sitemap and the (client) Navbar.
export type EngineServiceEntry = { slug: string; date: string; blog?: boolean };

export const ENGINE_SERVICES: EngineServiceEntry[] = [
  { slug: 'instagram-ads', date: '2026-11-20', blog: true },
  { slug: 'tiktok-ads', date: '2026-11-20' },
  { slug: 'youtube-ads', date: '2026-11-20' },
  { slug: 'google-display-ads', date: '2026-11-20' },
  { slug: 'linkedin-ads', date: '2026-11-20' },
  { slug: 'trendyol-ads', date: '2026-11-20' },
  { slug: 'social-media-management', date: '2026-11-20' },
  { slug: 'web-development', date: '2026-11-20', blog: true },
  { slug: 'mobile-development', date: '2026-11-20' },
  { slug: 'woocommerce-development', date: '2026-11-20' },
  { slug: 'wordpress-development', date: '2026-11-20' },
  { slug: 'saas-development', date: '2026-11-20' },
  { slug: 'api-development', date: '2026-11-20' },
  { slug: 'crm-development', date: '2026-11-20' },
  { slug: 'erp-development', date: '2026-11-20' },
  { slug: 'ui-ux-design', date: '2026-11-20' },
  { slug: 'hrms-development', date: '2026-11-20' },
  { slug: 'custom-business-software', date: '2026-11-20' },
  { slug: 'flutter-development', date: '2026-11-20' },
  { slug: 'chatbot-development', date: '2026-11-20' },
  { slug: 'whatsapp-bots', date: '2026-11-20' },
  { slug: 'ai-agents', date: '2026-11-20' },
  { slug: 'llm-services', date: '2026-11-20' },
  { slug: 'rag-solutions', date: '2026-11-20' },
  { slug: 'ai-workflow-automation', date: '2026-11-20' },
  { slug: 'website-speed-optimization', date: '2026-11-20' },
  { slug: 'devops-cloud', date: '2026-11-20' },
  { slug: 'cybersecurity', date: '2026-11-20' },
  { slug: 'web-scraping', date: '2026-11-20' },
  { slug: 'python-automation', date: '2026-11-20' },
  { slug: 'workflow-automation', date: '2026-11-20' },
  { slug: 'email-marketing', date: '2026-11-20' },
  { slug: 'content-marketing', date: '2026-11-20' },
  { slug: 'local-seo', date: '2026-11-20' },
  { slug: 'link-building', date: '2026-11-20' },
  { slug: 'whatsapp-business-api', date: '2026-11-20' },
  { slug: 'conversion-rate-optimization', date: '2026-11-20' },
  { slug: 'influencer-marketing', date: '2026-11-20' },
  { slug: 'social-media-marketing', date: '2026-11-20' },
  { slug: 'whatsapp-marketing', date: '2026-11-20' },
  { slug: 'web-design', date: '2026-11-20' },
  { slug: 'landing-page-design', date: '2026-11-20' },
  { slug: 'graphic-design', date: '2026-11-20' },
  { slug: 'logo-brand-identity', date: '2026-11-20' },
  { slug: 'ecommerce-design', date: '2026-11-20' },
  { slug: 'startup-mvp-development', date: '2026-11-20' },
  { slug: 'digital-transformation', date: '2026-11-20' },
];

const bySlug = new Map(ENGINE_SERVICES.map((e) => [e.slug, e]));
export const isEngineSlug = (slug: string) => bySlug.has(slug);
export const engineHasBlog = (slug: string) => bySlug.get(slug)?.blog === true;
