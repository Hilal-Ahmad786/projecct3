import { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';
import { localizeFullPath } from '@/lib/routes';
import { generateAlternateLinks } from '@/lib/seo';
import { SLUG, baseUrl, ogLocaleMap } from '../_shared';
import WebDevBlogWrapper from '@/components/web-development/WebDevBlogWrapper';

interface PageProps { params: Promise<{ locale: Locale }> }

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Web Development Blog — Insights & Best Practices | PakSoft',
    description: 'Articles on Next.js, React, performance, PWAs, and modern web development from the PakSoft engineering team.',
  },
  tr: {
    title: 'Web Geliştirme Blogu — İpuçları ve En İyi Uygulamalar | PakSoft',
    description: 'PakSoft mühendislik ekibinden Next.js, React, performans ve modern web geliştirme üzerine makaleler.',
  },
  de: {
    title: 'Webentwicklungs-Blog — Einblicke & Best Practices | PakSoft',
    description: 'Artikel zu Next.js, React, Performance, PWAs und moderner Webentwicklung vom PakSoft-Team.',
  },
  ur: {
    title: 'ویب ڈویلپمنٹ بلاگ — بہترین طریقے | PakSoft',
    description: 'PakSoft ٹیم کی جانب سے Next.js، React، اور جدید ویب ڈویلپمنٹ پر مضامین۔',
  },
  ar: {
    title: 'مدونة تطوير الويب — أفضل الممارسات | PakSoft',
    description: 'مقالات حول Next.js وReact والأداء وتطوير الويب الحديث من فريق PakSoft.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  const meta = META[validLocale] ?? META.en;
  const path = `/services/${SLUG}/blog`;
  const localizedPath = localizeFullPath(path, validLocale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${baseUrl}/${validLocale}${localizedPath}`,
      languages: generateAlternateLinks(path),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/${validLocale}${localizedPath}`,
      siteName: 'PakSoft',
      locale: ogLocaleMap[validLocale],
      type: 'website',
    },
  };
}

export default async function WebDevBlogPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;

  return (
    <main className="min-h-screen bg-white pt-8">
      <WebDevBlogWrapper locale={validLocale} expanded />
    </main>
  );
}
