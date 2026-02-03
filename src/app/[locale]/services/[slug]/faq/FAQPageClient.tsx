'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageClientProps {
  serviceName: string;
  faq: FAQItem[];
}

export default function FAQPageClient({ serviceName, faq }: FAQPageClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faq.length === 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-4">{serviceName} FAQ</h1>
          <p className="text-gray-600">No FAQ available for this service yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gray-900" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              FAQ
            </span>
            <div className="w-8 h-0.5 bg-gray-900" />
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            {serviceName} FAQ
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our {serviceName.toLowerCase()} service.
          </p>
        </div>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-lg pr-4">{item.question}</span>
                {openIndex === index ? (
                  <MinusIcon className="w-5 h-5 text-gray-900 flex-shrink-0" />
                ) : (
                  <PlusIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
