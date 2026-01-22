# SEO Implementation Guide

This document describes the SEO implementation for the PakSoft website.

## Multilingual SEO (5 Languages)

The website supports 5 languages:
- **English (en)** - Default
- **Turkish (tr)**
- **German (de)**
- **Urdu (ur)** - RTL
- **Arabic (ar)** - RTL

### URL Structure

All public pages follow the pattern:
```
https://paksoft.com.tr/{locale}/{path}
```

Examples:
- `https://paksoft.com.tr/en/services`
- `https://paksoft.com.tr/tr/hizmetler`
- `https://paksoft.com.tr/de/dienstleistungen`

### hreflang Implementation

Every page includes hreflang tags for all supported languages plus x-default:

```html
<link rel="alternate" hreflang="en" href="https://paksoft.com.tr/en/about" />
<link rel="alternate" hreflang="tr" href="https://paksoft.com.tr/tr/about" />
<link rel="alternate" hreflang="de" href="https://paksoft.com.tr/de/about" />
<link rel="alternate" hreflang="ur" href="https://paksoft.com.tr/ur/about" />
<link rel="alternate" hreflang="ar" href="https://paksoft.com.tr/ar/about" />
<link rel="alternate" hreflang="x-default" href="https://paksoft.com.tr/en/about" />
```

### Adding hreflang to New Pages

Use the `generateAlternateLinks` function from `@/lib/seo`:

```typescript
import { generateAlternateLinks } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `https://paksoft.com.tr/${locale}/your-page`,
      languages: generateAlternateLinks('/your-page'),
    },
  };
}
```

## Structured Data (JSON-LD)

The following schema types are implemented:

### Global (All Pages)
- **Organization** - Company information
- **LocalBusiness** - Local business details
- **WebSite** - Site search action

### Service Pages
- **Service** - Service details
- **BreadcrumbList** - Navigation path
- **FAQPage** - FAQ section

### Blog Posts
- **Article** - Blog post metadata

### Usage

Import from `@/components/seo/JsonLd`:

```tsx
import { ServiceJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';

// In your component
<ServiceJsonLd
  name="Web Development"
  description="Custom web development services"
  url="https://paksoft.com.tr/en/services/web-development"
/>
```

## Sitemap

The sitemap is automatically generated at `/sitemap.xml` and includes:
- All localized versions of each page
- hreflang alternates for each entry
- Priority levels based on page type
- Weekly/daily change frequencies

### Adding Routes to Sitemap

Edit `src/app/sitemap.ts`:

```typescript
const mainRoutes = [
  { path: '/your-new-page', priority: 0.8, changeFreq: 'weekly' },
];
```

## robots.txt

Located at `/robots.txt`, it:
- Allows crawling of all public pages
- Blocks `/admin/*` and `/api/*`
- Includes sitemap URL

## Adding Translations

### 1. Add Keys to Translation Files

Edit the JSON files in `src/locales/`:
- `en.json` (English - base)
- `tr.json` (Turkish)
- `de.json` (German)
- `ur.json` (Urdu)
- `ar.json` (Arabic)

### 2. Translation Structure

```json
{
  "pageName": {
    "hero": {
      "title": "Page Title",
      "description": "Page description"
    }
  }
}
```

### 3. Using Translations in Components

**Server Components:**
```typescript
import { createTranslator } from '@/lib/server-i18n';

export default async function Page({ params }) {
  const { locale } = await params;
  const t = createTranslator(locale);

  return <h1>{t('pageName.hero.title')}</h1>;
}
```

**Client Components:**
```typescript
import { useTranslations } from '@/hooks/useTranslations';

export default function Component() {
  const { t } = useTranslations();

  return <h1>{t('pageName.hero.title')}</h1>;
}
```

## SEO Checklist for New Pages

- [ ] Add `generateMetadata` function with localized title/description
- [ ] Include hreflang alternates using `generateAlternateLinks`
- [ ] Add canonical URL
- [ ] Include OpenGraph and Twitter card metadata
- [ ] Add appropriate structured data (JSON-LD)
- [ ] Add route to sitemap.ts
- [ ] Ensure page renders with real content (no loading states in initial HTML)
- [ ] Verify translations exist for all 5 languages
