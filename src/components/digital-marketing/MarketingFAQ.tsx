'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function MarketingFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How long does it take to see results from digital marketing?',
            answer: 'Results vary by channel. PPC campaigns can generate leads immediately, while SEO typically takes 3-6 months to show significant organic traffic improvements. Social media engagement often improves within weeks of consistent posting. We provide monthly reports so you can track progress from day one.'
        },
        {
            question: 'What is your approach to measuring marketing ROI?',
            answer: 'We implement comprehensive tracking using Google Analytics, conversion pixels, and custom dashboards. We measure key metrics including cost per acquisition, customer lifetime value, return on ad spend (ROAS), and organic traffic growth. Every campaign is tied to specific KPIs aligned with your business goals.'
        },
        {
            question: 'Do you offer customized marketing strategies?',
            answer: 'Absolutely. We start with a thorough audit of your current digital presence, competitor analysis, and target audience research. From there, we develop a tailored strategy that might include SEO, PPC, social media, content marketing, or email campaigns based on what will drive the best results for your specific industry and goals.'
        },
        {
            question: 'How do you stay current with digital marketing trends?',
            answer: 'Our team continuously educates themselves through industry certifications (Google, Meta, HubSpot), conferences, and staying active in marketing communities. We regularly test new platforms and strategies, ensuring we leverage the latest tools and tactics to give our clients a competitive edge.'
        }
    ];

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-rose-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-rose-500 flex-shrink-0" />
                                ) : (
                                    <PlusIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
