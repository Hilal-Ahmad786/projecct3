import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import BlogPageClient from './BlogPageClient';
import { getServiceData, baseUrl } from '../_shared';
import CorporateWebsiteSubpage, { getCorporateWebsiteSubpageMeta } from '@/components/services/CorporateWebsiteSubpage';
import EcommerceTurkishPage, { getEcommerceTurkishMeta, getEcommerceTurkishSocialMeta } from '@/components/e-commerce/EcommerceTurkishPage';
import IkasTurkishBlogPage, { getIkasBlogMeta } from '@/components/ikas/IkasTurkishBlogPage';
import ShopifyTurkishBlogPage, { getShopifyBlogMeta } from '@/components/e-commerce/ShopifyTurkishBlogPage';
import CustomEcommerceTurkishBlogPage, { getCustomEcommerceBlogMeta } from '@/components/e-commerce/CustomEcommerceTurkishBlogPage';
import MarketplaceTurkishPage, { getMarketplaceMeta } from '@/components/e-commerce/MarketplaceTurkishPage';
import TechnicalSeoTurkishPage, { getTechnicalSeoMeta, getTechnicalSeoSocialMeta } from '@/components/services/TechnicalSeoTurkishPage';
import SeoTurkishPage, { getSeoTurkishMeta, getSeoTurkishSocialMeta } from '@/components/services/SeoTurkishPage';
import EcommerceSeoTurkishPage, { getEcommerceSeoTurkishMeta, getEcommerceSeoTurkishSocialMeta } from '@/components/services/EcommerceSeoTurkishPage';
import { GoogleAdsTurkishPage, getGoogleAdsMeta, getGoogleAdsSocialMeta } from '@/components/services/GoogleAdsTurkishPage';
import { GoogleSearchAdsTurkishPage, getGoogleSearchAdsMeta, getGoogleSearchAdsSocialMeta } from '@/components/services/GoogleSearchAdsTurkishPage';
import { GoogleShoppingTurkishPage, getGoogleShoppingMeta, getGoogleShoppingSocialMeta } from '@/components/services/GoogleShoppingTurkishPage';
import { PerformanceMaxTurkishPage, getPerformanceMaxMeta, getPerformanceMaxSocialMeta } from '@/components/services/PerformanceMaxTurkishPage';

export const revalidate = 3600;

// Empty list = build nothing at deploy time, render each slug on its first
// request and cache it as ISR. Without this export Next treats the [slug]
// segment as fully dynamic and ignores `revalidate`: every request (and every
// <Link> prefetch) was a fresh server render with 0% CDN caching.
export function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const data = await getServiceData(slug, validLocale);
  if (!data) return { title: 'Service Not Found | PakSoft' };

  const path = `/services/${slug}/blog`;
  const localizedPath = localizeFullPath(path, validLocale);
  const customMeta = slug === 'performance-max' && validLocale === 'tr' ? getPerformanceMaxMeta('blog') : slug === 'google-shopping' && validLocale === 'tr' ? getGoogleShoppingMeta('blog') : slug === 'google-search-ads' && validLocale === 'tr' ? getGoogleSearchAdsMeta('blog') : slug === 'google-ads' && validLocale === 'tr' ? getGoogleAdsMeta('blog') : slug === 'technical-seo' && validLocale === 'tr' ? getTechnicalSeoMeta('blog') : slug === 'ecommerce-seo' && validLocale === 'tr' ? getEcommerceSeoTurkishMeta('blog') : slug === 'seo' && validLocale === 'tr' ? getSeoTurkishMeta('blog') : slug === 'marketplace-development' && validLocale === 'tr' ? getMarketplaceMeta('blog') : slug === 'custom-ecommerce' && validLocale === 'tr' ? getCustomEcommerceBlogMeta()
    : slug === 'ikas-development' && validLocale === 'tr'
    ? getIkasBlogMeta()
    : slug === 'shopify-development' && validLocale === 'tr' ? getShopifyBlogMeta()
    : slug === 'corporate-website-design' && (validLocale === 'tr' || validLocale === 'en')
    ? getCorporateWebsiteSubpageMeta('blog', validLocale)
    : slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishMeta('blog') : null;
  return {
    title: customMeta?.title || `${data.service.name} — Articles & Insights | PakSoft`,
    description: customMeta?.description || `Practical guides, deep-dives, and lessons learned about ${data.service.name} from the PakSoft team.`,
    ...(slug === 'seo' && validLocale === 'tr' ? getSeoTurkishSocialMeta('blog', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(slug === 'technical-seo' && validLocale === 'tr' ? getTechnicalSeoSocialMeta('blog', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(slug === 'ecommerce-seo' && validLocale === 'tr' ? getEcommerceSeoTurkishSocialMeta('blog', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(slug === 'google-ads' && validLocale === 'tr' ? getGoogleAdsSocialMeta('blog', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(slug === 'performance-max' && validLocale === 'tr' ? getPerformanceMaxSocialMeta('blog', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(slug === 'google-shopping' && validLocale === 'tr' ? getGoogleShoppingSocialMeta('blog', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(slug === 'google-search-ads' && validLocale === 'tr' ? getGoogleSearchAdsSocialMeta('blog', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishSocialMeta('blog', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(slug === 'ikas-development' && validLocale === 'tr' ? { openGraph: { type: 'website', title: customMeta?.title, description: customMeta?.description, url: `${baseUrl}/${validLocale}${localizedPath}`, siteName: 'PakSoft', locale: 'tr_TR' }, twitter: { card: 'summary', title: customMeta?.title, description: customMeta?.description } } : {}),
    ...(slug === 'shopify-development' && validLocale === 'tr' ? { openGraph: { type: 'website' as const, title: customMeta?.title, description: customMeta?.description, url: `${baseUrl}/${validLocale}${localizedPath}`, siteName: 'PakSoft', locale: 'tr_TR', images: ['/images/blog/shopify/shopify-magaza-kurulumu-hazirlik-kapak.webp'] }, twitter: { card: 'summary_large_image' as const, title: customMeta?.title, description: customMeta?.description, images: ['/images/blog/shopify/shopify-magaza-kurulumu-hazirlik-kapak.webp'] } } : {}),
    alternates: slug === 'ikas-development' && validLocale === 'tr'
      ? { canonical: `${baseUrl}/${validLocale}${localizedPath}` }
      : { canonical: `${baseUrl}/${validLocale}${localizedPath}`, languages: generateAlternateLinks(path) },
  };
}

export default async function ServiceBlogPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const data = await getServiceData(slug, validLocale);
  if (!data) notFound();

  if (slug === 'google-ads' && validLocale === 'tr') return <GoogleAdsTurkishPage page="blog" />;
  if (slug === 'performance-max' && validLocale === 'tr') return <PerformanceMaxTurkishPage page="blog" />;
  if (slug === 'google-shopping' && validLocale === 'tr') return <GoogleShoppingTurkishPage page="blog" />;
  if (slug === 'google-search-ads' && validLocale === 'tr') return <GoogleSearchAdsTurkishPage page="blog" />;

  if (slug === 'technical-seo' && validLocale === 'tr') return <TechnicalSeoTurkishPage page="blog" />;

  if (slug === 'seo' && validLocale === 'tr') return <SeoTurkishPage page="blog" />;

  if (slug === 'ecommerce-seo' && validLocale === 'tr') return <EcommerceSeoTurkishPage page="blog" />;

  if (slug === 'marketplace-development' && validLocale === 'tr') return <MarketplaceTurkishPage page="blog" />;

  if (slug === 'corporate-website-design' && (validLocale === 'tr' || validLocale === 'en')) {
    return <CorporateWebsiteSubpage page="blog" locale={validLocale} />;
  }
  if (slug === 'e-commerce' && validLocale === 'tr') return <EcommerceTurkishPage page="blog" />;
  if (slug === 'ikas-development' && validLocale === 'tr') return <IkasTurkishBlogPage />;
  if (slug === 'shopify-development' && validLocale === 'tr') return <ShopifyTurkishBlogPage />;
  if (slug === 'custom-ecommerce' && validLocale === 'tr') return <CustomEcommerceTurkishBlogPage />;

  // Posts are categorized at the parent-service level; fall back to the
  // service's own slug, then its category.
  const blogCategory = data.parentSlug || slug || data.category || 'general';

  return (
    <main className="min-h-screen bg-white">
      <BlogPageClient
        serviceName={data.service.name}
        serviceSlug={slug}
        serviceColor={data.service.color}
        blogCategory={blogCategory}
      />
    </main>
  );
}
