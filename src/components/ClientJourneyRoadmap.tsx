// src/components/ClientJourneyRoadmap.tsx
'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, useInView } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import { smoothSpring, snappySpring } from '@/lib/animations';
import {
  ChatBubbleOvalLeftIcon,
  PencilSquareIcon,
  CodeBracketSquareIcon,
  RocketLaunchIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function ClientJourneyRoadmap() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('clientJourney');
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef(null);

  // Scroll-driven timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

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

  const steps = getSteps();
  const icons = [
    ChatBubbleOvalLeftIcon,
    PencilSquareIcon,
    CodeBracketSquareIcon,
    RocketLaunchIcon,
    ChartBarSquareIcon,
    Cog6ToothIcon,
  ];

  return (
    <section className="section bg-gray-50 relative overflow-hidden" dir={dir}>
      <div className={`absolute top-20 w-24 h-24 ${dir === 'rtl' ? 'right-16' : 'left-16'}`}>
        <div className={`crescent ${dir === 'rtl' ? 'crescent-right' : 'crescent-left'} crescent-subtle text-gray-900`} />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          className="mb-16"
        />

        <div ref={timelineRef} className="relative">
          {/* Scroll-driven timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2">
            <div className="w-full h-full bg-gray-200" />
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 w-full bg-gray-400 origin-top"
                style={{ scaleY: lineScaleY }}
              />
            )}
          </div>

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = icons[idx] || ChatBubbleOvalLeftIcon;
              const isEven = idx % 2 === 0;
              const shouldReverse = dir === 'rtl' ? !isEven : isEven;

              return (
                <StepCard
                  key={step.title || idx}
                  step={step}
                  idx={idx}
                  Icon={Icon}
                  shouldReverse={shouldReverse}
                  dir={dir}
                  prefersReducedMotion={prefersReducedMotion}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  idx,
  Icon,
  shouldReverse,
  dir,
  prefersReducedMotion,
}: {
  step: { title: string; description: string; duration: string };
  idx: number;
  Icon: React.ComponentType<{ className?: string }>;
  shouldReverse: boolean;
  dir: string;
  prefersReducedMotion: boolean | null;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Zigzag: odd from left, even from right
  const slideX = shouldReverse ? (dir === 'rtl' ? 40 : -40) : (dir === 'rtl' ? -40 : 40);

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, x: slideX }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={prefersReducedMotion ? { duration: 0 } : { ...smoothSpring, delay: idx * 0.08 }}
      className="relative"
    >
      <div className={`grid lg:grid-cols-2 gap-8 items-center ${shouldReverse ? '' : 'lg:text-right'}`}>
        <div className={`${shouldReverse ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="card">
            <div className={`flex items-center gap-4 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <motion.div
                className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center"
                initial={prefersReducedMotion ? {} : { scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={prefersReducedMotion ? { duration: 0 } : { ...snappySpring, delay: idx * 0.08 + 0.2 }}
              >
                <Icon className="h-6 w-6 text-gray-700" />
              </motion.div>
              <div className="w-8 h-0.5 bg-gray-200" />
              <span className="text-caption text-gray-500 uppercase tracking-wide">
                {step.duration}
              </span>
            </div>

            <h3 className="text-title text-gray-900 mb-3">{step.title}</h3>
            <p className="text-body text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        </div>

        {/* Timeline marker */}
        <div className={`hidden lg:flex items-center justify-center ${shouldReverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <motion.div
            className="w-16 h-16 bg-white border-4 border-gray-200 rounded-sm flex items-center justify-center relative z-10"
            initial={prefersReducedMotion ? {} : { scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={prefersReducedMotion ? { duration: 0 } : { ...snappySpring, delay: idx * 0.08 + 0.1 }}
          >
            <span className="text-lg font-medium text-gray-700">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Mobile timeline marker */}
      <div className={`lg:hidden flex items-center gap-4 mt-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
        <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">{idx + 1}</span>
        </div>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    </motion.div>
  );
}
