// src/lib/seo.ts
// SEO utilities for multilingual pages

import { Metadata } from 'next';
import { Locale, locales, defaultLocale, localeNames } from './i18n';
import { getTranslations, createTranslator } from './server-i18n';
import { localizeFullPath } from './routes';

import { SITE_URL as baseUrl } from '@/config/site';

// OpenGraph locale mappings
const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  ur: 'ur_PK',
  ar: 'ar_SA',
};

interface PageSEOConfig {
  titleKey: string;
  descriptionKey: string;
  path: string;
  imageUrl?: string;
}

// Generate hreflang alternate links with localized paths
// The `path` parameter should be the English path (e.g., '/services/web-development/features')
// This function will translate the path segments for each locale
export function generateAlternateLinks(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  locales.forEach(locale => {
    const localizedPath = localizeFullPath(path, locale);
    languages[locale] = `${baseUrl}/${locale}${localizedPath}`;
  });

  // Add x-default pointing to default locale (English) with English path
  const defaultLocalizedPath = localizeFullPath(path, defaultLocale);
  languages['x-default'] = `${baseUrl}/${defaultLocale}${defaultLocalizedPath}`;

  return languages;
}

// Generate full page metadata with hreflang, canonical, OG, etc.
// The `config.path` should be the English path - it will be localized for the canonical URL
export function generatePageMetadata(
  locale: Locale,
  config: PageSEOConfig
): Metadata {
  const t = createTranslator(locale);
  const translations = getTranslations(locale);

  const title = t(config.titleKey);
  const description = t(config.descriptionKey);
  // Use localized path for the canonical URL
  const localizedPath = localizeFullPath(config.path, locale);
  const canonicalUrl = `${baseUrl}/${locale}${localizedPath}`;
  const imageUrl = config.imageUrl || '/images/og-image.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateLinks(config.path),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'PakSoft',
      locale: ogLocaleMap[locale],
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@paksoft3',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Generate metadata for service pages
export function generateServiceMetadata(
  locale: Locale,
  serviceSlug: string
): Metadata {
  const t = createTranslator(locale);
  const servicePath = `/services/${serviceSlug}`;

  // Try to get service-specific translations, fallback to generic
  let title: string;
  let description: string;

  try {
    title = t(`services.${serviceSlug}.title`) || t(`services.list.${serviceSlug}.title`);
    description = t(`services.${serviceSlug}.description`) || t(`services.list.${serviceSlug}.description`);
  } catch {
    title = `${serviceSlug.replace(/-/g, ' ')} | PakSoft`;
    description = t('metadata.defaultDescription');
  }

  return generatePageMetadata(locale, {
    titleKey: 'metadata.defaultTitle', // Will be overridden
    descriptionKey: 'metadata.defaultDescription',
    path: servicePath,
  });
}

// Generate JSON-LD Organization schema
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PakSoft',
    url: baseUrl,
    logo: `${baseUrl}/images/logo/logo.png`,
    description: 'Enterprise web development, e-commerce, automation bots and digital marketing solutions',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
      addressLocality: 'Istanbul',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-XXX-XXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Turkish', 'German', 'Arabic', 'Urdu'],
    },
    sameAs: [
      'https://twitter.com/paksoft3',
      'https://facebook.com/Paksoft',
      'https://instagram.com/paksoft3',
      'https://www.linkedin.com/company/paksoft',
    ],
  };
}

// Generate JSON-LD WebSite schema with search action
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PakSoft',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate JSON-LD Service schema
export function generateServiceSchema(
  locale: Locale,
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'PakSoft',
      url: baseUrl,
    },
    url: serviceUrl,
    areaServed: 'Worldwide',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: serviceUrl,
      serviceLanguage: locale,
    },
  };
}

// Generate JSON-LD BreadcrumbList schema
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate JSON-LD Article schema for blog posts
export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  imageUrl: string,
  authorName: string,
  publishedDate: string,
  modifiedDate?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PakSoft',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo/logo.png`,
      },
    },
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

// Generate JSON-LD FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export { baseUrl, ogLocaleMap };
