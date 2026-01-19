'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function EcommerceFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How long does it take to build an e-commerce store?',
            answer: 'A typical e-commerce project takes 8-12 weeks from initial consultation to launch. This includes discovery, design, development, payment integration, and thorough testing. Complex projects with custom features may require additional time.'
        },
        {
            question: 'Which e-commerce platforms do you work with?',
            answer: 'We specialize in Shopify, WooCommerce, Magento, and custom-built solutions using Next.js and headless commerce architectures. We recommend the best platform based on your specific business needs, scalability requirements, and budget.'
        },
        {
            question: 'Can you migrate my existing store to a new platform?',
            answer: 'Absolutely. We handle complete store migrations including product data, customer information, order history, and SEO preservation. Our migration process ensures zero downtime and maintains your search rankings throughout the transition.'
        },
        {
            question: 'What ongoing support do you provide after launch?',
            answer: 'We offer comprehensive maintenance packages including security updates, performance monitoring, feature enhancements, and 24/7 emergency support. Our team becomes an extension of yours, ensuring your store continues to grow and perform optimally.'
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-emerald-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
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
