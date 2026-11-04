import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks, getServiceSubPageMeta } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { serviceRobots } from '@/lib/service-quality';
import FeaturesPageClient from './FeaturesPageClient';
import CorporateWebsiteSubpage, { getCorporateWebsiteSubpageMeta } from '@/components/services/CorporateWebsiteSubpage';
import EcommerceTurkishPage, { getEcommerceTurkishMeta, getEcommerceTurkishSocialMeta } from '@/components/e-commerce/EcommerceTurkishPage';
import IkasTurkishSubpage, { getIkasTurkishSubpageMeta } from '@/components/ikas/IkasTurkishSubpage';
import ShopifyTurkishFeatures from '@/components/e-commerce/ShopifyTurkishFeatures';

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

  const shopifyTurkishMeta = slug === 'shopify-development' && validLocale === 'tr' ? {
    title: 'Shopify Tema Tasarımı ve Mağaza Özellikleri | PakSoft',
    description: 'Shopify tema tasarımı, tema özelleştirme, ürün sayfası tasarımı ve ödeme, kargo entegrasyonu kapsamını inceleyin. Mağazanıza uygun özellikleri PakSoft ile belirleyin.',
  } : undefined;
  const customMeta = slug === 'corporate-website-design' && (validLocale === 'tr' || validLocale === 'en')
    ? getCorporateWebsiteSubpageMeta('features', validLocale)
    : slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishMeta('features')
    : slug === 'ikas-development' && validLocale === 'tr' ? getIkasTurkishSubpageMeta('features') : null;
  const { title, description } = shopifyTurkishMeta || customMeta || getServiceSubPageMeta('features', validLocale, service.name);
  const canonicalUrl = `${baseUrl}/${validLocale}${localizedPath}`;

  return {
    title,
    description,
    robots: serviceRobots(service),
    ...(shopifyTurkishMeta ? {
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'PakSoft',
        locale: 'tr_TR',
        type: 'website' as const,
        images: [{ url: service.heroImage || '/images/og-services.jpg', width: 1200, height: 630, alt: title }],
      },
      twitter: { card: 'summary_large_image' as const, title, description, images: [service.heroImage || '/images/og-services.jpg'] },
    } : {}),
    ...(slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishSocialMeta('features', canonicalUrl) : {}),
    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateLinks(path),
    },
  };
}

// Enable ISR - revalidate every hour for better performance
export const revalidate = 3600;

// Empty list = build nothing at deploy time, render each slug on its first
// request and cache it as ISR. Without this export Next treats the [slug]
// segment as fully dynamic and ignores `revalidate`: every request (and every
// <Link> prefetch) was a fresh server render with 0% CDN caching.
export function generateStaticParams() {
  return [];
}

export default async function ServiceFeaturesPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  if (slug === 'corporate-website-design' && (locale === 'tr' || locale === 'en')) {
    return <CorporateWebsiteSubpage page="features" locale={locale} />;
  }
  if (slug === 'e-commerce' && locale === 'tr') return <EcommerceTurkishPage page="features" />;
  if (slug === 'ikas-development' && locale === 'tr') return <IkasTurkishSubpage page="features" />;
  if (slug === 'shopify-development' && locale === 'tr') return <ShopifyTurkishFeatures />;

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
