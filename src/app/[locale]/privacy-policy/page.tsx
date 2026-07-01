// src/app/[locale]/privacy-policy/page.tsx
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
  return buildLegalMetadata('privacy', '/privacy-policy', locale);
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = resolveLocale(locale);
  return <LegalPage document={legalContent.privacy[validLocale]} locale={validLocale} />;
}
