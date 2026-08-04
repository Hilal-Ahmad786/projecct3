// Server wrapper: exports localized metadata (title/description/canonical/hreflang)
// while the interactive page lives in PricingClient ('use client').
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { buildStaticPageMetadata } from '@/lib/seo';
import PricingClient from './PricingClient';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Pricing & Packages | PakSoft',
    description: 'Transparent pricing and flexible engagement models for web, e-commerce and AI projects — choose the package that fits your needs.',
  },
  tr: {
    title: 'Fiyatlandırma ve Paketler | PakSoft',
    description: 'Web, e-ticaret ve yapay zeka projeleri için şeffaf fiyatlandırma ve esnek çalışma modelleri — ihtiyacınıza uygun paketi seçin.',
  },
  de: {
    title: 'Preise & Pakete | PakSoft',
    description: 'Transparente Preise und flexible Modelle für Web-, E-Commerce- und KI-Projekte — wählen Sie das Paket, das zu Ihnen passt.',
  },
  ur: {
    title: 'قیمتیں اور پیکجز | PakSoft',
    description: 'ویب، ای کامرس اور اے آئی منصوبوں کے لیے شفاف قیمتیں اور لچکدار ماڈلز — اپنی ضرورت کے مطابق پیکج منتخب کریں۔',
  },
  ar: {
    title: 'الأسعار والباقات | PakSoft',
    description: 'أسعار شفافة ونماذج تعاون مرنة لمشاريع الويب والتجارة الإلكترونية والذكاء الاصطناعي — اختر الباقة المناسبة لك.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, '/pricing', meta);
}

export default function PricingPage() {
  return <PricingClient />;
}
