/**
 * ⚠️ UNUSED — nothing imports this, and it should stay that way.
 *
 * It builds alternate URLs as `${baseUrl}/${locale}${path}` with the SAME path
 * for every locale. That is wrong for this site: Turkish, German, Arabic and
 * Urdu use translated slugs (/tr/hakkimizda, /de/uber-uns), so this would emit
 * hreflang pointing at URLs that 404.
 *
 * The correct builders are `generateAlternateLinks` in @/lib/seo (page metadata)
 * and `buildAlternates` in app/sitemap.ts — both run paths through
 * `localizeFullPath` first. Use those. Delete this file when convenient.
 */
// src/components/seo/HreflangTags.tsx
// Reusable hreflang link tags component for multilingual SEO

import { locales, defaultLocale, Locale } from '@/lib/i18n';

import { SITE_URL as baseUrl } from '@/config/site';

interface HreflangTagsProps {
  path: string; // Path without locale, e.g., '/about' or ''
  currentLocale: Locale;
}

export default function HreflangTags({ path, currentLocale }: HreflangTagsProps) {
  return (
    <>
      {/* hreflang tags for each locale */}
      {locales.map(locale => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${baseUrl}/${locale}${path}`}
        />
      ))}
      {/* x-default for unspecified languages */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/${defaultLocale}${path}`}
      />
      {/* Canonical for current page */}
      <link
        rel="canonical"
        href={`${baseUrl}/${currentLocale}${path}`}
      />
    </>
  );
}

// Helper function to generate hreflang meta tags as an object for Next.js metadata
export function getHreflangMetadata(path: string) {
  const languages: Record<string, string> = {};

  locales.forEach(locale => {
    languages[locale] = `${baseUrl}/${locale}${path}`;
  });

  languages['x-default'] = `${baseUrl}/${defaultLocale}${path}`;

  return languages;
}
