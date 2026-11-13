import { MetaAdsOverviewBody, getMetaAdsMeta, getMetaAdsSocialMeta } from '@/components/services/MetaAdsTurkishPage';
import { GoogleAdsHubScene, PerformanceMaxScene, GoogleShoppingScene, MetaAdsScene, EcommerceSeoScene, TechnicalSeoScene, CustomEcommerceScene, MarketplaceScene, ShopifyScene } from '@/components/services/hero-visuals/scenes-3d';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks, truncateAtWord } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { serviceRobots } from '@/lib/service-quality';
import { ServiceJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import ServiceDetailClient from './ServiceDetailClient';
import type { ServiceDetailData } from './ServiceDetailClient';
import RelatedServices, { type RelatedItem } from '@/components/services/RelatedServices';
import { getTranslations } from '@/lib/server-i18n';
import { getServicePageContent, type ServicePageContent } from '@/lib/service-content';
import { EcommerceTurkishOverviewBody, getEcommerceTurkishMeta } from '@/components/e-commerce/EcommerceTurkishPage';
import IkasTurkishOverviewBody from '@/components/ikas/IkasTurkishOverview';
import ShopifyTurkishOverview, { SHOPIFY_TR_FAQ } from '@/components/e-commerce/ShopifyTurkishOverview';
import { IKAS_TR_FAQ, IKAS_TR_HERO, IKAS_TR_META } from '@/components/ikas/ikasTurkishCopy';
import { CustomEcommerceOverviewBody, getCustomEcommerceMeta } from '@/components/e-commerce/CustomEcommerceTurkishPage';
import { MarketplaceOverviewBody, getMarketplaceMeta } from '@/components/e-commerce/MarketplaceTurkishPage';
import { SeoTurkishOverviewBody, getSeoTurkishMeta, getSeoTurkishSocialMeta } from '@/components/services/SeoTurkishPage';
import { TechnicalSeoTurkishOverviewBody, getTechnicalSeoMeta, getTechnicalSeoSocialMeta } from '@/components/services/TechnicalSeoTurkishPage';
import { EcommerceSeoTurkishOverviewBody, getEcommerceSeoTurkishMeta, getEcommerceSeoTurkishSocialMeta } from '@/components/services/EcommerceSeoTurkishPage';
import { GoogleAdsOverviewBody, getGoogleAdsMeta, getGoogleAdsSocialMeta } from '@/components/services/GoogleAdsTurkishPage';
import { GoogleSearchAdsOverviewBody, getGoogleSearchAdsMeta, getGoogleSearchAdsSocialMeta } from '@/components/services/GoogleSearchAdsTurkishPage';
import { GoogleShoppingOverviewBody, getGoogleShoppingMeta, getGoogleShoppingSocialMeta } from '@/components/services/GoogleShoppingTurkishPage';
import { PerformanceMaxOverviewBody, getPerformanceMaxMeta, getPerformanceMaxSocialMeta } from '@/components/services/PerformanceMaxTurkishPage';
import { TargetBullseyeScene } from '@/components/services/hero-visuals/scenes-marketing';

// Enable ISR - revalidate every hour for better performance
export const revalidate = 86400; // daily safety net — admin edits refresh instantly via revalidateTag (Vercel cost)

// Empty list = build nothing at deploy time, render each slug on its first
// request and cache it as ISR. Without this export Next treats the [slug]
// segment as fully dynamic and ignores `revalidate`: every request (and every
// <Link> prefetch) was a fresh server render with 0% CDN caching.
export function generateStaticParams() {
  return [];
}

import { SITE_URL as baseUrl } from '@/config/site';

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  ur: 'ur_PK',
  ar: 'ar_SA',
};

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

async function getService(slug: string, locale: string) {
  const { getPublishedServiceBySlug } = await import('@/lib/database/public-queries');
  return getPublishedServiceBySlug(slug, locale);
}

async function getSubServicesData(parentSlug: string, locale: string) {
  const { getSubServices } = await import('@/lib/database/public-queries');
  return getSubServices(parentSlug, locale);
}

async function getParentServiceData(parentSlug: string, locale?: string) {
  const { getParentService } = await import('@/lib/database/public-queries');
  return getParentService(parentSlug, locale);
}

// Pick up to `n` same-category services (excluding self/parents), rotated by a
// hash of the current slug so different services surface different neighbours —
// spreads internal-link equity across the catalog instead of one fixed hub.
async function getRelatedServices(category: string | null | undefined, currentSlug: string, locale: string): Promise<RelatedItem[]> {
  if (!category) return [];
  // getServicesIndex returns only the card fields (slug/name/shortDescription/
  // category/isParent) — NOT the full 268-row catalog with content + pricing,
  // which was the site's single biggest Neon data-transfer cost.
  const { getServicesIndex } = await import('@/lib/database/public-queries');
  const all = (await getServicesIndex(locale)) as Array<Record<string, unknown>>;
  const siblings = all.filter(
    s => s.category === category && s.slug !== currentSlug && !s.isParent && typeof s.slug === 'string'
  );
  const map = (s: Record<string, unknown>): RelatedItem => ({
    slug: s.slug as string,
    name: (s.name as string) || (s.slug as string),
    shortDescription: (s.shortDescription as string) || null,
  });
  const n = 6;
  if (siblings.length <= n) return siblings.map(map);
  let h = 0;
  for (const c of currentSlug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const start = h % siblings.length;
  const out: RelatedItem[] = [];
  for (let i = 0; i < n; i++) out.push(map(siblings[(start + i) % siblings.length]));
  return out;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const service = await getService(slug, validLocale);

  if (!service) {
    return { title: 'Service Not Found | PakSoft' };
  }

  // Prefer the hand-crafted meta fields (per-locale via mergeServiceTranslation),
  // fall back to the generated defaults for services that don't have them yet.
  const corporateMeta: Partial<Record<Locale, { title: string; description: string }>> = {
    en: { title: 'Corporate Website Design & Development | PakSoft', description: 'Plan, design and develop a corporate website with clear content, enquiry tools and an agreed launch scope.' },
    tr: { title: 'Kurumsal Web Tasarım ve Web Sitesi Yapımı | PakSoft', description: 'İşletmenize özel kurumsal web tasarım ve geliştirme. Mobil uyumlu, yönetim panelli ve çok dilli web sitesi seçeneklerini inceleyin, projeniz için teklif alın.' },
  };
  const shopifyMeta = slug === 'shopify-development' && validLocale === 'tr' ? {
    title: 'Shopify E-Ticaret Sitesi Kurulumu ve Tasarımı | PakSoft',
    description: 'Shopify e-ticaret sitesi kurulumu, tema tasarımı ve mağaza taşıma hizmeti. Shopify site kurma, ürün aktarımı ve entegrasyon kapsamınızı PakSoft ile belirleyin.',
  } : undefined;
  const customEcommerceMeta = slug === 'custom-ecommerce' && validLocale === 'tr' ? getCustomEcommerceMeta('overview') : undefined;
  const ecommerceMeta = slug === 'e-commerce' && validLocale === 'tr' ? getEcommerceTurkishMeta('overview') : slug === 'ikas-development' && validLocale === 'tr' ? IKAS_TR_META : undefined;
  const revisedMeta = slug === 'corporate-website-design' ? corporateMeta[validLocale] : undefined;
  const marketplaceMeta = slug === 'marketplace-development' && validLocale === 'tr' ? getMarketplaceMeta('overview') : undefined;
  const seoMeta = slug === 'seo' && validLocale === 'tr' ? getSeoTurkishMeta('overview') : undefined;
  const technicalSeoMeta = slug === 'technical-seo' && validLocale === 'tr' ? getTechnicalSeoMeta('overview') : undefined;
  const ecommerceSeoMeta = slug === 'ecommerce-seo' && validLocale === 'tr' ? getEcommerceSeoTurkishMeta('overview') : undefined;
  const googleAdsMeta = slug === 'google-ads' && validLocale === 'tr' ? getGoogleAdsMeta('overview') : undefined;
  const googleSearchAdsMeta = slug === 'google-search-ads' && validLocale === 'tr' ? getGoogleSearchAdsMeta('overview') : undefined;
  const metaAdsMeta = slug === 'meta-ads' && validLocale === 'tr' ? getMetaAdsMeta('overview') : undefined;
  const performanceMaxMeta = slug === 'performance-max' && validLocale === 'tr' ? getPerformanceMaxMeta('overview') : undefined;
  const googleShoppingMeta = slug === 'google-shopping' && validLocale === 'tr' ? getGoogleShoppingMeta('overview') : undefined;
  const title = metaAdsMeta?.title || performanceMaxMeta?.title || googleShoppingMeta?.title || googleSearchAdsMeta?.title || googleAdsMeta?.title || technicalSeoMeta?.title || ecommerceSeoMeta?.title || seoMeta?.title || marketplaceMeta?.title || customEcommerceMeta?.title || shopifyMeta?.title || ecommerceMeta?.title || revisedMeta?.title || (service as { metaTitle?: string | null }).metaTitle || `${service.name} | PakSoft`;
  const description = metaAdsMeta?.description || performanceMaxMeta?.description || googleShoppingMeta?.description || googleSearchAdsMeta?.description || googleAdsMeta?.description || technicalSeoMeta?.description || ecommerceSeoMeta?.description || seoMeta?.description || marketplaceMeta?.description || customEcommerceMeta?.description || shopifyMeta?.description || ecommerceMeta?.description || revisedMeta?.description ||
    (service as { metaDescription?: string | null }).metaDescription ||
    truncateAtWord(service.fullDescription || service.shortDescription || service.description || '', 160);
  const path = `/services/${slug}`;
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    title,
    description,
    robots: (slug === 'google-search-ads' || slug === 'google-shopping' || slug === 'performance-max') && validLocale === 'tr' ? { index: true, follow: true } : serviceRobots(service),
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
    ...(technicalSeoMeta ? getTechnicalSeoSocialMeta('overview', `${baseUrl}/${validLocale}${localizedPath}`, service.heroImage || '/images/og-services.jpg') : {}),
    ...(seoMeta ? getSeoTurkishSocialMeta('overview', `${baseUrl}/${validLocale}${localizedPath}`, service.heroImage || '/images/og-services.jpg') : {}),
    ...(ecommerceSeoMeta ? getEcommerceSeoTurkishSocialMeta('overview', `${baseUrl}/${validLocale}${localizedPath}`, service.heroImage || '/images/og-services.jpg') : {}),
    ...(googleAdsMeta ? getGoogleAdsSocialMeta('overview', `${baseUrl}/${validLocale}${localizedPath}`, service.heroImage || '/images/og-services.jpg') : {}),
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}${localizedPath}`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [{ url: service.heroImage || '/images/og-services.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(metaAdsMeta ? getMetaAdsSocialMeta('overview', `${baseUrl}/${validLocale}${localizedPath}`) : {}),
    ...(performanceMaxMeta ? getPerformanceMaxSocialMeta('overview', `${baseUrl}/${validLocale}${localizedPath}`, service.heroImage || '/images/og-services.jpg') : {}),
    ...(googleShoppingMeta ? getGoogleShoppingSocialMeta('overview', `${baseUrl}/${validLocale}${localizedPath}`, service.heroImage || '/images/og-services.jpg') : {}),
    ...(googleSearchAdsMeta ? getGoogleSearchAdsSocialMeta('overview', `${baseUrl}/${validLocale}${localizedPath}`, service.heroImage || '/images/og-services.jpg') : {}),
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const [service, translations] = await Promise.all([
    getService(slug, locale),
    getTranslations(locale),
  ]);

  if (!service) {
    notFound();
  }

  // Extract structured content from JSON field
  const content = (service.content || {}) as {
    process?: { step: number; title: string; description: string }[];
    technologies?: { name: string; icon: string }[];
    portfolio?: { title: string; category: string; image: string }[];
    faq?: { question: string; answer: string }[];
    animation?: {
      heroVisual: string;
      bgPattern: string;
      decorations: string;
      motion: string;
      featureStyle: string;
      processLayout: string;
    };
  };

  const faq = content.faq || [];

  // Fetch sub-services if this is a parent, or parent info if this is a child
  let subServices: { slug: string; name: string; shortDescription?: string; icon?: string; color?: string }[] = [];
  let parentService: { name: string; slug: string; icon?: string; color?: string } | null = null;

  if (service.isParent) {
    const subs = await getSubServicesData(slug, locale);
    subServices = subs.map((s: any) => ({
      slug: s.slug,
      name: s.name,
      shortDescription: s.shortDescription || s.description,
      icon: s.icon,
      color: s.color,
    }));
  }

  let corporateProject: ServiceDetailData['corporateProject'];
  if (slug === 'corporate-website-design' && (locale === 'tr' || locale === 'en')) {
    const { getPublishedProjectBySlug } = await import('@/lib/database/public-queries');
    const project = await getPublishedProjectBySlug('sun-container', locale);
    corporateProject = project ? {
      client: project.client,
      industry: project.industry,
      challenge: project.challenge,
      description: project.description,
      solution: project.solution,
    } : null;
  }

  if (service.parentSlug) {
    parentService = await getParentServiceData(service.parentSlug, locale) as any;
  }

  // Get JSON content for this service (fallback if no database translation)
  const jsonContent = getServicePageContent(translations, slug);

  // PRIORITY: Database content (with translations from admin) > JSON content > English fallback
  // The 'service' object already has merged translations from mergeServiceTranslation()

  // Use database content first, then JSON as fallback
  const corporateOverviewCopy = slug === 'corporate-website-design' && (locale === 'tr' || locale === 'en')
    ? locale === 'tr'
      ? {
          name: 'Kurumsal Web Tasarım ve Geliştirme',
          description: 'İşletmenizi doğru anlatan, müşteri taleplerini toplamanızı kolaylaştıran ve içeriklerinizi yönetmenize olanak tanıyan kurumsal web siteleri tasarlıyor ve geliştiriyoruz.',
        }
      : {
          name: 'Corporate Website Design & Development',
          description: 'We plan, design and develop corporate websites that present your business clearly, support customer enquiries and help your team manage content.',
        }
    : undefined;
  const isTurkishMarketplace = slug === 'marketplace-development' && locale === 'tr';
  const isTurkishSeo = slug === 'seo' && locale === 'tr';
  const isTurkishTechnicalSeo = slug === 'technical-seo' && locale === 'tr';
  const isTurkishEcommerceSeo = slug === 'ecommerce-seo' && locale === 'tr';
  const isTurkishGoogleAds = slug === 'google-ads' && locale === 'tr';
  const isTurkishGoogleSearchAds = slug === 'google-search-ads' && locale === 'tr';
  const isTurkishMetaAds = slug === 'meta-ads' && locale === 'tr';
  const isTurkishGoogleShopping = slug === 'google-shopping' && locale === 'tr';
  const isTurkishPerformanceMax = slug === 'performance-max' && locale === 'tr';
  // Turkish pages built from content/<service>/tr markdown: curated body, hero only from ServiceDetailClient.
  const isTurkishMdService = (slug === 'custom-ecommerce' || slug === 'marketplace-development') && locale === 'tr';
  const isTurkishIkas = slug === 'ikas-development' && locale === 'tr';
  const ecommerceOverviewCopy = slug === 'e-commerce' && locale === 'tr'
    ? { name: 'İşletmenize Uygun E-Ticaret Sitesi Tasarımı ve Kurulumu', description: getEcommerceTurkishMeta('overview').intro }
    : isTurkishIkas ? { name: IKAS_TR_HERO.title, description: IKAS_TR_HERO.text } : undefined;
  const technicalSeoOverviewCopy = isTurkishTechnicalSeo ? { name: getTechnicalSeoMeta('overview').heading, description: getTechnicalSeoMeta('overview').intro } : undefined;
  const ecommerceSeoOverviewCopy = isTurkishEcommerceSeo ? { name: 'E-Ticaret SEO Hizmeti', description: getEcommerceSeoTurkishMeta('overview').intro } : undefined;
  const isTurkishShopify = slug === 'shopify-development' && locale === 'tr';
  const shopifyOverviewCopy = isTurkishShopify ? {
    name: 'Shopify E-Ticaret Sitesi Kurulumu ve Tasarımı',
    description: 'Shopify mağazanızı ürünlerinize, marka kimliğinize ve günlük iş akışınıza göre hazırlıyoruz. Shopify web sitesi kurma, mevcut tema düzenlemeleri ve WooCommerce gibi başka altyapılardan geçiş ihtiyaçlarını tasarım, veri ve bağlantı işleriyle birlikte planlıyoruz.',
  } : undefined;
  const customEcommerceOverviewCopy = isTurkishMarketplace ? { name: getMarketplaceMeta('overview').heading, description: getMarketplaceMeta('overview').intro }
    : isTurkishMdService ? { name: getCustomEcommerceMeta('overview').heading, description: getCustomEcommerceMeta('overview').intro } : undefined;
  const serviceName = isTurkishMetaAds ? getMetaAdsMeta('overview').heading : isTurkishPerformanceMax ? getPerformanceMaxMeta('overview').heading : isTurkishGoogleShopping ? getGoogleShoppingMeta('overview').heading : isTurkishGoogleSearchAds ? getGoogleSearchAdsMeta('overview').heading : isTurkishGoogleAds ? getGoogleAdsMeta('overview').heading : technicalSeoOverviewCopy?.name || ecommerceSeoOverviewCopy?.name || customEcommerceOverviewCopy?.name || shopifyOverviewCopy?.name || ecommerceOverviewCopy?.name || corporateOverviewCopy?.name || service.name || jsonContent?.hero?.title || slug;
  const serviceDescription = isTurkishMetaAds ? getMetaAdsMeta('overview').intro : isTurkishPerformanceMax ? getPerformanceMaxMeta('overview').intro : isTurkishGoogleShopping ? getGoogleShoppingMeta('overview').intro : isTurkishGoogleSearchAds ? getGoogleSearchAdsMeta('overview').intro : isTurkishGoogleAds ? getGoogleAdsMeta('overview').intro : technicalSeoOverviewCopy?.description || ecommerceSeoOverviewCopy?.description || customEcommerceOverviewCopy?.description || shopifyOverviewCopy?.description || ecommerceOverviewCopy?.description || corporateOverviewCopy?.description || service.fullDescription || service.shortDescription || service.description || jsonContent?.hero?.description || '';
  const serviceShortDescription = isTurkishMetaAds ? getMetaAdsMeta('overview').intro : isTurkishPerformanceMax ? getPerformanceMaxMeta('overview').intro : isTurkishGoogleShopping ? getGoogleShoppingMeta('overview').intro : isTurkishGoogleSearchAds ? getGoogleSearchAdsMeta('overview').intro : isTurkishGoogleAds ? getGoogleAdsMeta('overview').intro : technicalSeoOverviewCopy?.description || ecommerceSeoOverviewCopy?.description || customEcommerceOverviewCopy?.description || shopifyOverviewCopy?.description || ecommerceOverviewCopy?.description || service.shortDescription || jsonContent?.hero?.description || serviceDescription;
  // Concise variant for the hero (keeps it compact). Falls back to the full
  // description for services that don't have a dedicated shortDescription yet.

  // Features: database first, then JSON fallback
  const features = (service.features && service.features.length > 0)
    ? service.features
    : jsonContent?.services?.items?.map(item => item.title) || [];

  // Benefits: database first, then JSON fallback
  const benefits = (service.benefits && service.benefits.length > 0)
    ? service.benefits
    : jsonContent?.whyUs?.benefits?.map(b => b.title) || [];

  // Process steps: database content first, then JSON fallback
  const process = (content.process && content.process.length > 0)
    ? content.process
    : jsonContent?.process?.steps || [];

  // FAQ: database content first, then JSON fallback
  const faqItems = (content.faq && content.faq.length > 0)
    ? content.faq
    : jsonContent?.faq?.items || [];

  // Technologies: database content first, then JSON fallback.
  // The JSON fallback's `icon` is optional, so coerce it to a string to match
  // the Technology type (which requires `icon: string`).
  const technologies = (content.technologies && content.technologies.length > 0)
    ? content.technologies
    : (jsonContent?.technologies?.items || []).map(item => ({ name: item.name, icon: item.icon ?? '' }));

  // Portfolio: database content first, then JSON fallback
  const portfolio = (content.portfolio && content.portfolio.length > 0)
    ? content.portfolio
    : jsonContent?.portfolio?.items?.map(item => ({
        title: item.title,
        category: item.industry || '',
        image: '',
      })) || [];

  const isTurkishEcommerce = slug === 'e-commerce' && locale === 'tr';
  // Turkish custom overviews publish localized URLs (/tr/hizmetler/...) in JSON-LD, matching the canonical.
  const localizedServiceUrl = `${baseUrl}/${locale}${localizeFullPath(`/services/${slug}`, locale)}`;
  const breadcrumbItems = [
    { name: translations.navbar?.home || 'Home', url: `${baseUrl}/${locale}` },
    { name: translations.services?.detail?.breadcrumb?.services || 'Services', url: isTurkishEcommerce || isTurkishEcommerceSeo || isTurkishIkas || isTurkishShopify || isTurkishMdService || isTurkishGoogleAds || isTurkishGoogleSearchAds || isTurkishGoogleShopping ? `${baseUrl}/tr/hizmetler` : `${baseUrl}/${locale}/services` },
    ...(parentService ? [{ name: parentService.name, url: isTurkishEcommerceSeo || isTurkishIkas || isTurkishShopify || isTurkishMdService ? `${baseUrl}/tr${localizeFullPath(`/services/${parentService.slug}`, 'tr')}` : `${baseUrl}/${locale}/services/${parentService.slug}` }] : []),
    { name: isTurkishEcommerce ? 'E-Ticaret' : serviceName, url: isTurkishEcommerce || isTurkishEcommerceSeo || isTurkishIkas || isTurkishShopify || isTurkishMdService || isTurkishGoogleAds || isTurkishGoogleSearchAds || isTurkishGoogleShopping || isTurkishMetaAds || isTurkishPerformanceMax ? localizedServiceUrl : `${baseUrl}/${locale}/services/${slug}` },
  ];

  // Build serializable data for the client component
  const serviceData: ServiceDetailData = {
    slug,
    name: serviceName,
    description: serviceDescription,
    fullDescription: serviceDescription,
    shortDescription: serviceShortDescription,
    icon: service.icon,
    color: service.color,
    features,
    benefits,
    content: {
      ...content as ServiceDetailData['content'],
      process,
      faq: faqItems,
      technologies,
      portfolio,
    },
    pricingPackages: service.pricingPackages as ServiceDetailData['pricingPackages'],
    isParent: service.isParent || false,
    parentSlug: service.parentSlug || undefined,
    parentService: parentService || undefined,
    subServices: subServices.length > 0 ? subServices : undefined,
    corporateProject,
    // Pass JSON content for components that need additional data
    _jsonContent: jsonContent as any,
  };

  const relatedServices = isTurkishShopify || isTurkishMdService || isTurkishSeo || isTurkishTechnicalSeo || isTurkishEcommerceSeo || isTurkishGoogleAds || isTurkishGoogleSearchAds || isTurkishGoogleShopping || isTurkishMetaAds || isTurkishPerformanceMax ? [] : await getRelatedServices((service as { category?: string }).category, slug, locale);

  return (
    <main className="min-h-screen bg-white">
      {/* Structured Data (server-rendered for SEO) */}
      <ServiceJsonLd
        name={serviceName}
        description={serviceDescription}
        url={isTurkishEcommerce || isTurkishEcommerceSeo || isTurkishIkas || isTurkishShopify || isTurkishMdService || isTurkishGoogleAds || isTurkishGoogleSearchAds || isTurkishGoogleShopping || isTurkishMetaAds || isTurkishPerformanceMax ? localizedServiceUrl : `${baseUrl}/${locale}/services/${slug}`}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {isTurkishIkas ? <FAQJsonLd faqs={IKAS_TR_FAQ} /> : isTurkishShopify ? <FAQJsonLd faqs={SHOPIFY_TR_FAQ.map(([question, answer]) => ({ question, answer }))} /> : !isTurkishMdService && !isTurkishTechnicalSeo && !isTurkishEcommerceSeo && !isTurkishGoogleAds && !isTurkishGoogleShopping && !isTurkishMetaAds && !isTurkishPerformanceMax && faq.length > 0 && <FAQJsonLd faqs={faq} />}

      {/* Rich animated client component */}
      <ServiceDetailClient service={serviceData} showSections={isTurkishShopify || isTurkishMdService || isTurkishSeo || isTurkishTechnicalSeo || isTurkishEcommerceSeo || isTurkishGoogleAds || isTurkishGoogleSearchAds || isTurkishGoogleShopping || isTurkishMetaAds || isTurkishPerformanceMax ? ['hero'] : undefined} heroArt={isTurkishMetaAds ? <MetaAdsScene /> : isTurkishPerformanceMax ? <PerformanceMaxScene /> : isTurkishGoogleShopping ? <GoogleShoppingScene /> : isTurkishGoogleSearchAds ? <TargetBullseyeScene badge="Hedef sorgu" /> : isTurkishGoogleAds ? <GoogleAdsHubScene /> : isTurkishTechnicalSeo ? <TechnicalSeoScene /> : isTurkishEcommerceSeo ? <EcommerceSeoScene /> : isTurkishShopify ? <ShopifyScene /> : isTurkishMarketplace ? <MarketplaceScene /> : isTurkishMdService ? <CustomEcommerceScene /> : undefined} />
      {isTurkishMarketplace ? <MarketplaceOverviewBody /> : isTurkishMdService && <CustomEcommerceOverviewBody />}
      {isTurkishSeo && <SeoTurkishOverviewBody />}
      {isTurkishTechnicalSeo && <TechnicalSeoTurkishOverviewBody />}
      {isTurkishEcommerceSeo && <EcommerceSeoTurkishOverviewBody />}
      {isTurkishGoogleAds && <GoogleAdsOverviewBody />}
      {isTurkishGoogleSearchAds && <GoogleSearchAdsOverviewBody />}
      {isTurkishGoogleShopping && <GoogleShoppingOverviewBody />}
      {isTurkishMetaAds && <MetaAdsOverviewBody />}
      {isTurkishPerformanceMax && <PerformanceMaxOverviewBody />}
      {slug === 'e-commerce' && locale === 'tr' && <EcommerceTurkishOverviewBody />}
      {isTurkishIkas && <IkasTurkishOverviewBody />}
      {isTurkishShopify && <ShopifyTurkishOverview />}

      {slug === 'woocommerce-development' && locale === 'tr' && <aside className="mx-auto my-10 max-w-[1200px] px-4 sm:px-6"><div className="rounded-xl border border-heritage-sand bg-heritage-ivory p-5 sm:p-6"><h2 className="text-lg font-semibold text-gray-900">WooCommerce mağazanız için SEO</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">Ürün, kategori, varyant ve stok bilgilerinin arama görünürlüğünü mağazanızın yapısına göre değerlendirin.</p><a href="/tr/hizmetler/ecommerce-seo" className="mt-4 inline-flex min-h-10 items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2">E-Ticaret SEO hizmetini inceleyin<span aria-hidden="true">→</span></a></div></aside>}

      {/* Internal linking — same-category services (server-rendered <a> links) */}
      {!(slug === 'corporate-website-design' && (locale === 'tr' || locale === 'en')) && !(slug === 'e-commerce' && locale === 'tr') && !isTurkishSeo && !isTurkishTechnicalSeo && !isTurkishEcommerceSeo && !isTurkishIkas && !isTurkishShopify &&
        <RelatedServices items={relatedServices} locale={locale} />}
    </main>
  );
}
