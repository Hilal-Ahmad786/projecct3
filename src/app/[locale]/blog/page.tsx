// Server wrapper: exports localized metadata (title/description/canonical/hreflang)
// while the interactive page lives in BlogListClient ('use client').
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { buildStaticPageMetadata } from '@/lib/seo';
import BlogListClient from './BlogListClient';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Blog — Insights on Web, AI & Digital Growth | PakSoft',
    description: 'Articles and insights from the PakSoft team on web development, AI, e-commerce and digital growth.',
  },
  tr: {
    title: 'Blog — Web, Yapay Zeka ve Dijital Büyüme Yazıları | PakSoft',
    description: 'PakSoft ekibinden web geliştirme, yapay zeka, e-ticaret ve dijital büyüme üzerine makaleler ve içgörüler.',
  },
  de: {
    title: 'Blog — Insights zu Web, KI & digitalem Wachstum | PakSoft',
    description: 'Artikel und Einblicke des PakSoft-Teams zu Webentwicklung, KI, E-Commerce und digitalem Wachstum.',
  },
  ur: {
    title: 'بلاگ — ویب، اے آئی اور ڈیجیٹل ترقی پر مضامین | PakSoft',
    description: 'ویب ڈیویلپمنٹ، مصنوعی ذہانت، ای کامرس اور ڈیجیٹل ترقی پر PakSoft ٹیم کے مضامین اور بصیرتیں۔',
  },
  ar: {
    title: 'المدونة — رؤى حول الويب والذكاء الاصطناعي والنمو الرقمي | PakSoft',
    description: 'مقالات ورؤى من فريق PakSoft حول تطوير الويب والذكاء الاصطناعي والتجارة الإلكترونية والنمو الرقمي.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, '/blog', meta);
}

export default function BlogPage() {
  return <BlogListClient />;
}
