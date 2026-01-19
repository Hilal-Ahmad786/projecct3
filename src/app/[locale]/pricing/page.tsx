'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import ComparisonTable from '@/components/ComparisonTable';

export const dynamic = 'force-dynamic';

const translations: Record<string, Record<string, string>> = {
  title: {
    en: 'Transparent Pricing',
    tr: 'Şeffaf Fiyatlandırma',
    de: 'Transparente Preise',
    ur: 'شفاف قیمتیں',
    ar: 'تسعير شفاف',
  },
  subtitle: {
    en: 'Choose the engagement model that fits your project needs',
    tr: 'Proje ihtiyaçlarınıza uygun çalışma modelini seçin',
    de: 'Wählen Sie das Engagement-Modell, das zu Ihren Projektanforderungen passt',
    ur: 'اپنے پروجیکٹ کی ضروریات کے مطابق مشغولیت کا ماڈل منتخب کریں',
    ar: 'اختر نموذج المشاركة الذي يناسب احتياجات مشروعك',
  },
  compareTitle: {
    en: 'Compare Plans',
    tr: 'Planları Karşılaştırın',
    de: 'Pläne vergleichen',
    ur: 'پلانز کا موازنہ کریں',
    ar: 'قارن الخطط',
  },
  compareSubtitle: {
    en: 'Find the perfect plan for your needs',
    tr: 'İhtiyaçlarınız için mükemmel planı bulun',
    de: 'Finden Sie den perfekten Plan für Ihre Bedürfnisse',
    ur: 'اپنی ضروریات کے لیے بہترین پلان تلاش کریں',
    ar: 'ابحث عن الخطة المثالية لاحتياجاتك',
  },
  getStarted: {
    en: 'Get Started',
    tr: 'Başlayın',
    de: 'Loslegen',
    ur: 'شروع کریں',
    ar: 'ابدأ الآن',
  },
  contactSales: {
    en: 'Contact Sales',
    tr: 'Satışla İletişime Geçin',
    de: 'Vertrieb kontaktieren',
    ur: 'سیلز سے رابطہ کریں',
    ar: 'اتصل بالمبيعات',
  },
  customQuote: {
    en: 'Need a custom quote?',
    tr: 'Özel teklif mi gerekiyor?',
    de: 'Benötigen Sie ein individuelles Angebot?',
    ur: 'کسٹم کوٹ چاہیے؟',
    ar: 'هل تحتاج عرض سعر مخصص؟',
  },
  customQuoteDesc: {
    en: 'Our team will create a tailored proposal based on your specific requirements',
    tr: 'Ekibimiz özel gereksinimlerinize göre özelleştirilmiş bir teklif oluşturacaktır',
    de: 'Unser Team erstellt einen maßgeschneiderten Vorschlag basierend auf Ihren spezifischen Anforderungen',
    ur: 'ہماری ٹیم آپ کی مخصوص ضروریات کی بنیاد پر اپنی مرضی کی تجویز تیار کرے گی',
    ar: 'سيقوم فريقنا بإنشاء اقتراح مخصص بناءً على متطلباتك الخاصة',
  },
};

// Features for comparison table
const features = [
  { name: 'Dedicated Project Manager', category: 'Support' },
  { name: 'Source Code Ownership', category: 'Deliverables' },
  { name: 'UI/UX Design', category: 'Services' },
  { name: 'Custom Development', category: 'Services' },
  { name: 'API Integration', category: 'Services' },
  { name: 'Cloud Deployment', category: 'Services' },
  { name: 'Security Audit', category: 'Quality' },
  { name: 'Performance Optimization', category: 'Quality' },
  { name: 'Documentation', category: 'Deliverables' },
  { name: 'Training & Handover', category: 'Support' },
  { name: 'Post-Launch Support', category: 'Support' },
  { name: 'SLA Guarantee', category: 'Support' },
];

// Plans for comparison
const plans = [
  {
    name: 'Starter',
    price: '$5,000',
    period: 'project',
    description: 'Perfect for MVPs and small projects',
    features: {
      'Dedicated Project Manager': false,
      'Source Code Ownership': true,
      'UI/UX Design': 'Basic',
      'Custom Development': true,
      'API Integration': '2 APIs',
      'Cloud Deployment': true,
      'Security Audit': false,
      'Performance Optimization': 'Basic',
      'Documentation': true,
      'Training & Handover': '2 hours',
      'Post-Launch Support': '30 days',
      'SLA Guarantee': false,
    },
    highlighted: false,
    ctaText: 'Get Started',
    ctaUrl: '/start-project',
  },
  {
    name: 'Professional',
    price: '$15,000',
    period: 'project',
    description: 'Best for growing businesses',
    features: {
      'Dedicated Project Manager': true,
      'Source Code Ownership': true,
      'UI/UX Design': 'Advanced',
      'Custom Development': true,
      'API Integration': '5 APIs',
      'Cloud Deployment': true,
      'Security Audit': true,
      'Performance Optimization': 'Advanced',
      'Documentation': true,
      'Training & Handover': '8 hours',
      'Post-Launch Support': '90 days',
      'SLA Guarantee': true,
    },
    highlighted: true,
    ctaText: 'Get Started',
    ctaUrl: '/start-project',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale projects',
    features: {
      'Dedicated Project Manager': true,
      'Source Code Ownership': true,
      'UI/UX Design': 'Premium',
      'Custom Development': true,
      'API Integration': 'Unlimited',
      'Cloud Deployment': true,
      'Security Audit': true,
      'Performance Optimization': 'Premium',
      'Documentation': true,
      'Training & Handover': 'Unlimited',
      'Post-Launch Support': '12 months',
      'SLA Guarantee': true,
    },
    highlighted: false,
    ctaText: 'Contact Sales',
    ctaUrl: '/contact',
  },
];

export default function PricingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const t = (key: string) => translations[key]?.[locale] || translations[key]?.en || key;

  // Localize plans
  const localizedPlans = plans.map((plan) => ({
    ...plan,
    ctaText: plan.ctaText === 'Get Started' ? t('getStarted') : t('contactSales'),
    ctaUrl: `/${locale}${plan.ctaUrl}`,
  }));

  return (
    <div className="min-h-screen bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <ComparisonTable
        title={t('compareTitle')}
        subtitle={t('compareSubtitle')}
        features={features}
        plans={localizedPlans}
        showCategories={false}
      />

      {/* Custom Quote CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 mb-6">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('customQuote')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('customQuoteDesc')}
            </p>
            <Link
              href={`/${locale}/start-project`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {t('getStarted')}
              <ArrowRightIcon className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
