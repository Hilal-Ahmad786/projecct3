import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks, getServiceSubPageMeta } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { serviceRobots } from '@/lib/service-quality';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import FAQPageClient from './FAQPageClient';
import CorporateWebsiteSubpage, { getCorporateWebsiteSubpageMeta } from '@/components/services/CorporateWebsiteSubpage';
import EcommerceTurkishPage, { getEcommerceTurkishMeta, getEcommerceTurkishSocialMeta, getEcommerceTurkishFaqItems } from '@/components/e-commerce/EcommerceTurkishPage';

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

  const path = `/services/${slug}/faq`;
  const localizedPath = localizeFullPath(path, validLocale);

  const customMeta = slug === 'corporate-website-design' && (validLocale === 'tr' || validLocale === 'en')
    ? getCorporateWebsiteSubpageMeta('faq', validLocale)
    : slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishMeta('faq') : null;
  const { title, description } = customMeta || getServiceSubPageMeta('faq', validLocale, service.name);
  const isTurkishCorporateFaq = slug === 'corporate-website-design' && validLocale === 'tr';
  const canonicalUrl = `${baseUrl}/${validLocale}${localizedPath}`;

  return {
    title,
    description,
    robots: serviceRobots(service),
    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateLinks(path),
    },
    ...(slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishSocialMeta('faq', canonicalUrl) : isTurkishCorporateFaq ? {
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'PakSoft',
        locale: 'tr_TR',
        type: 'website' as const,
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image' as const,
        title,
        description,
        images: ['/images/twitter-image.jpg'],
      },
    } : {}),
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

  if (slug === 'corporate-website-design' && (locale === 'tr' || locale === 'en')) {
    return <CorporateWebsiteSubpage page="faq" locale={locale} />;
  }
  if (slug === 'e-commerce' && locale === 'tr') return <><FAQJsonLd faqs={getEcommerceTurkishFaqItems()} /><EcommerceTurkishPage page="faq" /></>;

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
