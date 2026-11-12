import { MetaAdsTurkishPage, getMetaAdsMeta, getMetaAdsSocialMeta } from '@/components/services/MetaAdsTurkishPage';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks, getServiceSubPageMeta } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { serviceRobots } from '@/lib/service-quality';
import ProcessPageClient from './ProcessPageClient';
import CorporateWebsiteSubpage, { getCorporateWebsiteSubpageMeta } from '@/components/services/CorporateWebsiteSubpage';
import EcommerceTurkishPage, { getEcommerceTurkishMeta, getEcommerceTurkishSocialMeta } from '@/components/e-commerce/EcommerceTurkishPage';
import IkasTurkishSubpage, { getIkasTurkishSubpageMeta } from '@/components/ikas/IkasTurkishSubpage';
import ShopifyTurkishProcess from '@/components/e-commerce/ShopifyTurkishProcess';
import CustomEcommerceTurkishPage, { getCustomEcommerceMeta } from '@/components/e-commerce/CustomEcommerceTurkishPage';
import MarketplaceTurkishPage, { getMarketplaceMeta } from '@/components/e-commerce/MarketplaceTurkishPage';
import TechnicalSeoTurkishPage, { getTechnicalSeoMeta, getTechnicalSeoSocialMeta } from '@/components/services/TechnicalSeoTurkishPage';
import SeoTurkishPage, { getSeoTurkishMeta, getSeoTurkishSocialMeta } from '@/components/services/SeoTurkishPage';
import EcommerceSeoTurkishPage, { getEcommerceSeoTurkishMeta, getEcommerceSeoTurkishSocialMeta } from '@/components/services/EcommerceSeoTurkishPage';
import { GoogleAdsTurkishPage, getGoogleAdsMeta, getGoogleAdsSocialMeta } from '@/components/services/GoogleAdsTurkishPage';
import { GoogleSearchAdsTurkishPage, getGoogleSearchAdsMeta, getGoogleSearchAdsSocialMeta } from '@/components/services/GoogleSearchAdsTurkishPage';
import { GoogleShoppingTurkishPage, getGoogleShoppingMeta, getGoogleShoppingSocialMeta } from '@/components/services/GoogleShoppingTurkishPage';
import { PerformanceMaxTurkishPage, getPerformanceMaxMeta, getPerformanceMaxSocialMeta } from '@/components/services/PerformanceMaxTurkishPage';

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

  const path = `/services/${slug}/process`;
  const localizedPath = localizeFullPath(path, validLocale);

  const customMeta = slug === 'meta-ads' && validLocale === 'tr' ? getMetaAdsMeta('process') : slug === 'performance-max' && validLocale === 'tr' ? getPerformanceMaxMeta('process') : slug === 'google-shopping' && validLocale === 'tr' ? getGoogleShoppingMeta('process') : slug === 'google-search-ads' && validLocale === 'tr' ? getGoogleSearchAdsMeta('process') : slug === 'google-ads' && validLocale === 'tr' ? getGoogleAdsMeta('process') : slug === 'technical-seo' && validLocale === 'tr' ? getTechnicalSeoMeta('process') : slug === 'ecommerce-seo' && validLocale === 'tr' ? getEcommerceSeoTurkishMeta('process') : slug === 'seo' && validLocale === 'tr' ? getSeoTurkishMeta('process') : slug === 'marketplace-development' && validLocale === 'tr' ? getMarketplaceMeta('process') : slug === 'custom-ecommerce' && validLocale === 'tr' ? getCustomEcommerceMeta('process')
    : slug === 'corporate-website-design' && (validLocale === 'tr' || validLocale === 'en')
    ? getCorporateWebsiteSubpageMeta('process', validLocale)
    : slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishMeta('process')
    : slug === 'ikas-development' && validLocale === 'tr' ? getIkasTurkishSubpageMeta('process')
    : slug === 'shopify-development' && validLocale === 'tr' ? {
      title: 'Shopify Kurulum ve Mağaza Taşıma Süreci | PakSoft',
      description: 'Shopify kurulum ve mağaza taşıma sürecini inceleyin. Veri hazırlığı, WooCommerce geçişi, URL eşleştirme, test ve yayın adımlarını PakSoft ile planlayın.',
    } : null;
  const { title, description } = customMeta || getServiceSubPageMeta('process', validLocale, service.name);
  const canonicalUrl = `${baseUrl}/${validLocale}${localizedPath}`;

  return {
    title,
    description,
    robots: (slug === 'google-search-ads' || slug === 'google-shopping' || slug === 'performance-max') && validLocale === 'tr' ? { index: true, follow: true } : serviceRobots(service),
    ...(slug === 'ecommerce-seo' && validLocale === 'tr' ? getEcommerceSeoTurkishSocialMeta('process', canonicalUrl) : {}),
    ...(slug === 'seo' && validLocale === 'tr' ? getSeoTurkishSocialMeta('process', canonicalUrl) : {}),
    ...(slug === 'technical-seo' && validLocale === 'tr' ? getTechnicalSeoSocialMeta('process', canonicalUrl) : {}),
    ...(slug === 'performance-max' && validLocale === 'tr' ? getPerformanceMaxSocialMeta('process', canonicalUrl) : {}),
    ...(slug === 'meta-ads' && validLocale === 'tr' ? getMetaAdsSocialMeta('process', canonicalUrl) : {}),
    ...(slug === 'google-shopping' && validLocale === 'tr' ? getGoogleShoppingSocialMeta('process', canonicalUrl) : {}),
    ...(slug === 'google-search-ads' && validLocale === 'tr' ? getGoogleSearchAdsSocialMeta('process', canonicalUrl) : {}),
    ...(slug === 'google-ads' && validLocale === 'tr' ? getGoogleAdsSocialMeta('process', canonicalUrl) : {}),
    ...(slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishSocialMeta('process', canonicalUrl) : slug === 'shopify-development' && validLocale === 'tr' ? {
      openGraph: { type: 'website' as const, locale: 'tr_TR', url: canonicalUrl, title, description, images: ['/images/og-image.jpg'] },
      twitter: { card: 'summary_large_image' as const, title, description, images: ['/images/twitter-image.jpg'] },
    } : {}),
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

export default async function ServiceProcessPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  if (slug === 'ecommerce-seo' && locale === 'tr') return <EcommerceSeoTurkishPage page="process" />;

  if (slug === 'performance-max' && locale === 'tr') return <PerformanceMaxTurkishPage page="process" />;
  if (slug === 'meta-ads' && locale === 'tr') return <MetaAdsTurkishPage page="process" />;
  if (slug === 'google-shopping' && locale === 'tr') return <GoogleShoppingTurkishPage page="process" />;
  if (slug === 'google-search-ads' && locale === 'tr') return <GoogleSearchAdsTurkishPage page="process" />;

  if (slug === 'google-ads' && locale === 'tr') return <GoogleAdsTurkishPage page="process" />;

  if (slug === 'technical-seo' && locale === 'tr') return <TechnicalSeoTurkishPage page="process" />;

  if (slug === 'seo' && locale === 'tr') return <SeoTurkishPage page="process" />;

  if (slug === 'marketplace-development' && locale === 'tr') return <MarketplaceTurkishPage page="process" />;

  if (slug === 'corporate-website-design' && (locale === 'tr' || locale === 'en')) {
    return <CorporateWebsiteSubpage page="process" locale={locale} />;
  }
  if (slug === 'custom-ecommerce' && locale === 'tr') return <CustomEcommerceTurkishPage page="process" />;
  if (slug === 'e-commerce' && locale === 'tr') return <EcommerceTurkishPage page="process" />;
  if (slug === 'ikas-development' && locale === 'tr') return <IkasTurkishSubpage page="process" />;
  if (slug === 'shopify-development' && locale === 'tr') return <ShopifyTurkishProcess />;

  const content = service.content as any || {};
  const process = content.process || [];
  const animation = content.animation;

  return (
    <ProcessPageClient
      serviceName={service.name}
      serviceSlug={slug}
      serviceColor={service.color}
      steps={process}
      processLayout={animation?.processLayout}
      animation={animation}
      locale={locale}
    />
  );
}
