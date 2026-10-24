import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Locale, isRTL } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { localizeFullPath } from '@/lib/routes'

type StageCopy = {
  eyebrow: string
  title: string
  description: string
  services: string[]
}

type MarketingJourneyCopy = {
  title: string
  introduction: string
  serviceLinkLabel: string
  illustrativeLabel: string
  cta: string
  stages: Record<'visibility' | 'conversion' | 'measurement', StageCopy>
}

type ServiceLink = {
  labelIndex: number
  href: string
}

type Stage = {
  id: 'visibility' | 'conversion' | 'measurement'
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  accent: string
  soft: string
  ring: string
  links: ServiceLink[]
}

const stages: Stage[] = [
  {
    id: 'visibility',
    Icon: MagnifyingGlassIcon,
    accent: 'text-heritage-turquoise',
    soft: 'bg-heritage-turquoise-light',
    ring: 'focus-visible:ring-heritage-turquoise',
    links: [
      { labelIndex: 0, href: '/services/seo' },
      { labelIndex: 1, href: '/services/google-ads' },
      { labelIndex: 2, href: '/services/meta-ads' },
    ],
  },
  {
    id: 'conversion',
    Icon: CursorArrowRaysIcon,
    accent: 'text-heritage-terracotta',
    soft: 'bg-heritage-terracotta-light',
    ring: 'focus-visible:ring-heritage-terracotta',
    links: [
      { labelIndex: 0, href: '/services/landing-page-design' },
      { labelIndex: 1, href: '/services/conversion-rate-optimization' },
      { labelIndex: 2, href: '/services/conversion-rate-optimization' },
    ],
  },
  {
    id: 'measurement',
    Icon: ChartBarSquareIcon,
    accent: 'text-heritage-saffron',
    soft: 'bg-heritage-saffron-light',
    ring: 'focus-visible:ring-heritage-saffron',
    links: [
      { labelIndex: 0, href: '/services/data-analytics' },
      { labelIndex: 1, href: '/services/ux-analytics' },
      { labelIndex: 2, href: '/services/data-analytics' },
    ],
  },
]

export default function MarketingJourneySection({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const copy = translations.marketingJourney as MarketingJourneyCopy
  const rtl = isRTL(locale)
  const ArrowIcon = rtl ? ArrowLeftIcon : ArrowRightIcon
  const localizedHref = (path: string) => `/${locale}${localizeFullPath(path, locale)}`

  return (
    <section
      className="relative overflow-hidden bg-background-gray py-20 lg:py-28"
      aria-labelledby="marketing-journey-title"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="pointer-events-none absolute -right-32 top-12 h-72 w-72 rounded-full bg-heritage-saffron-light/60 blur-3xl" aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 id="marketing-journey-title" className="text-headline mb-5 text-gray-900">
            {copy.title}
          </h2>
          <p className="text-body mx-auto max-w-2xl leading-relaxed text-gray-600">
            {copy.introduction}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <span className="sr-only">{copy.illustrativeLabel}</span>
          <div className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[4.15rem] hidden h-px bg-gray-200 lg:block" aria-hidden="true" />

          <ol className="grid grid-cols-1 lg:grid-cols-3">
            {stages.map(({ id, Icon, accent, soft, ring, links }, index) => {
              const stage = copy.stages[id]

              return (
                <li
                  key={id}
                  className="relative flex min-w-0 flex-col border-b border-gray-200 p-6 last:border-b-0 sm:p-8 lg:border-b-0 lg:border-e lg:p-10 lg:last:border-e-0"
                >
                  <div className="relative z-10 mb-7 flex items-center justify-between gap-4">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-sm ${soft} ${accent}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold tracking-[0.16em] text-gray-400" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${accent}`}>
                    {stage.eyebrow}
                  </p>
                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">{stage.title}</h3>
                  <p className="mb-7 text-sm font-medium leading-relaxed text-gray-600 sm:text-base">
                    {stage.description}
                  </p>

                  <div className="mt-auto border-t border-gray-100 pt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {copy.serviceLinkLabel}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {links.map(({ labelIndex, href }) => (
                        <li key={`${id}-${labelIndex}`}>
                          <Link
                            href={localizedHref(href)}
                            className={`inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-[color,border-color,background-color] duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none ${ring}`}
                          >
                            {stage.services[labelIndex]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-10 text-center md:mt-12">
          <Link
            href={localizedHref('/contact')}
            className="group inline-flex items-center justify-center gap-2 rounded-sm border border-gray-900 bg-gray-900 px-7 py-3 text-sm font-medium text-white transition-[transform,background-color,border-color] duration-250 hover:-translate-y-0.5 hover:border-gray-700 hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-background-gray motion-reduce:transform-none motion-reduce:transition-none"
          >
            {copy.cta}
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none rtl:group-hover:-translate-x-1 rtl:group-focus-visible:-translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
