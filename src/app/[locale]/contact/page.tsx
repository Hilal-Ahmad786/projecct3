// src/app/[locale]/contact/page.tsx
import { Metadata } from 'next'
import { Locale, locales, defaultLocale } from '@/lib/i18n'
import { createTranslator } from '@/lib/server-i18n'
import { generateAlternateLinks } from '@/lib/seo'
import ContactHero from '@/components/ContactHero'
import ContactInfoSection from '@/components/ContactInfoSection'
import ContactForm from '@/components/ContactForm'
import MapSection from '@/components/MapSection'

const baseUrl = 'https://paksoft.com.tr'

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

  const title = t('contact.hero.title') + ' | PakSoft'
  const description = t('contact.hero.description')

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}/contact`,
      languages: generateAlternateLinks('/contact'),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}/contact`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [{ url: '/images/og-contact.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <ContactHero />
      <ContactInfoSection />
      <ContactForm />
      <MapSection />
    </main>
  )
}