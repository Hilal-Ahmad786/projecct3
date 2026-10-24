import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ComputerDesktopIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { Locale, isRTL } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { localizeFullPath } from '@/lib/routes'

type PanelCopy = {
  title: string
  description: string
  capabilities: string[]
  cta: string
  previewLabel: string
  previewAlt: string
}

type BusinessSolutionsCopy = {
  title: string
  introduction: string
  realProjectLabel: string
  contextualLabel: string
  corporateContextLink: string
  shopifyContextLink: string
  ikasLabel: string
  corporate: PanelCopy
  ecommerce: PanelCopy
}

export default function BusinessSolutionsSection({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const copy = translations.businessSolutions as BusinessSolutionsCopy
  const rtl = isRTL(locale)
  const ArrowIcon = rtl ? ArrowLeftIcon : ArrowRightIcon
  const localizedHref = (path: string) => `/${locale}${localizeFullPath(path, locale)}`

  const panels = [
    {
      id: 'corporate',
      copy: copy.corporate,
      Icon: ComputerDesktopIcon,
      image: '/images/portfolio/ulku-lojistik.png',
      serviceHref: '/services/web-design',
      accent: 'turquoise',
    },
    {
      id: 'ecommerce',
      copy: copy.ecommerce,
      Icon: ShoppingBagIcon,
      image: '/images/portfolio/termopazar.png',
      serviceHref: '/services/e-commerce',
      accent: 'saffron',
    },
  ] as const

  return (
    <section
      className="section relative overflow-hidden bg-white"
      aria-labelledby="business-solutions-title"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className={`pointer-events-none absolute top-24 hidden h-24 w-24 md:block ${rtl ? 'right-12' : 'left-12'}`} aria-hidden="true">
        <div className={`crescent crescent-subtle text-gray-900 ${rtl ? 'crescent-right' : 'crescent-left'}`} />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 id="business-solutions-title" className="text-headline mb-5 text-gray-900">
            {copy.title}
          </h2>
          <p className="text-body mx-auto max-w-2xl leading-relaxed text-gray-600">
            {copy.introduction}
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {panels.map(({ id, copy: panel, Icon, image, serviceHref, accent }) => {
            const isTurquoise = accent === 'turquoise'
            const accentText = isTurquoise ? 'text-heritage-turquoise' : 'text-heritage-saffron'
            const accentSoft = isTurquoise ? 'bg-heritage-turquoise-light' : 'bg-heritage-saffron-light'
            const accentBorder = isTurquoise ? 'border-heritage-turquoise/20' : 'border-heritage-saffron-bright/20'

            return (
              <article
                key={id}
                className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-background-gray shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${accentBorder}`}
              >
                <figure className="border-b border-gray-200/80 bg-white p-3 sm:p-4">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm">
                    <div className="flex h-8 items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-3" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-heritage-terracotta/70" />
                      <span className="h-2 w-2 rounded-full bg-heritage-saffron/70" />
                      <span className="h-2 w-2 rounded-full bg-heritage-turquoise/70" />
                      <span className="ms-2 h-3 flex-1 rounded-sm bg-gray-200" />
                    </div>
                    <div className="relative aspect-[16/8] overflow-hidden">
                      <Image
                        src={image}
                        alt={panel.previewAlt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3 flex items-center gap-2 px-1 text-xs font-medium text-gray-500">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isTurquoise ? 'bg-heritage-turquoise' : 'bg-heritage-saffron-bright'}`} aria-hidden="true" />
                    <span>{copy.realProjectLabel}: {panel.previewLabel}</span>
                  </figcaption>
                </figure>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="mb-5 flex items-center gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accentSoft} ${accentText}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="text-title text-gray-900">{panel.title}</h3>
                  </div>

                  <p className="text-body mb-6 leading-relaxed text-gray-600">{panel.description}</p>

                  <ul className="mb-8 grid gap-3" aria-label={panel.title}>
                    {panel.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-gray-700">
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accentSoft} ${accentText}`}>
                          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={localizedHref(serviceHref)}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-sm border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-[transform,background-color,border-color] duration-250 hover:-translate-y-0.5 hover:border-gray-700 hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-background-gray motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
                    >
                      {panel.cta}
                      <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none rtl:group-hover:-translate-x-1 rtl:group-focus-visible:-translate-x-1" aria-hidden="true" />
                    </Link>

                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-gray-200 pt-5 text-sm">
                      <span className="text-gray-500">{copy.contextualLabel}</span>
                      {id === 'corporate' ? (
                        <Link
                          href={localizedHref('/services/corporate-website-design')}
                          className={`${accentText} font-semibold underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2`}
                        >
                          {copy.corporateContextLink}
                        </Link>
                      ) : (
                        <>
                          <span className={`rounded-full px-3 py-1 font-semibold ${accentSoft} ${accentText}`}>
                            {copy.ikasLabel}
                          </span>
                          <Link
                            href={localizedHref('/services/shopify-development')}
                            className={`${accentText} font-semibold underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-saffron focus-visible:ring-offset-2`}
                          >
                            {copy.shopifyContextLink}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
