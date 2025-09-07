// src/components/WhyUsSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import {
  ClockIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';

const advantages = [
  {
    title: 'Fast Delivery',
    description: 'Agile development process ensures timely delivery without compromising quality.',
    Icon: ClockIcon,
    metric: '90% faster than industry average'
  },
  {
    title: 'Proven Expertise',
    description: 'Years of experience with cutting-edge technologies and successful project delivery.',
    Icon: ShieldCheckIcon,
    metric: '98% client satisfaction rate'
  },
  {
    title: 'Cost Effective',
    description: 'Competitive pricing with transparent costs and no hidden fees.',
    Icon: CurrencyDollarIcon,
    metric: '30% cost savings on average'
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock technical support and maintenance services.',
    Icon: ChatBubbleBottomCenterTextIcon,
    metric: '<24 hour response time'
  },
];

export default function WhyUsSection() {
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
    <section className="section bg-white relative overflow-hidden">
      {/* Proper Crescent Elements */}
      <div className="absolute bottom-20 left-16 w-20 h-20">
        <div className="crescent crescent-left crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="What Sets Us Apart"
          subtitle="We combine technical excellence with business understanding to deliver solutions that truly make a difference."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {advantages.map((advantage, index) => {
            const Icon = advantage.Icon;
            return (
              <motion.div
                key={advantage.title}
                variants={itemVariants}
                className="card text-center group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <Icon className="h-8 w-8 text-gray-700" />
                </div>

                {/* Title */}
                <h3 className="text-title text-gray-900 mb-3">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-body text-gray-600 mb-4 leading-relaxed">
                  {advantage.description}
                </p>

                {/* Metric */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-sm">
                  <span className="text-sm font-medium text-gray-900">
                    {advantage.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}