import type { CtaCopy, CtaStage, ServiceArticleConfig } from '@/components/services/ServiceArticle';

/** One entry of content/blog/<folder>/manifest.json (extra keys are ignored). */
export type ServiceBlogManifestEntry = {
  slug: string;
  /** Overline above the title and on cards; falls back to defaultCategoryLabel. */
  categoryLabel?: string;
  /** Cover alt text; falls back to the article title. */
  imageAlt?: string;
  /** Editorially calculated from the complete body and shown on listing cards. */
  readingMinutes?: number;
  /** Per-article CTA copy; falls back to the service's config.ctas. */
  ctas?: Partial<Record<CtaStage, CtaCopy>>;
};

export type ServiceBlogDefinition = {
  config: ServiceArticleConfig;
  defaultCategoryLabel: string;
  articles: readonly ServiceBlogManifestEntry[];
};
