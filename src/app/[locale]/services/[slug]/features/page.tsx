import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import FeaturesPageClient from './FeaturesPageClient';

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

  const path = `/services/${slug}/features`;
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    title: `${service.name} Features & Capabilities | PakSoft`,
    description: `Explore the key features and capabilities of our ${service.name} service. Discover what makes our solutions stand out.`,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
  };
}

// Enable ISR - revalidate every hour for better performance
export const revalidate = 3600;

export default async function ServiceFeaturesPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const features = service.features || [];
  const animation = (service.content as any)?.animation;

  return (
    <FeaturesPageClient
      serviceName={service.name}
      serviceSlug={slug}
      serviceColor={service.color}
      features={features}
      featureStyle={animation?.featureStyle}
      animation={animation}
      locale={locale}
    />
  );
}
