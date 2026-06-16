import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import BlogPostView from './BlogPostView';

const baseUrl = 'https://www.paksoft.com.tr';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string; locale: Locale }>;
}

async function getPost(slug: string, locale: string) {
  const { getBlogPostBySlug } = await import('@/lib/admin/database/blog-queries');
  return getBlogPostBySlug(slug, locale);
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

  return {
    title,
    description,
    alternates: { canonical: url },
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
      <BlogPostView />
    </>
  );
}
