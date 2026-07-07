import { MetadataRoute } from 'next';
import { localizeFullPath } from '@/lib/routes';
import { Locale } from '@/lib/i18n';
import { getServicesForSitemap } from '@/lib/database/public-queries';

import { SITE_URL as baseUrl } from '@/config/site';
const allLocales: Locale[] = ['en', 'tr', 'de', 'ar', 'ur'];

// Last content-change dates (avoids false "modified today" on every deploy)
const DATES = {
  seoRefresh: new Date('2026-04-26'), // date of the latest SEO overhaul
  blogBase: '2025-01',               // blog posts were published early 2025
};

const PRIORITY = {
  home: 1.0,
  mainNav: 0.9,
  services: 0.85,
  serviceDetail: 0.8,
  tools: 0.75,
  blog: 0.7,
  blogPost: 0.65,
  other: 0.6,
};

// --------------------------------------------------------------------------
// Page definitions
// --------------------------------------------------------------------------

// Main navigation pages (English paths — localizeFullPath handles localization)
const mainRoutes = [
  { path: '',           priority: PRIORITY.home,    changeFreq: 'daily'   as const, date: DATES.seoRefresh },
  { path: '/about',     priority: PRIORITY.mainNav, changeFreq: 'monthly' as const, date: DATES.seoRefresh },
  { path: '/services',  priority: PRIORITY.services,changeFreq: 'weekly'  as const, date: DATES.seoRefresh },
  { path: '/projects',  priority: PRIORITY.mainNav, changeFreq: 'weekly'  as const, date: DATES.seoRefresh },
  { path: '/contact',   priority: PRIORITY.mainNav, changeFreq: 'monthly' as const, date: DATES.seoRefresh },
  { path: '/careers',   priority: PRIORITY.other,   changeFreq: 'monthly' as const, date: DATES.seoRefresh },
  { path: '/pricing',   priority: PRIORITY.other,   changeFreq: 'monthly' as const, date: DATES.seoRefresh },
  { path: '/blog',      priority: PRIORITY.blog,    changeFreq: 'daily'   as const, date: DATES.seoRefresh },
  { path: '/privacy-policy',   priority: PRIORITY.other, changeFreq: 'yearly' as const, date: DATES.seoRefresh },
  { path: '/terms-of-service', priority: PRIORITY.other, changeFreq: 'yearly' as const, date: DATES.seoRefresh },
  { path: '/cookie-policy',    priority: PRIORITY.other, changeFreq: 'yearly' as const, date: DATES.seoRefresh },
];

// Free tools (same English path for all locales — no path-segment translation)
const toolRoutes = [
  { path: '/tools/llm-calculator',  priority: PRIORITY.tools, changeFreq: 'monthly' as const },
  { path: '/tools/cost-estimator',  priority: PRIORITY.tools, changeFreq: 'monthly' as const },
  { path: '/tools/ai-readiness',    priority: PRIORITY.tools, changeFreq: 'monthly' as const },
];

// Core sub-pages that exist for every service (canonical sub-nav URLs).
const serviceSubPages = ['/features', '/process', '/technologies', '/pricing', '/faq'];

// Blog posts are pulled live from the DB inside sitemap() (see below).
async function getBlogPostsForSitemap(): Promise<{ slug: string; date: Date }[]> {
  try {
    const { getPublishedBlogPosts } = await import('@/lib/admin/database/blog-queries');
    const res = await getPublishedBlogPosts('en', { page: 1, limit: 1000 });
    return (res.data || [])
      .filter((p: { slug?: string }) => !!p.slug)
      .map((p: { slug: string; publishedAt?: Date | string; updatedAt?: Date | string }) => ({
        slug: p.slug,
        date: new Date(p.publishedAt || p.updatedAt || DATES.seoRefresh),
      }));
  } catch {
    return [];
  }
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

/** Build hreflang alternates for a given English path */
function buildAlternates(englishPath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  allLocales.forEach(locale => {
    const localizedPath = englishPath ? localizeFullPath(englishPath, locale) : '';
    languages[locale] = `${baseUrl}/${locale}${localizedPath}`;
  });
  // x-default always points to the English canonical
  languages['x-default'] = `${baseUrl}/en${englishPath}`;
  return languages;
}

/** Build a single sitemap entry for one locale */
function entry(
  locale: Locale,
  englishPath: string,
  opts: {
    priority: number;
    changeFreq: MetadataRoute.Sitemap[0]['changeFrequency'];
    date: Date;
    includeAlternates?: boolean;
  }
): MetadataRoute.Sitemap[0] {
  const localizedPath = englishPath ? localizeFullPath(englishPath, locale) : '';
  return {
    url: `${baseUrl}/${locale}${localizedPath}`,
    lastModified: opts.date,
    changeFrequency: opts.changeFreq,
    priority: opts.priority,
    ...(opts.includeAlternates !== false && {
      alternates: { languages: buildAlternates(englishPath) },
    }),
  };
}

// --------------------------------------------------------------------------
// Sitemap
// --------------------------------------------------------------------------

const hasArr = (a: unknown) => Array.isArray(a) && a.length > 0;

/** Only list a sub-page when the service actually has that content, so we
 *  never feed Google thin/empty pages. */
function subPagesFor(svc: Record<string, unknown>): string[] {
  const c = (svc.content || {}) as Record<string, unknown>;
  const subs: string[] = [];
  if (hasArr(svc.features) || hasArr(c.features)) subs.push('/features');
  if (hasArr(c.process)) subs.push('/process');
  if (hasArr(c.technologies)) subs.push('/technologies');
  if (hasArr(c.faq)) subs.push('/faq');
  if (hasArr(svc.pricingPackages)) subs.push('/pricing');
  return subs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // 1. Main navigation — all locales, localized paths
  mainRoutes.forEach(({ path, priority, changeFreq, date }) => {
    allLocales.forEach(locale => {
      entries.push(entry(locale, path, { priority, changeFreq, date }));
    });
  });

  // 2. Tools — all locales (path stays in English, no localization key for "tools")
  toolRoutes.forEach(({ path, priority, changeFreq }) => {
    allLocales.forEach(locale => {
      entries.push(entry(locale, path, { priority, changeFreq, date: DATES.seoRefresh }));
    });
  });

  // 3 + 4. Every published service (live from DB) — main page for all, plus the
  // sub-pages that actually have content. Replaces the old hardcoded ~24 slugs.
  let services: Record<string, unknown>[] = [];
  try {
    services = (await getServicesForSitemap()) as Record<string, unknown>[];
  } catch {
    services = [];
  }
  services.forEach(svc => {
    const slug = typeof svc.slug === 'string' ? svc.slug : null;
    if (!slug) return;
    const lastMod = svc.updatedAt ? new Date(svc.updatedAt as string) : DATES.seoRefresh;
    const base = `/services/${slug}`;
    allLocales.forEach(locale => {
      entries.push(entry(locale, base, { priority: PRIORITY.serviceDetail, changeFreq: 'weekly', date: lastMod }));
    });
    subPagesFor(svc).forEach(sub => {
      allLocales.forEach(locale => {
        entries.push(entry(locale, `${base}${sub}`, { priority: PRIORITY.other, changeFreq: 'monthly', date: lastMod }));
      });
    });
  });

  // 5. Blog posts (live from DB) — under all locales so Google picks the right
  // one via hreflang. Blog slugs are locale-agnostic (the API resolves per locale).
  const blogPosts = await getBlogPostsForSitemap();
  blogPosts.forEach(({ slug, date }) => {
    const englishPath = `/blog/${slug}`;
    allLocales.forEach(locale => {
      entries.push(entry(locale, englishPath, {
        priority: PRIORITY.blogPost,
        changeFreq: 'weekly',
        date,
      }));
    });
  });

  return entries;
}
