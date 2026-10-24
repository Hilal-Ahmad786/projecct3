'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRightIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { GirihHalo, H, HeritageParticles, Scene } from '@/components/services/hero-visuals/primitives'

type VisualType = 'marketing' | 'seo' | 'chatbot' | 'agent'

type VisualCopy = {
  primaryService?: string
  secondaryService?: string
  searchTitle?: string
  searchDescription?: string
  searchPlaceholder?: string
  customer?: string
  assistant?: string
  agentSteps?: string[]
}

type Props = { visualType: VisualType; visual: VisualCopy }

function CampaignVisual({ visual }: { visual: VisualCopy }) {
  const reduced = useReducedMotion()

  return (
    <Scene glow={H.saffron} className="!h-auto !w-full !max-w-[390px] aspect-square">
      <GirihHalo size={360} color={H.terracotta} opacity={0.22} />
      <HeritageParticles count={8} colors={[H.turquoise, H.saffron, H.terracotta]} />
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -22, y: 12 }}
        animate={{ opacity: 1, x: 0, y: reduced ? 0 : [0, -5, 0] }}
        transition={{ opacity: { duration: 0.65 }, x: { duration: 0.65 }, y: { duration: 5, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' } }}
        className="service-hero-marketing-card absolute left-[3%] top-[20%] z-10 w-[65%] rounded-2xl border border-[#f3ecdf] bg-white p-4 shadow-xl sm:p-5"
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="inline-flex rounded-lg bg-[#0e7c7b] px-3 py-2 text-sm font-bold text-white shadow-md sm:text-base">{visual.primaryService}</span>
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8a33d]" aria-hidden="true" />
        </div>
        <div className="mb-3 h-2.5 w-4/5 rounded-full bg-[#1a3a6b]/80" />
        <div className="mb-5 h-2 w-3/5 rounded-full bg-[#d8dce3]" />
        <div className="flex items-center gap-2 rounded-xl bg-[#e6f2f2] p-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0e7c7b]">
            <CheckIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="h-2 w-2/3 rounded-full bg-[#0e7c7b]/50" />
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.85, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: reduced ? 0 : [0, 5, 0] }}
        transition={{ delay: 0.25, duration: 0.7, y: { delay: 0.25, duration: 5.5, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-[17%] right-[1%] z-20 rounded-full border border-[#e9eef6] bg-white px-3 py-2 text-xs font-bold text-[#1a3a6b] shadow-lg sm:text-sm"
      >
        {visual.secondaryService}
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45, duration: 0.65 }}
        className="absolute bottom-[25%] right-[5%] w-[43%] rounded-xl border border-[#e5e7eb] bg-[#fafafa] p-3 shadow-lg sm:p-4"
      >
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f2f2] text-[#0e7c7b]">
          <ArrowRightIcon className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
        </div>
        <div className="mb-2 h-2 w-4/5 rounded-full bg-[#1a1a1a]/70" />
        <div className="h-2 w-3/5 rounded-full bg-[#d8dce3]" />
      </motion.div>
    </Scene>
  )
}

function SeoVisual({ visual }: { visual: VisualCopy }) {
  const reduced = useReducedMotion()

  return (
    <Scene glow={H.turquoise} className="!h-auto !w-full !max-w-[390px] aspect-square">
      <GirihHalo size={360} color={H.saffron} opacity={0.2} />
      <HeritageParticles count={7} colors={[H.turquoise, H.lapis, H.saffron]} />
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="service-hero-seo-card absolute inset-[10%] rounded-2xl border border-[#f3ecdf] bg-white p-4 shadow-xl sm:p-5"
      >
        <div className="mb-4 flex items-center gap-3 rounded-full border border-[#e5e7eb] bg-[#faf6ef] px-4 py-3">
          <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-[#0e7c7b]" aria-hidden="true" />
          <span className="truncate text-xs text-gray-600 sm:text-sm">{visual.searchPlaceholder}</span>
        </div>
        <div className="rounded-xl border border-[#d4e9e8] bg-[#f6fbfa] p-4 sm:p-5">
          <div className="mb-2 inline-flex rounded-md bg-[#0e7c7b] px-2.5 py-1 text-xs font-bold text-white">{visual.primaryService}</div>
          <p className="mb-2 text-xs font-semibold text-[#0e7c7b] sm:text-sm">{visual.searchTitle}</p>
          <p className="mb-4 text-base font-semibold leading-snug text-[#1a3a6b] sm:text-lg">{visual.searchDescription}</p>
          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: reduced ? 0 : 0.45, duration: reduced ? 0 : 0.8, ease: 'easeOut' }}
            className="h-1 origin-left rounded-full bg-[#e8a33d]"
          />
          <div className="mt-3 h-2 w-4/5 rounded-full bg-[#d8dce3]" />
          <div className="mt-2 h-2 w-3/5 rounded-full bg-[#e5e7eb]" />
        </div>
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 18, y: -10 }}
          animate={{ opacity: 1, x: 0, y: reduced ? 0 : [0, -4, 0] }}
          transition={{ delay: 0.35, duration: 0.65, y: { delay: 0.35, duration: 4.8, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' } }}
          className="absolute -bottom-3 end-3 rounded-full border border-[#e9eef6] bg-white px-3 py-2 text-xs font-bold text-[#1a3a6b] shadow-lg"
        >
          {visual.secondaryService}
        </motion.div>
      </motion.div>
    </Scene>
  )
}

function ChatbotVisual({ visual }: { visual: VisualCopy }) {
  const reduced = useReducedMotion()

  return (
    <Scene glow={H.terracotta} className="!h-auto !w-full !max-w-[390px] aspect-square">
      <GirihHalo size={360} color={H.saffron} opacity={0.2} />
      <HeritageParticles count={7} />
      <div className="absolute inset-[9%] flex flex-col justify-center gap-4 rounded-2xl border border-[#f3ecdf] bg-white/95 p-4 shadow-xl sm:gap-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg bg-[#0e7c7b] px-3 py-2 text-xs font-bold text-white shadow-md sm:text-sm">{visual.primaryService}</span>
          <span className="rounded-full bg-[#e9eef6] px-3 py-2 text-xs font-semibold text-[#1a3a6b]">{visual.secondaryService}</span>
        </div>
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 24, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="service-hero-chat-message max-w-[88%] self-end rounded-2xl rounded-ee-sm bg-[#1a3a6b] px-4 py-3 text-sm leading-relaxed text-white shadow-lg sm:text-base"
        >
          {visual.customer}
        </motion.div>
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -24, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="service-hero-chat-answer max-w-[92%] self-start rounded-2xl rounded-es-sm border border-[#f3ecdf] bg-[#faf6ef] px-4 py-3 text-sm leading-relaxed text-[#1a1a1a] shadow-md sm:text-base"
        >
          <div className="mb-2 flex items-center gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                animate={reduced ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 0.8, delay: dot * 0.12, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
                className="h-1.5 w-1.5 rounded-full bg-[#0e7c7b]"
              />
            ))}
          </div>
          {visual.assistant}
        </motion.div>
      </div>
    </Scene>
  )
}

function AgentVisual({ visual }: { visual: VisualCopy }) {
  const reduced = useReducedMotion()

  return (
    <Scene glow={H.lapis} className="!h-auto !w-full !max-w-[390px] aspect-square">
      <GirihHalo size={360} color={H.saffron} opacity={0.2} />
      <HeritageParticles count={7} colors={[H.lapis, H.turquoise, H.saffron]} />
      <div className="absolute inset-[8%] flex flex-col justify-center rounded-2xl border border-[#e9eef6] bg-white/95 p-4 shadow-xl sm:p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-[#1a3a6b] px-3 py-2 text-xs font-bold text-white shadow-md sm:text-sm">{visual.primaryService}</span>
          <span className="rounded-full bg-[#fbf1df] px-3 py-2 text-xs font-semibold text-[#8f5d10]">{visual.secondaryService}</span>
        </div>
        <ol className="grid grid-cols-2 gap-3">
          {visual.agentSteps?.map((step, index) => (
            <motion.li
              key={step}
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: reduced ? 0 : 0.12 + index * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`service-hero-agent-step flex min-h-[76px] min-w-0 items-center gap-2 rounded-xl border p-3 ${index === 3 ? 'border-[#e8a33d]/40 bg-[#fbf1df]' : 'border-[#e9eef6] bg-[#f7f9fc]'}`}
            >
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${index === 3 ? 'bg-[#e8a33d] text-white' : 'bg-[#e9eef6] text-[#1a3a6b]'}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold leading-snug text-[#1a1a1a] sm:text-sm">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </Scene>
  )
}

export default function ServiceExplainerMotion({ visualType, visual }: Props) {
  if (visualType === 'marketing') return <CampaignVisual visual={visual} />
  if (visualType === 'seo') return <SeoVisual visual={visual} />
  if (visualType === 'chatbot') return <ChatbotVisual visual={visual} />
  return <AgentVisual visual={visual} />
}
