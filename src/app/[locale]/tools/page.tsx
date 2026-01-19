'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CalculatorIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  ArrowRightIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

export const dynamic = 'force-dynamic';

const translations: Record<string, Record<string, string>> = {
  title: {
    en: 'Free Tools & Calculators',
    tr: 'Ücretsiz Araçlar ve Hesaplayıcılar',
    de: 'Kostenlose Tools & Rechner',
    ur: 'مفت ٹولز اور کیلکولیٹرز',
    ar: 'أدوات وحاسبات مجانية',
  },
  subtitle: {
    en: 'Plan your digital transformation with our interactive tools',
    tr: 'İnteraktif araçlarımızla dijital dönüşümünüzü planlayın',
    de: 'Planen Sie Ihre digitale Transformation mit unseren interaktiven Tools',
    ur: 'ہمارے انٹرایکٹو ٹولز کے ساتھ اپنی ڈیجیٹل تبدیلی کی منصوبہ بندی کریں',
    ar: 'خطط لتحولك الرقمي باستخدام أدواتنا التفاعلية',
  },
  tryNow: {
    en: 'Try Now',
    tr: 'Şimdi Dene',
    de: 'Jetzt ausprobieren',
    ur: 'ابھی آزمائیں',
    ar: 'جرب الآن',
  },
};

const tools = [
  {
    id: 'cost-estimator',
    slug: 'cost-estimator',
    icon: CalculatorIcon,
    color: 'from-emerald-500 to-teal-600',
    name: {
      en: 'Project Cost Estimator',
      tr: 'Proje Maliyet Tahmin Aracı',
      de: 'Projektkostenrechner',
      ur: 'پروجیکٹ لاگت کا تخمینہ',
      ar: 'مقدر تكلفة المشروع',
    },
    description: {
      en: 'Get instant estimates for your web, mobile, or AI project. Configure features, design level, and team size.',
      tr: 'Web, mobil veya AI projeniz için anında tahminler alın. Özellikleri, tasarım seviyesini ve ekip boyutunu yapılandırın.',
      de: 'Erhalten Sie sofortige Schätzungen für Ihr Web-, Mobil- oder KI-Projekt. Konfigurieren Sie Features, Design-Level und Teamgröße.',
      ur: 'اپنے ویب، موبائل، یا AI پروجیکٹ کے لیے فوری تخمینہ حاصل کریں۔ فیچرز، ڈیزائن لیول، اور ٹیم سائز کنفیگر کریں۔',
      ar: 'احصل على تقديرات فورية لمشروعك على الويب أو الجوال أو الذكاء الاصطناعي. قم بتكوين الميزات ومستوى التصميم وحجم الفريق.',
    },
    features: {
      en: ['Real-time cost calculation', 'Feature configurator', 'Timeline estimates'],
      tr: ['Gerçek zamanlı maliyet hesaplama', 'Özellik yapılandırıcı', 'Zaman çizelgesi tahminleri'],
      de: ['Echtzeit-Kostenberechnung', 'Feature-Konfigurator', 'Zeitplanung'],
      ur: ['ریئل ٹائم لاگت کا حساب', 'فیچر کنفیگریٹر', 'ٹائم لائن تخمینہ'],
      ar: ['حساب التكلفة في الوقت الفعلي', 'مكوّن الميزات', 'تقديرات الجدول الزمني'],
    },
  },
  {
    id: 'ai-readiness',
    slug: 'ai-readiness',
    icon: ChartBarIcon,
    color: 'from-indigo-500 to-purple-600',
    name: {
      en: 'AI Readiness Assessment',
      tr: 'Yapay Zeka Hazırlık Değerlendirmesi',
      de: 'KI-Bereitschaftsbewertung',
      ur: 'AI تیاری کی تشخیص',
      ar: 'تقييم جاهزية الذكاء الاصطناعي',
    },
    description: {
      en: 'Evaluate your organization\'s readiness to adopt AI. 20 questions across 5 key dimensions.',
      tr: 'Kuruluşunuzun yapay zekayı benimsemeye hazırlığını değerlendirin. 5 temel boyutta 20 soru.',
      de: 'Bewerten Sie die Bereitschaft Ihres Unternehmens für KI. 20 Fragen in 5 Schlüsseldimensionen.',
      ur: 'AI اپنانے کے لیے اپنی تنظیم کی تیاری کا جائزہ لیں۔ 5 اہم جہتوں میں 20 سوالات۔',
      ar: 'قيّم مدى استعداد مؤسستك لتبني الذكاء الاصطناعي. 20 سؤالاً عبر 5 أبعاد رئيسية.',
    },
    features: {
      en: ['Comprehensive 20-question quiz', 'Category breakdown', 'Personalized recommendations'],
      tr: ['Kapsamlı 20 soruluk quiz', 'Kategori dağılımı', 'Kişiselleştirilmiş öneriler'],
      de: ['Umfassender 20-Fragen-Test', 'Kategorieaufschlüsselung', 'Personalisierte Empfehlungen'],
      ur: ['جامع 20 سوالات کا کوئز', 'زمرہ تفصیل', 'ذاتی سفارشات'],
      ar: ['اختبار شامل من 20 سؤالاً', 'تفصيل الفئات', 'توصيات مخصصة'],
    },
  },
  {
    id: 'llm-calculator',
    slug: 'llm-calculator',
    icon: CurrencyDollarIcon,
    color: 'from-cyan-500 to-blue-600',
    name: {
      en: 'LLM Cost Calculator',
      tr: 'LLM Maliyet Hesaplayıcı',
      de: 'LLM-Kostenrechner',
      ur: 'LLM لاگت کیلکولیٹر',
      ar: 'حاسبة تكلفة النماذج اللغوية',
    },
    description: {
      en: 'Compare costs across GPT-4, Claude, Gemini, Llama and more. Find the best model for your budget.',
      tr: 'GPT-4, Claude, Gemini, Llama ve daha fazlası arasında maliyetleri karşılaştırın. Bütçenize en uygun modeli bulun.',
      de: 'Vergleichen Sie Kosten von GPT-4, Claude, Gemini, Llama und mehr. Finden Sie das beste Modell für Ihr Budget.',
      ur: 'GPT-4، Claude، Gemini، Llama اور مزید میں لاگت کا موازنہ کریں۔ اپنے بجٹ کے لیے بہترین ماڈل تلاش کریں۔',
      ar: 'قارن تكاليف GPT-4 وClaude وGemini وLlama والمزيد. ابحث عن أفضل نموذج لميزانيتك.',
    },
    features: {
      en: ['9 LLM models compared', 'Real-time cost calculation', 'Usage presets'],
      tr: ['9 LLM modeli karşılaştırması', 'Gerçek zamanlı maliyet hesaplama', 'Kullanım ön ayarları'],
      de: ['9 LLM-Modelle verglichen', 'Echtzeit-Kostenberechnung', 'Nutzungsvorgaben'],
      ur: ['9 LLM ماڈلز کا موازنہ', 'ریئل ٹائم لاگت کا حساب', 'استعمال کے پری سیٹس'],
      ar: ['مقارنة 9 نماذج لغوية', 'حساب التكلفة في الوقت الفعلي', 'إعدادات الاستخدام المسبقة'],
    },
  },
];

export default function ToolsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const t = (key: string) => translations[key]?.[locale] || translations[key]?.en || key;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 mb-6">
              <WrenchScrewdriverIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-400">{t('subtitle')}</p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-5`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">
                  {tool.name[locale as keyof typeof tool.name] || tool.name.en}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-5">
                  {tool.description[locale as keyof typeof tool.description] || tool.description.en}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {(tool.features[locale as keyof typeof tool.features] || tool.features.en).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <SparklesIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/${locale}/tools/${tool.slug}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${tool.color} rounded-lg font-medium hover:opacity-90 transition-all`}
                >
                  {t('tryNow')}
                  <ArrowRightIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-4">
              {locale === 'en' && 'Need a custom tool or calculator for your business?'}
              {locale === 'tr' && 'İşletmeniz için özel bir araç veya hesaplayıcıya mı ihtiyacınız var?'}
              {locale === 'de' && 'Benötigen Sie ein individuelles Tool oder einen Rechner für Ihr Unternehmen?'}
              {locale === 'ur' && 'اپنے کاروبار کے لیے کسٹم ٹول یا کیلکولیٹر چاہیے؟'}
              {locale === 'ar' && 'هل تحتاج أداة مخصصة أو حاسبة لعملك؟'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              {locale === 'en' && 'Contact Us'}
              {locale === 'tr' && 'Bize Ulaşın'}
              {locale === 'de' && 'Kontaktieren Sie uns'}
              {locale === 'ur' && 'ہم سے رابطہ کریں'}
              {locale === 'ar' && 'اتصل بنا'}
              <ArrowRightIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
