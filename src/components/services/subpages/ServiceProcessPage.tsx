'use client';

import React from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import ServiceRequestCTA from '../ServiceRequestCTA';

interface ServiceProcessPageProps {
  serviceSlug: string;
  accentColor: string;
}

const colorMap: Record<string, { hex: string; bg: string; text: string; gradient: string; border: string; ring: string; light: string }> = {
  purple:  { hex: '#9333ea', bg: 'bg-purple-600',  text: 'text-purple-600',  gradient: 'from-purple-500 to-purple-700',  border: 'border-purple-200', ring: 'ring-purple-100',  light: 'bg-purple-50'  },
  teal:    { hex: '#0d9488', bg: 'bg-teal-600',    text: 'text-teal-600',    gradient: 'from-teal-500 to-teal-700',      border: 'border-teal-200',   ring: 'ring-teal-100',    light: 'bg-teal-50'    },
  blue:    { hex: '#2563eb', bg: 'bg-blue-600',    text: 'text-blue-600',    gradient: 'from-blue-500 to-blue-700',      border: 'border-blue-200',   ring: 'ring-blue-100',    light: 'bg-blue-50'    },
  emerald: { hex: '#059669', bg: 'bg-emerald-600', text: 'text-emerald-600', gradient: 'from-emerald-500 to-emerald-700',border: 'border-emerald-200',ring: 'ring-emerald-100', light: 'bg-emerald-50' },
  orange:  { hex: '#ea580c', bg: 'bg-orange-600',  text: 'text-orange-600',  gradient: 'from-orange-500 to-orange-700',  border: 'border-orange-200', ring: 'ring-orange-100',  light: 'bg-orange-50'  },
  rose:    { hex: '#e11d48', bg: 'bg-rose-600',    text: 'text-rose-600',    gradient: 'from-rose-500 to-rose-700',      border: 'border-rose-200',   ring: 'ring-rose-100',    light: 'bg-rose-50'    },
  indigo:  { hex: '#4f46e5', bg: 'bg-indigo-600',  text: 'text-indigo-600',  gradient: 'from-indigo-500 to-indigo-700',  border: 'border-indigo-200', ring: 'ring-indigo-100',  light: 'bg-indigo-50'  },
  violet:  { hex: '#7c3aed', bg: 'bg-violet-600',  text: 'text-violet-600',  gradient: 'from-violet-500 to-violet-700',  border: 'border-violet-200', ring: 'ring-violet-100',  light: 'bg-violet-50'  },
  cyan:    { hex: '#0891b2', bg: 'bg-cyan-600',    text: 'text-cyan-600',    gradient: 'from-cyan-500 to-cyan-700',      border: 'border-cyan-200',   ring: 'ring-cyan-100',    light: 'bg-cyan-50'    },
};

const STEP_ICONS: Record<string, React.ReactElement> = {
  search:    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>,
  document:  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>,
  code:      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/></svg>,
  cog:       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  rocket:    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>,
  chart:     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>,
  shield:    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
  cloud:     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/></svg>,
  lightning: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  check:     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
};

function getIcon(name: string) {
  return STEP_ICONS[name] || STEP_ICONS.check;
}

// A single step row — reveals on scroll
function StepRow({ step, index, colors, isLast }: {
  step: { title: string; description: string; details: string[]; icon: string };
  index: number;
  colors: (typeof colorMap)[string];
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const [expanded, setExpanded] = useState(false);

  const num = String(index + 1).padStart(2, '0');

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Left: number + line */}
      <div className="flex flex-col items-center flex-shrink-0 w-14 md:w-20">
        {/* Number badge */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full ${colors.bg} text-white flex items-center justify-center font-bold text-base md:text-lg shadow-lg flex-shrink-0`}
        >
          {num}
          {/* Pulse ring */}
          <motion.div
            className={`absolute inset-0 rounded-full ${colors.bg} opacity-30`}
            animate={isInView ? { scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
          />
        </motion.div>

        {/* Connecting line to next step */}
        {!isLast && (
          <div className="flex-1 w-0.5 bg-gray-100 mt-2 relative overflow-hidden">
            <motion.div
              className={`absolute inset-0 w-full ${colors.bg} origin-top`}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            />
          </div>
        )}
      </div>

      {/* Right: card */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 pb-12 ${isLast ? 'pb-0' : ''}`}
      >
        <div
          className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-md transition-shadow duration-300 group"
          onClick={() => step.details.length > 0 && setExpanded(e => !e)}
          style={{ cursor: step.details.length > 0 ? 'pointer' : 'default' }}
        >
          {/* Icon + step label row */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-9 h-9 rounded-lg ${colors.light} ${colors.text} flex items-center justify-center flex-shrink-0`}>
              {getIcon(step.icon)}
            </div>
            <span className={`text-xs font-semibold uppercase tracking-widest ${colors.text}`}>
              Step {num}
            </span>
            {step.details.length > 0 && (
              <motion.svg
                animate={{ rotate: expanded ? 180 : 0 }}
                className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </motion.svg>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-snug">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 leading-relaxed text-sm md:text-base">
            {step.description}
          </p>

          {/* Expandable details */}
          {step.details.length > 0 && (
            <motion.div
              initial={false}
              animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-5 space-y-2 border-t border-gray-100 pt-5">
                {step.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -8 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="flex items-start gap-2.5 text-sm text-gray-600"
                  >
                    <svg className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function ServiceProcessPage({ serviceSlug, accentColor }: ServiceProcessPageProps) {
  const { translations } = useTranslations();
  const data = translations?.serviceSubpages?.[serviceSlug];
  const processData = data?.process;
  const serviceName = data?.serviceName || serviceSlug;
  const headline = processData?.headline || 'Our Process';
  const subtitle = processData?.subtitle || 'How We Work';
  const description = processData?.description || 'A structured approach from discovery to launch.';
  const steps: { title: string; description: string; details: string[]; icon: string }[] = processData?.steps || [];

  const colors = colorMap[accentColor] || colorMap.blue;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-[140px] pb-24"
        style={{ background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)' }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.5,
          }}
        />
        {/* Accent gradient blob */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.12] pointer-events-none"
          style={{ background: colors.hex }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-gray-300" />
              <span className={`text-xs font-semibold uppercase tracking-widest ${colors.text}`}>
                {subtitle}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6"
            >
              {headline}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed max-w-2xl mb-12"
            >
              {description}
            </motion.p>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-10 border-t border-gray-200 pt-8"
            >
              {[
                { value: steps.length.toString(), label: 'Defined phases' },
                { value: 'Agile', label: 'Methodology' },
                { value: '100%', label: 'Transparency' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                >
                  <p className={`text-4xl font-bold ${colors.text}`}>{stat.value}</p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] uppercase tracking-widest text-gray-300 font-semibold">Scroll</span>
          <motion.div
            className="w-5 h-8 border-2 border-gray-200 rounded-full flex justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-1.5 bg-gray-400 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-16 max-w-4xl mx-auto"
          >
            <div className="w-8 h-px bg-gray-300" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Phase by phase
            </span>
          </motion.div>

          {steps.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">Process steps coming soon.</p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {steps.map((step, i) => (
                <StepRow
                  key={i}
                  step={step}
                  index={i}
                  colors={colors}
                  isLast={i === steps.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── What to expect ───────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-8 h-px bg-gray-300" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Working with us</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4"
              >
                What you can expect
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 leading-relaxed"
              >
                Every engagement is built on clear communication, agreed milestones, and zero surprises. You stay in the loop at every phase.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Weekly updates', desc: 'Progress reports every Friday — delivered to your inbox or Slack.' },
                { title: 'Direct access', desc: 'Speak directly with the lead developer, not a project manager middleman.' },
                { title: 'Milestone sign-off', desc: 'You approve each phase before we move forward — full control.' },
                { title: 'Full documentation', desc: 'Handover includes source code, architecture docs, and runbooks.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className="w-2 h-2 rounded-full mb-5"
                    style={{ backgroundColor: colors.hex }}
                  />
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <ServiceRequestCTA serviceType={serviceName} />
    </main>
  );
}
