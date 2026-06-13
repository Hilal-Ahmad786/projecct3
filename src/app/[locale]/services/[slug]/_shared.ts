// Shared data helper for generic service subpages (technologies,
// pricing, blog, …). Mirrors the web-development _shared.ts pattern but
// works for any slug.

import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { getTranslations } from '@/lib/server-i18n';
import { getServicePageContent } from '@/lib/service-content';
import type { ServiceDetailData } from './ServiceDetailClient';

export const baseUrl = 'https://www.paksoft.com.tr';

export const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US', tr: 'tr_TR', de: 'de_DE', ur: 'ur_PK', ar: 'ar_SA',
};

export async function getServiceData(slug: string, locale: string) {
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const { getPublishedServiceBySlug } = await import('@/lib/database/public-queries');

  const [service, translations] = await Promise.all([
    getPublishedServiceBySlug(slug, validLocale),
    getTranslations(validLocale),
  ]);

  if (!service) return null;

  const content = (service.content || {}) as ServiceDetailData['content'];
  const jsonContent = getServicePageContent(translations, slug);

  const process = content.process?.length ? content.process : jsonContent?.process?.steps ?? [];
  const faqItems = content.faq?.length ? content.faq : jsonContent?.faq?.items ?? [];
  const technologies = content.technologies?.length ? content.technologies : jsonContent?.technologies?.items ?? [];

  const serviceData: ServiceDetailData = {
    slug,
    name: service.name || slug,
    description: service.fullDescription || service.shortDescription || service.description || '',
    fullDescription: service.fullDescription || service.shortDescription || service.description || '',
    shortDescription: service.shortDescription || service.description || '',
    icon: service.icon,
    color: service.color,
    features: service.features || [],
    benefits: service.benefits || [],
    content: { ...content, process, faq: faqItems, technologies } as ServiceDetailData['content'],
    pricingPackages: service.pricingPackages as ServiceDetailData['pricingPackages'],
    isParent: service.isParent || false,
    _jsonContent: jsonContent as ServiceDetailData['_jsonContent'],
  };

  return { service: serviceData, validLocale, parentSlug: (service as { parentSlug?: string | null }).parentSlug ?? null, category: (service as { category?: string | null }).category ?? null };
}
