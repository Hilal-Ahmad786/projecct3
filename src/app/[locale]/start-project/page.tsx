// Server wrapper: exports localized metadata (title/description/canonical/hreflang)
// while the interactive form page lives in StartProjectClient ('use client').
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { buildStaticPageMetadata } from '@/lib/seo';
import StartProjectClient from './StartProjectClient';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Start Your Project | PakSoft',
    description: 'Tell us about your project and get a tailored proposal within 48 hours — web, e-commerce, AI and digital marketing.',
  },
  tr: {
    title: 'Projenizi Başlatın | PakSoft',
    description: 'Projenizi bize anlatın, 48 saat içinde size özel bir teklif alın — web, e-ticaret, yapay zeka ve dijital pazarlama.',
  },
  de: {
    title: 'Starten Sie Ihr Projekt | PakSoft',
    description: 'Erzählen Sie uns von Ihrem Projekt und erhalten Sie innerhalb von 48 Stunden ein individuelles Angebot — Web, E-Commerce, KI und digitales Marketing.',
  },
  ur: {
    title: 'اپنا پروجیکٹ شروع کریں | PakSoft',
    description: 'ہمیں اپنے پروجیکٹ کے بارے میں بتائیں اور 48 گھنٹوں میں خصوصی تجویز حاصل کریں — ویب، ای کامرس، اے آئی اور ڈیجیٹل مارکیٹنگ۔',
  },
  ar: {
    title: 'ابدأ مشروعك | PakSoft',
    description: 'أخبرنا عن مشروعك واحصل على عرض مخصص خلال 48 ساعة — الويب والتجارة الإلكترونية والذكاء الاصطناعي والتسويق الرقمي.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, '/start-project', meta);
}

export default function StartProjectPage() {
  return <StartProjectClient />;
}
