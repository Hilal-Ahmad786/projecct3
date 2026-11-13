// Adds the service-only namespaces (stripped from the global core payload in
// [locale]/layout.tsx) on service routes. TranslationsProvider layers these over
// the parent (core) dictionary, so only the extra namespaces are serialized here.
// `serviceSubpages` is keyed by service slug (~15KB each, ~240KB in total), so
// when the route's slug is known only that service's entry is sent.
import { ReactNode } from 'react'
import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { TranslationsProvider } from '@/hooks/useServerTranslations'

export default function FullTranslations({ locale, slug, children }: { locale: Locale; slug?: string; children: ReactNode }) {
  const validLocale = locales.includes(locale) ? locale : defaultLocale
  const full = getTranslations(validLocale) as Record<string, any>
  const allSubpages: Record<string, unknown> = full.serviceSubpages ?? {}
  const serviceSubpages = slug === undefined ? allSubpages : slug in allSubpages ? { [slug]: allSubpages[slug] } : {}
  const extra = { servicePages: full.servicePages, serviceSubpages, services: { detail: full.services?.detail } }
  return <TranslationsProvider locale={validLocale} translations={extra}>{children}</TranslationsProvider>
}
