import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { SITE_URL } from '@/config/site';
import { CorporateWebsiteGuidePage, getCorporateWebsiteGuideMeta, getCorporateWebsiteGuideSlugs } from '@/components/services/CorporateWebsiteSubpage';
import { CorporateWebsiteArticlePage, getCorporateWebsiteArticle, getCorporateWebsiteArticleMeta, getCorporateWebsiteArticleSlugs } from '@/components/services/CorporateWebsiteArticle';

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ['en', 'tr'] as const;
  const articleSlugs = [...getCorporateWebsiteGuideSlugs(), ...getCorporateWebsiteArticleSlugs()];
  return locales.flatMap((locale) => articleSlugs
    .filter((articleSlug) => locale === 'tr' || !getCorporateWebsiteArticle(articleSlug))
    .map((articleSlug) => ({ locale, slug: 'corporate-website-design', articleSlug })));
}

interface PageProps {
  params: Promise<{ locale: Locale; slug: string; articleSlug: string }>;
}

function articlePath(locale: 'en' | 'tr', articleSlug: string) {
  return `${localizeFullPath('/services/corporate-website-design/blog', locale)}/${articleSlug}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, articleSlug } = await params;
  if (slug !== 'corporate-website-design' || (locale !== 'en' && locale !== 'tr')) notFound();
  const article = locale === 'tr' ? getCorporateWebsiteArticleMeta(articleSlug) : null;
  if (article) {
    const localizedPath = articlePath('tr', articleSlug);
    const canonical = `${SITE_URL}/tr${localizedPath}`;
    return {
      title: article.title,
      description: article.description,
      alternates: { canonical },
      openGraph: {
        type: 'article',
        url: canonical,
        title: article.title,
        description: article.description,
        images: [`${SITE_URL}/images/blog/${articleSlug === 'web-sitesi-yenileme' ? 'web-sitesi-yenileme-kapak' : 'ihracat-cok-dilli-web-sitesi-kapak'}.webp`],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description,
        images: [`${SITE_URL}/images/blog/${articleSlug === 'web-sitesi-yenileme' ? 'web-sitesi-yenileme-kapak' : 'ihracat-cok-dilli-web-sitesi-kapak'}.webp`],
      },
    };
  }
  const meta = getCorporateWebsiteGuideMeta(articleSlug, locale);
  if (!meta) notFound();
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
  if (slug !== 'corporate-website-design' || (locale !== 'en' && locale !== 'tr')) notFound();
  if (locale === 'tr') {
    const article = getCorporateWebsiteArticle(articleSlug);
    if (article) return <CorporateWebsiteArticlePage article={article} />;
  }
  if (!getCorporateWebsiteGuideMeta(articleSlug, locale)) notFound();
  return <CorporateWebsiteGuidePage slug={articleSlug} locale={locale} />;
}
