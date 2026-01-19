'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CloudIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
  RocketLaunchIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

// Translations
const translations: Record<string, Record<string, string>> = {
  title: {
    en: 'Project Cost Estimator',
    tr: 'Proje Maliyet Hesaplayıcı',
    de: 'Projektkostenschätzer',
    ur: 'پروجیکٹ لاگت کا تخمینہ',
    ar: 'مقدر تكلفة المشروع',
  },
  subtitle: {
    en: 'Get an instant estimate for your software project',
    tr: 'Yazılım projeniz için anında fiyat tahmini alın',
    de: 'Erhalten Sie sofort einen Kostenvoranschlag',
    ur: 'اپنے سافٹ ویئر پروجیکٹ کا فوری تخمینہ حاصل کریں',
    ar: 'احصل على تقدير فوري لمشروع البرمجيات الخاص بك',
  },
  step1: {
    en: 'Project Type',
    tr: 'Proje Türü',
    de: 'Projekttyp',
    ur: 'پروجیکٹ کی قسم',
    ar: 'نوع المشروع',
  },
  step2: {
    en: 'Features',
    tr: 'Özellikler',
    de: 'Funktionen',
    ur: 'خصوصیات',
    ar: 'الميزات',
  },
  step3: {
    en: 'Design & UX',
    tr: 'Tasarım & UX',
    de: 'Design & UX',
    ur: 'ڈیزائن اور UX',
    ar: 'التصميم وتجربة المستخدم',
  },
  step4: {
    en: 'Get Estimate',
    tr: 'Teklif Al',
    de: 'Angebot erhalten',
    ur: 'تخمینہ حاصل کریں',
    ar: 'احصل على التقدير',
  },
  estimatedCost: {
    en: 'Estimated Cost',
    tr: 'Tahmini Maliyet',
    de: 'Geschätzte Kosten',
    ur: 'تخمینی لاگت',
    ar: 'التكلفة المقدرة',
  },
  timeline: {
    en: 'Estimated Timeline',
    tr: 'Tahmini Süre',
    de: 'Geschätzte Zeit',
    ur: 'تخمینی وقت',
    ar: 'الجدول الزمني المقدر',
  },
  weeks: {
    en: 'weeks',
    tr: 'hafta',
    de: 'Wochen',
    ur: 'ہفتے',
    ar: 'أسابيع',
  },
  getQuote: {
    en: 'Get Detailed Quote',
    tr: 'Detaylı Teklif Al',
    de: 'Detailliertes Angebot',
    ur: 'تفصیلی قیمت حاصل کریں',
    ar: 'احصل على عرض أسعار مفصل',
  },
  name: {
    en: 'Your Name',
    tr: 'Adınız',
    de: 'Ihr Name',
    ur: 'آپ کا نام',
    ar: 'اسمك',
  },
  email: {
    en: 'Email Address',
    tr: 'E-posta Adresi',
    de: 'E-Mail-Adresse',
    ur: 'ای میل ایڈریس',
    ar: 'البريد الإلكتروني',
  },
  company: {
    en: 'Company (Optional)',
    tr: 'Şirket (Opsiyonel)',
    de: 'Unternehmen (Optional)',
    ur: 'کمپنی (اختیاری)',
    ar: 'الشركة (اختياري)',
  },
  submitting: {
    en: 'Submitting...',
    tr: 'Gönderiliyor...',
    de: 'Wird gesendet...',
    ur: 'جمع کرایا جا رہا ہے...',
    ar: 'جارٍ الإرسال...',
  },
  thankYou: {
    en: 'Thank You!',
    tr: 'Teşekkürler!',
    de: 'Vielen Dank!',
    ur: 'شکریہ!',
    ar: 'شكراً لك!',
  },
  willContact: {
    en: 'We will contact you within 24 hours with a detailed proposal.',
    tr: '24 saat içinde detaylı teklifle sizinle iletişime geçeceğiz.',
    de: 'Wir werden Sie innerhalb von 24 Stunden mit einem detaillierten Angebot kontaktieren.',
    ur: 'ہم 24 گھنٹوں کے اندر تفصیلی تجویز کے ساتھ آپ سے رابطہ کریں گے۔',
    ar: 'سنتواصل معك خلال 24 ساعة مع عرض مفصل.',
  },
};

// Project types
const projectTypes = [
  { id: 'mobile', name: 'Mobile App', nameKey: 'mobileApp', icon: DevicePhoneMobileIcon, basePrice: 15000, baseWeeks: 8 },
  { id: 'web', name: 'Web Application', nameKey: 'webApp', icon: ComputerDesktopIcon, basePrice: 12000, baseWeeks: 6 },
  { id: 'saas', name: 'SaaS Platform', nameKey: 'saas', icon: CloudIcon, basePrice: 25000, baseWeeks: 12 },
  { id: 'ai', name: 'AI Solution', nameKey: 'aiSolution', icon: CpuChipIcon, basePrice: 30000, baseWeeks: 10 },
  { id: 'ecommerce', name: 'E-Commerce', nameKey: 'ecommerce', icon: CurrencyDollarIcon, basePrice: 18000, baseWeeks: 8 },
];

// Features
const features = [
  { id: 'auth', name: 'User Authentication', price: 2000, weeks: 1, category: 'core' },
  { id: 'payments', name: 'Payment Integration', price: 3000, weeks: 1.5, category: 'core' },
  { id: 'admin', name: 'Admin Dashboard', price: 4000, weeks: 2, category: 'core' },
  { id: 'analytics', name: 'Analytics & Reports', price: 3500, weeks: 1.5, category: 'core' },
  { id: 'notifications', name: 'Push Notifications', price: 1500, weeks: 1, category: 'engagement' },
  { id: 'chat', name: 'Real-time Chat', price: 4000, weeks: 2, category: 'engagement' },
  { id: 'api', name: 'REST/GraphQL API', price: 3000, weeks: 1.5, category: 'technical' },
  { id: 'integrations', name: '3rd Party Integrations', price: 2500, weeks: 1, category: 'technical' },
  { id: 'multilang', name: 'Multi-language Support', price: 2000, weeks: 1, category: 'technical' },
  { id: 'ai_features', name: 'AI/ML Features', price: 8000, weeks: 3, category: 'advanced' },
  { id: 'security', name: 'Advanced Security', price: 3000, weeks: 1, category: 'advanced' },
  { id: 'offline', name: 'Offline Mode', price: 2500, weeks: 1.5, category: 'advanced' },
];

// Design options
const designOptions = [
  { id: 'basic', name: 'Basic Design', description: 'Clean, functional UI', multiplier: 1, icon: PaintBrushIcon },
  { id: 'professional', name: 'Professional', description: 'Custom branding & polished UX', multiplier: 1.3, icon: SparklesIcon },
  { id: 'premium', name: 'Premium', description: 'World-class design with animations', multiplier: 1.6, icon: RocketLaunchIcon },
];

// Team size options
const teamOptions = [
  { id: 'small', name: 'Small Team', description: '2-3 developers', multiplier: 1, speedMultiplier: 1 },
  { id: 'medium', name: 'Medium Team', description: '4-6 developers', multiplier: 1.2, speedMultiplier: 0.7 },
  { id: 'large', name: 'Large Team', description: '7+ developers', multiplier: 1.5, speedMultiplier: 0.5 },
];

export default function CostEstimatorPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedDesign, setSelectedDesign] = useState('professional');
  const [selectedTeam, setSelectedTeam] = useState('small');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const t = (key: string) => translations[key]?.[locale] || translations[key]?.en || key;

  // Calculate costs
  const calculation = useMemo(() => {
    if (!selectedType) return { cost: 0, weeks: 0 };

    const projectType = projectTypes.find(p => p.id === selectedType);
    if (!projectType) return { cost: 0, weeks: 0 };

    let baseCost = projectType.basePrice;
    let baseWeeks = projectType.baseWeeks;

    // Add feature costs
    selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        baseCost += feature.price;
        baseWeeks += feature.weeks;
      }
    });

    // Apply design multiplier
    const design = designOptions.find(d => d.id === selectedDesign);
    if (design) {
      baseCost *= design.multiplier;
    }

    // Apply team multiplier
    const team = teamOptions.find(t => t.id === selectedTeam);
    if (team) {
      baseCost *= team.multiplier;
      baseWeeks *= team.speedMultiplier;
    }

    return {
      cost: Math.round(baseCost),
      weeks: Math.ceil(baseWeeks),
    };
  }, [selectedType, selectedFeatures, selectedDesign, selectedTeam]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('/api/tools/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool: 'cost-estimator',
          ...formData,
          data: {
            projectType: selectedType,
            features: selectedFeatures,
            design: selectedDesign,
            team: selectedTeam,
            estimatedCost: calculation.cost,
            estimatedWeeks: calculation.weeks,
          },
        }),
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => setStep(s)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s ? <CheckIcon className="w-5 h-5" /> : s}
                </button>
                {s < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('step1')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedType(type.id);
                          setStep(2);
                        }}
                        className={`p-6 rounded-xl border-2 text-left transition-all hover:shadow-lg ${
                          selectedType === type.id
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <type.icon className={`w-10 h-10 mb-3 ${selectedType === type.id ? 'text-emerald-600' : 'text-gray-500'}`} />
                        <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                        <p className="text-sm text-gray-500">Starting from ${type.basePrice.toLocaleString()}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Features */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('step2')}</h2>
                  <div className="space-y-6">
                    {['core', 'engagement', 'technical', 'advanced'].map((category) => (
                      <div key={category}>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                          {category.charAt(0).toUpperCase() + category.slice(1)} Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {features.filter(f => f.category === category).map((feature) => (
                            <button
                              key={feature.id}
                              onClick={() => toggleFeature(feature.id)}
                              className={`p-4 rounded-lg border-2 text-left transition-all ${
                                selectedFeatures.includes(feature.id)
                                  ? 'border-emerald-600 bg-emerald-50'
                                  : 'border-gray-200 hover:border-emerald-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900">{feature.name}</span>
                                <span className="text-sm text-emerald-600">+${feature.price.toLocaleString()}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button onClick={() => setStep(1)} className="px-6 py-2 text-gray-600 hover:text-gray-900">
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                    >
                      Continue <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Design & Team */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('step3')}</h2>

                  {/* Design Options */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Level</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {designOptions.map((design) => (
                        <button
                          key={design.id}
                          onClick={() => setSelectedDesign(design.id)}
                          className={`p-6 rounded-xl border-2 text-center transition-all ${
                            selectedDesign === design.id
                              ? 'border-emerald-600 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <design.icon className={`w-8 h-8 mx-auto mb-3 ${selectedDesign === design.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <h4 className="font-semibold text-gray-900">{design.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{design.description}</p>
                          <p className="text-sm text-emerald-600 mt-2">×{design.multiplier}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Team Size */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Size</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {teamOptions.map((team) => (
                        <button
                          key={team.id}
                          onClick={() => setSelectedTeam(team.id)}
                          className={`p-6 rounded-xl border-2 text-center transition-all ${
                            selectedTeam === team.id
                              ? 'border-emerald-600 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <UserGroupIcon className={`w-8 h-8 mx-auto mb-3 ${selectedTeam === team.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                          <h4 className="font-semibold text-gray-900">{team.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{team.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button onClick={() => setStep(2)} className="px-6 py-2 text-gray-600 hover:text-gray-900">
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2"
                    >
                      View Estimate <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Results & Form */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  {!submitted ? (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('step4')}</h2>

                      {/* Summary */}
                      <div className="bg-gray-50 rounded-xl p-6 mb-8">
                        <h3 className="font-semibold text-gray-900 mb-4">Project Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Project Type:</span>
                            <span className="font-medium">{projectTypes.find(p => p.id === selectedType)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Features:</span>
                            <span className="font-medium">{selectedFeatures.length} selected</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Design Level:</span>
                            <span className="font-medium">{designOptions.find(d => d.id === selectedDesign)?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Team Size:</span>
                            <span className="font-medium">{teamOptions.find(t => t.id === selectedTeam)?.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Lead Capture Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <p className="text-gray-600 mb-4">Enter your details to receive a detailed proposal:</p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <UserIcon className="w-4 h-4 inline mr-2" />
                            {t('name')} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                            {t('email')} *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <BuildingOfficeIcon className="w-4 h-4 inline mr-2" />
                            {t('company')}
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full px-6 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold disabled:opacity-50"
                        >
                          {submitting ? t('submitting') : t('getQuote')}
                        </button>
                      </form>

                      <div className="mt-4">
                        <button onClick={() => setStep(3)} className="text-gray-500 hover:text-gray-700">
                          ← Back to options
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckIcon className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('thankYou')}</h2>
                      <p className="text-gray-600 mb-8">{t('willContact')}</p>
                      <div className="bg-emerald-50 rounded-xl p-6 inline-block">
                        <p className="text-sm text-gray-600 mb-2">Your estimated project cost:</p>
                        <p className="text-4xl font-bold text-emerald-600">${calculation.cost.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-2">{calculation.weeks} {t('weeks')} timeline</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Estimate Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-2xl p-6 text-white"
              >
                <h3 className="text-lg font-semibold mb-4">{t('estimatedCost')}</h3>
                <div className="mb-6">
                  <motion.p
                    key={calculation.cost}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-5xl font-bold text-emerald-400"
                  >
                    ${calculation.cost.toLocaleString()}
                  </motion.p>
                  <p className="text-gray-400 text-sm mt-1">USD</p>
                </div>

                <div className="border-t border-gray-700 pt-4 mb-6">
                  <h4 className="text-sm text-gray-400 mb-2">{t('timeline')}</h4>
                  <p className="text-2xl font-semibold">
                    {calculation.weeks} <span className="text-lg text-gray-400">{t('weeks')}</span>
                  </p>
                </div>

                {/* Selected Items */}
                <div className="space-y-3">
                  {selectedType && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 text-emerald-400" />
                      <span>{projectTypes.find(p => p.id === selectedType)?.name}</span>
                    </div>
                  )}
                  {selectedFeatures.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 text-emerald-400" />
                      <span>{selectedFeatures.length} features</span>
                    </div>
                  )}
                  {selectedDesign && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckIcon className="w-4 h-4 text-emerald-400" />
                      <span>{designOptions.find(d => d.id === selectedDesign)?.name}</span>
                    </div>
                  )}
                </div>

                {step < 4 && (
                  <button
                    onClick={() => setStep(4)}
                    disabled={!selectedType}
                    className="w-full mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {t('getQuote')}
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
