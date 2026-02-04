// src/components/LocalizedLink.tsx
'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useTranslations';
import { localizeFullPath, delocalizePath } from '@/lib/routes';
import { locales } from '@/lib/i18n';
import type { ComponentProps } from 'react';

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

/**
 * Strips locale prefix from path if present
 * e.g., "/tr/services" → "/services", "/en/about" → "/about"
 */
function stripLocalePrefix(path: string): { path: string; hadLocale: boolean } {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as any)) {
    return { path: '/' + segments.slice(1).join('/') || '/', hadLocale: true };
  }
  return { path, hadLocale: false };
}

/**
 * LocalizedLink automatically localizes internal URLs to the current locale.
 *
 * Usage:
 * - Pass English paths without locale prefix: href="/services/web-development/features"
 * - Or with locale prefix: href="/tr/services/web-development" (will be re-localized)
 * - The component adds locale prefix and translates path segments
 *
 * Example for Turkish locale:
 * - href="/services" → renders as "/tr/hizmetler"
 * - href="/services/web-development/features" → renders as "/tr/hizmetler/web-development/ozellikler"
 * - href="/en/services/web-development" → renders as "/tr/hizmetler/web-development"
 *
 * Note: Service slugs (like 'web-development') remain in English - only path segments are translated.
 */
export default function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
  const locale = useLocale();

  // Handle external URLs (http://, https://, mailto:, tel:, etc.)
  if (typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#'))) {
    return <Link href={href} {...props}>{children}</Link>;
  }

  if (typeof href === 'string' && href.startsWith('/')) {
    // Strip any existing locale prefix
    const { path: pathWithoutLocale } = stripLocalePrefix(href);

    // Convert any localized segments to English first (in case path is like /hizmetler/...)
    const englishPath = delocalizePath(pathWithoutLocale, locale);

    // Then localize to current locale
    const localizedPath = `/${locale}${localizeFullPath(englishPath, locale)}`;

    return <Link href={localizedPath} {...props}>{children}</Link>;
  }

  return <Link href={href} {...props}>{children}</Link>;
}

/**
 * Utility hook to get a localized href for use outside of Link components.
 * Useful for programmatic navigation or when you need the URL string.
 */
export function useLocalizedHref(href: string): string {
  const locale = useLocale();

  // Handle external URLs
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
    return href;
  }

  if (href.startsWith('/')) {
    // Strip any existing locale prefix
    const { path: pathWithoutLocale } = stripLocalePrefix(href);

    // Convert any localized segments to English first
    const englishPath = delocalizePath(pathWithoutLocale, locale);

    // Then localize to current locale
    return `/${locale}${localizeFullPath(englishPath, locale)}`;
  }

  return href;
}
