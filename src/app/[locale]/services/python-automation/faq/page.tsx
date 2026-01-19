'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        question: 'What types of tasks can be automated with Python?',
        answer: 'Python can automate a wide range of tasks including web scraping, data extraction, file management, email automation, report generation, database operations, API integrations, browser automation, and much more. If a task is repetitive and follows a pattern, it can likely be automated.'
    },
    {
        question: 'How long does it take to develop a custom automation solution?',
        answer: 'Development time varies based on complexity. Simple scripts can be completed in 1-2 weeks, while complex multi-system automations may take 4-8 weeks. We provide detailed timelines during our discovery phase after understanding your specific requirements.'
    },
    {
        question: 'Will I need technical expertise to run the automation?',
        answer: 'No. We design our automation solutions to be user-friendly with simple interfaces or scheduled execution. We also provide comprehensive documentation and training so your team can monitor and maintain the system independently.'
    },
    {
        question: 'Is web scraping legal?',
        answer: 'Web scraping is legal for publicly available data, but must comply with website terms of service and data protection regulations. We always assess legality before starting a project and implement ethical scraping practices that respect rate limits and robots.txt files.'
    },
    {
        question: 'What happens if a website changes and breaks the automation?',
        answer: 'Website changes can affect scrapers. Our solutions include robust error handling and monitoring that alerts us to issues. We offer maintenance packages that include fixing broken automations due to website changes and continuous improvements.'
    },
    {
        question: 'Can automation integrate with our existing software systems?',
        answer: 'Yes. Python excels at integration. We can connect your automation with databases (SQL, NoSQL), cloud services (AWS, GCP), CRMs, ERPs, spreadsheets, email systems, and virtually any software that has an API or allows data export/import.'
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-orange-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Automation Questions Answered
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Common questions about our Python automation services and how they can help your business.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-orange-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
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
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-600 mb-4">
                        Have more questions about Python automation?
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                        Contact Our Team
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
