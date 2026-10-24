import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  InboxStackIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { Locale, isRTL } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import { localizeFullPath } from '@/lib/routes'

type UseCaseCopy = {
  title: string
  problem: string
  workflow: string[]
  services: string[]
}

type AutomationUseCasesCopy = {
  title: string
  introduction: string
  problemLabel: string
  workflowLabel: string
  servicesLabel: string
  cta: string
  cases: Record<'leads' | 'questions' | 'documents' | 'orders', UseCaseCopy>
}

type UseCase = {
  id: 'leads' | 'questions' | 'documents' | 'orders'
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  accent: string
  soft: string
  ring: string
  serviceHrefs: string[]
}

const useCases: UseCase[] = [
  {
    id: 'leads',
    Icon: InboxStackIcon,
    accent: 'text-heritage-turquoise',
    soft: 'bg-heritage-turquoise-light',
    ring: 'focus-visible:ring-heritage-turquoise',
    serviceHrefs: [
      '/services/crm-development',
      '/services/third-party-api-integration',
      '/services/workflow-automation',
    ],
  },
  {
    id: 'questions',
    Icon: ChatBubbleLeftRightIcon,
    accent: 'text-heritage-lapis',
    soft: 'bg-heritage-lapis-light',
    ring: 'focus-visible:ring-heritage-lapis',
    serviceHrefs: [
      '/services/chatbot-development',
      '/services/whatsapp-bots',
      '/services/knowledge-base-ai',
    ],
  },
  {
    id: 'documents',
    Icon: DocumentTextIcon,
    accent: 'text-heritage-terracotta',
    soft: 'bg-heritage-terracotta-light',
    ring: 'focus-visible:ring-heritage-terracotta',
    serviceHrefs: [
      '/services/ocr-document-processing',
      '/services/ocr-document-processing',
      '/services/third-party-api-integration',
    ],
  },
  {
    id: 'orders',
    Icon: ShoppingBagIcon,
    accent: 'text-heritage-saffron',
    soft: 'bg-heritage-saffron-light',
    ring: 'focus-visible:ring-heritage-saffron',
    serviceHrefs: [
      '/services/e-commerce',
      '/services/erp-development',
      '/services/custom-business-software',
    ],
  },
]

export default function AutomationUseCasesSection({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const copy = translations.automationUseCases as AutomationUseCasesCopy
  const rtl = isRTL(locale)
  const ArrowIcon = rtl ? ArrowLeftIcon : ArrowRightIcon
  const localizedHref = (path: string) => `/${locale}${localizeFullPath(path, locale)}`

  return (
    <section
      className="section relative overflow-hidden bg-white"
      aria-labelledby="automation-use-cases-title"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className={`pointer-events-none absolute top-24 hidden h-24 w-24 md:block ${rtl ? 'left-12' : 'right-12'}`} aria-hidden="true">
        <div className={`crescent crescent-subtle text-gray-900 ${rtl ? 'crescent-left' : 'crescent-right'}`} />
      </div>

      <div className="container relative z-10 mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2 id="automation-use-cases-title" className="text-headline mb-5 text-gray-900">
            {copy.title}
          </h2>
          <p className="text-body mx-auto max-w-2xl leading-relaxed text-gray-600">
            {copy.introduction}
          </p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-background-gray shadow-[0_2px_12px_rgba(0,0,0,0.04)] lg:grid-cols-2">
          {useCases.map(({ id, Icon, accent, soft, ring, serviceHrefs }, index) => {
            const useCase = copy.cases[id]

            return (
              <article
                key={id}
                className="flex min-w-0 flex-col border-b border-gray-200 p-6 last:border-b-0 sm:p-8 lg:border-e lg:p-10 lg:[&:nth-child(2n)]:border-e-0 lg:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${soft} ${accent}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold tracking-[0.16em] text-gray-400" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mb-5 text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-2xl">
                  {useCase.title}
                </h3>

                <div className="mb-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                    {copy.problemLabel}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-gray-600 sm:text-base">
                    {useCase.problem}
                  </p>
                </div>

                <div className="mb-7 rounded-xl border border-gray-200 bg-white p-4">
                  <p className={`mb-3 text-xs font-bold uppercase tracking-[0.16em] ${accent}`}>
                    {copy.workflowLabel}
                  </p>
                  <ol className="flex flex-wrap items-center gap-2" aria-label={`${copy.workflowLabel}: ${useCase.title}`}>
                    {useCase.workflow.map((step, stepIndex) => (
                      <li key={step} className="contents">
                        <span className="rounded-md bg-gray-50 px-2.5 py-1.5 text-xs font-semibold leading-relaxed text-gray-700 sm:text-sm">
                          {step}
                        </span>
                        {stepIndex < useCase.workflow.length - 1 && (
                          <ArrowIcon className={`h-4 w-4 shrink-0 ${accent}`} aria-hidden="true" />
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-auto border-t border-gray-200 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {copy.servicesLabel}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {useCase.services.map((service, serviceIndex) => (
                      <li key={`${id}-${serviceIndex}`}>
                        <Link
                          href={localizedHref(serviceHrefs[serviceIndex])}
                          className={`inline-flex rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 transition-[color,border-color,background-color] duration-200 hover:border-gray-300 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none ${ring}`}
                        >
                          {service}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <Link
            href={localizedHref('/contact')}
            className="group inline-flex items-center justify-center gap-2 rounded-sm border border-gray-900 bg-gray-900 px-7 py-3 text-sm font-medium text-white transition-[transform,background-color,border-color] duration-250 hover:-translate-y-0.5 hover:border-gray-700 hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transform-none motion-reduce:transition-none"
          >
            {copy.cta}
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none rtl:group-hover:-translate-x-1 rtl:group-focus-visible:-translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
