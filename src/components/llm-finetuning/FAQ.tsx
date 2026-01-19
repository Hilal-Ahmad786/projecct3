'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'When should I consider fine-tuning vs. prompt engineering?',
            answer: 'Fine-tuning is ideal when: you need consistent domain-specific behavior, you have quality training data, prompt engineering alone doesn\'t achieve desired results, or you want to reduce inference costs. Start with prompt engineering—if that doesn\'t meet requirements, fine-tuning is the next step.'
        },
        {
            question: 'How much data do I need for fine-tuning?',
            answer: 'Quality matters more than quantity. For instruction tuning, 1,000-10,000 high-quality examples often suffice. Domain adaptation may need more. We use techniques like LoRA that work well with smaller datasets. We\'ll assess your data and recommend the best approach during discovery.'
        },
        {
            question: 'What is LoRA and why use it?',
            answer: 'LoRA (Low-Rank Adaptation) is an efficient fine-tuning method that trains small adapter layers instead of the full model. Benefits include: 90%+ reduction in compute costs, faster training, smaller model files, and the ability to swap adapters for different tasks. It\'s our default approach for most projects.'
        },
        {
            question: 'How do you ensure the fine-tuned model is safe?',
            answer: 'We implement multiple safety measures: careful dataset curation, safety-focused training data, red-team testing, output filtering, and comprehensive evaluation against harmful queries. We can also implement RLHF or DPO for additional alignment. Safety is never an afterthought.'
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
                                    <MinusIcon className="w-5 h-5 text-violet-600 flex-shrink-0" />
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
