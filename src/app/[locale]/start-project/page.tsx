'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  RocketLaunchIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import ProjectRequestForm from '@/components/forms/ProjectRequestForm';

export const dynamic = 'force-dynamic';

const translations: Record<string, Record<string, string>> = {
  title: {
    en: 'Start Your Project',
    tr: 'Projenizi Başlatın',
    de: 'Starten Sie Ihr Projekt',
    ur: 'اپنا پروجیکٹ شروع کریں',
    ar: 'ابدأ مشروعك',
  },
  subtitle: {
    en: 'Tell us about your vision and we\'ll bring it to life',
    tr: 'Vizyonunuzu bize anlatın, biz hayata geçirelim',
    de: 'Erzählen Sie uns von Ihrer Vision und wir setzen sie um',
    ur: 'ہمیں اپنے وژن کے بارے میں بتائیں اور ہم اسے حقیقت بنائیں گے',
    ar: 'أخبرنا عن رؤيتك وسنحولها إلى واقع',
  },
  benefit1Title: {
    en: 'Free Consultation',
    tr: 'Ücretsiz Danışmanlık',
    de: 'Kostenlose Beratung',
    ur: 'مفت مشاورت',
    ar: 'استشارة مجانية',
  },
  benefit1Desc: {
    en: 'Get expert advice on your project requirements',
    tr: 'Proje gereksinimleriniz için uzman tavsiyesi alın',
    de: 'Erhalten Sie fachkundige Beratung zu Ihren Projektanforderungen',
    ur: 'اپنے پروجیکٹ کی ضروریات پر ماہر مشورہ حاصل کریں',
    ar: 'احصل على مشورة الخبراء لمتطلبات مشروعك',
  },
  benefit2Title: {
    en: 'Quick Response',
    tr: 'Hızlı Yanıt',
    de: 'Schnelle Antwort',
    ur: 'فوری جواب',
    ar: 'استجابة سريعة',
  },
  benefit2Desc: {
    en: 'We respond within 24 hours with a detailed proposal',
    tr: 'Detaylı teklifle 24 saat içinde yanıt veriyoruz',
    de: 'Wir antworten innerhalb von 24 Stunden mit einem detaillierten Angebot',
    ur: 'ہم 24 گھنٹوں میں تفصیلی تجویز کے ساتھ جواب دیتے ہیں',
    ar: 'نرد خلال 24 ساعة باقتراح مفصل',
  },
  benefit3Title: {
    en: 'NDA Protected',
    tr: 'NDA Korumalı',
    de: 'NDA-geschützt',
    ur: 'NDA محفوظ',
    ar: 'محمي باتفاقية عدم إفشاء',
  },
  benefit3Desc: {
    en: 'Your ideas are safe with confidentiality agreements',
    tr: 'Fikirleriniz gizlilik anlaşmalarıyla güvende',
    de: 'Ihre Ideen sind durch Vertraulichkeitsvereinbarungen geschützt',
    ur: 'آپ کے خیالات رازداری کے معاہدوں کے ساتھ محفوظ ہیں',
    ar: 'أفكارك آمنة مع اتفاقيات السرية',
  },
  benefit4Title: {
    en: 'Dedicated Team',
    tr: 'Özel Ekip',
    de: 'Engagiertes Team',
    ur: 'سرشار ٹیم',
    ar: 'فريق متخصص',
  },
  benefit4Desc: {
    en: 'Work directly with senior developers and designers',
    tr: 'Kıdemli geliştiriciler ve tasarımcılarla doğrudan çalışın',
    de: 'Arbeiten Sie direkt mit erfahrenen Entwicklern und Designern',
    ur: 'سینیئر ڈویلپرز اور ڈیزائنرز کے ساتھ براہ راست کام کریں',
    ar: 'اعمل مباشرة مع مطورين ومصممين ذوي خبرة',
  },
  backHome: {
    en: 'Back to Home',
    tr: 'Ana Sayfaya Dön',
    de: 'Zurück zur Startseite',
    ur: 'ہوم پیج پر واپس جائیں',
    ar: 'العودة إلى الصفحة الرئيسية',
  },
};

const benefits = [
  { icon: ChatBubbleLeftRightIcon, titleKey: 'benefit1Title', descKey: 'benefit1Desc' },
  { icon: ClockIcon, titleKey: 'benefit2Title', descKey: 'benefit2Desc' },
  { icon: ShieldCheckIcon, titleKey: 'benefit3Title', descKey: 'benefit3Desc' },
  { icon: CheckCircleIcon, titleKey: 'benefit4Title', descKey: 'benefit4Desc' },
];

export default function StartProjectPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const t = (key: string) => translations[key]?.[locale] || translations[key]?.en || key;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeftIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            {t('backHome')}
          </Link>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Side - Benefits */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-32"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                    <RocketLaunchIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-8">
                  {t('subtitle')}
                </p>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.titleKey}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{t(benefit.titleKey)}</h3>
                        <p className="text-sm text-gray-600">{t(benefit.descKey)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust indicators */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span>ISO 27001</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span>GDPR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span>SOC 2</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
              >
                <ProjectRequestForm
                  onSuccess={() => {
                    // Optionally redirect or show success
                  }}
                  onClose={() => {
                    // Optionally handle close
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
