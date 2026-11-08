import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { SITE_URL } from '@/config/site';
import { ServiceArticlePage, serviceBlogPath } from '@/components/services/ServiceArticle';
import { getServiceArticlePresentation, getServiceBlog } from '@/components/services/service-blogs';
import { CorporateWebsiteGuidePage, getCorporateWebsiteGuideMeta, getCorporateWebsiteGuideSlugs } from '@/components/services/CorporateWebsiteSubpage';
import { CorporateWebsiteArticlePage, getCorporateWebsiteArticle, getCorporateWebsiteArticleMeta, getCorporateWebsiteArticleSlugs } from '@/components/services/CorporateWebsiteArticle';
import { getShopifyGuide, getShopifyGuides } from '@/components/services/service-blogs/shopify-content';
import { getCustomEcommerceGuide, getCustomEcommerceGuides } from '@/components/services/service-blogs/custom-ecommerce';
import { getMarketplaceGuide, getMarketplaceGuides } from '@/components/services/service-blogs/marketplace';
import { getSeoGuide, getSeoGuides } from '@/components/services/service-blogs/seo';
import { getEcommerceSeoGuide, getEcommerceSeoGuides } from '@/components/services/service-blogs/ecommerce-seo';
import { getTechnicalSeoGuide, getTechnicalSeoGuides } from '@/components/services/service-blogs/technical-seo';
import { getGoogleAdsGuide, getGoogleAdsGuides } from '@/components/services/service-blogs/google-ads';

// DB-backed service guides (see getServiceBlogArticle) pick up edits hourly;
// admin saves also revalidate the 'blog' cache tag immediately.
export const revalidate = 3600;

export function generateStaticParams() {
  const locales = ['en', 'tr'] as const;
  const articleSlugs = [...getCorporateWebsiteGuideSlugs(), ...getCorporateWebsiteArticleSlugs()];
  const corporate = locales.flatMap((locale) => articleSlugs
    .filter((articleSlug) => locale === 'tr' || !getCorporateWebsiteArticle(articleSlug))
    .map((articleSlug) => ({ locale, slug: 'corporate-website-design', articleSlug })));
  const shopify = getShopifyGuides().map(({ slug: articleSlug }) => ({ locale: 'tr', slug: 'shopify-development', articleSlug }));
  const customEcommerce = getCustomEcommerceGuides().map(({ slug: articleSlug }) => ({ locale: 'tr', slug: 'custom-ecommerce', articleSlug }));
  const seo = getSeoGuides().map(({ slug: articleSlug }) => ({ locale: 'tr', slug: 'seo', articleSlug }));
  const technicalSeo = getTechnicalSeoGuides().map(({ slug: articleSlug }) => ({ locale: 'tr', slug: 'technical-seo', articleSlug }));
  const ecommerceSeo = getEcommerceSeoGuides().map(({ slug: articleSlug }) => ({ locale: 'tr', slug: 'ecommerce-seo', articleSlug }));
  const marketplace = getMarketplaceGuides().map(({ slug: articleSlug }) => ({ locale: 'tr', slug: 'marketplace-development', articleSlug }));
  const googleAds = getGoogleAdsGuides().map(({ slug: articleSlug }) => ({ locale: 'tr', slug: 'google-ads', articleSlug }));
  return [...corporate, ...shopify, ...customEcommerce, ...marketplace, ...seo, ...ecommerceSeo, ...technicalSeo, ...googleAds];
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
  if (serviceSlug === 'shopify-development' && locale === 'tr') {
    const post = getShopifyGuide(articleSlug);
    if (!post) return null;
    return { blog, post, canonical: `${SITE_URL}${serviceBlogPath(blog.config)}/${articleSlug}` };
  }
  if (serviceSlug === 'seo' && locale === 'tr') {
    const post = getSeoGuide(articleSlug);
    if (!post) return null;
    return { blog, post, canonical: `${SITE_URL}${serviceBlogPath(blog.config)}/${articleSlug}` };
  }
  if (serviceSlug === 'technical-seo' && locale === 'tr') {
    const post = getTechnicalSeoGuide(articleSlug);
    if (!post) return null;
    return { blog, post, canonical: `${SITE_URL}${serviceBlogPath(blog.config)}/${articleSlug}` };
  }
  if (serviceSlug === 'google-ads' && locale === 'tr') {
    const post = getGoogleAdsGuide(articleSlug);
    if (!post) return null;
    return { blog, post, canonical: `${SITE_URL}${serviceBlogPath(blog.config)}/${articleSlug}` };
  }
  if (serviceSlug === 'ecommerce-seo' && locale === 'tr') {
    const post = getEcommerceSeoGuide(articleSlug);
    if (!post) return null;
    return { blog, post, canonical: `${SITE_URL}${serviceBlogPath(blog.config)}/${articleSlug}` };
  }
  if (serviceSlug === 'marketplace-development' && locale === 'tr') {
    const post = getMarketplaceGuide(articleSlug);
    if (!post) return null;
    return { blog, post, canonical: `${SITE_URL}${serviceBlogPath(blog.config)}/${articleSlug}` };
  }
  if (serviceSlug === 'custom-ecommerce' && locale === 'tr') {
    const post = getCustomEcommerceGuide(articleSlug);
    if (!post) return null;
    return { blog, post, canonical: `${SITE_URL}${serviceBlogPath(blog.config)}/${articleSlug}` };
  }
  const { getPublicServiceBlogPostBySlug } = await import('@/lib/database/public-queries');
  const post = await getPublicServiceBlogPostBySlug(articleSlug, locale, serviceSlug, serviceSlug === 'ikas-development' ? 'cover-images-2026-11' : '');
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
    const relatedCards = slug === 'technical-seo' ? getTechnicalSeoGuides().map((guide) => ({ slug: guide.slug, title: guide.title, excerpt: guide.excerpt, featuredImage: guide.featuredImage }))
      : slug === 'ecommerce-seo' ? getEcommerceSeoGuides().map((guide) => ({ slug: guide.slug, title: guide.title, excerpt: guide.excerpt, featuredImage: guide.featuredImage }))
      : slug === 'seo' ? getSeoGuides().map((guide) => ({ slug: guide.slug, title: guide.title, excerpt: guide.excerpt, featuredImage: guide.featuredImage }))
      : slug === 'shopify-development'
      ? getShopifyGuides().map((guide) => ({ slug: guide.slug, title: guide.title, excerpt: guide.excerpt, featuredImage: guide.featuredImage }))
      : slug === 'custom-ecommerce' ? getCustomEcommerceGuides().map((guide) => ({ slug: guide.slug, title: guide.title, excerpt: guide.excerpt, featuredImage: guide.featuredImage }))
      : slug === 'marketplace-development' ? getMarketplaceGuides().map((guide) => ({ slug: guide.slug, title: guide.title, excerpt: guide.excerpt, featuredImage: guide.featuredImage }))
      : slug === 'google-ads' ? getGoogleAdsGuides().map((guide) => ({ slug: guide.slug, title: guide.title, excerpt: guide.excerpt, featuredImage: guide.featuredImage }))
      : await (async () => {
        const { getPublicServiceBlogCards } = await import('@/lib/database/public-queries');
        return getPublicServiceBlogCards(slug, locale, 24, slug === 'ikas-development' ? 'cover-images-2026-11' : '').catch(() => []);
      })();
    const relatedPosts = relatedCards
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
        datePublished: published || undefined,
        // Same-day re-publishes are not shown as "updated".
        dateModified: (modified > published ? modified : published) || undefined,
        body: post.content,
        keywords: post.tags,
      }}
      relatedPosts={relatedPosts}
      motionScope={slug === 'ikas-development' && locale === 'tr' ? 'ikas' : slug === 'shopify-development' && locale === 'tr' ? 'shopify' : undefined}
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
