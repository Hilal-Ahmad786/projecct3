// src/app/[locale]/services/ai-maintenance/page.tsx
import { Metadata } from 'next';
import { Locale, locales, defaultLocale } from '@/lib/i18n';
import { generateAlternateLinks } from '@/lib/seo';
import AIServicePage from '@/components/ai-services/AIServicePage';

const baseUrl = 'https://paksoft.com.tr';
const servicePath = '/services/ai-maintenance';
const serviceKey = 'aiMaintenance';

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

  const title = 'AI Maintenance & Support Subscription | PakSoft';
  const description = 'Keep your AI systems running optimally with our maintenance subscription. 24/7 monitoring, updates, and dedicated support for your AI infrastructure.';

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
      images: [{ url: '/images/services/ai-maintenance.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function AIMaintenancePage() {
  return <AIServicePage serviceKey={serviceKey} accentColor="purple" />;
}
