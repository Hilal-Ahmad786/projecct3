// Service content utilities
// Maps service slugs to JSON translation keys and provides content fallbacks

import { Locale } from './i18n';

/**
 * Convert a slug like 'web-development' to camelCase like 'webDevelopment'
 */
export function slugToCamelCase(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Get the translation key for a service's page content
 * e.g., 'web-development' → 'servicePages.webDevelopment'
 */
export function getServicePageKey(slug: string): string {
  return `servicePages.${slugToCamelCase(slug)}`;
}

/**
 * Service content structure from JSON translations
 */
export interface ServicePageContent {
  hero?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    description?: string;
    cta?: string;
    secondaryCta?: string;
  };
  services?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    subtitle?: string;
    items?: Array<{
      title: string;
      description: string;
      features?: string[];
    }>;
  };
  process?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    subtitle?: string;
    steps?: Array<{
      step: number;
      title: string;
      description: string;
    }>;
  };
  whyUs?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    subtitle?: string;
    benefits?: Array<{
      title: string;
      description: string;
    }>;
  };
  technologies?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    items?: Array<{
      name: string;
      icon?: string;
    }>;
  };
  faq?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    items?: Array<{
      question: string;
      answer: string;
    }>;
  };
  portfolio?: {
    eyebrow?: string;
    title?: string;
    titleAccent?: string;
    subtitle?: string;
    items?: Array<{
      title: string;
      description?: string;
      industry?: string;
      challenge?: string;
      solution?: string;
      results?: string[];
    }>;
  };
  cta?: {
    title?: string;
    description?: string;
    primaryButton?: string;
    secondaryButton?: string;
  };
}

/**
 * Get nested value from translations object using dot notation
 */
export function getNestedTranslation(translations: any, path: string): any {
  return path.split('.').reduce((obj, key) => obj?.[key], translations);
}

/**
 * Get service page content from translations
 * Returns null if the service doesn't have JSON content
 */
export function getServicePageContent(
  translations: any,
  slug: string
): ServicePageContent | null {
  const key = slugToCamelCase(slug);
  const content = translations?.servicePages?.[key];
  return content || null;
}

/**
 * Merge database service data with JSON translations
 * JSON content takes priority when available
 */
export function mergeServiceContent(
  dbService: any,
  jsonContent: ServicePageContent | null
): any {
  if (!jsonContent) {
    return dbService;
  }

  return {
    ...dbService,
    // Override with JSON content if available
    name: jsonContent.hero?.title || dbService.name,
    description: jsonContent.hero?.description || dbService.description,
    shortDescription: jsonContent.hero?.description || dbService.shortDescription,

    // Features from JSON services.items or keep database features
    features: jsonContent.services?.items?.map(item => item.title) || dbService.features,

    // Benefits from JSON whyUs.benefits or keep database benefits
    benefits: jsonContent.whyUs?.benefits?.map(b => b.title) || dbService.benefits,

    // Merge content object
    content: {
      ...dbService.content,
      // Process steps from JSON
      process: jsonContent.process?.steps || dbService.content?.process,
      // FAQ from JSON
      faq: jsonContent.faq?.items || dbService.content?.faq,
      // Technologies from JSON
      technologies: jsonContent.technologies?.items || dbService.content?.technologies,
      // Portfolio from JSON
      portfolio: jsonContent.portfolio?.items?.map(item => ({
        title: item.title,
        category: item.industry || '',
        image: '',
        description: item.description,
        challenge: item.challenge,
        solution: item.solution,
        results: item.results,
      })) || dbService.content?.portfolio,
    },

    // Store full JSON content for components that need it
    _jsonContent: jsonContent,
  };
}

/**
 * Check if a service has JSON content available
 */
export function hasServiceJsonContent(translations: any, slug: string): boolean {
  const key = slugToCamelCase(slug);
  return !!translations?.servicePages?.[key];
}
