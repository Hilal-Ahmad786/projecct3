// Server component: adds `services.list` (~60KB: names/descriptions of all 272
// services) for ServicesSection only. It is kept out of the global dictionary
// that every page ships (see getCoreTranslations).
import { ReactNode } from 'react'
import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { TranslationsProvider } from '@/hooks/useServerTranslations'

export default function ServicesListTranslations({ locale, children }: { locale: Locale; children: ReactNode }) {
  const validLocale = locales.includes(locale) ? locale : defaultLocale
  const full = getTranslations(validLocale) as Record<string, any>
  return (
    <TranslationsProvider locale={validLocale} translations={{ services: { list: full.services?.list ?? {} } }}>
      {children}
    </TranslationsProvider>
  )
}
