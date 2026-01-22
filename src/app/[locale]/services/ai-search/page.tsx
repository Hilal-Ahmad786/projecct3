// src/app/[locale]/services/ai-search/page.tsx
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import AIServicePage from '@/components/ai-services/AIServicePage';

const baseUrl = 'https://paksoft.com.tr';
const servicePath = '/services/ai-search';
const serviceKey = 'aiSearch';

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  ur: 'ur_PK',
  ar: 'ar_SA',
};

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;

  const title = 'AI Search & Personalization | PakSoft';
  const description = 'Enhance your e-commerce and content platforms with AI-powered search and personalization. Deliver relevant results and boost conversions.';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${servicePath}`,
      languages: generateAlternateLinks(servicePath),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${validLocale}${servicePath}`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [{ url: '/images/services/ai-search.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function AISearchPage() {
  return <AIServicePage serviceKey={serviceKey} accentColor="emerald" />;
}
