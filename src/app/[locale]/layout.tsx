// src/app/[locale]/layout.tsx
import { ReactNode } from 'react'
import { Locale, locales, defaultLocale, isRTL } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { TranslationsProvider } from '@/hooks/useServerTranslations'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import { GlobalJsonLd } from '@/components/seo/JsonLd'
import PageTransition from '@/components/PageTransition'
import HeatmapTracker from '@/components/HeatmapTracker'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const validLocale = locales.includes(locale) ? locale : defaultLocale
  const translations = getTranslations(validLocale)
  const dir = isRTL(validLocale) ? 'rtl' : 'ltr'

  return (
    <div dir={dir} lang={validLocale}>
      <TranslationsProvider locale={validLocale} translations={translations}>
        <GlobalJsonLd />
        <Navbar />
        <main className="flex-grow">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingButtons />
        <HeatmapTracker />
      </TranslationsProvider>
    </div>
  )
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}