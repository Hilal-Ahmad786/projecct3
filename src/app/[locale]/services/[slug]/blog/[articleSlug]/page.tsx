import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { SITE_URL } from '@/config/site';
import { CorporateWebsiteGuidePage, getCorporateWebsiteGuideMeta } from '@/components/services/CorporateWebsiteSubpage';

interface PageProps {
  params: Promise<{ locale: Locale; slug: string; articleSlug: string }>;
}

function articlePath(locale: 'en' | 'tr', articleSlug: string) {
  return `${localizeFullPath('/services/corporate-website-design/blog', locale)}/${articleSlug}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, articleSlug } = await params;
  if (slug !== 'corporate-website-design' || (locale !== 'en' && locale !== 'tr')) return { title: 'Page Not Found | PakSoft' };
  const meta = getCorporateWebsiteGuideMeta(articleSlug, locale);
  if (!meta) return { title: 'Page Not Found | PakSoft' };
  const localizedPath = articlePath(locale, articleSlug);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}${localizedPath}`,
      languages: {
        en: `${SITE_URL}/en${articlePath('en', articleSlug)}`,
        tr: `${SITE_URL}/tr${articlePath('tr', articleSlug)}`,
      },
    },
  };
}

export default async function CorporateWebsiteGuideRoute({ params }: PageProps) {
  const { locale, slug, articleSlug } = await params;
  if (slug !== 'corporate-website-design' || (locale !== 'en' && locale !== 'tr') || !getCorporateWebsiteGuideMeta(articleSlug, locale)) notFound();
  return <CorporateWebsiteGuidePage slug={articleSlug} locale={locale} />;
}
