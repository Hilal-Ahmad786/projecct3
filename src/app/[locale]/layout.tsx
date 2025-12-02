// src/app/[locale]/layout.tsx
import { ReactNode } from 'react'
import { Locale } from '@/lib/i18n'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  return children
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