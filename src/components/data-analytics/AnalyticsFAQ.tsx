'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function AnalyticsFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What types of data can you analyze?',
            answer: 'We work with virtually any data type including structured databases, spreadsheets, CRM data, web analytics, IoT sensor data, social media metrics, and unstructured text data. Our team has experience integrating multiple data sources to create comprehensive analytical views.'
        },
        {
            question: 'How long does it take to implement an analytics solution?',
            answer: 'Implementation timelines vary based on complexity. A basic BI dashboard can be deployed in 2-4 weeks, while comprehensive enterprise analytics platforms typically take 2-3 months. We use agile methodology to deliver value incrementally, so you see results early in the process.'
        },
        {
            question: 'Do we need to have clean, organized data before starting?',
            answer: 'Not at all. Data cleaning and preparation is a core part of our service. We assess your current data quality, identify gaps, and implement processes to clean, transform, and standardize your data as part of the analytics implementation.'
        },
        {
            question: 'What analytics tools and platforms do you work with?',
            answer: 'We are proficient in leading platforms including Power BI, Tableau, Looker, and custom solutions. For data processing, we use Python, R, SQL, Apache Spark, and cloud platforms like AWS, Azure, and Google Cloud. We recommend tools based on your specific needs and existing infrastructure.'
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-cyan-600 flex-shrink-0" />
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
