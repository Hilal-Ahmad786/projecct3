import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { createTranslator } from '@/lib/server-i18n';
import { generateAlternateLinks } from '@/lib/seo';
import { localizeFullPath } from '@/lib/routes';
import Button from '@/components/Button';
import Image from 'next/image';
import LocalizedLink from '@/components/LocalizedLink';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import {
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';

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

const sunContainerLabels: Record<Locale, {
  eyebrow: string; home: string; projects: string; websiteAlt: string; portalAlt: string;
  industry: string; market: string; marketValue: string; configurator: string; configuratorValue: string; orderTracking: string; orderTrackingValue: string; storyCta: string; visitSite: string;
  websitePreview: string; portalPreview: string; projectOverview: string;
}> = {
  en: { eyebrow: 'PROJECT CASE STUDY · CORPORATE WEBSITE', home: 'Home', projects: 'Projects', websiteAlt: 'Sun Container corporate website homepage showing its modular container products', portalAlt: 'Sun Container order tracking portal interface', industry: 'Modular containers and construction', market: 'Target market', marketValue: 'Germany', configurator: 'Product journey', configuratorValue: 'Configurator', orderTracking: 'Additional interface', orderTrackingValue: 'Order tracking', storyCta: 'Explore the project', visitSite: 'Visit the live website', websitePreview: 'Corporate website', portalPreview: 'Order tracking portal', projectOverview: 'Project overview' },
  tr: { eyebrow: 'PROJE İNCELEMESİ · KURUMSAL WEB SİTESİ', home: 'Ana Sayfa', projects: 'Projeler', websiteAlt: 'Sun Container kurumsal web sitesi ana sayfasında modüler konteyner ürünleri', portalAlt: 'Sun Container sipariş takip portalı arayüzü', industry: 'Modüler konteyner ve inşaat', market: 'Hedef pazar', marketValue: 'Almanya', configurator: 'Ürün deneyimi', configuratorValue: 'Konfigüratör', orderTracking: 'Ek arayüz', orderTrackingValue: 'Sipariş takibi', storyCta: 'Proje detaylarını inceleyin', visitSite: 'Yayındaki siteyi ziyaret edin', websitePreview: 'Kurumsal web sitesi', portalPreview: 'Sipariş takip portalı', projectOverview: 'Proje özeti' },
  de: { eyebrow: 'PROJEKTBEISPIEL · UNTERNEHMENSWEBSITE', home: 'Startseite', projects: 'Projekte', websiteAlt: 'Startseite der Sun Container Unternehmenswebsite mit modularen Containerprodukten', portalAlt: 'Oberfläche des Sun Container Auftragsverfolgungsportals', industry: 'Modulcontainer und Bauwesen', market: 'Zielmarkt', marketValue: 'Deutschland', configurator: 'Produktablauf', configuratorValue: 'Konfigurator', orderTracking: 'Zusätzliche Oberfläche', orderTrackingValue: 'Auftragsstatus', storyCta: 'Projekt ansehen', visitSite: 'Live-Website besuchen', websitePreview: 'Unternehmenswebsite', portalPreview: 'Auftragsverfolgungsportal', projectOverview: 'Projektüberblick' },
  ur: { eyebrow: 'پروجیکٹ کیس اسٹڈی · کارپوریٹ ویب سائٹ', home: 'ہوم', projects: 'پراجیکٹس', websiteAlt: 'سن کنٹینر کی کارپوریٹ ویب سائٹ کا ہوم پیج اور ماڈیولر کنٹینر مصنوعات', portalAlt: 'سن کنٹینر آرڈر ٹریکنگ پورٹل انٹرفیس', industry: 'ماڈیولر کنٹینرز اور تعمیرات', market: 'ہدف مارکیٹ', marketValue: 'جرمنی', configurator: 'پروڈکٹ کا تجربہ', configuratorValue: 'پروڈکٹ کنفیگریٹر', orderTracking: 'اضافی انٹرفیس', orderTrackingValue: 'آرڈر ٹریکنگ', storyCta: 'پروجیکٹ کی تفصیل دیکھیں', visitSite: 'لائیو ویب سائٹ دیکھیں', websitePreview: 'کارپوریٹ ویب سائٹ', portalPreview: 'آرڈر ٹریکنگ پورٹل', projectOverview: 'پروجیکٹ کا جائزہ' },
  ar: { eyebrow: 'دراسة حالة · موقع شركة', home: 'الرئيسية', projects: 'المشاريع', websiteAlt: 'الصفحة الرئيسية لموقع Sun Container وتعرض منتجات الحاويات المعيارية', portalAlt: 'واجهة بوابة تتبع طلبات Sun Container', industry: 'الحاويات المعيارية والإنشاءات', market: 'السوق المستهدف', marketValue: 'ألمانيا', configurator: 'تجربة المنتج', configuratorValue: 'مهيّئ المنتجات', orderTracking: 'واجهة إضافية', orderTrackingValue: 'تتبع الطلب', storyCta: 'استكشف تفاصيل المشروع', visitSite: 'زيارة الموقع المنشور', websitePreview: 'موقع الشركة', portalPreview: 'بوابة تتبع الطلبات', projectOverview: 'نظرة عامة على المشروع' },
};

function localizeProjectMeasure(value: string, locale: Locale, kind: 'duration' | 'team') {
  if (locale === 'en') return value;
  const amount = value.match(/\d+(?:[.,]\d+)?/)?.[0];
  if (!amount) return value;
  const units: Record<Exclude<Locale, 'en'>, { duration: string; team: string }> = {
    tr: { duration: 'hafta', team: 'geliştirici' },
    de: { duration: 'Wochen', team: 'Entwickler' },
    ur: { duration: 'ہفتے', team: 'ڈویلپرز' },
    ar: { duration: 'أسابيع', team: 'مطوّرين' },
  };
  return `${amount} ${units[locale][kind]}`;
}

async function getProject(slug: string, locale: string) {
  const { getPublishedProjectBySlug } = await import('@/lib/database/public-queries');
  return getPublishedProjectBySlug(slug, locale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const project = await getProject(slug, validLocale);

  if (!project) {
    return { title: 'Case Study Not Found | PakSoft' };
  }

  const title = `${project.name} - Case Study | PakSoft`;
  const description = project.description || '';
  const path = `/projects/${slug}`;
  // Canonical must use the LOCALIZED path (/tr/projeler/x, not /tr/projects/x)
  // — the English-path canonical contradicted the hreflang alternates and the
  // sitemap on every non-EN case study.
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
      type: 'article',
      images: [{ url: project.thumbnail || '/images/og-projects.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ISR: cache for an hour instead of re-querying the DB on every request.
export const revalidate = 3600;

// Empty list = build nothing at deploy time, render each slug on its first
// request and cache it as ISR. Without this export Next treats the [slug]
// segment as fully dynamic and ignores `revalidate`: every request (and every
// <Link> prefetch) was a fresh server render with 0% CDN caching.
export function generateStaticParams() {
  return [];
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const project = await getProject(slug, locale);
  const t = createTranslator(locale);

  if (!project) {
    notFound();
  }

  const results = (project.results || []) as { metric: string; value: string }[];
  const isSunContainer = slug === 'sun-container';
  const sunLabels = sunContainerLabels[locale];

  const breadcrumbItems = isSunContainer ? [
    { name: sunLabels.home, url: `${baseUrl}/${locale}` },
    { name: sunLabels.projects, url: `${baseUrl}/${locale}${localizeFullPath('/projects', locale)}` },
    { name: project.name, url: `${baseUrl}/${locale}${localizeFullPath(`/projects/${slug}`, locale)}` },
  ] : [
    { name: 'Home', url: `${baseUrl}/${locale}` },
    { name: 'Projects', url: `${baseUrl}/${locale}/projects` },
    { name: project.name, url: `${baseUrl}/${locale}/projects/${slug}` },
  ];

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      {isSunContainer ? (
        <section className="relative isolate overflow-hidden bg-background-gray pb-14 pt-24 sm:pb-20 sm:pt-28">
          <div aria-hidden="true" className="pointer-events-none absolute -end-24 -top-32 h-96 w-96 rounded-full bg-heritage-turquoise-light/70 blur-3xl" />
          <div className="container relative mx-auto max-w-[1200px] px-4">
            <nav aria-label={locale === 'tr' ? 'İçerik yolu' : 'Breadcrumb'} className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <LocalizedLink href="/" className="rounded-sm underline-offset-4 hover:text-heritage-turquoise-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{sunLabels.home}</LocalizedLink>
              <span aria-hidden="true">/</span>
              <LocalizedLink href="/projects" className="rounded-sm underline-offset-4 hover:text-heritage-turquoise-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{sunLabels.projects}</LocalizedLink>
              <span aria-hidden="true">/</span><span aria-current="page" className="font-medium text-gray-800">Sun Container</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
              <div className="relative z-10 max-w-xl hero-enter">
                <p className="inline-flex items-center gap-2 rounded-full border border-heritage-sand bg-white/80 px-3 py-1.5 text-overline text-heritage-turquoise-deep shadow-sm"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-heritage-turquoise" />{sunLabels.eyebrow}</p>
                <p className="mt-6 text-sm font-semibold tracking-wide text-gray-600">{project.client || 'Sun Container GmbH'}<span aria-hidden="true" className="mx-2 text-heritage-turquoise">·</span>{sunLabels.industry}</p>
                <h1 className="mt-3 text-display font-semibold leading-[1.03] tracking-tight text-gray-950">Sun Container</h1>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-gray-700">{project.description}</p>

                <dl className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4"><dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">{sunLabels.market}</dt><dd className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">{sunLabels.marketValue}</dd></div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4"><dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">{sunLabels.configurator}</dt><dd className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">{sunLabels.configuratorValue}</dd></div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4"><dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-gray-500 sm:text-xs">{sunLabels.orderTracking}</dt><dd className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">{sunLabels.orderTrackingValue}</dd></div>
                </dl>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a href="#project-story" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none">{sunLabels.storyCta}<span aria-hidden="true">↓</span></a>
                  {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-sm px-2 py-3 text-sm font-semibold text-gray-800 underline-offset-4 hover:text-heritage-turquoise-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{sunLabels.visitSite}<span aria-hidden="true">↗</span></a>}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-2xl pb-12 ps-0 hero-enter-side sm:pb-14 sm:ps-10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.45)] sm:rounded-3xl">
                  <Image src="/images/portfolio/sun-container.png" alt={sunLabels.websiteAlt} fill priority sizes="(max-width: 1023px) 100vw, 52vw" className="object-cover object-top" />
                  <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm sm:start-4 sm:top-4">{sunLabels.websitePreview}</span>
                </div>
                <figure className="absolute bottom-0 end-0 w-[46%] overflow-hidden rounded-xl border-4 border-white bg-white shadow-xl sm:end-2 sm:w-[42%] sm:rounded-2xl sm:border-[6px]">
                  <div className="relative aspect-[16/10]"><Image src="/images/portfolio/sun-container-tracking.png" alt={sunLabels.portalAlt} fill sizes="(max-width: 640px) 45vw, 280px" className="object-cover object-top" /></div>
                  <figcaption className="px-2 py-2 text-center text-[0.65rem] font-semibold leading-tight text-gray-700 sm:px-3 sm:text-xs">{sunLabels.portalPreview}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>
      ) : (
      <section className="relative py-24 bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              {project.industry && <span>{project.industry}</span>}
              {project.industry && project.client && <span>•</span>}
              {project.client && <span>{project.client}</span>}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.name}</h1>
            <p className="text-xl text-gray-300 mb-8">{project.description}</p>

            {/* Quick Stats */}
            {results.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.slice(0, 4).map((result, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{result.value}</div>
                    <div className="text-sm text-gray-400">{result.metric}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
        <section id={isSunContainer ? 'project-story' : undefined} className={isSunContainer ? 'scroll-mt-24 bg-heritage-ivory py-16 sm:py-20' : 'py-16'}>
          <div className={isSunContainer ? 'container mx-auto max-w-[1200px] px-4' : 'container mx-auto px-4'}>
            <div className={isSunContainer ? 'mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6' : 'max-w-4xl mx-auto grid md:grid-cols-2 gap-12'}>
              {project.challenge && (
                <article className={isSunContainer ? 'rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8' : ''}>
                  <h2 className={isSunContainer ? 'mb-4 flex items-center gap-3 text-title font-semibold text-gray-900 sm:text-headline' : 'text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'}>
                    <span className={isSunContainer ? 'flex h-9 w-9 items-center justify-center rounded-full bg-heritage-saffron-light' : 'w-8 h-8 bg-red-100 rounded-full flex items-center justify-center'}>
                      <span className={isSunContainer ? 'text-lg font-bold text-heritage-saffron-deep' : 'text-red-600 text-lg'}>!</span>
                    </span>
                    {t('projects.detail.theChallenge')}
                  </h2>
                  <p className="text-body leading-relaxed text-gray-600">{project.challenge}</p>
                </article>
              )}
              {project.solution && (
                <article className={isSunContainer ? 'rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8' : ''}>
                  <h2 className={isSunContainer ? 'mb-4 flex items-center gap-3 text-title font-semibold text-gray-900 sm:text-headline' : 'text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2'}>
                    <CheckCircleIcon className={isSunContainer ? 'h-9 w-9 rounded-full bg-heritage-turquoise-light p-1.5 text-heritage-turquoise-deep' : 'w-8 h-8 text-emerald-600'} />
                    {t('projects.detail.ourSolution')}
                  </h2>
                  <p className="text-body leading-relaxed text-gray-600">{project.solution}</p>
                </article>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Full Description */}
      {project.fullDescription && (
        <section className={isSunContainer ? 'bg-white section-compact' : 'bg-gray-50 py-16'}>
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className={isSunContainer ? 'mx-auto max-w-4xl rounded-2xl border border-heritage-sand bg-heritage-ivory p-6 sm:p-9' : 'mx-auto max-w-4xl prose prose-gray'}>
              {isSunContainer && <><p className="text-overline text-heritage-turquoise-deep">{sunLabels.projectOverview}</p><span aria-hidden="true" className="my-4 block h-1 w-12 rounded-full bg-heritage-turquoise" /></>}
              <p className={isSunContainer ? 'text-body leading-relaxed text-gray-700 sm:text-lg' : 'text-gray-600 leading-relaxed text-lg'}>{project.fullDescription}</p>
            </div>
          </div>
        </section>
      )}

      {/* Tech Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <section className={isSunContainer ? 'bg-background-gray section-compact' : 'bg-gray-50 py-16'}>
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className={isSunContainer ? 'mx-auto max-w-4xl' : 'max-w-4xl mx-auto'}>
              <h2 className={isSunContainer ? 'text-headline font-medium text-gray-900' : 'text-2xl font-bold text-gray-900 mb-8 text-center'}>{t('projects.detail.technologiesUsed')}{isSunContainer && <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-heritage-turquoise" />}</h2>
              <div className={isSunContainer ? 'mt-6 flex flex-wrap gap-2.5' : 'flex flex-wrap justify-center gap-4'}>
                {project.technologies.map((tech: string, index: number) => (
                  <span key={index} className={isSunContainer ? 'rounded-lg border border-heritage-sand bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm' : 'px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 font-medium'}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Details */}
      {(project.duration || project.teamSize || project.industry) && (
        <section className={isSunContainer ? 'bg-white section-compact' : 'py-16'}>
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className={isSunContainer ? 'mx-auto max-w-5xl' : 'max-w-4xl mx-auto'}>
              <div className="grid gap-3 md:grid-cols-3 md:gap-4">
                {project.duration && (
                  <div className={isSunContainer ? 'flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm' : 'flex items-start gap-4'}>
                    <ClockIcon className={`h-6 w-6 flex-shrink-0 ${isSunContainer ? 'text-heritage-turquoise-deep' : 'text-emerald-600'}`} />
                    <div>
                      <div className="font-semibold text-gray-900">{t('projects.detail.duration')}</div>
                      <div className="text-gray-600">{isSunContainer ? localizeProjectMeasure(project.duration, locale, 'duration') : project.duration}</div>
                    </div>
                  </div>
                )}
                {project.teamSize && (
                  <div className={isSunContainer ? 'flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm' : 'flex items-start gap-4'}>
                    <UserGroupIcon className={`h-6 w-6 flex-shrink-0 ${isSunContainer ? 'text-heritage-turquoise-deep' : 'text-emerald-600'}`} />
                    <div>
                      <div className="font-semibold text-gray-900">{t('projects.detail.teamSize')}</div>
                      <div className="text-gray-600">{isSunContainer ? localizeProjectMeasure(project.teamSize, locale, 'team') : project.teamSize}</div>
                    </div>
                  </div>
                )}
                {project.industry && (
                  <div className={isSunContainer ? 'flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm' : 'flex items-start gap-4'}>
                    <CpuChipIcon className={`h-6 w-6 flex-shrink-0 ${isSunContainer ? 'text-heritage-turquoise-deep' : 'text-emerald-600'}`} />
                    <div>
                      <div className="font-semibold text-gray-900">{t('projects.detail.industry')}</div>
                      <div className="text-gray-600">{isSunContainer ? sunLabels.industry : project.industry}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('projects.detail.projectGallery')}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images.map((image: string, index: number) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                    <img src={image} alt={`${project.name} screenshot ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={isSunContainer ? 'bg-gray-950 section-compact' : 'py-16 bg-emerald-600'}>
        <div className="container mx-auto px-4 text-center">
          <h2 className={isSunContainer ? 'text-headline font-medium text-white mb-4' : 'text-3xl font-bold text-white mb-4'}>{t('projects.detail.cta.title')}</h2>
          <p className={isSunContainer ? 'text-body mx-auto mb-8 max-w-2xl text-gray-300' : 'text-emerald-100 mb-8 max-w-2xl mx-auto'}>
            {t('projects.detail.cta.description')}
          </p>
          <Button href="/contact" variant="secondary" size="lg" className={isSunContainer ? '!text-heritage-turquoise-deep hover:!bg-heritage-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950' : '!text-emerald-700 hover:!bg-gray-100'}>
            {t('projects.detail.cta.button')}
          </Button>
        </div>
      </section>
    </main>
  );
}
