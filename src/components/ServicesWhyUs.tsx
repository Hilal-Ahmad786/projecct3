'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  BoltIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  TrophyIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const BENEFITS = [
  {
    Icon: TrophyIcon,
    title: 'Proven Delivery',
    description: '500+ projects shipped across 30+ countries with measurable outcomes and zero compromises on quality.',
  },
  {
    Icon: BoltIcon,
    title: 'Fast Turnaround',
    description: 'Agile sprints and dedicated teams ensure on-time delivery without sacrificing craftsmanship.',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'Enterprise-Grade Security',
    description: 'Every solution is built with OWASP, GDPR, and industry-specific compliance baked in from day one.',
  },
  {
    Icon: ChatBubbleLeftRightIcon,
    title: 'Transparent Communication',
    description: 'Daily standups, live dashboards, and open Slack channels keep you informed at every step.',
  },
  {
    Icon: ArrowTrendingUpIcon,
    title: 'Scalable Architecture',
    description: 'We design for growth. Our systems handle 10× traffic spikes without expensive rewrites.',
  },
  {
    Icon: ClockIcon,
    title: '24/7 Post-Launch Support',
    description: 'Dedicated SLA-backed maintenance plans so your product stays healthy long after launch.',
  },
  {
    Icon: StarIcon,
    title: '98% Client Satisfaction',
    description: 'Our NPS score speaks for itself — clients return because results consistently exceed expectations.',
  },
  {
    Icon: UserGroupIcon,
    title: 'Cross-Domain Expertise',
    description: 'One team covering Web, Mobile, AI, DevOps, and Marketing — no handoffs, no gaps.',
  },
];

export default function ServicesWhyUs() {
  return (
    <section className="py-24 bg-gray-950 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gray-600" />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Our Edge</span>
            <div className="w-8 h-0.5 bg-gray-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
            Why Teams Choose{' '}
            <span className="font-semibold text-accent-emerald">PakSoft</span>
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Eight reasons backed by real projects, real clients, and real results.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map(({ Icon, title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-gray-900/70 border border-gray-800/60 rounded-2xl p-6 hover:border-gray-700 hover:bg-gray-900 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-800 group-hover:bg-accent-emerald flex items-center justify-center mb-4 transition-colors duration-300">
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
