import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks, getServiceSubPageMeta } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { serviceRobots } from '@/lib/service-quality';
import ServiceDetailClient from '../ServiceDetailClient';
import PricingPageClient from './PricingPageClient';
import { getServiceData, baseUrl } from '../_shared';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const data = await getServiceData(slug, validLocale);
  if (!data) return { title: 'Service Not Found | PakSoft' };

  const path = `/services/${slug}/pricing`;
  const localizedPath = localizeFullPath(path, validLocale);
  const { title, description } = getServiceSubPageMeta('pricing', validLocale, data.service.name);

  return {
    title,
    description,
    robots: serviceRobots(data.service),
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
  };
}

export default async function ServicePricingPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const data = await getServiceData(slug, validLocale);
  if (!data) notFound();

  const hasPackages = (data.service.pricingPackages?.length ?? 0) > 0;

  return (
    <main className="min-h-screen bg-white">
      <PricingPageClient
        serviceName={data.service.name}
        serviceSlug={slug}
        serviceColor={data.service.color}
        hasPackages={hasPackages}
      />
      {/* 'pricing' also covers the "starting from" panel for quote-first services */}
      <ServiceDetailClient
        service={data.service}
        hideHero
        showSections={['pricing', 'faq', 'cta']}
      />
    </main>
  );
}
