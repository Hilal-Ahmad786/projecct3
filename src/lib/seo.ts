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

// Truncate text at a word boundary (max `max` chars) with an ellipsis suffix.
// Used for meta descriptions so we never cut a word in half.
export function truncateAtWord(text: string, max: number): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1); // leave room for the ellipsis
  const lastSpace = cut.lastIndexOf(' ');
  const truncated = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.!?…–—-]+$/, '');
  return `${truncated}…`;
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

// ---------------------------------------------------------------------------
// Localized title/description templates for service sub-pages
// (/services/[slug]/{faq,features,process,technologies,pricing,portfolio}).
// `{name}` is replaced with the (already localized) service name.
// ---------------------------------------------------------------------------
export type ServiceSubPage = 'faq' | 'features' | 'process' | 'technologies' | 'pricing' | 'portfolio';

const serviceSubPageTemplates: Record<ServiceSubPage, Record<Locale, { title: string; description: string }>> = {
  faq: {
    en: { title: '{name} FAQ - Frequently Asked Questions | PakSoft', description: 'Find answers to frequently asked questions about our {name} service. Get the information you need.' },
    tr: { title: '{name} Sıkça Sorulan Sorular | PakSoft', description: '{name} hizmetimizle ilgili sıkça sorulan soruların yanıtlarını bulun. İhtiyacınız olan bilgilere ulaşın.' },
    de: { title: '{name} FAQ – Häufige Fragen | PakSoft', description: 'Antworten auf häufig gestellte Fragen zu unserem {name}-Service. Alle Informationen, die Sie brauchen.' },
    ur: { title: '{name} عمومی سوالات | PakSoft', description: 'ہماری {name} سروس کے بارے میں اکثر پوچھے جانے والے سوالات کے جوابات حاصل کریں۔' },
    ar: { title: '{name} الأسئلة الشائعة | PakSoft', description: 'اعثر على إجابات للأسئلة الشائعة حول خدمة {name} لدينا واحصل على المعلومات التي تحتاجها.' },
  },
  features: {
    en: { title: '{name} Features & Capabilities | PakSoft', description: 'Explore the key features and capabilities of our {name} service. Discover what makes our solutions stand out.' },
    tr: { title: '{name} Özellikler ve Yetenekler | PakSoft', description: '{name} hizmetimizin öne çıkan özelliklerini ve yeteneklerini keşfedin. Çözümlerimizi farklı kılan detayları inceleyin.' },
    de: { title: '{name} Funktionen & Leistungen | PakSoft', description: 'Entdecken Sie die wichtigsten Funktionen und Leistungen unseres {name}-Services und erfahren Sie, was unsere Lösungen auszeichnet.' },
    ur: { title: '{name} خصوصیات اور صلاحیتیں | PakSoft', description: 'ہماری {name} سروس کی نمایاں خصوصیات اور صلاحیتیں دریافت کریں اور جانیں کہ ہمارے حل کیوں منفرد ہیں۔' },
    ar: { title: '{name} الميزات والإمكانيات | PakSoft', description: 'اكتشف أبرز ميزات وإمكانيات خدمة {name} لدينا وتعرّف على ما يميز حلولنا.' },
  },
  process: {
    en: { title: '{name} Process & Methodology | PakSoft', description: 'Learn about our proven process and methodology for {name}. From discovery to deployment, see how we deliver results.' },
    tr: { title: '{name} Süreç ve Metodoloji | PakSoft', description: '{name} için kanıtlanmış süreç ve metodolojimizi keşfedin. Keşiften teslimata kadar nasıl sonuç ürettiğimizi görün.' },
    de: { title: '{name} Prozess & Methodik | PakSoft', description: 'Lernen Sie unseren bewährten Prozess und unsere Methodik für {name} kennen – von der Analyse bis zum Livegang.' },
    ur: { title: '{name} طریقہ کار اور مراحل | PakSoft', description: '{name} کے لیے ہمارا آزمودہ طریقہ کار جانیں — دریافت سے تکمیل تک ہم کیسے نتائج فراہم کرتے ہیں۔' },
    ar: { title: '{name} العملية والمنهجية | PakSoft', description: 'تعرّف على عمليتنا ومنهجيتنا المجرّبة في {name} — من الاستكشاف إلى الإطلاق، شاهد كيف نحقق النتائج.' },
  },
  technologies: {
    en: { title: '{name} Technologies & Tools | PakSoft', description: 'Discover the cutting-edge technologies and tools we use for {name}. Modern, scalable, and battle-tested solutions.' },
    tr: { title: '{name} Teknolojiler ve Araçlar | PakSoft', description: '{name} için kullandığımız modern teknolojileri ve araçları keşfedin. Ölçeklenebilir ve kanıtlanmış çözümler.' },
    de: { title: '{name} Technologien & Tools | PakSoft', description: 'Entdecken Sie die modernen Technologien und Tools, die wir für {name} einsetzen – skalierbar und praxiserprobt.' },
    ur: { title: '{name} ٹیکنالوجیز اور ٹولز | PakSoft', description: '{name} کے لیے استعمال ہونے والی جدید ٹیکنالوجیز اور ٹولز دریافت کریں — قابلِ توسیع اور آزمودہ حل۔' },
    ar: { title: '{name} التقنيات والأدوات | PakSoft', description: 'اكتشف أحدث التقنيات والأدوات التي نستخدمها في {name} — حلول حديثة وقابلة للتوسع ومجرّبة.' },
  },
  pricing: {
    en: { title: '{name} Pricing & Packages | PakSoft', description: 'Transparent pricing for {name}. Choose a package or get a tailored, fixed-price proposal within 48 hours — no hidden fees.' },
    tr: { title: '{name} Fiyatlandırma ve Paketler | PakSoft', description: '{name} için şeffaf fiyatlandırma. Bir paket seçin veya 48 saat içinde size özel sabit fiyatlı teklif alın — gizli ücret yok.' },
    de: { title: '{name} Preise & Pakete | PakSoft', description: 'Transparente Preise für {name}. Wählen Sie ein Paket oder erhalten Sie innerhalb von 48 Stunden ein individuelles Festpreisangebot – ohne versteckte Kosten.' },
    ur: { title: '{name} قیمتیں اور پیکجز | PakSoft', description: '{name} کے لیے شفاف قیمتیں۔ کوئی پیکج منتخب کریں یا 48 گھنٹوں میں مقررہ قیمت کی خصوصی پیشکش حاصل کریں — کوئی پوشیدہ فیس نہیں۔' },
    ar: { title: '{name} الأسعار والباقات | PakSoft', description: 'أسعار شفافة لخدمة {name}. اختر باقة أو احصل على عرض سعر ثابت ومخصص خلال 48 ساعة — بدون رسوم خفية.' },
  },
  portfolio: {
    en: { title: '{name} Portfolio & Case Studies | PakSoft', description: 'Explore our {name} portfolio. See successful projects and case studies that showcase our expertise.' },
    tr: { title: '{name} Portföy ve Başarı Hikayeleri | PakSoft', description: '{name} portföyümüzü inceleyin. Uzmanlığımızı gösteren başarılı projeleri ve vaka çalışmalarını keşfedin.' },
    de: { title: '{name} Portfolio & Referenzen | PakSoft', description: 'Entdecken Sie unser {name}-Portfolio – erfolgreiche Projekte und Fallstudien, die unsere Expertise belegen.' },
    ur: { title: '{name} پورٹ فولیو اور کیس اسٹڈیز | PakSoft', description: 'ہمارا {name} پورٹ فولیو دیکھیں — کامیاب منصوبے اور کیس اسٹڈیز جو ہماری مہارت کو ظاہر کرتی ہیں۔' },
    ar: { title: '{name} الأعمال ودراسات الحالة | PakSoft', description: 'استعرض أعمالنا في {name} — مشاريع ناجحة ودراسات حالة تُظهر خبرتنا.' },
  },
};

// Resolve the localized title/description for a service sub-page.
export function getServiceSubPageMeta(
  page: ServiceSubPage,
  locale: Locale,
  serviceName: string
): { title: string; description: string } {
  const template = serviceSubPageTemplates[page][locale] ?? serviceSubPageTemplates[page][defaultLocale];
  return {
    title: template.title.replace(/\{name\}/g, serviceName),
    description: template.description.replace(/\{name\}/g, serviceName),
  };
}

// Build full metadata (canonical + hreflang + OG + Twitter) for a static page
// from a per-locale title/description map. Mirrors the service-detail pattern.
export function buildStaticPageMetadata(
  locale: Locale,
  path: string,
  meta: Record<Locale, { title: string; description: string }>
): Metadata {
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const { title, description } = meta[validLocale] ?? meta[defaultLocale];
  const localizedPath = localizeFullPath(path, validLocale);
  const canonicalUrl = `${baseUrl}/${validLocale}${localizedPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: generateAlternateLinks(path),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales.filter(l => l !== validLocale).map(l => ogLocaleMap[l]),
      type: 'website',
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}


// (The old generateServiceMetadata + JSON-LD schema generators that lived here
// were dead code — never imported anywhere — and carried a placeholder phone
// number and a stale Istanbul address that contradicted the real LocalBusiness
// data. Live structured data comes from src/components/seo/JsonLd.tsx.)

export { baseUrl, ogLocaleMap };
