import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { SITE_URL } from '@/config/site';
import { ServiceArticlePage, serviceBlogPath } from '@/components/services/ServiceArticle';
import { getServiceArticlePresentation, getServiceBlog } from '@/components/services/service-blogs';
import { CorporateWebsiteGuidePage, getCorporateWebsiteGuideMeta, getCorporateWebsiteGuideSlugs } from '@/components/services/CorporateWebsiteSubpage';
import { CorporateWebsiteArticlePage, getCorporateWebsiteArticle, getCorporateWebsiteArticleMeta, getCorporateWebsiteArticleSlugs } from '@/components/services/CorporateWebsiteArticle';

// DB-backed service guides (see getServiceBlogArticle) pick up edits hourly;
// admin saves also revalidate the 'blog' cache tag immediately.
export const revalidate = 3600;

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

// Service blogs backed by BlogPost rows (category = service slug), rendered
// with the shared guide layout. Registered in src/lib/service-blogs.ts.
async function getServiceBlogArticle(serviceSlug: string, locale: string, articleSlug: string) {
  const blog = getServiceBlog(serviceSlug, locale);
  if (!blog) return null;
  const { getPublicServiceBlogPostBySlug } = await import('@/lib/database/public-queries');
  const post = await getPublicServiceBlogPostBySlug(articleSlug, locale, serviceSlug);
  if (!post) notFound();
  return { blog, post, canonical: `${SITE_URL}${serviceBlogPath(blog.config)}/${articleSlug}` };
}

const isoDay = (value: Date | string | null | undefined) => (value ? new Date(value).toISOString().slice(0, 10) : '');

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, articleSlug } = await params;
  const serviceArticle = await getServiceBlogArticle(slug, locale, articleSlug);
  if (serviceArticle) {
    const { post, canonical } = serviceArticle;
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
  const serviceArticle = await getServiceBlogArticle(slug, locale, articleSlug);
  if (serviceArticle) {
    const { blog, post } = serviceArticle;
    const { config, category, coverAlt } = getServiceArticlePresentation(blog, post.slug, post.title);
    const { getPublicServiceBlogCards } = await import('@/lib/database/public-queries');
    const relatedPosts = (await getPublicServiceBlogCards(slug, locale).catch(() => []))
      .filter((card) => card.slug !== post.slug)
      .slice(0, 2)
      .map((card) => ({
        slug: card.slug,
        title: card.title,
        excerpt: card.excerpt || '',
        coverImage: card.featuredImage,
        category: getServiceArticlePresentation(blog, card.slug, card.title).category,
      }));
    const published = isoDay(post.publishedAt);
    const modified = isoDay(post.updatedAt) || published;
    return <ServiceArticlePage
      config={config}
      article={{
        slug: post.slug,
        title: post.title,
        category,
        standfirst: post.excerpt || post.metaDescription || '',
        metaDescription: post.metaDescription || post.excerpt || '',
        coverImage: post.featuredImage,
        coverAlt,
        datePublished: published,
        // Same-day re-publishes are not shown as "updated".
        dateModified: modified > published ? modified : published,
        body: post.content,
        keywords: post.tags,
      }}
      relatedPosts={relatedPosts}
    />;
  }
  if (slug !== 'corporate-website-design' || (locale !== 'en' && locale !== 'tr')) notFound();
  if (locale === 'tr') {
    const article = getCorporateWebsiteArticle(articleSlug);
    if (article) return <CorporateWebsiteArticlePage article={article} />;
  }
  if (!getCorporateWebsiteGuideMeta(articleSlug, locale)) notFound();
  return <CorporateWebsiteGuidePage slug={articleSlug} locale={locale} />;
}
