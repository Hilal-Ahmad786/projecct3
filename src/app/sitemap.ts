import { MetadataRoute } from 'next';
import { localizeFullPath } from '@/lib/routes';
import { Locale } from '@/lib/i18n';

const baseUrl = 'https://www.paksoft.com.tr';
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
];

// Free tools (same English path for all locales — no path-segment translation)
const toolRoutes = [
  { path: '/tools/llm-calculator',  priority: PRIORITY.tools, changeFreq: 'monthly' as const },
  { path: '/tools/cost-estimator',  priority: PRIORITY.tools, changeFreq: 'monthly' as const },
  { path: '/tools/ai-readiness',    priority: PRIORITY.tools, changeFreq: 'monthly' as const },
];

// Service main pages — slugs always stay in English
const serviceMainPages = [
  '/services/web-development',
  '/services/mobile-development',
  '/services/ui-ux-design',
  '/services/digital-marketing',
  '/services/e-commerce',
  '/services/ai-solutions',
  '/services/api-development',
  '/services/python-automation',
  '/services/devops-cloud',
  '/services/data-analytics',
  '/services/cybersecurity',
  '/services/machine-learning',
  '/services/conversational-ai',
  '/services/prompt-engineering',
  '/services/ai-agents',
  '/services/rag-solutions',
  '/services/mlops-deployment',
  '/services/computer-vision',
  '/services/llm-finetuning',
  '/services/voice-ai',
  '/services/ai-search',
  '/services/ai-security-review',
  '/services/ai-readiness-audit',
  '/services/ai-maintenance',
];

// Only services confirmed to have all sub-pages populated (src/data/serviceSubpages.ts)
const servicesWithSubPages = [
  '/services/ai-solutions',
  '/services/api-development',
  '/services/conversational-ai',
  '/services/cybersecurity',
  '/services/data-analytics',
  '/services/devops-cloud',
  '/services/digital-marketing',
  '/services/e-commerce',
  '/services/machine-learning',
  '/services/mobile-development',
  '/services/python-automation',
  '/services/ui-ux-design',
  '/services/web-development',
];

// Sub-pages that actually exist under services/[slug]/
const serviceSubPages = ['/features', '/process', '/tech-stack', '/portfolio', '/faq'];

// Blog posts — published in Turkish; slugs are locale-agnostic (API resolves per locale)
const blogPosts = [
  { slug: 'nextjs-cok-dilli-e-ticaret',      date: new Date('2025-01-15') },
  { slug: 'python-web-scraping-otomasyonu',   date: new Date('2025-01-10') },
  { slug: 'react-native-finans-uygulamasi',   date: new Date('2025-01-05') },
  { slug: 'machine-learning-tahmin-sistemleri', date: new Date('2024-12-30') },
  { slug: 'headless-cms-coklu-dil-yonetimi',  date: new Date('2024-12-25') },
  { slug: 'ui-ux-tasarim-prensipleri',        date: new Date('2024-12-20') },
  { slug: 'ci-cd-pipeline-otomasyonu',        date: new Date('2024-12-15') },
  { slug: 'shopify-performance-ipuclari',     date: new Date('2024-12-10') },
];

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

export default function sitemap(): MetadataRoute.Sitemap {
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

  // 3. Service main pages — all locales, localized service segment
  serviceMainPages.forEach(englishPath => {
    allLocales.forEach(locale => {
      entries.push(entry(locale, englishPath, {
        priority: PRIORITY.serviceDetail,
        changeFreq: 'weekly',
        date: DATES.seoRefresh,
      }));
    });
  });

  // 4. Service sub-pages — only confirmed services, all locales, localized segments
  servicesWithSubPages.forEach(servicePath => {
    serviceSubPages.forEach(subPage => {
      const fullPath = `${servicePath}${subPage}`;
      allLocales.forEach(locale => {
        entries.push(entry(locale, fullPath, {
          priority: PRIORITY.other,
          changeFreq: 'monthly',
          date: DATES.seoRefresh,
        }));
      });
    });
  });

  // 5. Blog posts — include under all locales so Google can pick the right one via hreflang
  blogPosts.forEach(({ slug, date }) => {
    const englishPath = `/blog/${slug}`;
    allLocales.forEach(locale => {
      entries.push(entry(locale, englishPath, {
        priority: PRIORITY.blogPost,
        changeFreq: 'yearly',
        date,
      }));
    });
  });

  return entries;
}
