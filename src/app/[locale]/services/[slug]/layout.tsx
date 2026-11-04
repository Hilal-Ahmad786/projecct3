import { ReactNode } from 'react'
import { Locale } from '@/lib/i18n'
import FullTranslations from '../FullTranslations'

// Code-driven pages that only read core namespaces skip the full dictionary.
const CORE_ONLY: Record<string, Locale[]> = { 'ikas-development': ['tr'], 'shopify-development': ['tr'] }

export default async function ServiceSlugLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  if (CORE_ONLY[slug]?.includes(locale)) return children
  return <FullTranslations locale={locale}>{children}</FullTranslations>
}
