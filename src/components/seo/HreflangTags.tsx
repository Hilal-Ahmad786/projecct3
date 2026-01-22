// src/components/seo/HreflangTags.tsx
// Reusable hreflang link tags component for multilingual SEO

import { locales, defaultLocale, Locale } from '@/lib/i18n';

const baseUrl = 'https://paksoft.com.tr';

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
