// Service routes need the heavy `serviceSubpages` / `servicePages` namespaces
// that the global layout strips out of the core payload. We re-provide the FULL
// dictionary here so only /services/* pages pay for it (not home/blog/etc.).
// This nested TranslationsProvider overrides the core one for this subtree.
import { ReactNode } from 'react'
import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { TranslationsProvider } from '@/hooks/useServerTranslations'

interface ServicesLayoutProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function ServicesLayout({ children, params }: ServicesLayoutProps) {
  const { locale } = await params
  const validLocale = locales.includes(locale) ? locale : defaultLocale
  const translations = getTranslations(validLocale)

  return (
    <TranslationsProvider locale={validLocale} translations={translations}>
      {children}
    </TranslationsProvider>
  )
}
