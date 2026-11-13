import { ReactNode } from 'react'
import { Locale } from '@/lib/i18n'
import FullTranslations from '../FullTranslations'

export default async function WebDevelopmentLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return <FullTranslations locale={locale} slug="web-development">{children}</FullTranslations>
}
