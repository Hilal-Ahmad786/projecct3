import Link from 'next/link'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  BoltIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { Locale, isRTL } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { localizeFullPath } from '@/lib/routes'

type OngoingSupportCopy = {
  title: string
  description: string
  items: string[]
  cta: string
}

const icons = [WrenchScrewdriverIcon, BoltIcon, CloudIcon, ArrowsRightLeftIcon]

export default function OngoingSupportSection({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const copy = translations.ongoingSupport as OngoingSupportCopy
  const rtl = isRTL(locale)
  const ArrowIcon = rtl ? ArrowLeftIcon : ArrowRightIcon
  const supportHref = `/${locale}${localizeFullPath('/services/maintenance-support', locale)}`

  return (
    <section
      className="bg-white px-4 py-16 md:px-8 md:py-20"
      aria-labelledby="ongoing-support-title"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto max-w-[1200px]">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900 px-6 py-9 text-white shadow-[0_12px_36px_rgba(17,24,39,0.12)] sm:px-8 md:px-10 md:py-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10" aria-hidden="true" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:gap-10">
            <div>
              <h2 id="ongoing-support-title" className="mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {copy.title}
              </h2>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-gray-300 sm:text-base">
                {copy.description}
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {copy.items.map((item, index) => {
                const Icon = icons[index]
                return (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-gray-100">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-heritage-turquoise-soft">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                )
              })}
            </ul>

            <Link
              href={supportHref}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-sm border border-white bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-[transform,background-color] duration-250 hover:-translate-y-0.5 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 motion-reduce:transform-none motion-reduce:transition-none sm:w-auto lg:justify-self-end"
            >
              {copy.cta}
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none rtl:group-hover:-translate-x-1 rtl:group-focus-visible:-translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
