// src/lib/routes.ts
import { Locale } from './i18n';

type RouteTranslations = {
  [key: string]: {
    [locale in Locale]: string;
  };
};

export const routes: RouteTranslations = {
  '/': {
    en: '/',
    tr: '/',
    de: '/',
    ur: '/',
    ar: '/',
  },
  '/about': {
    en: '/about',
    tr: '/hakkimizda',
    de: '/uber-uns',
    ur: '/hamare-bare-mein',
    ar: '/men-nahnu',
  },
  '/services': {
    en: '/services',
    tr: '/hizmetler',
    de: '/dienstleistungen',
    ur: '/khidmaat',
    ar: '/alkhadamat',
  },
  '/projects': {
    en: '/projects',
    tr: '/projeler',
    de: '/projekte',
    ur: '/mansoobay',
    ar: '/almasharie',
  },
  '/blog': {
    en: '/blog',
    tr: '/blog',
    de: '/blog',
    ur: '/blog',
    ar: '/blog',
  },
  '/contact': {
    en: '/contact',
    tr: '/iletisim',
    de: '/kontakt',
    ur: '/raabta',
    ar: '/ittisal',
  },
};

// Path segments that get translated (service slugs like 'web-development' stay in English)
export const pathSegments: Record<string, Record<Locale, string>> = {
  'services': { en: 'services', tr: 'hizmetler', de: 'dienstleistungen', ur: 'khidmaat', ar: 'alkhadamat' },
  'projects': { en: 'projects', tr: 'projeler', de: 'projekte', ur: 'mansoobay', ar: 'almasharie' },
  'about': { en: 'about', tr: 'hakkimizda', de: 'uber-uns', ur: 'hamare-bare-mein', ar: 'men-nahnu' },
  'contact': { en: 'contact', tr: 'iletisim', de: 'kontakt', ur: 'raabta', ar: 'ittisal' },
  'blog': { en: 'blog', tr: 'blog', de: 'blog', ur: 'blog', ar: 'blog' },
  'pricing': { en: 'pricing', tr: 'fiyatlandirma', de: 'preise', ur: 'qeemat', ar: 'tasiir' },
  'features': { en: 'features', tr: 'ozellikler', de: 'funktionen', ur: 'khasusiyat', ar: 'almiizat' },
  'process': { en: 'process', tr: 'surec', de: 'prozess', ur: 'tariqa', ar: 'alamaliat' },
  'tech-stack': { en: 'tech-stack', tr: 'teknoloji', de: 'technologie', ur: 'technology', ar: 'altiqniat' },
  // 'technologies' is the canonical tech segment (tech-stack redirects here).
  // Listed after 'tech-stack' so the reverse lookup resolves the shared
  // localized segment (e.g. 'altiqniat') to 'technologies'.
  'technologies': { en: 'technologies', tr: 'teknoloji', de: 'technologie', ur: 'technology', ar: 'altiqniat' },
  'portfolio': { en: 'portfolio', tr: 'portfoy', de: 'portfolio', ur: 'portfolio', ar: 'almalaf' },
  'faq': { en: 'faq', tr: 'sss', de: 'faq', ur: 'sawalat', ar: 'asila' },
};

// Build reverse lookup maps for each locale (localized segment -> english segment)
const reverseLookupMaps: Record<Locale, Record<string, string>> = {
  en: {},
  tr: {},
  de: {},
  ur: {},
  ar: {},
};

// Initialize reverse lookup maps
Object.entries(pathSegments).forEach(([englishSegment, translations]) => {
  Object.entries(translations).forEach(([locale, localizedSegment]) => {
    reverseLookupMaps[locale as Locale][localizedSegment] = englishSegment;
  });
});

// Get localized path
export function getLocalizedPath(path: string, locale: Locale): string {
  const route = routes[path];
  return route ? route[locale] : path;
}

// Get English path from localized path
export function getEnglishPath(localizedPath: string, locale: Locale): string {
  for (const [englishPath, translations] of Object.entries(routes)) {
    if (translations[locale] === localizedPath) {
      return englishPath;
    }
  }
  return localizedPath;
}

/**
 * Translate full path: English → Localized
 * Example: localizeFullPath('/services/web-development/features', 'tr')
 *          → '/hizmetler/web-development/ozellikler'
 *
 * Service slugs (like 'web-development') remain in English - only path segments get translated.
 */
export function localizeFullPath(englishPath: string, locale: Locale): string {
  if (!englishPath || englishPath === '/') return englishPath;

  // Split path into segments, filter empty strings
  const segments = englishPath.split('/').filter(Boolean);

  // Translate each segment if it has a translation, otherwise keep as-is
  const localizedSegments = segments.map(segment => {
    const translations = pathSegments[segment];
    return translations ? translations[locale] : segment;
  });

  return '/' + localizedSegments.join('/');
}

/**
 * Translate full path: Localized → English (for middleware rewriting)
 * Example: delocalizePath('/hizmetler/web-development/ozellikler', 'tr')
 *          → '/services/web-development/features'
 */
export function delocalizePath(localizedPath: string, locale: Locale): string {
  if (!localizedPath || localizedPath === '/') return localizedPath;

  // Split path into segments, filter empty strings
  const segments = localizedPath.split('/').filter(Boolean);
  const reverseLookup = reverseLookupMaps[locale];

  // Translate each segment back to English if it exists in reverse lookup
  const englishSegments = segments.map(segment => {
    return reverseLookup[segment] || segment;
  });

  return '/' + englishSegments.join('/');
}