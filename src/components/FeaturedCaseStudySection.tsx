// src/components/FeaturedCaseStudySection.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';

export default function FeaturedCaseStudySection() {
  return (
    <section className="section bg-gray-50 relative overflow-hidden">
      {/* Proper Crescent Elements */}
      <div className="absolute top-20 left-16 w-32 h-32">
        <div className="crescent crescent-left crescent-subtle text-gray-900" />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Case Study"
          title="E-Commerce Platform Success Story"
          subtitle="How we transformed a traditional business into a thriving online marketplace with modern technology."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Challenge */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-red-500" />
                <span className="text-overline">Challenge</span>
              </div>
              <h3 className="text-title text-gray-900 mb-4">
                Outdated System Limiting Growth
              </h3>
              <p className="text-body text-gray-600 leading-relaxed">
                Our client's legacy e-commerce system was slow, difficult to manage, and 
                couldn't handle their growing customer base. They needed a modern, 
                scalable solution that could support their expansion plans.
              </p>
            </div>

            {/* Solution */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-emerald-500" />
                <span className="text-overline">Solution</span>
              </div>
              <h3 className="text-title text-gray-900 mb-4">
                Modern, Scalable Architecture
              </h3>
              <div className="space-y-3 text-body text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0" />
                  <span>Next.js with server-side rendering for optimal performance</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0" />
                  <span>Shopify integration for robust e-commerce functionality</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0" />
                  <span>Mobile-first design with progressive web app features</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-3 flex-shrink-0" />
                  <span>Advanced analytics and reporting dashboard</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">300%</div>
                <div className="text-caption text-gray-500">Sales Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">0.8s</div>
                <div className="text-caption text-gray-500">Page Load Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">95%</div>
                <div className="text-caption text-gray-500">Mobile Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">50%</div>
                <div className="text-caption text-gray-500">Cost Reduction</div>
              </div>
            </div>

            {/* CTA */}
            <Button
              href="/projects/ecommerce-platform"
              variant="primary"
              size="lg"
              rightIcon={
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              }
            >
              Read Full Case Study
            </Button>
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative">
              <img
                src="/images/Demo/ShopifyBot.png"
                alt="E-Commerce Platform"
                className="w-full rounded-sm shadow-lg"
              />
              
              {/* Floating Metrics */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-sm shadow-lg border border-gray-200"
              >
                <div className="text-lg font-light text-gray-900">300%</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Sales Growth</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-sm shadow-lg border border-gray-200"
              >
                <div className="text-lg font-light text-gray-900">0.8s</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Load Time</div>
              </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute -z-10 top-8 right-8 w-full h-full bg-gray-100 rounded-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}