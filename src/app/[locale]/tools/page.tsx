// Server wrapper: exports localized metadata (title/description/canonical/hreflang)
// while the interactive page lives in ToolsClient ('use client').
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { buildStaticPageMetadata } from '@/lib/seo';
import ToolsClient from './ToolsClient';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Free Tools | PakSoft',
    description: 'Free interactive tools from PakSoft — estimate project costs, calculate LLM usage costs and assess your AI readiness.',
  },
  tr: {
    title: 'Ücretsiz Araçlar | PakSoft',
    description: "PakSoft'tan ücretsiz interaktif araçlar — proje maliyetinizi tahmin edin, LLM kullanım maliyetini hesaplayın ve yapay zeka hazırlığınızı ölçün.",
  },
  de: {
    title: 'Kostenlose Tools | PakSoft',
    description: 'Kostenlose interaktive Tools von PakSoft — Projektkosten schätzen, LLM-Kosten berechnen und Ihre KI-Bereitschaft bewerten.',
  },
  ur: {
    title: 'مفت ٹولز | PakSoft',
    description: 'PakSoft کے مفت انٹرایکٹو ٹولز — پروجیکٹ لاگت کا اندازہ لگائیں، LLM اخراجات کا حساب کریں اور اپنی اے آئی تیاری جانچیں۔',
  },
  ar: {
    title: 'أدوات مجانية | PakSoft',
    description: 'أدوات تفاعلية مجانية من PakSoft — قدّر تكلفة مشروعك واحسب تكاليف نماذج اللغة وقيّم جاهزيتك للذكاء الاصطناعي.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, '/tools', meta);
}

export default function ToolsPage() {
  return <ToolsClient />;
}
