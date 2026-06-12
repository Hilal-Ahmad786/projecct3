import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { generateAlternateLinks } from '@/lib/seo';
import { ServiceFeaturesPage } from '@/components/services/subpages';
import { getWebDevData, SLUG, baseUrl, ogLocaleMap } from '../_shared';

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const path = `/services/${SLUG}/features`;
  const localizedPath = localizeFullPath(path, validLocale);
  const title = 'Web Development Features & Capabilities | PakSoft';
  const description = 'Explore the full range of web development capabilities we offer — from custom architectures to PWAs, SaaS platforms, and e-commerce solutions.';
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
    openGraph: { title, description, url: `${baseUrl}/${validLocale}${localizedPath}`, siteName: 'PakSoft', locale: ogLocaleMap[validLocale], type: 'website' },
  };
}

export default async function WebDevFeaturesPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getWebDevData(locale);
  if (!data) notFound();

  return <ServiceFeaturesPage serviceSlug={SLUG} accentColor={data.service.color || 'blue'} />;
}
