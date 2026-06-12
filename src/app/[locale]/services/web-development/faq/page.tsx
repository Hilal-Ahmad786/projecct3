import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { generateAlternateLinks } from '@/lib/seo';
import { ServiceFAQPage } from '@/components/services/subpages';
import { getWebDevData, SLUG, baseUrl, ogLocaleMap } from '../_shared';

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const path = `/services/${SLUG}/faq`;
  const localizedPath = localizeFullPath(path, validLocale);
  const title = 'Web Development FAQ | PakSoft';
  const description = 'Answers to the most common questions about web development timelines, technologies, maintenance, support, and how we work.';
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

export default async function WebDevFaqPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getWebDevData(locale);
  if (!data) notFound();

  return <ServiceFAQPage serviceSlug={SLUG} accentColor={data.service.color || 'blue'} />;
}
