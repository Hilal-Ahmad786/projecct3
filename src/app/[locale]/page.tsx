// src/app/[locale]/page.tsx
import { Metadata } from 'next'
import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { createTranslator } from '@/lib/server-i18n'
import { generateAlternateLinks } from '@/lib/seo'
import Hero from '@/components/Hero'
import SocialProofBanner from '@/components/SocialProofBanner'
import ServicesSection from '@/components/ServicesSection'
import ProjectDetailSection from '@/components/ProjectDetailSection'
import DemoSection from '@/components/DemoSection'
import ClientJourneyRoadmap from '@/components/ClientJourneyRoadmap'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import ContactSection from '@/components/ContactSection'
import { PatternDivider } from '@/components/heritage'

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

  const title = t('metadata.defaultTitle')
  const description = t('metadata.defaultDescription')

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}`,
      languages: generateAlternateLinks(''),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.jpg'],
    },
  }
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProofBanner variant="stats" />
      <PatternDivider className="py-8" />
      <ServicesSection />
      <ProjectDetailSection />
      <DemoSection />
      <PatternDivider className="py-8" color="var(--heritage-saffron)" />
      <ClientJourneyRoadmap />
      <TestimonialsSection />
      <PatternDivider className="py-8" />
      <FAQSection />
      <ContactSection />
    </>
  )
}
