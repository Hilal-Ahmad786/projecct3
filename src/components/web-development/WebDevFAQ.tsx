'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function WebDevFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How long does it take to build a website?',
            answer: 'Project timelines vary based on complexity. A simple landing page can be completed in 2-3 weeks, while a full-featured web application may take 2-4 months. During our initial consultation, we provide a detailed timeline tailored to your specific requirements.'
        },
        {
            question: 'What technologies do you use for web development?',
            answer: 'We specialize in modern technologies including React, Next.js, TypeScript, Node.js, and Tailwind CSS. For databases, we work with PostgreSQL, MongoDB, and Prisma ORM. Our technology choices are always driven by your project requirements and scalability needs.'
        },
        {
            question: 'Do you provide ongoing maintenance and support?',
            answer: 'Yes, we offer comprehensive maintenance packages that include security updates, performance monitoring, bug fixes, and feature enhancements. We believe in building long-term partnerships with our clients to ensure their digital products continue to thrive.'
        },
        {
            question: 'What is your development process like?',
            answer: 'Our process follows an agile methodology with five key phases: Discovery (understanding your needs), Design (creating wireframes and mockups), Development (building the solution), Testing (ensuring quality), and Launch (deployment and handover). You are involved at every stage with regular updates and feedback sessions.'
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
                                    <MinusIcon className="w-5 h-5 text-gray-900 flex-shrink-0" />
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
