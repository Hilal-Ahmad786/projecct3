// src/app/[locale]/about/page.tsx
import { Metadata } from 'next'
import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { createTranslator } from '@/lib/server-i18n'
import { generateAlternateLinks } from '@/lib/seo'
import { localizeFullPath } from '@/lib/routes'
import AboutHero from '@/components/AboutHero'
import OurStoryTimeline from '@/components/OurStoryTimeline'
import VisionMissionSection from '@/components/VisionMissionSection'
import TeamSection from '@/components/TeamSection'
import TechApproachSection from '@/components/TechApproachSection'
import CtaBanner from '@/components/CtaBanner'

const baseUrl = 'https://www.paksoft.com.tr'

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

  const title = t('about.hero.title') + ' ' + t('about.hero.titleAccent') + ' | PakSoft'
  const description = t('about.hero.description')

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizeFullPath('/about', validLocale)}`,
      languages: generateAlternateLinks('/about'),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}${localizeFullPath('/about', validLocale)}`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [{ url: '/images/og-about.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <VisionMissionSection />
      <TechApproachSection />
      <TeamSection />
      <OurStoryTimeline />
      <CtaBanner />
    </>
  )
}
