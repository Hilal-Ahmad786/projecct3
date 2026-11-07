import { localizeFullPath } from '@/lib/routes';
import type { Locale } from '@/lib/i18n';

// Services whose blog posts (BlogPost rows with category = service slug) are
// served as long-form guides at /<locale>/<services>/<slug>/blog/<article>
// using the shared ServiceArticlePage layout, instead of the generic
// /<locale>/blog/<article> page. To add a service: list it here, add its
// config in src/components/services/service-blogs/, and put its articles in
// content/blog/<folder>/ with a manifest.json.
const SERVICE_BLOGS: Record<string, readonly string[]> = {
  'e-commerce': ['tr'],
  'ikas-development': ['tr'],
  'shopify-development': ['tr'],
  'custom-ecommerce': ['tr'],
  'marketplace-development': ['tr'],
  'seo': ['tr'],
  'ecommerce-seo': ['tr'],
  'technical-seo': ['tr'],
};

export function hasServiceBlog(category: string | null | undefined, locale: string): boolean {
  return !!category && (SERVICE_BLOGS[category]?.includes(locale) ?? false);
}

export function serviceArticlePath(category: string, locale: string, slug: string): string {
  return `/${locale}${localizeFullPath(`/services/${category}/blog/${slug}`, locale as Locale)}`;
}
