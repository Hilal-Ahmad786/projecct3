'use client';

import Script from 'next/script';

// Organization Schema
export interface OrganizationProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  email?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

export function OrganizationJsonLd({
  name = 'PakSoft',
  url = 'https://paksoft.com.tr',
  logo = 'https://paksoft.com.tr/logo.png',
  description = 'Enterprise web development, AI solutions, e-commerce, automation and digital marketing services',
  email = 'info@paksoft.com',
  telephone = '+90 552 567 71 64',
  address = {
    streetAddress: 'Bozok Technopark',
    addressLocality: 'Yozgat',
    addressCountry: 'Turkey',
  },
  sameAs = [
    'https://linkedin.com/company/paksoft',
    'https://twitter.com/paksoft',
    'https://github.com/paksoft',
  ],
}: OrganizationProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    email,
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    sameAs,
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// LocalBusiness Schema
export interface LocalBusinessProps {
  name?: string;
  url?: string;
  image?: string;
  description?: string;
  email?: string;
  telephone?: string;
  priceRange?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
}

export function LocalBusinessJsonLd({
  name = 'PakSoft',
  url = 'https://paksoft.com.tr',
  image = 'https://paksoft.com.tr/images/office.jpg',
  description = 'Enterprise web development, AI solutions, e-commerce, automation and digital marketing services',
  email = 'info@paksoft.com',
  telephone = '+90 552 567 71 64',
  priceRange = '$$',
  address = {
    streetAddress: 'Bozok Technopark',
    addressLocality: 'Yozgat',
    addressCountry: 'Turkey',
  },
  geo = {
    latitude: 39.8183,
    longitude: 34.8147,
  },
  openingHours = ['Mo-Fr 09:00-18:00', 'Sa 10:00-16:00'],
}: LocalBusinessProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}/#localbusiness`,
    name,
    url,
    image,
    description,
    email,
    telephone,
    priceRange,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...geo,
    },
    openingHoursSpecification: openingHours.map((hours) => {
      const [days, time] = hours.split(' ');
      const [opens, closes] = time.split('-');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days,
        opens,
        closes,
      };
    }),
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema
export interface ServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  providerUrl?: string;
  areaServed?: string[];
  serviceType?: string;
  image?: string;
}

export function ServiceJsonLd({
  name,
  description,
  url,
  provider = 'PakSoft',
  providerUrl = 'https://paksoft.com.tr',
  areaServed = ['Worldwide'],
  serviceType,
  image,
}: ServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: providerUrl,
    },
    areaServed: areaServed.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    ...(serviceType && { serviceType }),
    ...(image && { image }),
  };

  return (
    <Script
      id={`service-schema-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQJsonLdProps {
  faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema (for sitelinks search box)
export interface WebSiteJsonLdProps {
  name?: string;
  url?: string;
  searchUrl?: string;
}

export function WebSiteJsonLd({
  name = 'PakSoft',
  url = 'https://paksoft.com.tr',
  searchUrl = 'https://paksoft.com.tr/search?q={search_term_string}',
}: WebSiteJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Combined schemas for the main layout
export function GlobalJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
    </>
  );
}
