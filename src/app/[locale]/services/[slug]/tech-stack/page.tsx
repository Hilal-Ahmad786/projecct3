import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import TechStackPageClient from './TechStackPageClient';

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

  const path = `/services/${slug}/tech-stack`;
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    title: `${service.name} Tech Stack & Technologies | PakSoft`,
    description: `Discover the cutting-edge technologies and tools we use for ${service.name}. Modern, scalable, and battle-tested solutions.`,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
  };
}

// Enable ISR - revalidate every hour for better performance
export const revalidate = 3600;

export default async function ServiceTechStackPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const content = service.content as any || {};
  const technologies = content.technologies || [];
  const animation = content.animation;

  return (
    <TechStackPageClient
      serviceName={service.name}
      serviceSlug={slug}
      serviceColor={service.color}
      technologies={technologies}
      animation={animation}
      locale={locale}
    />
  );
}
