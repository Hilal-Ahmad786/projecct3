// Canonical technologies page — the service sub-nav links here.
// Reuses the TechStackPageClient; /tech-stack redirects to this URL.

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import TechStackPageClient from '../tech-stack/TechStackPageClient';

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

  const path = `/services/${slug}/technologies`;
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    title: `${service.name} Technologies & Tools | PakSoft`,
    description: `Discover the cutting-edge technologies and tools we use for ${service.name}. Modern, scalable, and battle-tested solutions.`,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
  };
}

export const revalidate = 3600;

export default async function ServiceTechnologiesPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const content = (service.content as Record<string, unknown>) || {};
  const technologies = ((content.technologies as { name: string; icon?: string }[]) || [])
    .map(t => ({ name: t.name, icon: t.icon || '' }));
  const animation = content.animation;

  return (
    <TechStackPageClient
      serviceName={service.name}
      serviceSlug={slug}
      serviceColor={service.color}
      technologies={technologies}
      animation={animation as Parameters<typeof TechStackPageClient>[0]['animation']}
      locale={locale}
    />
  );
}
