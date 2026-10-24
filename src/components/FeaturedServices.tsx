import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketSquareIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { Locale, isRTL } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { localizeFullPath } from '@/lib/routes'

type ServiceIcon = ComponentType<SVGProps<SVGSVGElement>>

type FeaturedServiceCopy = {
  title: string
  description: string
}

type FeaturedServicesCopy = {
  title: string
  introduction: string
  cardLinkLabel: string
  allServicesLabel: string
  items: Record<string, FeaturedServiceCopy>
}

const featuredServices: Array<{
  id: string
  slug: string
  Icon: ServiceIcon
}> = [
  { id: 'corporateWebDesign', slug: 'corporate-website-design', Icon: ComputerDesktopIcon },
  { id: 'ecommerce', slug: 'e-commerce', Icon: ShoppingBagIcon },
  { id: 'googleAds', slug: 'google-ads', Icon: CursorArrowRaysIcon },
  { id: 'aiAutomation', slug: 'ai-workflow-automation', Icon: ArrowsRightLeftIcon },
  { id: 'seo', slug: 'seo', Icon: MagnifyingGlassIcon },
  { id: 'chatbotWhatsapp', slug: 'conversational-ai', Icon: ChatBubbleLeftRightIcon },
  { id: 'customSoftware', slug: 'web-development', Icon: CodeBracketSquareIcon },
  { id: 'socialAds', slug: 'meta-ads', Icon: MegaphoneIcon },
]

export default function FeaturedServices({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const copy = translations.featuredServices as FeaturedServicesCopy
  const rtl = isRTL(locale)
  const ArrowIcon = rtl ? ArrowLeftIcon : ArrowRightIcon

  const localizedHref = (path: string) => `/${locale}${localizeFullPath(path, locale)}`

  return (
    <section
      className="relative overflow-hidden border-y border-heritage-turquoise/10 bg-heritage-ivory py-16 md:py-20"
      aria-labelledby="featured-services-title"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-heritage-turquoise/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <div className="mb-5 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-0.5 w-8 bg-heritage-turquoise" />
            <span className="h-2 w-2 rounded-full bg-heritage-saffron" />
            <span className="h-0.5 w-8 bg-heritage-turquoise" />
          </div>
          <h2 id="featured-services-title" className="text-headline mb-4 text-gray-900">
            {copy.title}
          </h2>
          <p className="text-body mx-auto max-w-2xl leading-relaxed text-gray-600">
            {copy.introduction}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map(({ id, slug, Icon }) => {
            const service = copy.items[id]

            return (
              <Link
                key={slug}
                href={localizedHref(`/services/${slug}`)}
                className="group flex h-full min-h-64 flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-heritage-turquoise/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-ivory motion-reduce:transform-none motion-reduce:transition-none"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-heritage-turquoise/20 bg-heritage-turquoise-light text-heritage-turquoise-deep transition-colors duration-200 group-hover:border-heritage-turquoise/40 group-hover:bg-heritage-turquoise group-hover:text-white motion-reduce:transition-none">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mb-3 text-lg font-medium leading-snug text-gray-900">
                  {service.title}
                </h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-heritage-turquoise-deep">
                  {copy.cardLinkLabel}
                  <ArrowIcon
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none rtl:group-hover:-translate-x-1 rtl:group-focus-visible:-translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <Link
            href={localizedHref('/services')}
            className="group inline-flex items-center justify-center gap-2 rounded-sm border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-gray-700 hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-heritage-ivory motion-reduce:transform-none motion-reduce:transition-none"
          >
            {copy.allServicesLabel}
            <ArrowIcon
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none rtl:group-hover:-translate-x-1 rtl:group-focus-visible:-translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
