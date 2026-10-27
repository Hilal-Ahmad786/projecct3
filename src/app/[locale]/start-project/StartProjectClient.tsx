'use client';

import { useEffect, useState } from 'react';
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
import ShortProjectRequestForm from '@/components/forms/ShortProjectRequestForm';

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
    en: 'Project information', tr: 'Proje bilgileri', de: 'Projektinformationen', ur: 'پروجیکٹ کی معلومات', ar: 'معلومات المشروع',
  },
  benefit1Desc: {
    en: 'Share your business, current website and project needs.', tr: 'İşletmenizi, mevcut web sitenizi ve ihtiyaçlarınızı paylaşın.', de: 'Teilen Sie Ihr Unternehmen, Ihre aktuelle Website und Ihre Anforderungen mit.', ur: 'اپنے کاروبار، موجودہ ویب سائٹ اور ضروریات کے بارے میں بتائیں۔', ar: 'شارك معلومات عن نشاطك وموقعك الحالي واحتياجات المشروع.',
  },
  benefit2Title: {
    en: 'Scope discussion', tr: 'Kapsam görüşmesi', de: 'Umfang besprechen', ur: 'دائرۂ کار پر گفتگو', ar: 'مناقشة النطاق',
  },
  benefit2Desc: {
    en: 'We review the pages, functions and integrations relevant to your request.', tr: 'Talebinizle ilgili sayfa, işlev ve entegrasyon ihtiyaçlarını değerlendiriyoruz.', de: 'Wir prüfen die für Ihre Anfrage relevanten Seiten, Funktionen und Integrationen.', ur: 'ہم آپ کی درخواست سے متعلق صفحات، خصوصیات اور انضمام کا جائزہ لیتے ہیں۔', ar: 'نراجع الصفحات والوظائف والتكاملات المرتبطة بطلبك.',
  },
  benefit3Title: {
    en: 'Useful next steps', tr: 'Sonraki adımlar', de: 'Nächste Schritte', ur: 'اگلے مفید اقدامات', ar: 'الخطوات التالية',
  },
  benefit3Desc: {
    en: 'The next steps are discussed after your needs are understood.', tr: 'İhtiyaçlarınız netleştiğinde uygun sonraki adımları konuşuyoruz.', de: 'Die nächsten Schritte besprechen wir, sobald Ihre Anforderungen klar sind.', ur: 'ضروریات واضح ہونے کے بعد اگلے اقدامات پر بات کی جائے گی۔', ar: 'نناقش الخطوات التالية بعد فهم احتياجاتك.',
  },
  benefit4Title: {
    en: 'Selected service', tr: 'Seçilen hizmet', de: 'Ausgewählter Service', ur: 'منتخب کردہ سروس', ar: 'الخدمة المحددة',
  },
  benefit4Desc: {
    en: 'Your enquiry keeps the service selected on the previous page.', tr: 'Talebiniz, önceki sayfada seçtiğiniz hizmet bilgisiyle iletilir.', de: 'Ihre Anfrage enthält den zuvor ausgewählten Service.', ur: 'آپ کی درخواست میں پچھلے صفحے پر منتخب کردہ سروس شامل ہوگی۔', ar: 'يتضمن طلبك الخدمة التي اخترتها في الصفحة السابقة.',
  },
  backHome: {
    en: 'Back to Home',
    tr: 'Ana Sayfaya Dön',
    de: 'Zurück zur Startseite',
    ur: 'ہوم پیج پر واپس جائیں',
    ar: 'العودة إلى الصفحة الرئيسية',
  },
  shortEnquiry: { en: 'Short Enquiry', tr: 'Kısa Talep Gönder', de: 'Kurze Anfrage senden', ur: 'مختصر درخواست بھیجیں', ar: 'إرسال استفسار مختصر' },
  detailedBrief: { en: 'Complete Detailed Project Brief', tr: 'Detaylı Proje Briefi Doldur', de: 'Detailliertes Projektbriefing ausfüllen', ur: 'تفصیلی پروجیکٹ بریف پُر کریں', ar: 'املأ موجز المشروع التفصيلي' },
  formChoice: { en: 'Choose how much detail to share. You can start with a short enquiry.', tr: 'Ne kadar ayrıntı paylaşacağınıza siz karar verin; kısa bir taleple başlayabilirsiniz.', de: 'Wählen Sie, wie viele Details Sie teilen möchten. Sie können mit einer kurzen Anfrage beginnen.', ur: 'آپ کتنی تفصیل دینا چاہتے ہیں، یہ آپ پر منحصر ہے۔ مختصر درخواست سے آغاز کریں۔', ar: 'اختر مقدار التفاصيل التي تريد مشاركتها؛ يمكنك البدء باستفسار مختصر.' },
  privacyNotice: { en: 'Information in this form is used to review and respond to your enquiry.', tr: 'Bu formdaki bilgiler talebinizi değerlendirmek ve yanıtlamak için kullanılır.', de: 'Die Angaben in diesem Formular werden verwendet, um Ihre Anfrage zu prüfen und zu beantworten.', ur: 'اس فارم کی معلومات آپ کی درخواست کا جائزہ لینے اور جواب دینے کے لیے استعمال ہوتی ہیں۔', ar: 'تُستخدم المعلومات الواردة في هذا النموذج لمراجعة استفسارك والرد عليه.' },
  privacyLink: { en: 'Privacy policy', tr: 'Gizlilik politikası', de: 'Datenschutzerklärung', ur: 'رازداری کی پالیسی', ar: 'سياسة الخصوصية' },
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
  const [serviceType, setServiceType] = useState('');
  const [formMode, setFormMode] = useState<'short' | 'detailed'>('short');

  useEffect(() => {
    const selectedService = new URLSearchParams(window.location.search).get('service') || '';
    setServiceType(selectedService);
  }, []);

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
                <p className="mb-4 text-sm leading-6 text-gray-600">{t('formChoice')}</p>
                <div role="group" aria-label={locale === 'tr' ? 'Talep formu türü' : 'Enquiry form type'} className="mb-6 grid gap-2 sm:grid-cols-2">
                  {(['short', 'detailed'] as const).map((mode) => <button key={mode} type="button" aria-pressed={formMode === mode} onClick={() => setFormMode(mode)} className={`min-h-11 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none ${formMode === mode ? 'border-heritage-turquoise-deep bg-heritage-turquoise-deep text-white' : 'border-gray-300 bg-white text-gray-800 hover:border-heritage-turquoise'}`}>
                    {t(mode === 'short' ? 'shortEnquiry' : 'detailedBrief')}
                  </button>)}
                </div>
                <p className="mb-5 text-xs leading-5 text-gray-500">{t('privacyNotice')} <Link href={`/${locale}/privacy-policy`} className="font-medium text-heritage-turquoise-deep underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise">{t('privacyLink')}</Link></p>
                {formMode === 'short' ? <ShortProjectRequestForm key={`short-${serviceType}`} prefilledService={serviceType} /> : <ProjectRequestForm
                  key={`detailed-${serviceType}`}
                  prefilledService={serviceType}
                  onSuccess={() => {
                    // Optionally redirect or show success
                  }}
                  onClose={() => {
                    // Optionally handle close
                  }}
                />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
