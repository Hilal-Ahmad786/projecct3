'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function MobileFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How long does it take to develop a mobile app?',
            answer: 'Development timelines vary based on complexity. A simple app typically takes 2-3 months, while complex apps with custom features may require 4-6 months or more. We provide detailed timelines after understanding your specific requirements during the discovery phase.'
        },
        {
            question: 'Should I build a native app or cross-platform?',
            answer: 'It depends on your goals and budget. Native apps (Swift for iOS, Kotlin for Android) offer the best performance and user experience. Cross-platform solutions like React Native or Flutter are cost-effective when you need to reach both platforms with a single codebase. We can help you choose the best approach for your project.'
        },
        {
            question: 'How much does mobile app development cost?',
            answer: 'Costs depend on features, complexity, platforms, and design requirements. Simple apps start around $25,000, while complex enterprise apps can exceed $150,000. We provide transparent pricing after a thorough assessment of your needs.'
        },
        {
            question: 'Do you provide post-launch support and maintenance?',
            answer: 'Yes, we offer comprehensive maintenance packages including bug fixes, security updates, performance optimization, OS compatibility updates, and feature enhancements. We recommend ongoing support to keep your app running smoothly and up-to-date with the latest platform changes.'
        }
    ];

    return (
        <section className="py-24 bg-white">
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
                            className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
