'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
  CalculatorIcon,
  SparklesIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CpuChipIcon,
  BoltIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

export const dynamic = 'force-dynamic';

// Translations
const translations: Record<string, Record<string, string>> = {
  title: {
    en: 'LLM Cost Calculator',
    tr: 'LLM Maliyet Hesaplayıcı',
    de: 'LLM-Kostenrechner',
    ur: 'LLM لاگت کیلکولیٹر',
    ar: 'حاسبة تكلفة النماذج اللغوية',
  },
  subtitle: {
    en: 'Compare costs across leading AI models and find the best fit for your use case',
    tr: 'Önde gelen AI modelleri arasında maliyetleri karşılaştırın ve kullanım durumunuza en uygun olanı bulun',
    de: 'Vergleichen Sie Kosten führender KI-Modelle und finden Sie die beste Lösung für Ihren Anwendungsfall',
    ur: 'معروف AI ماڈلز میں لاگت کا موازنہ کریں اور اپنے استعمال کے لیے بہترین تلاش کریں',
    ar: 'قارن التكاليف عبر نماذج الذكاء الاصطناعي الرائدة وابحث عن الأنسب لحالة استخدامك',
  },
  monthlyUsage: {
    en: 'Monthly Usage',
    tr: 'Aylık Kullanım',
    de: 'Monatliche Nutzung',
    ur: 'ماہانہ استعمال',
    ar: 'الاستخدام الشهري',
  },
  inputTokens: {
    en: 'Input Tokens (millions)',
    tr: 'Giriş Token\'ları (milyon)',
    de: 'Eingabe-Tokens (Millionen)',
    ur: 'ان پٹ ٹوکنز (ملین)',
    ar: 'رموز الإدخال (بالملايين)',
  },
  outputTokens: {
    en: 'Output Tokens (millions)',
    tr: 'Çıkış Token\'ları (milyon)',
    de: 'Ausgabe-Tokens (Millionen)',
    ur: 'آؤٹ پٹ ٹوکنز (ملین)',
    ar: 'رموز الإخراج (بالملايين)',
  },
  apiCalls: {
    en: 'API Calls per Month',
    tr: 'Aylık API Çağrıları',
    de: 'API-Aufrufe pro Monat',
    ur: 'ماہانہ API کالز',
    ar: 'استدعاءات API شهريًا',
  },
  costComparison: {
    en: 'Cost Comparison',
    tr: 'Maliyet Karşılaştırması',
    de: 'Kostenvergleich',
    ur: 'لاگت کا موازنہ',
    ar: 'مقارنة التكاليف',
  },
  perMonth: {
    en: '/month',
    tr: '/ay',
    de: '/Monat',
    ur: '/ماہ',
    ar: '/شهر',
  },
  recommended: {
    en: 'Recommended',
    tr: 'Önerilen',
    de: 'Empfohlen',
    ur: 'تجویز کردہ',
    ar: 'موصى به',
  },
  cheapest: {
    en: 'Cheapest',
    tr: 'En Ucuz',
    de: 'Günstigste',
    ur: 'سب سے سستا',
    ar: 'الأرخص',
  },
  premium: {
    en: 'Premium',
    tr: 'Premium',
    de: 'Premium',
    ur: 'پریمیم',
    ar: 'ممتاز',
  },
  inputPrice: {
    en: 'Input',
    tr: 'Giriş',
    de: 'Eingabe',
    ur: 'ان پٹ',
    ar: 'إدخال',
  },
  outputPrice: {
    en: 'Output',
    tr: 'Çıkış',
    de: 'Ausgabe',
    ur: 'آؤٹ پٹ',
    ar: 'إخراج',
  },
  perMillion: {
    en: '/1M tokens',
    tr: '/1M token',
    de: '/1M Tokens',
    ur: '/10 لاکھ ٹوکنز',
    ar: '/مليون رمز',
  },
  savings: {
    en: 'Potential Savings',
    tr: 'Potansiyel Tasarruf',
    de: 'Potenzielles Sparpotenzial',
    ur: 'ممکنہ بچت',
    ar: 'التوفير المحتمل',
  },
  vsExpensive: {
    en: 'vs most expensive option',
    tr: 'en pahalı seçeneğe karşı',
    de: 'im Vergleich zur teuersten Option',
    ur: 'سب سے مہنگے آپشن کے مقابلے',
    ar: 'مقارنة بالخيار الأكثر تكلفة',
  },
  getReport: {
    en: 'Get Detailed Report',
    tr: 'Detaylı Rapor Al',
    de: 'Detaillierten Bericht erhalten',
    ur: 'تفصیلی رپورٹ حاصل کریں',
    ar: 'احصل على تقرير مفصل',
  },
  name: {
    en: 'Full Name',
    tr: 'Ad Soyad',
    de: 'Vollständiger Name',
    ur: 'پورا نام',
    ar: 'الاسم الكامل',
  },
  email: {
    en: 'Work Email',
    tr: 'İş E-postası',
    de: 'Geschäftliche E-Mail',
    ur: 'کام کی ای میل',
    ar: 'البريد الإلكتروني للعمل',
  },
  company: {
    en: 'Company',
    tr: 'Şirket',
    de: 'Unternehmen',
    ur: 'کمپنی',
    ar: 'الشركة',
  },
  useCase: {
    en: 'Primary Use Case',
    tr: 'Birincil Kullanım Durumu',
    de: 'Primärer Anwendungsfall',
    ur: 'بنیادی استعمال',
    ar: 'حالة الاستخدام الأساسية',
  },
  chatbot: {
    en: 'Customer Chatbot',
    tr: 'Müşteri Chatbot',
    de: 'Kunden-Chatbot',
    ur: 'کسٹمر چیٹ بوٹ',
    ar: 'روبوت محادثة العملاء',
  },
  contentGen: {
    en: 'Content Generation',
    tr: 'İçerik Üretimi',
    de: 'Inhaltserstellung',
    ur: 'مواد کی تخلیق',
    ar: 'إنشاء المحتوى',
  },
  codeAssist: {
    en: 'Code Assistance',
    tr: 'Kod Yardımı',
    de: 'Code-Unterstützung',
    ur: 'کوڈ اسسٹنس',
    ar: 'مساعدة البرمجة',
  },
  dataAnalysis: {
    en: 'Data Analysis',
    tr: 'Veri Analizi',
    de: 'Datenanalyse',
    ur: 'ڈیٹا تجزیہ',
    ar: 'تحليل البيانات',
  },
  other: {
    en: 'Other',
    tr: 'Diğer',
    de: 'Sonstiges',
    ur: 'دیگر',
    ar: 'أخرى',
  },
  consultNow: {
    en: 'Schedule Free Consultation',
    tr: 'Ücretsiz Danışmanlık Planla',
    de: 'Kostenlose Beratung vereinbaren',
    ur: 'مفت مشاورت شیڈول کریں',
    ar: 'حجز استشارة مجانية',
  },
  reportSent: {
    en: 'Report sent to your email!',
    tr: 'Rapor e-postanıza gönderildi!',
    de: 'Bericht an Ihre E-Mail gesendet!',
    ur: 'رپورٹ آپ کی ای میل پر بھیج دی گئی!',
    ar: 'تم إرسال التقرير إلى بريدك الإلكتروني!',
  },
  contextWindow: {
    en: 'Context Window',
    tr: 'Bağlam Penceresi',
    de: 'Kontextfenster',
    ur: 'کانٹیکسٹ ونڈو',
    ar: 'نافذة السياق',
  },
  tokens: {
    en: 'tokens',
    tr: 'token',
    de: 'Token',
    ur: 'ٹوکنز',
    ar: 'رموز',
  },
  usePreset: {
    en: 'Use Preset',
    tr: 'Ön Ayar Kullan',
    de: 'Voreinstellung verwenden',
    ur: 'پری سیٹ استعمال کریں',
    ar: 'استخدم الإعداد المسبق',
  },
  startup: {
    en: 'Startup',
    tr: 'Startup',
    de: 'Startup',
    ur: 'سٹارٹ اپ',
    ar: 'شركة ناشئة',
  },
  scaleup: {
    en: 'Scale-up',
    tr: 'Ölçekleme',
    de: 'Scale-up',
    ur: 'اسکیل اپ',
    ar: 'توسع',
  },
  enterprise: {
    en: 'Enterprise',
    tr: 'Kurumsal',
    de: 'Unternehmen',
    ur: 'انٹرپرائز',
    ar: 'مؤسسة',
  },
};

// LLM Models with pricing (per 1M tokens)
const llmModels = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    inputPrice: 2.50,
    outputPrice: 10.00,
    contextWindow: 128000,
    color: 'from-green-500 to-emerald-600',
    logo: '🟢',
    tier: 'premium',
    strengths: ['Multimodal', 'Fast', 'Reliable'],
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    inputPrice: 0.15,
    outputPrice: 0.60,
    contextWindow: 128000,
    color: 'from-green-400 to-emerald-500',
    logo: '🟢',
    tier: 'budget',
    strengths: ['Affordable', 'Fast', 'Good quality'],
  },
  {
    id: 'claude-opus',
    name: 'Claude 3.5 Opus',
    provider: 'Anthropic',
    inputPrice: 15.00,
    outputPrice: 75.00,
    contextWindow: 200000,
    color: 'from-orange-500 to-amber-600',
    logo: '🟠',
    tier: 'premium',
    strengths: ['Best reasoning', 'Long context', 'Safe'],
  },
  {
    id: 'claude-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    inputPrice: 3.00,
    outputPrice: 15.00,
    contextWindow: 200000,
    color: 'from-orange-400 to-amber-500',
    logo: '🟠',
    tier: 'recommended',
    strengths: ['Balanced', 'Code-strong', 'Long context'],
  },
  {
    id: 'claude-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    inputPrice: 0.80,
    outputPrice: 4.00,
    contextWindow: 200000,
    color: 'from-orange-300 to-amber-400',
    logo: '🟠',
    tier: 'budget',
    strengths: ['Fast', 'Efficient', 'Affordable'],
  },
  {
    id: 'gemini-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    inputPrice: 1.25,
    outputPrice: 5.00,
    contextWindow: 2000000,
    color: 'from-blue-500 to-indigo-600',
    logo: '🔵',
    tier: 'recommended',
    strengths: ['Huge context', 'Multimodal', 'Google integration'],
  },
  {
    id: 'gemini-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    inputPrice: 0.075,
    outputPrice: 0.30,
    contextWindow: 1000000,
    color: 'from-blue-400 to-indigo-500',
    logo: '🔵',
    tier: 'cheapest',
    strengths: ['Very cheap', 'Fast', 'Large context'],
  },
  {
    id: 'llama-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta (via Groq)',
    inputPrice: 0.59,
    outputPrice: 0.79,
    contextWindow: 128000,
    color: 'from-purple-500 to-violet-600',
    logo: '🟣',
    tier: 'budget',
    strengths: ['Open source', 'Self-hostable', 'Fast on Groq'],
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    inputPrice: 2.00,
    outputPrice: 6.00,
    contextWindow: 128000,
    color: 'from-cyan-500 to-teal-600',
    logo: '🔷',
    tier: 'recommended',
    strengths: ['European', 'Code-strong', 'Multilingual'],
  },
];

// Usage presets
const usagePresets = [
  { id: 'startup', inputTokens: 0.5, outputTokens: 0.2, apiCalls: 10000 },
  { id: 'scaleup', inputTokens: 5, outputTokens: 2, apiCalls: 100000 },
  { id: 'enterprise', inputTokens: 50, outputTokens: 20, apiCalls: 1000000 },
];

export default function LLMCalculatorPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const [inputTokens, setInputTokens] = useState(1);
  const [outputTokens, setOutputTokens] = useState(0.5);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', company: '', useCase: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = (key: string) => translations[key]?.[locale] || translations[key]?.en || key;

  const calculateCost = (model: typeof llmModels[0]) => {
    const inputCost = inputTokens * model.inputPrice;
    const outputCost = outputTokens * model.outputPrice;
    return inputCost + outputCost;
  };

  const sortedModels = [...llmModels].sort((a, b) => calculateCost(a) - calculateCost(b));
  const cheapestCost = calculateCost(sortedModels[0]);
  const expensiveCost = calculateCost(sortedModels[sortedModels.length - 1]);
  const savings = expensiveCost - cheapestCost;

  const applyPreset = (presetId: string) => {
    const preset = usagePresets.find((p) => p.id === presetId);
    if (preset) {
      setInputTokens(preset.inputTokens);
      setOutputTokens(preset.outputTokens);
    }
  };

  const handleSubmitLead = async () => {
    if (!leadForm.name || !leadForm.email) return;

    setSubmitting(true);
    try {
      await fetch('/api/tools/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'llm-cost-calculator',
          name: leadForm.name,
          email: leadForm.email,
          company: leadForm.company,
          data: {
            useCase: leadForm.useCase,
            inputTokens,
            outputTokens,
            estimatedCosts: sortedModels.slice(0, 3).map((m) => ({
              model: m.name,
              cost: calculateCost(m),
            })),
          },
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-6">
              <CalculatorIcon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-400">{t('subtitle')}</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Usage Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CpuChipIcon className="w-6 h-6 text-cyan-400" />
                  {t('monthlyUsage')}
                </h2>
                <div className="flex gap-2">
                  <span className="text-sm text-gray-400">{t('usePreset')}:</span>
                  {usagePresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.id)}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                    >
                      {t(preset.id)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Tokens */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t('inputTokens')}</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0.1"
                      max="100"
                      step="0.1"
                      value={inputTokens}
                      onChange={(e) => setInputTokens(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full"
                    />
                    <input
                      type="number"
                      value={inputTokens}
                      onChange={(e) => setInputTokens(parseFloat(e.target.value) || 0)}
                      className="w-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-right"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{(inputTokens * 1000000).toLocaleString()} {t('tokens')}</p>
                </div>

                {/* Output Tokens */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t('outputTokens')}</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0.1"
                      max="50"
                      step="0.1"
                      value={outputTokens}
                      onChange={(e) => setOutputTokens(parseFloat(e.target.value))}
                      className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-cyan-500 [&::-webkit-slider-thumb]:rounded-full"
                    />
                    <input
                      type="number"
                      value={outputTokens}
                      onChange={(e) => setOutputTokens(parseFloat(e.target.value) || 0)}
                      className="w-24 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-right"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{(outputTokens * 1000000).toLocaleString()} {t('tokens')}</p>
                </div>
              </div>
            </motion.div>

            {/* Savings Banner */}
            {savings > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-500/30 rounded-xl p-4 mb-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CurrencyDollarIcon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t('savings')}</p>
                    <p className="text-2xl font-bold text-emerald-400">${savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{t('vsExpensive')}</span>
              </motion.div>
            )}

            {/* Cost Comparison Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-cyan-400" />
                {t('costComparison')}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedModels.map((model, index) => {
                  const cost = calculateCost(model);
                  const isLowest = index === 0;
                  const isRecommended = model.tier === 'recommended';

                  return (
                    <motion.div
                      key={model.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`relative bg-white/5 rounded-xl p-5 border transition-all hover:bg-white/10 ${
                        isLowest ? 'border-emerald-500/50' : isRecommended ? 'border-cyan-500/50' : 'border-white/10'
                      }`}
                    >
                      {/* Badge */}
                      {(isLowest || isRecommended) && (
                        <div className={`absolute -top-3 ${isRTL ? 'right-4' : 'left-4'}`}>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            isLowest ? 'bg-emerald-500 text-white' : 'bg-cyan-500 text-white'
                          }`}>
                            {isLowest ? t('cheapest') : t('recommended')}
                          </span>
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${model.color} flex items-center justify-center text-xl`}>
                          {model.logo}
                        </div>
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <p className="text-xs text-gray-400">{model.provider}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">${cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          <span className="text-gray-400">{t('perMonth')}</span>
                        </div>
                      </div>

                      {/* Token Prices */}
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        <div className="px-3 py-2 bg-white/5 rounded-lg">
                          <span className="text-gray-400">{t('inputPrice')}</span>
                          <p className="font-medium">${model.inputPrice.toFixed(2)} {t('perMillion')}</p>
                        </div>
                        <div className="px-3 py-2 bg-white/5 rounded-lg">
                          <span className="text-gray-400">{t('outputPrice')}</span>
                          <p className="font-medium">${model.outputPrice.toFixed(2)} {t('perMillion')}</p>
                        </div>
                      </div>

                      {/* Context Window */}
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                        <InformationCircleIcon className="w-4 h-4" />
                        <span>{t('contextWindow')}: {(model.contextWindow / 1000).toLocaleString()}K</span>
                      </div>

                      {/* Strengths */}
                      <div className="flex flex-wrap gap-1">
                        {model.strengths.map((strength, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-white/5 text-xs rounded-full text-gray-300">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Lead Capture CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 text-center"
            >
              {!showLeadForm ? (
                <>
                  <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-2xl font-bold mb-2">
                    {locale === 'en' && 'Need Help Choosing?'}
                    {locale === 'tr' && 'Seçim Yapmakta Yardıma mı İhtiyacınız Var?'}
                    {locale === 'de' && 'Brauchen Sie Hilfe bei der Auswahl?'}
                    {locale === 'ur' && 'انتخاب میں مدد چاہیے؟'}
                    {locale === 'ar' && 'هل تحتاج مساعدة في الاختيار؟'}
                  </h3>
                  <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                    {locale === 'en' && 'Get a personalized recommendation based on your use case, plus implementation guidance from our AI experts.'}
                    {locale === 'tr' && 'Kullanım durumunuza göre kişiselleştirilmiş öneri ve AI uzmanlarımızdan uygulama rehberliği alın.'}
                    {locale === 'de' && 'Erhalten Sie eine personalisierte Empfehlung basierend auf Ihrem Anwendungsfall plus Implementierungsberatung von unseren KI-Experten.'}
                    {locale === 'ur' && 'اپنے استعمال کی بنیاد پر ذاتی سفارش حاصل کریں، ہمارے AI ماہرین سے عملدرآمد کی رہنمائی کے ساتھ۔'}
                    {locale === 'ar' && 'احصل على توصية شخصية بناءً على حالة استخدامك، بالإضافة إلى إرشادات التنفيذ من خبراء الذكاء الاصطناعي لدينا.'}
                  </p>
                  <button
                    onClick={() => setShowLeadForm(true)}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold text-lg hover:from-cyan-500 hover:to-blue-500 transition-all inline-flex items-center gap-2"
                  >
                    {t('getReport')}
                    <ArrowRightIcon className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </>
              ) : submitted ? (
                <div className="py-8">
                  <CheckCircleSolid className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                  <h3 className="text-2xl font-bold mb-2">{t('reportSent')}</h3>
                  <p className="text-gray-400 mb-6">
                    {locale === 'en' && 'Our team will reach out within 24 hours with your personalized report.'}
                    {locale === 'tr' && 'Ekibimiz 24 saat içinde kişiselleştirilmiş raporunuzla size ulaşacak.'}
                    {locale === 'de' && 'Unser Team wird sich innerhalb von 24 Stunden mit Ihrem personalisierten Bericht bei Ihnen melden.'}
                    {locale === 'ur' && 'ہماری ٹیم 24 گھنٹوں میں آپ کی ذاتی رپورٹ کے ساتھ رابطہ کرے گی۔'}
                    {locale === 'ar' && 'سيتواصل معك فريقنا خلال 24 ساعة مع تقريرك الشخصي.'}
                  </p>
                  <a
                    href={`/${locale}/contact`}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all inline-flex items-center gap-2"
                  >
                    {t('consultNow')}
                  </a>
                </div>
              ) : (
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold mb-6">{t('getReport')}</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder={t('name')}
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 placeholder-gray-400"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <input
                      type="email"
                      placeholder={t('email')}
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 placeholder-gray-400"
                      dir="ltr"
                    />
                    <input
                      type="text"
                      placeholder={t('company')}
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 placeholder-gray-400"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <select
                      value={leadForm.useCase}
                      onChange={(e) => setLeadForm({ ...leadForm, useCase: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-500 text-white"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <option value="" className="bg-gray-900">{t('useCase')}</option>
                      <option value="chatbot" className="bg-gray-900">{t('chatbot')}</option>
                      <option value="content" className="bg-gray-900">{t('contentGen')}</option>
                      <option value="code" className="bg-gray-900">{t('codeAssist')}</option>
                      <option value="data" className="bg-gray-900">{t('dataAnalysis')}</option>
                      <option value="other" className="bg-gray-900">{t('other')}</option>
                    </select>
                    <button
                      onClick={handleSubmitLead}
                      disabled={!leadForm.name || !leadForm.email || submitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? '...' : t('getReport')}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
