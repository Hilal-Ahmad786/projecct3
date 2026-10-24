import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/Button'
import ServiceExplainerMotion from '@/components/ServiceExplainerMotion'
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
    primaryService?: string
    secondaryService?: string
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
      <figcaption className="mb-2 flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-heritage-turquoise-light text-heritage-turquoise">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-gray-800">{copy.illustrativeLabel}</span>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-heritage-turquoise" aria-hidden="true" />
      </figcaption>
      <ServiceExplainerMotion visual={copy.visual} visualType={visualType} />
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
              <p className="text-overline !text-heritage-turquoise">{copy.label}</p>
            </div>
            <h2 id={`${id}-title`} className="text-headline mb-5 font-medium text-gray-900">
              {copy.title}
            </h2>
            <p className="text-body mb-6 max-w-xl leading-relaxed text-gray-600">
              {copy.description}
            </p>
            <ul className="mb-7 grid gap-3">
              {copy.capabilities.map((capability) => (
                <li key={capability} className="text-body flex items-start gap-3 leading-relaxed text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-heritage-turquoise-light text-heritage-turquoise">
                    <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {capability}
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-start gap-4">
              <Button
                href={localizedHref(href)}
                variant="primary"
                size="md"
                className="motion-reduce:transform-none motion-reduce:transition-none"
                rightIcon={<ArrowIcon className="h-4 w-4" aria-hidden="true" />}
              >
                {copy.cta}
              </Button>
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
