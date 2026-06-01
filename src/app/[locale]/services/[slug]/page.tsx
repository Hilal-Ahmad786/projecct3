import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import { ServiceJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import ServiceDetailClient from './ServiceDetailClient';
import type { ServiceDetailData } from './ServiceDetailClient';
import { getTranslations } from '@/lib/server-i18n';
import { getServicePageContent, type ServicePageContent } from '@/lib/service-content';

// Enable ISR - revalidate every hour for better performance
export const revalidate = 3600;

const baseUrl = 'https://www.paksoft.com.tr';

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
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
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

  if (service.parentSlug) {
    parentService = await getParentServiceData(service.parentSlug, locale) as any;
  }

  // Get JSON content for this service (fallback if no database translation)
  const jsonContent = getServicePageContent(translations, slug);

  // PRIORITY: Database content (with translations from admin) > JSON content > English fallback
  // The 'service' object already has merged translations from mergeServiceTranslation()

  // Use database content first, then JSON as fallback
  const serviceName = service.name || jsonContent?.hero?.title || slug;
  const serviceDescription = service.fullDescription || service.shortDescription || service.description || jsonContent?.hero?.description || '';

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

  // Technologies: database content first, then JSON fallback
  const technologies = (content.technologies && content.technologies.length > 0)
    ? content.technologies
    : jsonContent?.technologies?.items || [];

  // Portfolio: database content first, then JSON fallback
  const portfolio = (content.portfolio && content.portfolio.length > 0)
    ? content.portfolio
    : jsonContent?.portfolio?.items?.map(item => ({
        title: item.title,
        category: item.industry || '',
        image: '',
      })) || [];

  const breadcrumbItems = [
    { name: translations.navbar?.home || 'Home', url: `${baseUrl}/${locale}` },
    { name: translations.services?.detail?.breadcrumb?.services || 'Services', url: `${baseUrl}/${locale}/services` },
    ...(parentService ? [{ name: parentService.name, url: `${baseUrl}/${locale}/services/${parentService.slug}` }] : []),
    { name: serviceName, url: `${baseUrl}/${locale}/services/${slug}` },
  ];

  // Build serializable data for the client component
  const serviceData: ServiceDetailData = {
    slug,
    name: serviceName,
    description: serviceDescription,
    fullDescription: serviceDescription,
    shortDescription: serviceDescription,
    icon: service.icon,
    color: service.color,
    features,
    benefits,
    content: {
      ...content,
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
    // Pass JSON content for components that need additional data
    _jsonContent: jsonContent as any,
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
