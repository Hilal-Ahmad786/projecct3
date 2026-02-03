'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon, PlusIcon, MinusIcon, ChatBubbleLeftRightIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import ParticleNetwork from '@/components/ParticleNetwork';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageClientProps {
  serviceName: string;
  serviceSlug: string;
  serviceColor?: string;
  faq: FAQItem[];
  locale: string;
}

const colorClasses: Record<string, { gradient: string; accent: string; light: string; dark: string; border: string }> = {
  emerald: { gradient: 'from-emerald-500 to-teal-600', accent: 'text-emerald-600', light: 'bg-emerald-50', dark: 'bg-emerald-600', border: 'border-emerald-200' },
  blue: { gradient: 'from-blue-500 to-indigo-600', accent: 'text-blue-600', light: 'bg-blue-50', dark: 'bg-blue-600', border: 'border-blue-200' },
  violet: { gradient: 'from-violet-500 to-purple-600', accent: 'text-violet-600', light: 'bg-violet-50', dark: 'bg-violet-600', border: 'border-violet-200' },
  amber: { gradient: 'from-amber-500 to-orange-600', accent: 'text-amber-600', light: 'bg-amber-50', dark: 'bg-amber-600', border: 'border-amber-200' },
  rose: { gradient: 'from-rose-500 to-pink-600', accent: 'text-rose-600', light: 'bg-rose-50', dark: 'bg-rose-600', border: 'border-rose-200' },
  gray: { gradient: 'from-gray-600 to-gray-800', accent: 'text-gray-700', light: 'bg-gray-50', dark: 'bg-gray-700', border: 'border-gray-200' },
};

export default function FAQPageClient({
  serviceName,
  serviceSlug,
  serviceColor = 'emerald',
  faq,
  locale
}: FAQPageClientProps) {
  const colors = colorClasses[serviceColor] || colorClasses.emerald;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQ based on search
  const filteredFaq = searchQuery
    ? faq.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faq;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork className="opacity-20" />
        </div>

        {/* Animated Question Marks */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {['?', '?', '?', '?', '?'].map((q, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                delay: i * 1.2,
              }}
              className="absolute text-7xl font-bold text-white"
              style={{
                left: `${10 + i * 20}%`,
                top: `${15 + (i % 3) * 30}%`,
              }}
            >
              {q}
            </motion.div>
          ))}
        </div>

        {/* Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[20%] w-96 h-96 bg-pink-500 rounded-full filter blur-[120px] opacity-20"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-0 left-[10%] w-80 h-80 bg-cyan-500 rounded-full filter blur-[100px] opacity-20"
        />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-purple-300 mb-8"
          >
            <Link href={`/${locale}/services`} className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/${locale}/services/${serviceSlug}`} className="hover:text-white transition-colors">{serviceName}</Link>
            <span>/</span>
            <span className="text-white">FAQ</span>
          </motion.nav>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6"
              >
                <QuestionMarkCircleIcon className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-medium text-white">Got Questions?</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                {serviceName}
                <br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  FAQ
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-purple-200 max-w-xl mb-8 leading-relaxed"
              >
                Find answers to common questions about our {serviceName.toLowerCase()} service. Can't find what you're looking for? We're here to help.
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex gap-8"
              >
                <div>
                  <div className="text-3xl font-bold text-white">{faq.length}</div>
                  <div className="text-sm text-purple-300">Questions Answered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-purple-300">Support Available</div>
                </div>
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                {/* Chat Bubbles Animation */}
                <div className="relative w-80 h-80">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.2, duration: 0.5 }}
                      className={`absolute bg-white/10 backdrop-blur-sm rounded-2xl p-4 ${
                        i === 0 ? 'top-0 left-0 w-48' :
                        i === 1 ? 'top-24 right-0 w-52' :
                        'bottom-8 left-8 w-44'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          i % 2 === 0 ? 'bg-pink-500' : 'bg-purple-500'
                        }`}>
                          {i % 2 === 0 ? (
                            <QuestionMarkCircleIcon className="w-5 h-5 text-white" />
                          ) : (
                            <LightBulbIcon className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 bg-white/20 rounded w-24" />
                          <div className="h-2 bg-white/15 rounded w-16" />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Center Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-24 h-24 rounded-full border-2 border-dashed border-white/20"
                    />
                    <div className={`absolute w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center shadow-2xl`}>
                      <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-2xl border border-gray-200 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
              />
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {faq.length === 0 ? (
              <div className="text-center py-16">
                <QuestionMarkCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-medium text-gray-900 mb-2">FAQ Coming Soon</h2>
                <p className="text-gray-600">We're preparing answers to common questions for this service.</p>
              </div>
            ) : filteredFaq.length === 0 ? (
              <div className="text-center py-16">
                <QuestionMarkCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-medium text-gray-900 mb-2">No Results Found</h2>
                <p className="text-gray-600">Try searching with different keywords.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className={`mt-4 px-6 py-2 ${colors.accent} hover:opacity-80 transition-opacity`}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaq.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
                      openIndex === index
                        ? `border-2 ${colors.border} shadow-lg`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-start gap-4 p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        openIndex === index ? `${colors.dark} text-white` : 'bg-gray-100 text-gray-500'
                      }`}>
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="flex-1 font-medium text-gray-900 text-lg pr-4">{item.question}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        openIndex === index ? `${colors.dark}` : 'bg-gray-100'
                      }`}>
                        {openIndex === index ? (
                          <MinusIcon className="w-4 h-4 text-white" />
                        ) : (
                          <PlusIcon className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className={`pl-12 text-gray-600 leading-relaxed border-l-2 ${colors.border} ml-4`}>
                              <p className="pl-4">{item.answer}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                Quick <span className="font-semibold">Tips</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Some helpful information to get you started with {serviceName.toLowerCase()}.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🚀', title: 'Getting Started', desc: 'Contact us to discuss your project requirements and get a free consultation.' },
                { icon: '⏱️', title: 'Timeline', desc: 'Project timelines vary based on scope. We provide detailed estimates upfront.' },
                { icon: '💳', title: 'Pricing', desc: 'We offer flexible pricing options tailored to your budget and project needs.' },
              ].map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-white rounded-2xl border border-gray-100"
                >
                  <div className="text-4xl mb-4">{tip.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-500 text-sm">{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <ChatBubbleLeftRightIcon className="w-16 h-16 text-pink-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-purple-200 text-lg mb-8 max-w-xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help with any questions you have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/contact`}
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${colors.gradient} text-white rounded-xl font-semibold hover:opacity-90 transition-opacity`}
              >
                Contact Us
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href={`/${locale}/services/${serviceSlug}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                Back to Service
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
