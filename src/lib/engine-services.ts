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
];

const bySlug = new Map(ENGINE_SERVICES.map((e) => [e.slug, e]));
export const isEngineSlug = (slug: string) => bySlug.has(slug);
export const engineHasBlog = (slug: string) => bySlug.get(slug)?.blog === true;
