import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import manifest from '../../../../content/blog/shopify/manifest.json';

export type ShopifyGuide = (typeof manifest)[number];

export function getShopifyGuides() {
  return manifest;
}

export function getShopifyGuide(slug: string) {
  const entry = manifest.find((item) => item.slug === slug);
  if (!entry) return null;
  const content = readFileSync(join(process.cwd(), 'content/blog/shopify', `${entry.slug}.md`), 'utf8');
  return {
    ...entry,
    content,
    // This content is prepared in the repository but has not been deployed.
    // Do not display a publication date until an actual publication date exists.
    publishedAt: null,
    updatedAt: entry.dateModified,
    language: 'tr',
  };
}
