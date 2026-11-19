import { notFound } from 'next/navigation';
import { getEngine } from '@/components/services/engine-registry';
import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { generateAlternateLinks } from '@/lib/seo';
import { ServiceFAQPage } from '@/components/services/subpages';
import { getWebDevData, SLUG, baseUrl, ogLocaleMap } from '../_shared';

interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const path = `/services/${SLUG}/faq`;
  const localizedPath = localizeFullPath(path, validLocale);
  // Turkish sub-pages come from the shared service engine (content/web-development/tr).
  const eng = getEngine(SLUG, validLocale);
  if (eng) {
    const m = eng.getMeta('faq');
    return {
      title: m.title, description: m.description, robots: { index: true, follow: true },
      alternates: { canonical: `${baseUrl}/${validLocale}${localizedPath}`, languages: generateAlternateLinks(path) },
      ...eng.getSocialMeta('faq', `${baseUrl}/${validLocale}${localizedPath}`),
    };
  }
  const title = 'Web Development FAQ | PakSoft';
  const description = 'Answers to the most common questions about web development timelines, technologies, maintenance, support, and how we work.';
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

export default async function WebDevFaqPage({ params }: PageProps) {
  const { locale } = await params;
  { const eng = getEngine(SLUG, locale); if (eng) return <eng.Page page="faq" />; }
  const data = await getWebDevData(locale);
  if (!data) notFound();

  return <ServiceFAQPage serviceSlug={SLUG} accentColor={data.service.color || 'blue'} />;
}
