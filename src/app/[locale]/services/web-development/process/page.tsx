import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { generateAlternateLinks } from '@/lib/seo';
import { ServiceProcessPage } from '@/components/services/subpages';
import { getWebDevData, SLUG, baseUrl, ogLocaleMap } from '../_shared';

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const path = `/services/${SLUG}/process`;
  const localizedPath = localizeFullPath(path, validLocale);
  const title = 'Our Web Development Process | PakSoft';
  const description = 'From discovery to deployment and beyond — see how we structure every project to deliver on time, within budget, and above expectations.';
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

export default async function WebDevProcessPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getWebDevData(locale);
  if (!data) notFound();

  return <ServiceProcessPage serviceSlug={SLUG} accentColor={data.service.color || 'blue'} />;
}
