import {
  ChartBarIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import ServiceExplainerSection, { type ExplainerCopy } from '@/components/ServiceExplainerSection'

type MarketingCopy = {
  digitalMarketing: ExplainerCopy
  seo: ExplainerCopy
}

export default function MarketingJourneySection({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const copy = translations.marketingExplainers as MarketingCopy

  return (
    <>
      <ServiceExplainerSection
        locale={locale}
        id="digital-marketing"
        copy={copy.digitalMarketing}
        href="/services/digital-marketing"
        visualType="marketing"
        Icon={ChartBarIcon}
        tone="gray"
      />
      <ServiceExplainerSection
        locale={locale}
        id="seo"
        copy={copy.seo}
        href="/services/seo"
        visualType="seo"
        Icon={MagnifyingGlassIcon}
        reverse
        tone="white"
      />
    </>
  )
}
