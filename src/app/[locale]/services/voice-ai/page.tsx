// src/app/[locale]/services/voice-ai/page.tsx
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { createTranslator } from '@/lib/server-i18n';
import { generateAlternateLinks } from '@/lib/seo';
import AIServicePage from '@/components/ai-services/AIServicePage';

const baseUrl = 'https://paksoft.com.tr';
const servicePath = '/services/voice-ai';
const serviceKey = 'voiceAi';

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

  const title = 'Voice AI & Call Center Automation | PakSoft';
  const description = 'Transform your customer service with AI-powered voice assistants and call center automation. Reduce costs, improve response times, and scale effortlessly.';

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
      images: [{ url: '/images/services/voice-ai.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function VoiceAIPage() {
  return <AIServicePage serviceKey={serviceKey} accentColor="purple" />;
}
