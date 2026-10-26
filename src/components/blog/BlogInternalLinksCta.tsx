import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { isRTL, type Locale } from '@/lib/i18n'

const copy: Record<Locale, {
  eyebrow: string
  compactTitle: string
  compactText: string
  title: string
  text: string
  home: string
  services: string
}> = {
  en: {
    eyebrow: 'PakSoft services',
    compactTitle: 'Explore services for your next project',
    compactText: 'See how PakSoft can support your business across web, e-commerce, marketing and automation.',
    title: 'Find a service that fits your business',
    text: 'Explore PakSoft’s featured services or visit the homepage to learn more about our work.',
    home: 'Visit the homepage',
    services: 'Explore featured services',
  },
  tr: {
    eyebrow: 'PakSoft hizmetleri',
    compactTitle: 'Projeniz için uygun hizmetleri keşfedin',
    compactText: 'Web, e-ticaret, pazarlama ve otomasyon çözümlerimizi inceleyin.',
    title: 'İşletmenize uygun hizmeti bulun',
    text: 'Öne çıkan hizmetlerimizi inceleyin veya çalışmalarımız hakkında bilgi almak için ana sayfamızı ziyaret edin.',
    home: 'Ana sayfayı ziyaret edin',
    services: 'Öne çıkan hizmetleri keşfedin',
  },
  de: {
    eyebrow: 'PakSoft Leistungen',
    compactTitle: 'Entdecken Sie passende Leistungen für Ihr Projekt',
    compactText: 'Informieren Sie sich über unsere Lösungen für Websites, E-Commerce, Marketing und Automatisierung.',
    title: 'Finden Sie die passende Leistung für Ihr Unternehmen',
    text: 'Entdecken Sie unsere ausgewählten Leistungen oder besuchen Sie die Startseite, um mehr über unsere Arbeit zu erfahren.',
    home: 'Startseite besuchen',
    services: 'Ausgewählte Leistungen entdecken',
  },
  ar: {
    eyebrow: 'خدمات PakSoft',
    compactTitle: 'اكتشف الخدمات المناسبة لمشروعك القادم',
    compactText: 'تعرّف على حلولنا في المواقع والتجارة الإلكترونية والتسويق والأتمتة.',
    title: 'اعثر على الخدمة المناسبة لنشاطك',
    text: 'اكتشف خدماتنا المميزة أو زر الصفحة الرئيسية لمعرفة المزيد عن أعمالنا.',
    home: 'زيارة الصفحة الرئيسية',
    services: 'اكتشاف الخدمات المميزة',
  },
  ur: {
    eyebrow: 'PakSoft کی خدمات',
    compactTitle: 'اپنے اگلے منصوبے کے لیے موزوں خدمات دیکھیں',
    compactText: 'ویب سائٹس، ای کامرس، مارکیٹنگ اور آٹومیشن کے ہمارے حل ملاحظہ کریں۔',
    title: 'اپنے کاروبار کے لیے موزوں خدمت تلاش کریں',
    text: 'ہماری نمایاں خدمات دیکھیں یا ہمارے کام کے بارے میں مزید جاننے کے لیے ہوم پیج پر جائیں۔',
    home: 'ہوم پیج دیکھیں',
    services: 'نمایاں خدمات دریافت کریں',
  },
}

export default function BlogInternalLinksCta({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy[locale]
  const rtl = isRTL(locale)
  const ArrowIcon = rtl ? ArrowLeftIcon : ArrowRightIcon
  const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2'

  if (compact) {
    return (
      <aside className="my-8 rounded-xl border border-heritage-sand bg-heritage-ivory p-5 sm:p-6" dir={rtl ? 'rtl' : 'ltr'} aria-label={t.eyebrow}>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-heritage-turquoise-deep">{t.eyebrow}</p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-gray-950">{t.compactTitle}</h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">{t.compactText}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href={`/${locale}#featured-services-title`} className={`inline-flex shrink-0 items-center gap-2 font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline ${focus}`}>
              {t.services}<ArrowIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={`/${locale}`} className={`inline-flex shrink-0 items-center gap-2 text-sm font-medium text-gray-700 underline-offset-4 hover:text-gray-950 hover:underline ${focus}`}>
              <HomeIcon className="h-4 w-4" aria-hidden="true" />{t.home}
            </Link>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="my-10 overflow-hidden rounded-2xl border border-gray-800 bg-gray-950 px-6 py-7 text-white sm:px-8 sm:py-8" dir={rtl ? 'rtl' : 'ltr'} aria-label={t.eyebrow}>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-heritage-turquoise-light">{t.eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{t.title}</h2>
          <p className="mt-2 text-sm leading-6 text-gray-300 sm:text-base">{t.text}</p>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link href={`/${locale}#featured-services-title`} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-heritage-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-heritage-turquoise-deep motion-reduce:transition-none ${focus}`}>
            {t.services}<ArrowIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href={`/${locale}`} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 motion-reduce:transition-none ${focus}`}>
            <HomeIcon className="h-4 w-4" aria-hidden="true" />{t.home}
          </Link>
        </div>
      </div>
    </aside>
  )
}
