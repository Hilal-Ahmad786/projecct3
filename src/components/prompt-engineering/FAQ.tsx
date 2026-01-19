'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What is prompt engineering and why is it important?',
            answer: 'Prompt engineering is the art and science of designing inputs for LLMs to get optimal outputs. It\'s crucial because the same model can produce vastly different results based on how you ask. Good prompts mean better accuracy, lower costs, and more reliable AI applications.'
        },
        {
            question: 'How much can prompt engineering improve my AI application?',
            answer: 'Results vary by use case, but we typically see 30-70% improvements in output quality, 40-60% reductions in API costs through more efficient prompts, and dramatic improvements in consistency. For some applications, proper prompting is the difference between unusable and production-ready.'
        },
        {
            question: 'Do you work with all LLM providers?',
            answer: 'Yes, we have expertise across all major LLM providers including OpenAI (GPT-4), Anthropic (Claude), Google (Gemini), Meta (Llama), Mistral, and others. We can help you select the right model and optimize prompts for your chosen platform.'
        },
        {
            question: 'How do you measure prompt performance?',
            answer: 'We establish clear metrics upfront based on your use case—accuracy, relevance, format compliance, latency, and cost. We then systematically test and compare prompt variations using automated evaluation frameworks and human review where appropriate.'
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
