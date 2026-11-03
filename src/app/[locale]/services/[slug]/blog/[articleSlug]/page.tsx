import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { SITE_URL } from '@/config/site';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import BlogPostView from '@/app/[locale]/blog/[slug]/BlogPostView';
import { CorporateWebsiteGuidePage, getCorporateWebsiteGuideMeta, getCorporateWebsiteGuideSlugs } from '@/components/services/CorporateWebsiteSubpage';
import { CorporateWebsiteArticlePage, getCorporateWebsiteArticle, getCorporateWebsiteArticleMeta, getCorporateWebsiteArticleSlugs } from '@/components/services/CorporateWebsiteArticle';

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

function ecommerceArticlePath(articleSlug: string) {
  return `/tr${localizeFullPath(`/services/e-commerce/blog/${articleSlug}`, 'tr')}`;
}

const ecommerceArticleImageAlt: Record<string, string> = {
  'e-ticaret-sitesi-kurmak-icin-gerekenler': 'E-ticaret mağazası, mobil ürün ekranı, hazırlık kontrol panosu ve kargo kutusunu gösteren PakSoft illüstrasyonu',
  'e-ticaret-altyapisi-secimi': 'Hazır modüller ve özel geliştirmeyi temsil eden iki mağaza arayüzünün PakSoft illüstrasyonu',
};

async function getEcommerceArticle(slug: string) {
  const { getPublicServiceBlogPostBySlug } = await import('@/lib/database/public-queries');
  return getPublicServiceBlogPostBySlug(slug, 'tr', 'e-commerce');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, articleSlug } = await params;
  if (slug === 'e-commerce' && locale === 'tr') {
    const post = await getEcommerceArticle(articleSlug);
    if (!post) notFound();
    const canonical = `${SITE_URL}${ecommerceArticlePath(articleSlug)}`;
    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || '';
    const image = post.featuredImage ? `${SITE_URL}${post.featuredImage}` : undefined;
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        type: 'article',
        title,
        description,
        url: canonical,
        siteName: 'PakSoft',
        locale: 'tr_TR',
        ...(image ? { images: [{ url: image }] } : {}),
        ...(post.publishedAt ? { publishedTime: new Date(post.publishedAt).toISOString() } : {}),
        ...(post.updatedAt ? { modifiedTime: new Date(post.updatedAt).toISOString() } : {}),
      },
      twitter: { card: 'summary_large_image', title, description, ...(image ? { images: [image] } : {}) },
    };
  }
  if (slug !== 'corporate-website-design' || (locale !== 'en' && locale !== 'tr')) notFound();
  const article = locale === 'tr' ? getCorporateWebsiteArticleMeta(articleSlug) : null;
  if (article) {
    const localizedPath = articlePath('tr', articleSlug);
    const canonical = `${SITE_URL}/tr${localizedPath}`;
    const image = { url: `${SITE_URL}${article.image}`, width: 1672, height: 941, alt: article.imageAlt };
    // Turkish-only articles: self-referencing canonical, no hreflang alternates.
    return {
      title: article.title,
      description: article.description,
      alternates: { canonical },
      robots: { index: true, follow: true },
      openGraph: {
        type: 'article',
        url: canonical,
        siteName: 'PakSoft',
        locale: 'tr_TR',
        title: article.title,
        description: article.description,
        publishedTime: article.datePublished,
        modifiedTime: article.dateModified,
        authors: ['PakSoft'],
        images: [image],
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description,
        images: [image.url],
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
  if (slug === 'e-commerce' && locale === 'tr') {
    const post = await getEcommerceArticle(articleSlug);
    if (!post) notFound();
    const canonical = `${SITE_URL}${ecommerceArticlePath(articleSlug)}`;
    const title = post.title;
    const description = post.excerpt || post.metaDescription || undefined;
    return (
      <>
        <ArticleJsonLd
          headline={title}
          description={description}
          url={canonical}
          image={post.featuredImage ? `${SITE_URL}${post.featuredImage}` : undefined}
          datePublished={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}
          dateModified={post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined}
          section="E-Ticaret"
          keywords={post.tags}
          inLanguage="tr-TR"
        />
        <BreadcrumbJsonLd items={[
          { name: 'Ana Sayfa', url: `${SITE_URL}/tr` },
          { name: 'Hizmetler', url: `${SITE_URL}/tr/hizmetler` },
          { name: 'E-Ticaret', url: `${SITE_URL}/tr/hizmetler/e-commerce` },
          { name: 'E-Ticaret Rehberleri', url: `${SITE_URL}/tr/hizmetler/e-commerce/blog` },
          { name: title, url: canonical },
        ]} />
        <BlogPostView
          initialPost={JSON.parse(JSON.stringify(post))}
          serviceBlogHref="/tr/hizmetler/e-commerce/blog"
          serviceBlogImageAlt={ecommerceArticleImageAlt[articleSlug]}
        />
      </>
    );
  }
  if (slug !== 'corporate-website-design' || (locale !== 'en' && locale !== 'tr')) notFound();
  if (locale === 'tr') {
    const article = getCorporateWebsiteArticle(articleSlug);
    if (article) return <CorporateWebsiteArticlePage article={article} />;
  }
  if (!getCorporateWebsiteGuideMeta(articleSlug, locale)) notFound();
  return <CorporateWebsiteGuidePage slug={articleSlug} locale={locale} />;
}
