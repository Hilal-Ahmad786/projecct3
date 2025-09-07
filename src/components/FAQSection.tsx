// src/components/FAQSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import SectionHeader from '@/components/SectionHeader';

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'We provide comprehensive digital solutions including web development, mobile applications, AI/ML solutions, automation, digital marketing, and DevOps services. Our team specializes in modern technologies and frameworks to deliver scalable, efficient solutions.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A simple website typically takes 2-4 weeks, while complex web applications or mobile apps can take 8-16 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.'
  },
  {
    question: 'What is your development process?',
    answer: 'We follow an agile development methodology with regular sprints and client feedback cycles. Our process includes discovery, planning, design, development, testing, deployment, and ongoing support. We maintain transparent communication throughout each phase.'
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance monitoring, bug fixes, and feature enhancements. We also provide 24/7 technical support for critical issues.'
  },
  {
    question: 'Can you work with existing systems?',
    answer: 'Absolutely. We have extensive experience integrating with existing systems, databases, and third-party services. We can modernize legacy systems, create APIs for integration, and ensure seamless data migration when needed.'
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'Our expertise includes React, Next.js, Node.js, Python, React Native, MongoDB, PostgreSQL, AWS, Docker, Kubernetes, and various AI/ML frameworks. We stay current with emerging technologies and select the best tools for each project.'
  },
  {
    question: 'How do you ensure project quality?',
    answer: 'We implement rigorous quality assurance processes including code reviews, automated testing, performance optimization, security audits, and user acceptance testing. All deliverables undergo thorough testing before deployment.'
  },
  {
    question: 'What are your pricing models?',
    answer: 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project scope, complexity, and timeline. We provide detailed quotes after understanding your specific requirements.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-gray-50 relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute top-20 right-20 w-24 h-24 opacity-[0.02]">
        <div 
          className="w-full h-full border border-gray-900"
          style={{ clipPath: 'circle(40% at 70% 30%)' }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Support"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services, process, and approach to digital solutions."
          className="mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <MinusIcon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <PlusIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-white border border-gray-200 rounded-sm text-center"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? We'd be happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn btn-primary"
              >
                Contact Us
              </a>
              <a
                href="mailto:info@paktechnology.com"
                className="btn btn-secondary"
              >
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}