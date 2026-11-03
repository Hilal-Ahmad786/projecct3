// Re-provides the FULL dictionary (incl. the service-only namespaces stripped
// from the global core payload) for service routes whose components need it.
import { ReactNode } from 'react'
import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { TranslationsProvider } from '@/hooks/useServerTranslations'

export default function FullTranslations({ locale, children }: { locale: Locale; children: ReactNode }) {
  const validLocale = locales.includes(locale) ? locale : defaultLocale
  return <TranslationsProvider locale={validLocale} translations={getTranslations(validLocale)}>{children}</TranslationsProvider>
}
