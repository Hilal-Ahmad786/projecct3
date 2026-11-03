import { hasServiceBlog } from '@/lib/service-blogs';
import type { ServiceArticleConfig } from '@/components/services/ServiceArticle';
import type { ServiceBlogDefinition } from './types';
import { ecommerceBlog } from './ecommerce';
import { ikasBlog } from './ikas';

// Presentation config per service blog. The list of enabled services/locales
// lives in src/lib/service-blogs.ts (kept JSX-free for the sitemap).
const definitions: Record<string, ServiceBlogDefinition> = {
  'e-commerce': ecommerceBlog,
  'ikas-development': ikasBlog,
};

export function getServiceBlog(serviceSlug: string, locale: string): ServiceBlogDefinition | null {
  return hasServiceBlog(serviceSlug, locale) ? definitions[serviceSlug] ?? null : null;
}

/** Per-article presentation details, with service-level fallbacks. */
export function getServiceArticlePresentation(blog: ServiceBlogDefinition, slug: string, title: string) {
  const entry = blog.articles.find((article) => article.slug === slug);
  const config: ServiceArticleConfig = entry?.ctas
    ? { ...blog.config, ctas: { ...blog.config.ctas, ...entry.ctas } }
    : blog.config;
  return {
    config,
    category: entry?.categoryLabel ?? blog.defaultCategoryLabel,
    coverAlt: entry?.imageAlt ?? title,
    readingMinutes: entry?.readingMinutes,
  };
}
