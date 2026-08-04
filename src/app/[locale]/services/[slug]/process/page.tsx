import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks, getServiceSubPageMeta } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { serviceRobots } from '@/lib/service-quality';
import ProcessPageClient from './ProcessPageClient';

import { SITE_URL as baseUrl } from '@/config/site';

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

async function getService(slug: string, locale: string) {
  const { getPublishedServiceBySlug } = await import('@/lib/database/public-queries');
  return getPublishedServiceBySlug(slug, locale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const service = await getService(slug, validLocale);

  if (!service) {
    return { title: 'Service Not Found | PakSoft' };
  }

  const path = `/services/${slug}/process`;
  const localizedPath = localizeFullPath(path, validLocale);

  const { title, description } = getServiceSubPageMeta('process', validLocale, service.name);

  return {
    title,
    description,
    robots: serviceRobots(service),
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
  };
}

// Enable ISR - revalidate every hour for better performance
export const revalidate = 3600;

export default async function ServiceProcessPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const content = service.content as any || {};
  const process = content.process || [];
  const animation = content.animation;

  return (
    <ProcessPageClient
      serviceName={service.name}
      serviceSlug={slug}
      serviceColor={service.color}
      steps={process}
      processLayout={animation?.processLayout}
      animation={animation}
      locale={locale}
    />
  );
}
