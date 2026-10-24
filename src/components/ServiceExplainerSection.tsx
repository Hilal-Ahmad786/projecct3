import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { Locale, isRTL } from '@/lib/i18n'
import { localizeFullPath } from '@/lib/routes'

export type ExplainerCopy = {
  label: string
  title: string
  description: string
  capabilities: string[]
  cta: string
  illustrativeLabel: string
  contextualLinks?: { label: string; href: string }[]
  visual: {
    adLabel?: string
    searchTitle?: string
    searchDescription?: string
    searchPlaceholder?: string
    auditTitle?: string
    customer?: string
    assistant?: string
    agentSteps?: string[]
  }
}

type Props = {
  locale: Locale
  copy: ExplainerCopy
  id: string
  href: string
  visualType: 'marketing' | 'seo' | 'chatbot' | 'agent'
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  reverse?: boolean
  tone?: 'white' | 'gray' | 'ivory'
}

function Illustration({ copy, visualType, Icon }: Pick<Props, 'copy' | 'visualType' | 'Icon'>) {
  return (
    <figure className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-7">
      <figcaption className="mb-5 flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-heritage-turquoise-light text-heritage-turquoise">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-gray-800">{copy.illustrativeLabel}</span>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-heritage-turquoise" aria-hidden="true" />
      </figcaption>

      {visualType === 'marketing' && (
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4" aria-hidden="true">
          <div className="rounded-xl border border-heritage-saffron-bright/30 bg-heritage-saffron-light/60 p-4">
            <span className="mb-3 inline-flex rounded-sm bg-heritage-saffron px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">{copy.visual.adLabel}</span>
            <div className="mb-2 h-2 w-4/5 rounded bg-gray-700/70" />
            <div className="h-2 w-3/5 rounded bg-gray-300" />
            <div className="mt-4 h-7 w-20 rounded-sm bg-gray-900" />
          </div>
          <ArrowRightIcon className="h-5 w-5 text-gray-400 rtl:rotate-180" />
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-heritage-turquoise-light text-heritage-turquoise">
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="text-xs font-bold text-gray-800">{copy.visual.searchTitle}</p>
            <div className="mt-3 flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-2 text-[10px] text-gray-500">
              <span className="h-2 w-2 rounded-full border border-gray-400" aria-hidden="true" />
              {copy.visual.searchPlaceholder}
            </div>
          </div>
        </div>
      )}

      {visualType === 'seo' && (
        <div className="grid gap-3 sm:grid-cols-[1fr_0.9fr]">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="mb-4 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
              <span className="h-3 w-3 rounded-full border border-gray-400" />
              {copy.visual.searchPlaceholder}
            </div>
            <p className="mb-1 text-[10px] font-semibold text-heritage-turquoise">{copy.visual.searchTitle}</p>
            <p className="text-sm font-semibold text-blue-800">{copy.visual.searchDescription}</p>
            <div className="mt-2 h-2 w-full rounded bg-gray-200" />
            <div className="mt-1.5 h-2 w-4/5 rounded bg-gray-200" />
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-xs font-bold text-gray-800">{copy.visual.auditTitle}</p>
            <div className="space-y-3" aria-hidden="true">
              {['w-4/5', 'w-3/5', 'w-2/3'].map((width) => (
                <div key={width} className="flex items-center gap-2">
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-heritage-turquoise" aria-hidden="true" />
                  <span className={`h-2 rounded bg-gray-200 ${width}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {visualType === 'chatbot' && (
        <div className="space-y-4 rounded-xl bg-gray-50 p-4 sm:p-5">
          <div className="ms-auto max-w-[88%] rounded-2xl rounded-ee-sm bg-heritage-turquoise px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
            {copy.visual.customer}
          </div>
          <div className="me-auto flex max-w-[92%] items-start gap-2">
            <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-heritage-lapis-light text-heritage-lapis">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="rounded-2xl rounded-es-sm border border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm">
              {copy.visual.assistant}
            </div>
          </div>
        </div>
      )}

      {visualType === 'agent' && (
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {copy.visual.agentSteps?.map((step, index) => (
            <li key={step} className="flex min-w-0 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-heritage-lapis-light text-xs font-bold text-heritage-lapis">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold leading-relaxed text-gray-700 sm:text-sm">{step}</span>
            </li>
          ))}
        </ol>
      )}
    </figure>
  )
}

export default function ServiceExplainerSection({
  locale,
  copy,
  id,
  href,
  visualType,
  Icon,
  reverse = false,
  tone = 'white',
}: Props) {
  const rtl = isRTL(locale)
  const ArrowIcon = rtl ? ArrowLeftIcon : ArrowRightIcon
  const localizedHref = (path: string) => `/${locale}${localizeFullPath(path, locale)}`
  const background = tone === 'gray' ? 'bg-background-gray' : tone === 'ivory' ? 'bg-heritage-ivory' : 'bg-white'

  return (
    <section
      id={id}
      className={`${background} relative overflow-hidden px-4 py-14 sm:py-16 md:px-8 lg:py-20`}
      aria-labelledby={`${id}-title`}
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto max-w-[1200px]">
        <div className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-heritage-turquoise" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-heritage-turquoise">{copy.label}</p>
            </div>
            <h2 id={`${id}-title`} className="mb-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              {copy.description}
            </p>
            <ul className="mb-7 grid gap-3">
              {copy.capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-gray-700 sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-light text-heritage-turquoise">
                    <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {capability}
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-start gap-4">
              <Link
                href={localizedHref(href)}
                className="group inline-flex items-center justify-center gap-2 rounded-sm border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-[transform,background-color,border-color] duration-250 hover:-translate-y-0.5 hover:border-gray-700 hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {copy.cta}
                <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none rtl:group-hover:-translate-x-1 rtl:group-focus-visible:-translate-x-1" aria-hidden="true" />
              </Link>
              {copy.contextualLinks?.length ? (
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {copy.contextualLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localizedHref(link.href)}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-heritage-turquoise focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 motion-reduce:transition-none"
                      >
                        {link.label}
                        <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <Illustration copy={copy} visualType={visualType} Icon={Icon} />
        </div>
      </div>
    </section>
  )
}
