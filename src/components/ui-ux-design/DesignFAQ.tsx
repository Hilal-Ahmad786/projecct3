'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function DesignFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What is the difference between UI and UX design?',
            answer: 'UI (User Interface) design focuses on the visual elements of a product - colors, typography, buttons, and layout. UX (User Experience) design is about the overall feel and usability of the product, including user research, information architecture, and interaction design. Both work together to create products that are both beautiful and functional.'
        },
        {
            question: 'How long does a typical design project take?',
            answer: 'Project timelines vary based on scope and complexity. A simple website redesign might take 4-6 weeks, while a comprehensive app design with user research could take 8-12 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process.'
        },
        {
            question: 'Do you provide design files and assets after the project?',
            answer: 'Yes, absolutely. Upon project completion, you receive all design files (Figma, Sketch, or Adobe XD), a complete component library, style guide, and all assets needed for development. We believe in full ownership and transparency with our clients.'
        },
        {
            question: 'How do you handle revisions and feedback?',
            answer: 'We include multiple revision rounds in every project to ensure you are completely satisfied with the final design. We use collaborative tools like Figma for real-time feedback and maintain open communication throughout the design process. Our goal is to exceed your expectations.'
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-pink-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
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
