// src/app/[locale]/services/page.tsx
import { Metadata } from 'next'
import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { createTranslator } from '@/lib/server-i18n'
import { generateAlternateLinks } from '@/lib/seo'
import { localizeFullPath } from '@/lib/routes'
import ServicesHero from '@/components/ServicesHero'
import ServicesSection from '@/components/ServicesSection'
import PricingSection from '@/components/PricingSection'
import WhyUsSection from '@/components/WhyUsSection'
import ServicesWhyUs from '@/components/ServicesWhyUs'
import TestimonialsSection from '@/components/TestimonialsSection'
import CtaBanner from '@/components/CtaBanner'

import { SITE_URL as baseUrl } from '@/config/site';

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  ur: 'ur_PK',
  ar: 'ar_SA',
}

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const validLocale = locales.includes(locale) ? locale : defaultLocale
  const t = createTranslator(validLocale)

  const title = t('services.hero.title') + ' | PakSoft'
  const description = t('services.hero.description')

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizeFullPath('/services', validLocale)}`,
      languages: generateAlternateLinks('/services'),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}${localizeFullPath('/services', validLocale)}`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [{ url: '/images/og-services.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesSection />
      <ServicesWhyUs />
      <PricingSection />
      <WhyUsSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  )
}