// src/app/[locale]/layout.tsx
import { ReactNode } from 'react'
import { Locale, locales, defaultLocale, isRTL } from '@/lib/i18n'
import { getCoreTranslations } from '@/lib/server-i18n'
import { TranslationsProvider } from '@/hooks/useServerTranslations'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import { GlobalJsonLd } from '@/components/seo/JsonLd'
import PageTransition from '@/components/PageTransition'
import HeatmapTracker from '@/components/HeatmapTracker'
import MotionProvider from '@/components/MotionProvider'
import CookieConsent from '@/components/CookieConsent'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const validLocale = locales.includes(locale) ? locale : defaultLocale
  // Core dict only (excludes the heavy service-only namespaces) — keeps the
  // per-page client payload small. /services/* routes layer in the full dict.
  const translations = getCoreTranslations(validLocale)
  const dir = isRTL(validLocale) ? 'rtl' : 'ltr'

  return (
    <div dir={dir} lang={validLocale}>
      <TranslationsProvider locale={validLocale} translations={translations}>
        {/* MotionConfig(reducedMotion="user") makes all framer-motion
            animations in the app respect prefers-reduced-motion. */}
        <MotionProvider>
          <GlobalJsonLd />
          <Navbar />
          <main className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingButtons />
          <HeatmapTracker />
          <CookieConsent />
        </MotionProvider>
      </TranslationsProvider>
    </div>
  )
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}