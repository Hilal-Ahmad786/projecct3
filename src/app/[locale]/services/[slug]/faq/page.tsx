import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import FAQPageClient from './FAQPageClient';

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

  const path = `/services/${slug}/faq`;
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    title: `${service.name} FAQ - Frequently Asked Questions | PakSoft`,
    description: `Find answers to frequently asked questions about our ${service.name} service. Get the information you need.`,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
  };
}

// Enable ISR - revalidate every hour for better performance
export const revalidate = 3600;

export default async function ServiceFAQPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  const content = service.content as any || {};
  const faq = content.faq || [];
  const faqItems = (Array.isArray(faq) ? faq : []).filter(
    (f: any) => f && typeof f.question === 'string' && typeof f.answer === 'string'
  );

  const url = (p: string) => `${baseUrl}/${validLocale}${localizeFullPath(p, validLocale)}`;
  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/${validLocale}` },
    { name: 'Services', url: url('/services') },
    { name: service.name, url: url(`/services/${slug}`) },
    { name: 'FAQ', url: url(`/services/${slug}/faq`) },
  ];

  return (
    <>
      {faqItems.length > 0 && <FAQJsonLd faqs={faqItems} />}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FAQPageClient
        serviceName={service.name}
        serviceSlug={slug}
        serviceColor={service.color}
        faq={faq}
        locale={locale}
      />
    </>
  );
}
