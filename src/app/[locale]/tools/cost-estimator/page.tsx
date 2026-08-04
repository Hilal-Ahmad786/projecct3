// Server wrapper: exports localized metadata (title/description/canonical/hreflang)
// while the interactive estimator lives in CostEstimatorClient ('use client').
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { buildStaticPageMetadata } from '@/lib/seo';
import CostEstimatorClient from './CostEstimatorClient';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Project Cost Estimator — Free Tool | PakSoft',
    description: 'Get an instant ballpark estimate for your website, e-commerce or AI project — free interactive cost estimator by PakSoft.',
  },
  tr: {
    title: 'Proje Maliyet Tahmini — Ücretsiz Araç | PakSoft',
    description: "Web sitesi, e-ticaret veya yapay zeka projeniz için anında yaklaşık maliyet tahmini alın — PakSoft'un ücretsiz interaktif aracı.",
  },
  de: {
    title: 'Projektkosten-Rechner — Kostenloses Tool | PakSoft',
    description: 'Erhalten Sie sofort eine Kostenschätzung für Ihr Website-, E-Commerce- oder KI-Projekt — kostenloser interaktiver Rechner von PakSoft.',
  },
  ur: {
    title: 'پروجیکٹ لاگت کا تخمینہ — مفت ٹول | PakSoft',
    description: 'اپنی ویب سائٹ، ای کامرس یا اے آئی پروجیکٹ کی تخمینی لاگت فوراً معلوم کریں — PakSoft کا مفت انٹرایکٹو ٹول۔',
  },
  ar: {
    title: 'مقدّر تكلفة المشروع — أداة مجانية | PakSoft',
    description: 'احصل فورًا على تقدير تقريبي لتكلفة موقعك أو متجرك الإلكتروني أو مشروع الذكاء الاصطناعي — أداة مجانية من PakSoft.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, '/tools/cost-estimator', meta);
}

export default function CostEstimatorPage() {
  return <CostEstimatorClient />;
}
