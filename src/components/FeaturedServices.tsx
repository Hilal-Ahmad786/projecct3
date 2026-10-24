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

type ServiceAccent = {
  text: string
  hoverText: string
  soft: string
  border: string
  wash: string
}

const accents: Record<'web' | 'ai' | 'marketing' | 'design', ServiceAccent> = {
  web: {
    text: 'text-heritage-turquoise',
    hoverText: 'group-hover:text-heritage-turquoise',
    soft: 'bg-heritage-turquoise-light',
    border: 'hover:border-heritage-turquoise/40',
    wash: 'from-heritage-turquoise/[0.06]',
  },
  ai: {
    text: 'text-heritage-lapis',
    hoverText: 'group-hover:text-heritage-lapis',
    soft: 'bg-heritage-lapis-light',
    border: 'hover:border-heritage-lapis/40',
    wash: 'from-heritage-lapis/[0.06]',
  },
  marketing: {
    text: 'text-heritage-saffron',
    hoverText: 'group-hover:text-heritage-saffron',
    soft: 'bg-heritage-saffron-light',
    border: 'hover:border-heritage-saffron-bright/40',
    wash: 'from-heritage-saffron-bright/[0.07]',
  },
  design: {
    text: 'text-heritage-terracotta',
    hoverText: 'group-hover:text-heritage-terracotta',
    soft: 'bg-heritage-terracotta-light',
    border: 'hover:border-heritage-terracotta/40',
    wash: 'from-heritage-terracotta/[0.06]',
  },
}

const featuredServices: Array<{
  id: string
  slug: string
  Icon: ServiceIcon
  accent: ServiceAccent
}> = [
  { id: 'corporateWebDesign', slug: 'corporate-website-design', Icon: ComputerDesktopIcon, accent: accents.design },
  { id: 'ecommerce', slug: 'e-commerce', Icon: ShoppingBagIcon, accent: accents.web },
  { id: 'googleAds', slug: 'google-ads', Icon: CursorArrowRaysIcon, accent: accents.marketing },
  { id: 'aiAutomation', slug: 'ai-workflow-automation', Icon: ArrowsRightLeftIcon, accent: accents.ai },
  { id: 'seo', slug: 'seo', Icon: MagnifyingGlassIcon, accent: accents.marketing },
  { id: 'chatbotWhatsapp', slug: 'conversational-ai', Icon: ChatBubbleLeftRightIcon, accent: accents.ai },
  { id: 'customSoftware', slug: 'web-development', Icon: CodeBracketSquareIcon, accent: accents.web },
  { id: 'socialAds', slug: 'meta-ads', Icon: MegaphoneIcon, accent: accents.design },
]

export default function FeaturedServices({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const copy = translations.featuredServices as FeaturedServicesCopy
  const rtl = isRTL(locale)
  const ArrowIcon = rtl ? ArrowLeftIcon : ArrowRightIcon

  const localizedHref = (path: string) => `/${locale}${localizeFullPath(path, locale)}`

  return (
    <section
      className="relative overflow-hidden bg-background-gray py-20 lg:py-28"
      aria-labelledby="featured-services-title"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className={`pointer-events-none absolute top-20 h-24 w-24 ${rtl ? 'left-10' : 'right-10'} hidden md:block`} aria-hidden="true">
        <div className={`crescent ${rtl ? 'crescent-left' : 'crescent-right'} crescent-subtle text-gray-900`} />
      </div>

      <div className="pointer-events-none absolute -bottom-32 -left-24 hidden h-80 w-80 rounded-full bg-heritage-turquoise-light/60 blur-3xl lg:block" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
          <h2 id="featured-services-title" className="text-headline mb-5 text-gray-900">
            {copy.title}
          </h2>
          <p className="text-body mx-auto max-w-2xl leading-relaxed text-gray-600">
            {copy.introduction}
          </p>
        </div>

        <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {featuredServices.map(({ id, slug, Icon, accent }) => {
            const service = copy.items[id]

            return (
              <Link
                key={slug}
                href={localizedHref(`/services/${slug}`)}
                className={`group relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-start shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-background-gray motion-reduce:transform-none motion-reduce:transition-none md:p-7 ${accent.border}`}
              >
                <span className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.wash} via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none`} aria-hidden="true" />

                <span className={`relative z-10 mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accent.soft} ${accent.text}`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className={`relative z-10 mb-3 text-xl font-bold leading-tight tracking-tight text-gray-900 transition-colors duration-300 motion-reduce:transition-none ${accent.hoverText}`}>
                  {service.title}
                </h3>
                <p className="relative z-10 mb-6 flex-1 text-sm font-medium leading-relaxed text-gray-600">
                  {service.description}
                </p>
                <span className={`relative z-10 inline-flex items-center gap-2 text-sm font-semibold ${accent.text}`}>
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
            className="group inline-flex items-center justify-center gap-2 rounded-sm border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-[transform,background-color,border-color] duration-250 hover:-translate-y-0.5 hover:border-gray-700 hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-background-gray motion-reduce:transform-none motion-reduce:transition-none"
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
