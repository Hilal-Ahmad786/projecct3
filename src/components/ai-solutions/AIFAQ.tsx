'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function AIFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What types of AI solutions do you develop?',
            answer: 'We develop a wide range of AI solutions including machine learning models, natural language processing systems, computer vision applications, predictive analytics platforms, chatbots and conversational AI, recommendation engines, and process automation tools. Each solution is custom-built to address your specific business needs.'
        },
        {
            question: 'How long does it take to develop a custom AI solution?',
            answer: 'The timeline varies depending on the complexity of the project. A proof-of-concept typically takes 4-8 weeks, while a full production-ready solution can take 3-6 months. We follow an agile approach with regular milestones to ensure transparency and allow for adjustments throughout the development process.'
        },
        {
            question: 'Do we need to have existing data to start an AI project?',
            answer: 'While having existing data is beneficial, it is not always necessary to start. We can help you develop a data collection strategy, set up data pipelines, or work with synthetic data for initial prototyping. We will assess your current data situation during the discovery phase and recommend the best approach.'
        },
        {
            question: 'How do you ensure the security and privacy of our data?',
            answer: 'Data security is paramount in all our projects. We implement enterprise-grade security measures including encryption at rest and in transit, secure access controls, and compliance with regulations like GDPR and HIPAA. We can also develop solutions that keep sensitive data on-premises while still leveraging AI capabilities.'
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
                                    <MinusIcon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
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
