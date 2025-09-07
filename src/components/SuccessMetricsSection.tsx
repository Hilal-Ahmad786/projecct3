// src/components/SuccessMetricsSection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import {
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const metrics = [
  {
    value: '150+',
    label: 'Projects Completed',
    Icon: CheckBadgeIcon,
    description: 'Successfully delivered projects across various industries'
  },
  {
    value: '300%',
    label: 'Average ROI Increase',
    Icon: ArrowTrendingUpIcon,
    description: 'Return on investment for our clients'
  },
  {
    value: '80%',
    label: 'Time Savings',
    Icon: ClockIcon,
    description: 'Efficiency gained through automation'
  },
  {
    value: '50+',
    label: 'Happy Clients',
    Icon: UserGroupIcon,
    description: 'Businesses we\'ve helped transform'
  },
  {
    value: '99%',
    label: 'Uptime Guaranteed',
    Icon: ChartBarIcon,
    description: 'System reliability and performance'
  },
  {
    value: '$2M+',
    label: 'Revenue Generated',
    Icon: CurrencyDollarIcon,
    description: 'Additional revenue created for clients'
  }
];

const testimonialMetrics = [
  {
    metric: '95%',
    label: 'Client Satisfaction',
    quote: 'Exceeded our expectations in every aspect',
    client: 'Tech Startup CEO'
  },
  {
    metric: '< 24h',
    label: 'Response Time',
    quote: 'Lightning-fast support when we need it',
    client: 'E-commerce Director'
  },
  {
    metric: '100%',
    label: 'On-Time Delivery',
    quote: 'Always delivers on promises and deadlines',
    client: 'Project Manager'
  }
];

export default function SuccessMetricsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      <div className="absolute top-16 left-20 w-20 h-20">
        <div className="crescent crescent-left crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Success Metrics"
          title="Proven Results"
          subtitle="Our track record speaks for itself. Here are the measurable outcomes we've achieved for our clients."
          className="mb-16"
        />

        {/* Main Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.Icon;
            return (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                className="card text-center group"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-sm mx-auto mb-6 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <Icon className="h-8 w-8 text-gray-700" />
                </div>

                {/* Value */}
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {metric.value}
                </div>

                {/* Label */}
                <div className="font-medium text-gray-900 mb-3">
                  {metric.label}
                </div>

                {/* Description */}
                <div className="text-caption text-gray-500 leading-relaxed">
                  {metric.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonial Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-sm border border-gray-200 p-8"
        >
          <div className="text-center mb-12">
            <h3 className="text-title text-gray-900 mb-4">
              What Our Clients Say About Results
            </h3>
            <p className="text-body text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - here's what our clients have to say about the results we've delivered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialMetrics.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl font-light text-gray-900 mb-2">
                  {item.metric}
                </div>
                <div className="font-medium text-gray-900 mb-3">
                  {item.label}
                </div>
                <blockquote className="text-sm text-gray-600 italic mb-2">
                  "{item.quote}"
                </blockquote>
                <cite className="text-xs text-gray-500 not-italic">
                  — {item.client}
                </cite>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-16 border-t border-gray-200"
        >
          <h3 className="text-title text-gray-900 mb-4">
            Ready to Achieve Similar Results?
          </h3>
          <p className="text-body text-gray-600 mb-8 max-w-lg mx-auto">
            Let's discuss how we can help you achieve measurable success with your digital transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary">
              Start Your Success Story
            </a>
            <a href="/projects" className="btn btn-secondary">
              View Case Studies
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}