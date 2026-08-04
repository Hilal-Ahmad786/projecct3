import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks, getServiceSubPageMeta } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { serviceRobots } from '@/lib/service-quality';
import PortfolioPageClient from './PortfolioPageClient';

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

  const path = `/services/${slug}/portfolio`;
  const localizedPath = localizeFullPath(path, validLocale);

  const { title, description } = getServiceSubPageMeta('portfolio', validLocale, service.name);

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

export default async function ServicePortfolioPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const content = service.content as any || {};
  let portfolio = content.portfolio || [];

  // Content fallback: services without their own portfolio show real featured
  // projects (Project table) instead of an empty "coming soon" state, enriched
  // with description/technologies and linked to the project page.
  if (portfolio.length === 0) {
    const { getFeaturedProjects } = await import('@/lib/database/public-queries');
    const projects = await getFeaturedProjects(locale);
    portfolio = (projects || []).slice(0, 6).map((p: any) => ({
      title: p.name,
      category: p.industry || p.category || '',
      image: p.thumbnail || '',
      description: p.description || undefined,
      technologies: p.technologies?.length ? p.technologies : undefined,
      link: `/${locale}/projects/${p.slug}`,
    }));
  }

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
