import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import FAQPageClient from './FAQPageClient';

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

  return {
    title: `${service.name} FAQ - Frequently Asked Questions | PakSoft`,
    description: `Find answers to frequently asked questions about our ${service.name} service. Get the information you need.`,
  };
}

// Enable ISR - revalidate every hour for better performance
export const revalidate = 3600;

export default async function ServiceFAQPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const content = service.content as any || {};
  const faq = content.faq || [];

  return (
    <FAQPageClient
      serviceName={service.name}
      serviceSlug={slug}
      serviceColor={service.color}
      faq={faq}
      locale={locale}
    />
  );
}
