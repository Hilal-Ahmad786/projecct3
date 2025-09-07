// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { I18nProvider } from '@/hooks/useTranslations'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Locale, defaultLocale } from '@/lib/i18n'

export const metadata = {
  title: 'PakTechnology – Modern Digital Solutions',
  description: 'Enterprise web development, e-commerce, automation bots and digital marketing solutions',
}

interface RootLayoutProps {
  children: ReactNode
  params?: {
    locale?: Locale
  }
}

export default function RootLayout({ 
  children, 
  params 
}: RootLayoutProps) {
  const locale = params?.locale || defaultLocale

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <I18nProvider initialLocale={locale}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}