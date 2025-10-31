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
    ur: '/services',
    ar: '/alkhadamat',
  },
  '/projects': {
    en: '/projects',
    tr: '/projeler',
    de: '/projekte',
    ur: '/projects',
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