import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { getTranslations } from '@/lib/server-i18n';
import { getServicePageContent } from '@/lib/service-content';
import type { ServiceDetailData } from '@/app/[locale]/services/[slug]/ServiceDetailClient';

export const SLUG = 'web-development';
import { SITE_URL } from '@/config/site';

export const baseUrl = SITE_URL;

export const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US', tr: 'tr_TR', de: 'de_DE', ur: 'ur_PK', ar: 'ar_SA',
};

export async function getWebDevData(locale: string) {
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const { getPublishedServiceBySlug, getSubServices } = await import('@/lib/database/public-queries');

  const [service, translations, subs] = await Promise.all([
    getPublishedServiceBySlug(SLUG, validLocale),
    getTranslations(validLocale),
    getSubServices(SLUG, validLocale),
  ]);

  if (!service) return null;

  const content = (service.content || {}) as {
    process?: { step: number; title: string; description: string }[];
    technologies?: { name: string; icon: string }[];
    portfolio?: { title: string; category: string; image: string }[];
    faq?: { question: string; answer: string }[];
    animation?: Record<string, unknown>;
  };

  const jsonContent = getServicePageContent(translations, SLUG);
  const process = content.process?.length ? content.process : jsonContent?.process?.steps ?? [];
  const faqItems = content.faq?.length ? content.faq : jsonContent?.faq?.items ?? [];
  const technologies = content.technologies?.length ? content.technologies : jsonContent?.technologies?.items ?? [];
  const portfolio = content.portfolio?.length ? content.portfolio : [];

  const subServices = subs.map((s: any) => ({
    slug: s.slug,
    name: s.name,
    shortDescription: s.shortDescription || s.description,
    icon: s.icon,
    color: s.color,
  }));

  const serviceData: ServiceDetailData = {
    slug: SLUG,
    name: service.name || 'Web Development',
    description: service.fullDescription || service.shortDescription || service.description || '',
    fullDescription: service.fullDescription || service.shortDescription || service.description || '',
    shortDescription: service.shortDescription || service.description || '',
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

  return { service: serviceData, validLocale };
}
