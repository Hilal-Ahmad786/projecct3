// src/app/[locale]/services/web-development/page.tsx
// Dedicated page — overrides the generic [slug] route for web-development.
// Adds a unique hero, sticky sub-nav, and per-service blog feed.

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { getTranslations } from '@/lib/server-i18n';
import { getServicePageContent } from '@/lib/service-content';
import { ServiceJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import ServiceDetailClient from '@/app/[locale]/services/[slug]/ServiceDetailClient';
import type { ServiceDetailData } from '@/app/[locale]/services/[slug]/ServiceDetailClient';
import WebDevPageWrapper from '@/components/web-development/WebDevPageWrapper';
import WebDevBlogWrapper from '@/components/web-development/WebDevBlogWrapper';
import { PatternDivider } from '@/components/heritage';

export const revalidate = 3600;

import { SITE_URL as baseUrl } from '@/config/site';
const SLUG = 'web-development';

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US', tr: 'tr_TR', de: 'de_DE', ur: 'ur_PK', ar: 'ar_SA',
};

// ── SEO metadata per locale ──────────────────────────────────────────
const META: Record<Locale, { title: string; description: string; keywords: string }> = {
  en: {
    title: 'Web Development Services — Next.js, React & TypeScript | PakSoft',
    description: 'Custom web development with Next.js, React & TypeScript. PWAs, SaaS platforms, e-commerce — delivered with 95+ Lighthouse scores. Get a quote today.',
    keywords: 'web development, Next.js, React, TypeScript, PWA, SaaS development, e-commerce development, full-stack development',
  },
  // Turkish leads with "web tasarım", not "web geliştirme".
  //
  // In 1,144 Keyword Planner keywords (Türkiye/Turkish) "web geliştirme" has no
  // measurable volume, while "web tasarım" appears in 28 variants totalling
  // 6,750/mo — and `web tasarım fiyatları` (5,000/mo) is the single
  // highest-demand keyword in the entire set. The page was written in the
  // builder's vocabulary rather than the buyer's.
  //
  // Next.js/React stay in the title: they qualify the tech-led long tail
  // ("next.js web tasarım") without costing the head term.
  tr: {
    title: 'Web Tasarım ve Yazılım Geliştirme — Next.js, React | PakSoft',
    description: 'Kurumsal web tasarım ve özel web yazılımı. Next.js ve React ile hızlı, mobil ve SEO uyumlu siteler. Web tasarım fiyatları için ücretsiz teklif alın.',
    keywords: 'web tasarım, web tasarım fiyatları, kurumsal web sitesi, web sitesi yaptırma, özel web yazılımı, Next.js, React, e-ticaret',
  },
  de: {
    title: 'Webentwicklung — Next.js, React & TypeScript | PakSoft',
    description: 'Individuelle Webentwicklung mit Next.js, React & TypeScript. PWAs, SaaS-Plattformen, E-Commerce — mit 95+ Lighthouse-Score geliefert.',
    keywords: 'Webentwicklung, Next.js, React, TypeScript, PWA, SaaS, E-Commerce, Full-Stack',
  },
  ur: {
    title: 'ویب ڈویلپمنٹ خدمات — Next.js، React اور TypeScript | PakSoft',
    description: 'Next.js، React اور TypeScript کے ساتھ کسٹم ویب ڈویلپمنٹ۔ PWA، SaaS پلیٹ فارمز، ای کامرس۔',
    keywords: 'ویب ڈویلپمنٹ, Next.js, React, TypeScript, PWA, SaaS, ای کامرس',
  },
  ar: {
    title: 'خدمات تطوير الويب — Next.js وReact وTypeScript | PakSoft',
    description: 'تطوير مواقع مخصصة باستخدام Next.js وReact وTypeScript. تطبيقات الويب التقدمية، منصات SaaS، التجارة الإلكترونية.',
    keywords: 'تطوير الويب, Next.js, React, TypeScript, PWA, SaaS, تجارة إلكترونية',
  },
};

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

// ── Data helpers (same pattern as generic [slug]/page.tsx) ───────────
async function getService(locale: string) {
  const { getPublishedServiceBySlug } = await import('@/lib/database/public-queries');
  return getPublishedServiceBySlug(SLUG, locale);
}
async function getSubServicesData(locale: string) {
  const { getSubServices } = await import('@/lib/database/public-queries');
  return getSubServices(SLUG, locale);
}

// ── Metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const meta = META[validLocale] ?? META.en;
  const path = `/services/${SLUG}`;
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    // absolute: META titles already include "| PakSoft" — skip the layout template
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${validLocale}${localizedPath}`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [{ url: '/images/og-web-development.jpg', width: 1200, height: 630, alt: meta.title }],
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
  };
}

// ── Page ─────────────────────────────────────────────────────────────
export default async function WebDevelopmentPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;

  const [service, translations] = await Promise.all([
    getService(validLocale),
    getTranslations(validLocale),
  ]);

  if (!service) notFound();

  const content = (service.content || {}) as {
    process?: { step: number; title: string; description: string }[];
    technologies?: { name: string; icon: string }[];
    portfolio?: { title: string; category: string; image: string }[];
    faq?: { question: string; answer: string }[];
    animation?: Record<string, unknown>;
  };

  const subs = await getSubServicesData(validLocale);
  const jsonContent = getServicePageContent(translations, SLUG);

  const serviceName = service.name || 'Web Development';
  const serviceDescription = service.fullDescription || service.shortDescription || service.description || '';

  const process = content.process?.length ? content.process : jsonContent?.process?.steps ?? [];
  const faqItems = content.faq?.length ? content.faq : jsonContent?.faq?.items ?? [];
  const technologies = content.technologies?.length ? content.technologies : jsonContent?.technologies?.items ?? [];
  // Use rich subpages portfolio (real projects) as primary source, fall back to DB
  const subpagePortfolioItems = (translations as any)?.serviceSubpages?.['web-development']?.portfolio?.items;
  const portfolioFromSubpages = Array.isArray(subpagePortfolioItems)
    ? subpagePortfolioItems.map((item: any) => ({
        title: item.title,
        category: item.industry || '',
        image: item.image || '',
      }))
    : [];
  const portfolio = portfolioFromSubpages.length ? portfolioFromSubpages : (content.portfolio?.length ? content.portfolio : []);

  const subServices = subs.map((s: any) => ({
    slug: s.slug,
    name: s.name,
    shortDescription: s.shortDescription || s.description,
    icon: s.icon,
    color: s.color,
  }));

  // Breadcrumb JSON-LD items
  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/${validLocale}` },
    { name: 'Services', url: `${baseUrl}/${validLocale}/services` },
    { name: serviceName, url: `${baseUrl}/${validLocale}/services/${SLUG}` },
  ];

  const serviceData: ServiceDetailData = {
    slug: SLUG,
    name: serviceName,
    description: serviceDescription,
    fullDescription: serviceDescription,
    shortDescription: serviceDescription,
    icon: service.icon,
    color: service.color,
    features: service.features || [],
    benefits: service.benefits || [],
    content: { ...content, process, faq: faqItems, technologies, portfolio } as any,
    pricingPackages: service.pricingPackages as ServiceDetailData['pricingPackages'],
    isParent: service.isParent || false,
    subServices: subServices.length > 0 ? subServices : undefined,
    _jsonContent: jsonContent as any,
  };

  // JSON-LD: Service schema
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: { '@type': 'Organization', name: 'PakSoft', url: baseUrl },
    areaServed: ['TR', 'DE', 'SA', 'PK', 'US', 'GB'],
    serviceType: 'Web Development',
    url: `${baseUrl}/${validLocale}/services/${SLUG}`,
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ── Structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {faqItems.length > 0 && <FAQJsonLd faqs={faqItems} />}

      {/* ── Unique Web Dev hero + sticky sub-nav (client wrapper) ── */}
      <WebDevPageWrapper
        serviceName={serviceName}
        description={serviceDescription}
        locale={validLocale}
      />

      {/* ── Remaining service sections (hero hidden) ── */}
      <PatternDivider className="py-10" />
      <ServiceDetailClient service={serviceData} hideHero />

      {/* ── Blog feed — appears after service sections, before footer ── */}
      <WebDevBlogWrapper locale={validLocale} />
    </main>
  );
}
