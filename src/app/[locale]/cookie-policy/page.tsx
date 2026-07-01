// src/app/[locale]/cookie-policy/page.tsx
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { legalContent } from '@/data/legal';
import LegalPage from '@/components/legal/LegalPage';
import { buildLegalMetadata, resolveLocale } from '@/components/legal/legal-metadata';

export const revalidate = false;

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildLegalMetadata('cookies', '/cookie-policy', locale);
}

export default async function CookiePolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = resolveLocale(locale);
  return <LegalPage document={legalContent.cookies[validLocale]} locale={validLocale} />;
}
