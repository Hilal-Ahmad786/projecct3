import { notFound } from 'next/navigation';
import { getEngine } from '@/components/services/engine-registry';
import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { generateAlternateLinks } from '@/lib/seo';
import ServiceDetailClient from '@/app/[locale]/services/[slug]/ServiceDetailClient';
import { getWebDevData, SLUG, baseUrl, ogLocaleMap } from '../_shared';

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const path = `/services/${SLUG}/pricing`;
  const localizedPath = localizeFullPath(path, validLocale);
  // Turkish sub-pages come from the shared service engine (content/web-development/tr).
  const eng = getEngine(SLUG, validLocale);
  if (eng) {
    const m = eng.getMeta('pricing');
    return {
      title: m.title, description: m.description, robots: { index: true, follow: true },
      alternates: { canonical: `${baseUrl}/${validLocale}${localizedPath}`, languages: generateAlternateLinks(path) },
      ...eng.getSocialMeta('pricing', `${baseUrl}/${validLocale}${localizedPath}`),
    };
  }
  const title = 'Web Development Pricing Packages | PakSoft';
  const description = 'Transparent, flexible pricing for web development projects of any size — from startup MVPs to enterprise platforms. No hidden fees.';
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
    openGraph: { title, description, url: `${baseUrl}/${validLocale}${localizedPath}`, siteName: 'PakSoft', locale: ogLocaleMap[validLocale], type: 'website' },
  };
}

export default async function WebDevPricingPage({ params }: PageProps) {
  const { locale } = await params;
  { const eng = getEngine(SLUG, locale); if (eng) return <eng.Page page="pricing" />; }
  const data = await getWebDevData(locale);
  if (!data) notFound();
  const { service } = data;

  return (
    <main className="min-h-screen bg-white pt-[var(--navbar-h,64px)]">
      <ServiceDetailClient
        service={service}
        showSections={['pricing', 'cta']}
      />
    </main>
  );
}
