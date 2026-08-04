// Server-rendered "Related Services" section — real <a> links in the initial
// HTML to other services in the same category. Improves internal linking /
// crawl depth and gives users a path deeper into the catalog.

import Link from 'next/link';
import { localizeFullPath } from '@/lib/routes';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export interface RelatedItem {
  slug: string;
  name: string;
  shortDescription?: string | null;
}

const LABELS = {
  heading: { en: 'Related Services', tr: 'İlgili Hizmetler', de: 'Verwandte Leistungen', ur: 'متعلقہ خدمات', ar: 'خدمات ذات صلة' },
  subtitle: {
    en: 'Explore other services that pair well with this one.',
    tr: 'Bununla iyi eşleşen diğer hizmetleri keşfedin.',
    de: 'Entdecken Sie weitere Leistungen, die gut dazu passen.',
    ur: 'اس کے ساتھ اچھی طرح جوڑ کھانے والی دیگر خدمات دریافت کریں۔',
    ar: 'استكشف خدمات أخرى تتكامل مع هذه الخدمة.',
  },
  cta: { en: 'Learn more', tr: 'Daha fazla', de: 'Mehr erfahren', ur: 'مزید جانیں', ar: 'اعرف المزيد' },
} as const;

export default function RelatedServices({ items, locale }: { items: RelatedItem[]; locale: string }) {
  if (!items || items.length === 0) return null;
  const isRTL = locale === 'ar' || locale === 'ur';
  const t = (k: keyof typeof LABELS) => LABELS[k][locale as 'en'] || LABELS[k].en;

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 max-w-6xl">
        <span className="block w-10 h-1 rounded-full bg-heritage-turquoise mb-4" aria-hidden="true" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{t('heading')}</h2>
        <p className="text-gray-500 mt-2 mb-8">{t('subtitle')}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(s => (
            <Link
              key={s.slug}
              href={`/${locale}${localizeFullPath(`/services/${s.slug}`, locale)}`}
              className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-heritage-turquoise/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-heritage-turquoise transition-colors">
                {s.name}
              </h3>
              {s.shortDescription && (
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5 flex-1">
                  {s.shortDescription}
                </p>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-heritage-turquoise mt-auto">
                {t('cta')}
                <ArrowRightIcon className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5 group-hover:translate-x-0' : ''}`} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
