import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { ServiceJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import ServiceDetailClient from './ServiceDetailClient';
import type { ServiceDetailData } from './ServiceDetailClient';

const baseUrl = 'https://paksoft.com.tr';

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

async function getParentServiceData(parentSlug: string) {
  const { getParentService } = await import('@/lib/database/public-queries');
  return getParentService(parentSlug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const service = await getService(slug, validLocale);

  if (!service) {
    return { title: 'Service Not Found | PakSoft' };
  }

  const title = `${service.name} | PakSoft`;
  const description = (service.fullDescription || service.shortDescription || service.description || '').slice(0, 160);
  const path = `/services/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${path}`,
      languages: generateAlternateLinks(path),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}${path}`,
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
  };
}

export const dynamic = 'force-dynamic';

export default async function ServicePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const service = await getService(slug, locale);

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

  if (service.parentSlug) {
    parentService = await getParentServiceData(service.parentSlug) as any;
  }

  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/${locale}` },
    { name: 'Services', url: `${baseUrl}/${locale}/services` },
    ...(parentService ? [{ name: parentService.name, url: `${baseUrl}/${locale}/services/${parentService.slug}` }] : []),
    { name: service.name, url: `${baseUrl}/${locale}/services/${slug}` },
  ];

  // Build serializable data for the client component
  const serviceData: ServiceDetailData = {
    slug,
    name: service.name,
    description: service.description,
    fullDescription: service.fullDescription,
    shortDescription: service.shortDescription,
    icon: service.icon,
    color: service.color,
    features: service.features || [],
    benefits: service.benefits || [],
    content,
    pricingPackages: service.pricingPackages as ServiceDetailData['pricingPackages'],
    isParent: service.isParent || false,
    parentSlug: service.parentSlug || undefined,
    parentService: parentService || undefined,
    subServices: subServices.length > 0 ? subServices : undefined,
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Structured Data (server-rendered for SEO) */}
      <ServiceJsonLd
        name={service.name}
        description={service.fullDescription || service.description || ''}
        url={`${baseUrl}/${locale}/services/${slug}`}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {faq.length > 0 && <FAQJsonLd faqs={faq} />}

      {/* Rich animated client component */}
      <ServiceDetailClient service={serviceData} />
    </main>
  );
}
