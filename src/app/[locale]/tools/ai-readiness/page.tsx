// Server wrapper: exports localized metadata (title/description/canonical/hreflang)
// while the interactive assessment lives in AiReadinessClient ('use client').
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n';
import { buildStaticPageMetadata } from '@/lib/seo';
import AiReadinessClient from './AiReadinessClient';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'AI Readiness Assessment — Free Tool | PakSoft',
    description: "Answer a few questions to score your company's AI readiness and get tailored recommendations — free assessment by PakSoft.",
  },
  tr: {
    title: 'Yapay Zeka Hazırlık Değerlendirmesi — Ücretsiz Araç | PakSoft',
    description: "Birkaç soruyu yanıtlayarak şirketinizin yapay zeka hazırlık puanını öğrenin ve size özel öneriler alın — PakSoft'tan ücretsiz değerlendirme.",
  },
  de: {
    title: 'KI-Readiness-Check — Kostenloses Tool | PakSoft',
    description: 'Beantworten Sie einige Fragen, um die KI-Bereitschaft Ihres Unternehmens zu bewerten und passende Empfehlungen zu erhalten — kostenlos von PakSoft.',
  },
  ur: {
    title: 'اے آئی تیاری کا جائزہ — مفت ٹول | PakSoft',
    description: 'چند سوالات کے جواب دے کر اپنی کمپنی کی اے آئی تیاری کا اسکور معلوم کریں اور موزوں سفارشات حاصل کریں — PakSoft کا مفت جائزہ۔',
  },
  ar: {
    title: 'تقييم الجاهزية للذكاء الاصطناعي — أداة مجانية | PakSoft',
    description: 'أجب عن بضعة أسئلة لقياس جاهزية شركتك للذكاء الاصطناعي واحصل على توصيات مخصصة — تقييم مجاني من PakSoft.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, '/tools/ai-readiness', meta);
}

export default function AIReadinessPage() {
  return <AiReadinessClient />;
}
