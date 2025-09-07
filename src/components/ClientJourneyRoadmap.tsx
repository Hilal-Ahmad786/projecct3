// src/components/ClientJourneyRoadmap.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import {
  ChatBubbleOvalLeftIcon,
  PencilSquareIcon,
  CodeBracketSquareIcon,
  RocketLaunchIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Discovery & Planning',
    desc: 'We analyze your requirements and create a comprehensive project roadmap with clear milestones.',
    Icon: ChatBubbleOvalLeftIcon,
    duration: '1-2 weeks'
  },
  {
    title: 'Design & Prototyping',
    desc: 'UI/UX design and interactive prototypes to visualize the final product before development.',
    Icon: PencilSquareIcon,
    duration: '2-3 weeks'
  },
  {
    title: 'Development & Testing',
    desc: 'Agile development with regular testing and quality assurance throughout the process.',
    Icon: CodeBracketSquareIcon,
    duration: '4-8 weeks'
  },
  {
    title: 'Deployment & Launch',
    desc: 'Seamless deployment with comprehensive testing, documentation, and user training.',
    Icon: RocketLaunchIcon,
    duration: '1 week'
  },
  {
    title: 'Optimization & Analytics',
    desc: 'Performance monitoring, SEO optimization, and analytics setup for continuous improvement.',
    Icon: ChartBarSquareIcon,
    duration: 'Ongoing'
  },
  {
    title: 'Support & Maintenance',
    desc: '24/7 technical support, regular updates, and feature enhancements as your business grows.',
    Icon: Cog6ToothIcon,
    duration: 'Ongoing'
  },
];

export default function ClientJourneyRoadmap() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="section bg-gray-50 relative overflow-hidden">
      {/* Proper Crescent Elements */}
      <div className="absolute top-20 left-16 w-24 h-24">
        <div className="crescent crescent-left crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Our Process"
          title="Your Journey With Us"
          subtitle="A structured approach that ensures every project is delivered successfully, on time, and exceeds your expectations."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const { Icon, title, desc, duration } = step;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={title}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:text-right'}`}>
                    {/* Content */}
                    <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="card">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center">
                            <Icon className="h-6 w-6 text-gray-700" />
                          </div>
                          <div className="w-8 h-0.5 bg-gray-200" />
                          <span className="text-caption text-gray-500 uppercase tracking-wide">
                            {duration}
                          </span>
                        </div>

                        <h3 className="text-title text-gray-900 mb-3">
                          {title}
                        </h3>
                        
                        <p className="text-body text-gray-600 leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>

                    {/* Timeline marker */}
                    <div className={`hidden lg:flex items-center justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="w-16 h-16 bg-white border-4 border-gray-200 rounded-sm flex items-center justify-center relative z-10">
                        <span className="text-lg font-medium text-gray-700">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile timeline marker */}
                  <div className="lg:hidden flex items-center gap-4 mt-4">
                    <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}