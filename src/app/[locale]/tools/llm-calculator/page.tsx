// Server wrapper: exports localized metadata (title/description/canonical/hreflang)
// while the interactive calculator lives in LlmCalculatorClient ('use client').
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { buildStaticPageMetadata } from '@/lib/seo';
import LlmCalculatorClient from './LlmCalculatorClient';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'LLM Cost Calculator — Free Tool | PakSoft',
    description: 'Compare token pricing across GPT, Claude, Gemini and more — estimate your monthly LLM API costs in seconds with this free calculator.',
  },
  tr: {
    title: 'LLM Maliyet Hesaplayıcı — Ücretsiz Araç | PakSoft',
    description: 'GPT, Claude, Gemini ve daha fazlasının token fiyatlarını karşılaştırın — aylık LLM API maliyetinizi saniyeler içinde ücretsiz hesaplayın.',
  },
  de: {
    title: 'LLM-Kostenrechner — Kostenloses Tool | PakSoft',
    description: 'Vergleichen Sie Token-Preise von GPT, Claude, Gemini und mehr — berechnen Sie Ihre monatlichen LLM-API-Kosten in Sekunden.',
  },
  ur: {
    title: 'LLM لاگت کیلکولیٹر — مفت ٹول | PakSoft',
    description: 'GPT، Claude، Gemini اور دیگر ماڈلز کی ٹوکن قیمتوں کا موازنہ کریں — اپنی ماہانہ LLM API لاگت سیکنڈوں میں مفت معلوم کریں۔',
  },
  ar: {
    title: 'حاسبة تكاليف نماذج اللغة — أداة مجانية | PakSoft',
    description: 'قارن أسعار التوكنز بين GPT وClaude وGemini وغيرها — قدّر تكاليف واجهة LLM الشهرية خلال ثوانٍ مع هذه الأداة المجانية.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, '/tools/llm-calculator', meta);
}

export default function LLMCalculatorPage() {
  return <LlmCalculatorClient />;
}
