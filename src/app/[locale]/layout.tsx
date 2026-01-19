// src/app/[locale]/layout.tsx
import { ReactNode } from 'react'
import { Locale } from '@/lib/i18n'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingButtons from '@/components/FloatingButtons'
import { GlobalJsonLd } from '@/components/seo/JsonLd'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <>
      <GlobalJsonLd />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  )
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'tr' },
    { locale: 'de' },
    { locale: 'ur' },
    { locale: 'ar' },
  ]
}