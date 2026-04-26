import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import PortfolioPageClient from './PortfolioPageClient';

const baseUrl = 'https://www.paksoft.com.tr';

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

  const path = `/services/${slug}/portfolio`;
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    title: `${service.name} Portfolio & Case Studies | PakSoft`,
    description: `Explore our ${service.name} portfolio. See successful projects and case studies that showcase our expertise.`,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
  };
}

// Enable ISR - revalidate every hour for better performance
export const revalidate = 3600;

export default async function ServicePortfolioPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const content = service.content as any || {};
  const portfolio = content.portfolio || [];

  return (
    <PortfolioPageClient
      serviceName={service.name}
      serviceSlug={slug}
      serviceColor={service.color}
      portfolio={portfolio}
      locale={locale}
    />
  );
}
