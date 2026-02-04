'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const translations: Record<string, Record<string, string>> = {
  title: {
    en: 'Page Not Found',
    tr: 'Sayfa Bulunamadı',
    de: 'Seite nicht gefunden',
    ur: 'صفحہ نہیں ملا',
    ar: 'الصفحة غير موجودة',
  },
  description: {
    en: 'The page you are looking for does not exist.',
    tr: 'Aradığınız sayfa mevcut değil.',
    de: 'Die gesuchte Seite existiert nicht.',
    ur: 'آپ جو صفحہ ڈھونڈ رہے ہیں وہ موجود نہیں ہے۔',
    ar: 'الصفحة التي تبحث عنها غير موجودة.',
  },
  backHome: {
    en: 'Go Back Home',
    tr: 'Ana Sayfaya Dön',
    de: 'Zur Startseite',
    ur: 'ہوم پیج پر واپس جائیں',
    ar: 'العودة للرئيسية',
  },
};

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar' || locale === 'ur';

  const t = (key: string) => translations[key]?.[locale] || translations[key]?.en || key;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t('title')}</h2>
        <p className="text-gray-600 mb-8">
          {t('description')}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block px-6 py-3 bg-gray-900 text-white rounded-sm hover:bg-gray-700 transition-colors"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
