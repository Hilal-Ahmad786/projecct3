// src/components/legal/legal-metadata.ts
// Shared generateMetadata helper for the legal pages
// (privacy-policy, terms-of-service, cookie-policy).

import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { SITE_URL } from '@/config/site';
import { LegalDocKey, legalContent } from '@/data/legal';

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  ur: 'ur_PK',
  ar: 'ar_SA',
};

export function resolveLocale(locale: Locale): Locale {
  return locales.includes(locale) ? locale : defaultLocale;
}

/**
 * Build metadata for a legal page. `path` is the unlocalized route segment,
 * e.g. '/privacy-policy' — legal routes use the same slug in every locale.
 */
export function buildLegalMetadata(
  docKey: LegalDocKey,
  path: string,
  locale: Locale
): Metadata {
  const validLocale = resolveLocale(locale);
  const doc = legalContent[docKey][validLocale];

  const title = `${doc.title} | PakSoft`;
  const description =
    doc.intro.length > 157 ? `${doc.intro.slice(0, 157).trimEnd()}...` : doc.intro;
  const url = `${SITE_URL}/${validLocale}${path}`;

  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${SITE_URL}/${l}${path}`;
  });
  languages['x-default'] = `${SITE_URL}/${defaultLocale}${path}`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales
        .filter((l) => l !== validLocale)
        .map((l) => ogLocaleMap[l]),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
