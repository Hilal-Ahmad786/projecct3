// src/components/ClientJourneyRoadmap.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGSAP } from '@/lib/gsap';
import {
  ChatBubbleOvalLeftIcon,
  PencilSquareIcon,
  CodeBracketSquareIcon,
  RocketLaunchIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function ClientJourneyRoadmap() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('clientJourney');
  const prefersReducedMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isLoading || prefersReducedMotion) return;
    if (!sectionRef.current || !leftColRef.current || !svgRef.current || !lineRef.current) return;

    initGSAP();

    const setupLine = () => {
      if (!leftColRef.current || !svgRef.current || !lineRef.current) return;
      const colHeight = leftColRef.current.offsetHeight;
      const lineHeight = Math.max(0, colHeight - 80);
      if (lineHeight === 0) return;
      svgRef.current.setAttribute('height', String(lineHeight));
      lineRef.current.setAttribute('y2', String(lineHeight));
    };

    setupLine();

    const totalLength = lineRef.current.getTotalLength();
    if (totalLength === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      iconRefs.current.forEach((icon) => {
        if (!icon) return;
        gsap.set(icon, { scale: 0, opacity: 0, willChange: 'transform' });
        gsap.to(icon, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: icon,
            start: 'top 75%',
            once: true,
          },
        });
      });
    }, sectionRef);

    const ro = new ResizeObserver(setupLine);
    ro.observe(leftColRef.current!);

    return () => {
      ctx.revert();
      ro.disconnect();
    };
  }, [isLoading, prefersReducedMotion]);

  if (isLoading) {
    return (
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading journey...</p>
        </div>
      </section>
    );
  }

  const getSteps = () => {
    try {
      const stepsData = t('steps');
      if (Array.isArray(stepsData)) return stepsData;
      if (stepsData && typeof stepsData === 'object') return Object.values(stepsData);
    } catch (error) {
      console.error('Error loading journey steps:', error);
    }
    return [
      { title: 'Discovery & Planning', description: 'We analyze your requirements and create a comprehensive project roadmap with clear milestones.', duration: '1-2 weeks' },
      { title: 'Design & Prototyping', description: 'UI/UX design and interactive prototypes to visualize the final product before development.', duration: '2-3 weeks' },
      { title: 'Development & Testing', description: 'Agile development with regular testing and quality assurance throughout the process.', duration: '4-8 weeks' },
      { title: 'Deployment & Launch', description: 'Seamless deployment with comprehensive testing, documentation, and user training.', duration: '1 week' },
      { title: 'Optimization & Analytics', description: 'Performance monitoring, SEO optimization, and analytics setup for continuous improvement.', duration: 'Ongoing' },
      { title: 'Support & Maintenance', description: '24/7 technical support, regular updates, and feature enhancements as your business grows.', duration: 'Ongoing' },
    ];
  };

  const steps = getSteps() as { title: string; description: string; duration: string }[];
  const icons = [
    ChatBubbleOvalLeftIcon,
    PencilSquareIcon,
    CodeBracketSquareIcon,
    RocketLaunchIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
  ];

  const ActiveIcon = icons[activeIdx] || ChatBubbleOvalLeftIcon;
  const activeStep = steps[activeIdx];

  return (
    <section ref={sectionRef} className="section bg-gray-50 relative overflow-hidden" dir={dir}>
      <div className={`absolute top-20 w-32 h-32 opacity-50 pointer-events-none ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-200`} />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-12 lg:mb-20"
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 max-w-7xl mx-auto">

          {/* Left Side: Interactive Stepper List */}
          <div ref={leftColRef} className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2 relative">

            {/* Animated SVG timeline line */}
            <svg
              ref={svgRef}
              className={`hidden lg:block absolute top-10 z-0 pointer-events-none ${dir === 'rtl' ? 'right-10' : 'left-10'}`}
              width="2"
              height="0"
              aria-hidden="true"
              style={{ overflow: 'visible' }}
            >
              <line
                ref={lineRef}
                x1="1"
                y1="0"
                x2="1"
                y2="0"
                stroke="rgb(229 231 235)"
                strokeWidth="1"
              />
            </svg>

            {steps.map((step, idx) => {
              const isActive = activeIdx === idx;
              const StepIcon = icons[idx] || ChatBubbleOvalLeftIcon;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`relative z-10 flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-start w-full group ${
                    isActive
                      ? 'bg-white shadow-sm border border-gray-100'
                      : 'hover:bg-gray-100/50 border border-transparent'
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  <div
                    ref={(el) => { iconRefs.current[idx] = el; }}
                    className={`flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-lg transition-colors duration-500 z-10 ${
                      isActive
                        ? 'bg-gray-900 text-white shadow-md scale-105'
                        : 'bg-gray-50 text-gray-500 border border-gray-100 group-hover:bg-white group-hover:text-gray-900 group-hover:border-gray-200'
                    }`}
                    style={{ willChange: 'transform' }}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <h4 className={`text-sm md:text-base font-bold transition-colors duration-300 ${
                      isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'
                    }`}>
                      {step.title}
                    </h4>
                    <span className={`text-xs block mt-0.5 transition-colors duration-300 font-mono tracking-wide uppercase ${
                      isActive ? 'text-gray-500 font-medium' : 'text-gray-400 group-hover:text-gray-500'
                    }`}>
                      {step.duration}
                    </span>
                  </div>

                  {isActive && !prefersReducedMotion && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 rounded-xl ring-2 ring-gray-900/5 pointer-events-none"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Side: Stage Display */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden min-h-[400px] lg:min-h-[500px] flex items-center relative">

              {/* Decorative background number watermark */}
              <AnimatePresence>
                <motion.div
                  key={`watermark-${activeIdx}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.03, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute text-[20rem] font-black text-gray-900 pointer-events-none select-none z-0 ${dir === 'rtl' ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 leading-none`}
                >
                  {activeIdx + 1}
                </motion.div>
              </AnimatePresence>

              {/* Stage Content */}
              <div className="p-8 md:p-12 lg:p-16 w-full relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${activeIdx}`}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start mb-8">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                        <ActiveIcon className="w-10 h-10 text-gray-900 relative z-10 transition-colors duration-500 group-hover:text-white" />
                      </div>

                      <div className="pt-2">
                        <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-bold tracking-widest text-gray-600 uppercase mb-4">
                          Phase {String(activeIdx + 1).padStart(2, '0')} — {activeStep.duration}
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                          {activeStep.title}
                        </h3>
                      </div>
                    </div>

                    <div className={`${dir === 'rtl' ? 'sm:pr-[112px]' : 'sm:pl-[112px]'}`}>
                      <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
                        {activeStep.description}
                      </p>

                      {/* Interactive Pagination Dots */}
                      <div className="flex gap-2 mt-12">
                        {steps.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            aria-label={`Go to step ${dotIdx + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${
                              activeIdx === dotIdx
                                ? 'w-8 bg-gray-900'
                                : 'w-2 bg-gray-200 hover:bg-gray-400'
                            }`}
                            onClick={() => setActiveIdx(dotIdx)}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
