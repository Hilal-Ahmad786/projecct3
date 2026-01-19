'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What can AI agents do that traditional automation cannot?',
            answer: 'AI agents can reason, adapt, and handle novel situations. Traditional automation follows fixed rules, but agents can understand context, make decisions, learn from outcomes, and handle edge cases they weren\'t explicitly programmed for. They\'re ideal for complex workflows requiring judgment.'
        },
        {
            question: 'How do you ensure AI agents are reliable in production?',
            answer: 'We implement multiple safeguards: structured output validation, confidence thresholds, human-in-the-loop escalation, comprehensive logging, and fallback mechanisms. Agents are extensively tested in staging environments before production deployment.'
        },
        {
            question: 'What frameworks do you use for AI agent development?',
            answer: 'We work with leading frameworks including LangGraph, CrewAI, AutoGPT, Microsoft Autogen, and OpenAI Assistants. We also build custom agent architectures when off-the-shelf solutions don\'t meet specific requirements.'
        },
        {
            question: 'How do multi-agent systems work?',
            answer: 'Multi-agent systems use specialized agents that collaborate to solve complex problems. For example, one agent might research, another analyze, and a third write. They communicate through defined protocols and an orchestrator coordinates their work. This enables tackling problems too complex for a single agent.'
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
