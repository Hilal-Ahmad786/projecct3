import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { generateAlternateLinks } from '@/lib/seo';
import { ServiceTechStackPage } from '@/components/services/subpages';
import { getWebDevData, SLUG, baseUrl, ogLocaleMap } from '../_shared';

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const path = `/services/${SLUG}/technologies`;
  const localizedPath = localizeFullPath(path, validLocale);
  const title = 'Web Development Tech Stack — Next.js, React, TypeScript | PakSoft';
  const description = 'We use battle-tested modern technologies: Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, and more to deliver high-performance web solutions.';
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

export default async function WebDevTechnologiesPage({ params }: PageProps) {
  const { locale } = await params;
  const data = await getWebDevData(locale);
  if (!data) notFound();

  return <ServiceTechStackPage serviceSlug={SLUG} accentColor={data.service.color || 'blue'} />;
}
