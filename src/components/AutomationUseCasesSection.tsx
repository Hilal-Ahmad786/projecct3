import {
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/server-i18n'
import ServiceExplainerSection, { type ExplainerCopy } from '@/components/ServiceExplainerSection'

type ConversationalCopy = {
  chatbots: ExplainerCopy
  agents: ExplainerCopy
}

export default function AutomationUseCasesSection({ locale }: { locale: Locale }) {
  const translations = getTranslations(locale)
  const copy = translations.conversationalExplainers as ConversationalCopy

  return (
    <>
      <ServiceExplainerSection
        locale={locale}
        id="chatbots"
        copy={copy.chatbots}
        href="/services/conversational-ai"
        visualType="chatbot"
        Icon={ChatBubbleLeftRightIcon}
        tone="ivory"
      />
      <ServiceExplainerSection
        locale={locale}
        id="ai-agents"
        copy={copy.agents}
        href="/services/ai-agents"
        visualType="agent"
        Icon={CpuChipIcon}
        reverse
        tone="white"
      />
    </>
  )
}
