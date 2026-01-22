// src/app/[locale]/services/ai-security-review/page.tsx
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import AIServicePage from '@/components/ai-services/AIServicePage';

const baseUrl = 'https://paksoft.com.tr';
const servicePath = '/services/ai-security-review';
const serviceKey = 'aiSecurityReview';

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

  const title = 'AI Security Review & Governance | PakSoft';
  const description = 'Protect your AI systems from prompt injection, data leakage, and emerging threats. Our AI security audits ensure compliance and robust governance.';

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
      images: [{ url: '/images/services/ai-security.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function AISecurityReviewPage() {
  return <AIServicePage serviceKey={serviceKey} accentColor="orange" />;
}
