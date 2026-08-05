import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import BlogPostView from './BlogPostView';

import { SITE_URL as baseUrl } from '@/config/site';

// ISR: render once, cache for an hour, regenerate in the background. New slugs
// render on first request then cache (dynamicParams default = true). This stops
// every visit from hitting the database.
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

async function getPost(slug: string, locale: string) {
  // Cached public query (1h, tag 'blog') — generateMetadata and the page body
  // share one cache entry instead of two raw Neon reads per render.
  const { getPublicBlogPostBySlug } = await import('@/lib/database/public-queries');
  return getPublicBlogPostBySlug(slug, locale);
}

// Resolve the right locale's title/excerpt/content off the post.
function localized(post: any, locale: string) {
  if (!post) return { title: '', excerpt: '', content: '' };
  if (locale !== 'en') {
    const t = (post.translations || []).find((x: any) => x.locale === locale);
    if (t) return { title: t.title, excerpt: t.excerpt, content: t.content, metaTitle: t.metaTitle, metaDescription: t.metaDescription };
  }
  return { title: post.title, excerpt: post.excerpt, content: post.content, metaTitle: post.metaTitle, metaDescription: post.metaDescription };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const post = await getPost(slug, validLocale);
  if (!post) return { title: 'Post Not Found | PakSoft' };

  const l = localized(post, validLocale);
  const title = (l.metaTitle || `${l.title} | PakSoft Blog`).slice(0, 70);
  const description = (l.metaDescription || l.excerpt || `${l.title} — insights from the PakSoft team.`).slice(0, 200);
  const url = `${baseUrl}/${validLocale}/blog/${slug}`;

  // Posts are single-language (BlogPost.language). When this URL's locale
  // doesn't match the post's language and no translation row exists, the page
  // serves the source-language content — canonicalize those duplicates to the
  // source-language URL so only one version competes in search.
  const postLanguage = (post as { language?: string }).language || 'en';
  const hasTranslation =
    validLocale === postLanguage ||
    ((post as { translations?: { locale: string }[] }).translations || []).some(t => t.locale === validLocale);
  const canonical = hasTranslation ? url : `${baseUrl}/${postLanguage}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url,
      siteName: 'PakSoft',
      type: 'article',
      ...(post.publishedAt ? { publishedTime: new Date(post.publishedAt).toISOString() } : {}),
      ...(post.featuredImage ? { images: [{ url: post.featuredImage }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const post = await getPost(slug, validLocale);

  // Real 404 for unknown slugs — previously this rendered an empty page with
  // HTTP 200 (a soft-404 that Google indexes and demotes).
  if (!post) notFound();

  const l = post ? localized(post, validLocale) : null;
  const url = `${baseUrl}/${validLocale}/blog/${slug}`;

  return (
    <>
      {post && l && (
        <>
          <ArticleJsonLd
            headline={l.title}
            description={l.excerpt || l.metaDescription}
            url={url}
            image={post.featuredImage || undefined}
            datePublished={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}
            dateModified={post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined}
            section={post.category}
            keywords={Array.isArray(post.tags) ? post.tags : undefined}
          />
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', url: `${baseUrl}/${validLocale}` },
              { name: 'Blog', url: `${baseUrl}/${validLocale}/blog` },
              { name: l.title, url },
            ]}
          />
        </>
      )}
      {/* Pass the already-fetched post down so the client view doesn't
          re-fetch it through the API (previously a second, uncached DB read
          per pageview). */}
      <BlogPostView initialPost={post ? (JSON.parse(JSON.stringify(post)) as never) : null} />
    </>
  );
}
