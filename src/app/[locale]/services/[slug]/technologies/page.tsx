import { MetaAdsTurkishPage, getMetaAdsMeta, getMetaAdsSocialMeta } from '@/components/services/MetaAdsTurkishPage';
// Canonical technologies page — the service sub-nav links here.
// Reuses the TechStackPageClient; /tech-stack redirects to this URL.

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks, getServiceSubPageMeta } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { serviceRobots } from '@/lib/service-quality';
import TechStackPageClient from '../tech-stack/TechStackPageClient';
import CorporateWebsiteSubpage, { getCorporateWebsiteSubpageMeta } from '@/components/services/CorporateWebsiteSubpage';
import EcommerceTurkishPage, { getEcommerceTurkishMeta, getEcommerceTurkishSocialMeta } from '@/components/e-commerce/EcommerceTurkishPage';
import IkasTurkishSubpage, { getIkasTurkishSubpageMeta } from '@/components/ikas/IkasTurkishSubpage';
import ShopifyTurkishTechnologies from '@/components/e-commerce/ShopifyTurkishTechnologies';
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

  const path = `/services/${slug}/technologies`;
  const localizedPath = localizeFullPath(path, validLocale);

  const customMeta = slug === 'meta-ads' && validLocale === 'tr' ? getMetaAdsMeta('technologies') : slug === 'performance-max' && validLocale === 'tr' ? getPerformanceMaxMeta('technologies') : slug === 'google-shopping' && validLocale === 'tr' ? getGoogleShoppingMeta('technologies') : slug === 'google-search-ads' && validLocale === 'tr' ? getGoogleSearchAdsMeta('technologies') : slug === 'google-ads' && validLocale === 'tr' ? getGoogleAdsMeta('technologies') : slug === 'technical-seo' && validLocale === 'tr' ? getTechnicalSeoMeta('technologies') : slug === 'ecommerce-seo' && validLocale === 'tr' ? getEcommerceSeoTurkishMeta('technologies') : slug === 'seo' && validLocale === 'tr' ? getSeoTurkishMeta('technologies') : slug === 'marketplace-development' && validLocale === 'tr' ? getMarketplaceMeta('technologies') : slug === 'custom-ecommerce' && validLocale === 'tr' ? getCustomEcommerceMeta('technologies')
    : slug === 'corporate-website-design' && (validLocale === 'tr' || validLocale === 'en')
    ? getCorporateWebsiteSubpageMeta('technologies', validLocale)
    : slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishMeta('technologies')
    : slug === 'ikas-development' && validLocale === 'tr' ? getIkasTurkishSubpageMeta('technologies')
    : slug === 'shopify-development' && validLocale === 'tr' ? {
      title: 'Shopify Özel Tema Geliştirme ve Entegrasyon | PakSoft',
      description: 'Shopify özel tema geliştirme, Liquid geliştirme, GraphQL API ve ERP entegrasyonu yaklaşımımızı inceleyin. Mağazanız için uygun teknik kapsamı PakSoft ile belirleyin.',
    } : null;
  const { title, description } = customMeta || getServiceSubPageMeta('technologies', validLocale, service.name);
  const canonicalUrl = `${baseUrl}/${validLocale}${localizedPath}`;

  return {
    title,
    description,
    robots: (slug === 'google-search-ads' || slug === 'google-shopping' || slug === 'performance-max') && validLocale === 'tr' ? { index: true, follow: true } : serviceRobots(service),
    ...(slug === 'ecommerce-seo' && validLocale === 'tr' ? getEcommerceSeoTurkishSocialMeta('technologies', canonicalUrl) : {}),
    ...(slug === 'seo' && validLocale === 'tr' ? getSeoTurkishSocialMeta('technologies', canonicalUrl) : {}),
    ...(slug === 'technical-seo' && validLocale === 'tr' ? getTechnicalSeoSocialMeta('technologies', canonicalUrl) : {}),
    ...(slug === 'performance-max' && validLocale === 'tr' ? getPerformanceMaxSocialMeta('technologies', canonicalUrl) : {}),
    ...(slug === 'meta-ads' && validLocale === 'tr' ? getMetaAdsSocialMeta('technologies', canonicalUrl) : {}),
    ...(slug === 'google-shopping' && validLocale === 'tr' ? getGoogleShoppingSocialMeta('technologies', canonicalUrl) : {}),
    ...(slug === 'google-search-ads' && validLocale === 'tr' ? getGoogleSearchAdsSocialMeta('technologies', canonicalUrl) : {}),
    ...(slug === 'google-ads' && validLocale === 'tr' ? getGoogleAdsSocialMeta('technologies', canonicalUrl) : {}),
    ...(slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishSocialMeta('technologies', canonicalUrl) : slug === 'shopify-development' && validLocale === 'tr' ? {
      openGraph: { type: 'website' as const, locale: 'tr_TR', url: canonicalUrl, title, description, images: ['/images/og-image.jpg'] },
      twitter: { card: 'summary_large_image' as const, title, description, images: ['/images/twitter-image.jpg'] },
    } : {}),
    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateLinks(path),
    },
  };
}

export const revalidate = 3600;

// Empty list = build nothing at deploy time, render each slug on its first
// request and cache it as ISR. Without this export Next treats the [slug]
// segment as fully dynamic and ignores `revalidate`: every request (and every
// <Link> prefetch) was a fresh server render with 0% CDN caching.
export function generateStaticParams() {
  return [];
}

export default async function ServiceTechnologiesPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

  if (!service) {
    notFound();
  }

  if (slug === 'ecommerce-seo' && locale === 'tr') return <EcommerceSeoTurkishPage page="technologies" />;

  if (slug === 'performance-max' && locale === 'tr') return <PerformanceMaxTurkishPage page="technologies" />;
  if (slug === 'meta-ads' && locale === 'tr') return <MetaAdsTurkishPage page="technologies" />;
  if (slug === 'google-shopping' && locale === 'tr') return <GoogleShoppingTurkishPage page="technologies" />;
  if (slug === 'google-search-ads' && locale === 'tr') return <GoogleSearchAdsTurkishPage page="technologies" />;

  if (slug === 'google-ads' && locale === 'tr') return <GoogleAdsTurkishPage page="technologies" />;

  if (slug === 'technical-seo' && locale === 'tr') return <TechnicalSeoTurkishPage page="technologies" />;

  if (slug === 'seo' && locale === 'tr') return <SeoTurkishPage page="technologies" />;

  if (slug === 'marketplace-development' && locale === 'tr') return <MarketplaceTurkishPage page="technologies" />;

  if (slug === 'corporate-website-design' && (locale === 'tr' || locale === 'en')) {
    return <CorporateWebsiteSubpage page="technologies" locale={locale} />;
  }
  if (slug === 'custom-ecommerce' && locale === 'tr') return <CustomEcommerceTurkishPage page="technologies" />;
  if (slug === 'e-commerce' && locale === 'tr') return <EcommerceTurkishPage page="technologies" />;
  if (slug === 'ikas-development' && locale === 'tr') return <IkasTurkishSubpage page="technologies" />;
  if (slug === 'shopify-development' && locale === 'tr') return <ShopifyTurkishTechnologies />;

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
