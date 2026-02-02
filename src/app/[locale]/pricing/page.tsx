'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

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
  loading: {
    en: 'Loading pricing...',
    tr: 'Fiyatlandırma yükleniyor...',
    de: 'Preise werden geladen...',
    ur: 'قیمتیں لوڈ ہو رہی ہیں...',
    ar: 'جاري تحميل الأسعار...',
  },
  noPricing: {
    en: 'Pricing packages are being prepared. Please contact us for a custom quote.',
    tr: 'Fiyat paketleri hazırlanıyor. Özel teklif için bizimle iletişime geçin.',
    de: 'Preispakete werden vorbereitet. Kontaktieren Sie uns für ein individuelles Angebot.',
    ur: 'قیمت پیکجز تیار ہو رہے ہیں۔ کسٹم کوٹ کے لیے ہم سے رابطہ کریں۔',
    ar: 'يتم إعداد حزم الأسعار. يرجى الاتصال بنا للحصول على عرض أسعار مخصص.',
  },
};

interface PricingGroup {
  service: { id: string; name: string; slug: string; icon: string | null; color: string | null };
  packages: {
    id: string;
    tier: string;
    name: string;
    price: string;
    description: string | null;
    features: string[];
    highlighted: boolean;
    billingPeriod: string;
    yearlyPrice: string | null;
    ctaText: string | null;
  }[];
}

export default function PricingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const [pricingGroups, setPricingGroups] = useState<PricingGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeService, setActiveService] = useState<string | null>(null);

  const t = (key: string) => translations[key]?.[locale] || translations[key]?.en || key;

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch('/api/pricing');
        const data = await res.json();
        if (data.success && data.data) {
          setPricingGroups(data.data);
          if (data.data.length > 0) {
            setActiveService(data.data[0].service.slug);
          }
        }
      } catch (error) {
        console.error('Error fetching pricing:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPricing();
  }, []);

  const activeGroup = pricingGroups.find(g => g.service.slug === activeService);

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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      )}

      {/* No Pricing State */}
      {!loading && pricingGroups.length === 0 && (
        <div className="text-center py-24 px-4">
          <p className="text-gray-600 text-lg mb-8">{t('noPricing')}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {t('contactSales')}
          </Link>
        </div>
      )}

      {/* Service Tabs */}
      {!loading && pricingGroups.length > 0 && (
        <>
          {pricingGroups.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-12 px-4">
              {pricingGroups.map((group) => (
                <button
                  key={group.service.slug}
                  onClick={() => setActiveService(group.service.slug)}
                  className={`px-6 py-3 text-sm font-medium border rounded-lg transition-colors ${
                    activeService === group.service.slug
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {group.service.name}
                </button>
              ))}
            </div>
          )}

          {/* Pricing Cards */}
          {activeGroup && (
            <section className="py-8 pb-16">
              <div className="container mx-auto px-4">
                <div className={`grid gap-8 max-w-5xl mx-auto ${
                  activeGroup.packages.length === 1
                    ? 'md:grid-cols-1 max-w-lg'
                    : activeGroup.packages.length === 2
                    ? 'md:grid-cols-2 max-w-3xl'
                    : 'md:grid-cols-3'
                }`}>
                  {activeGroup.packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-xl p-8 border ${
                        pkg.highlighted
                          ? 'border-emerald-500 shadow-lg ring-2 ring-emerald-500/20'
                          : 'border-gray-200'
                      } bg-white`}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{pkg.price}</div>
                      {pkg.billingPeriod !== 'one-time' && (
                        <div className="text-sm text-gray-500 mb-1">/{pkg.billingPeriod}</div>
                      )}
                      {pkg.yearlyPrice && (
                        <div className="text-sm text-emerald-600 mb-4">{pkg.yearlyPrice}/year</div>
                      )}
                      {pkg.description && (
                        <p className="text-gray-600 mb-6">{pkg.description}</p>
                      )}
                      <ul className="space-y-3 mb-8">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/${locale}/contact`}
                        className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                          pkg.highlighted
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {pkg.ctaText || t('getStarted')}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

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
