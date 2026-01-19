'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function AutomationFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What types of tasks can be automated with Python?',
            answer: 'Python can automate a wide range of tasks including web scraping, data processing, file management, report generation, email handling, API integrations, database operations, and much more. If it involves repetitive digital work, there\'s likely a Python solution for it.'
        },
        {
            question: 'How long does it take to build an automation solution?',
            answer: 'Project timelines vary based on complexity. Simple scripts can be completed in a few days, while comprehensive automation systems may take several weeks. We provide detailed estimates after understanding your specific requirements.'
        },
        {
            question: 'Will I need technical knowledge to use the automation?',
            answer: 'No technical knowledge required. We design our solutions with user-friendly interfaces and provide comprehensive documentation. Most automations can be triggered with a simple click or run on scheduled intervals automatically.'
        },
        {
            question: 'Can you integrate with our existing systems?',
            answer: 'Yes, Python excels at integrations. We can connect with APIs, databases, cloud services, legacy systems, and popular software like Salesforce, Excel, Google Workspace, and many others.'
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-orange-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-orange-600 flex-shrink-0" />
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
