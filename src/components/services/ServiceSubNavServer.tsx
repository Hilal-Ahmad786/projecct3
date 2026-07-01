// Server wrapper that assembles the per-service sticky sub-nav.
// Rendered from the services/[slug] and services/web-development layouts so
// every service page and its subpages share one navigation hub.
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { getTranslations } from '@/lib/server-i18n';
import { getPublishedServiceBySlug } from '@/lib/database/public-queries';
import ServiceSubNav, { SubNavSection } from './ServiceSubNav';

interface Props {
  slug: string;
  locale: string;
}

export default async function ServiceSubNavServer({ slug, locale }: Props) {
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const service = await getPublishedServiceBySlug(slug, validLocale);
  if (!service) return null;

  const t = getTranslations(validLocale) as {
    navbar?: { serviceNav?: Record<string, string> };
  };
  const labels = t.navbar?.serviceNav ?? {};
  const base = `/services/${slug}`;
  const content = (service.content ?? {}) as { portfolio?: unknown[] };
  const hasPortfolio = Array.isArray(content.portfolio) && content.portfolio.length > 0;

  const sections: SubNavSection[] = [
    { id: 'overview', label: labels.overview ?? 'Overview', href: base },
    { id: 'features', label: labels.features ?? 'Features', href: `${base}/features` },
    { id: 'technologies', label: labels.technologies ?? 'Technologies', href: `${base}/technologies` },
    { id: 'process', label: labels.process ?? 'Process', href: `${base}/process` },
    ...(hasPortfolio
      ? [{ id: 'portfolio', label: labels.portfolio ?? 'Portfolio', href: `${base}/portfolio` }]
      : []),
    { id: 'pricing', label: labels.pricing ?? 'Pricing', href: `${base}/pricing` },
    { id: 'faq', label: labels.faq ?? 'FAQ', href: `${base}/faq` },
    { id: 'blog', label: labels.blog ?? 'Blog', href: `${base}/blog` },
  ];

  return (
    <ServiceSubNav
      sections={sections}
      ctaLabel={labels.getQuote ?? 'Get a Quote'}
      ctaHref="/start-project"
      mainPageHref={base}
    />
  );
}
