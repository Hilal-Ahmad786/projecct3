'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function ChatbotFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How long does it take to build a custom chatbot?',
            answer: 'A basic chatbot can be deployed in 2-4 weeks. More complex solutions with custom NLP training and integrations typically take 6-12 weeks. We provide a detailed timeline after understanding your requirements.'
        },
        {
            question: 'Can the chatbot integrate with our existing systems?',
            answer: 'Absolutely. Our chatbots integrate seamlessly with CRMs (Salesforce, HubSpot), helpdesks (Zendesk, Freshdesk), e-commerce platforms, and custom APIs. We handle all the technical integration work.'
        },
        {
            question: 'How do you train the AI to understand our industry?',
            answer: 'We train your chatbot using your existing documentation, FAQs, support tickets, and conversation logs. The AI learns your terminology, products, and common customer queries to provide accurate, relevant responses.'
        },
        {
            question: 'What happens when the bot cannot answer a question?',
            answer: 'We design intelligent handoff flows that seamlessly transfer complex queries to human agents. The bot provides context and conversation history, so your team can resolve issues quickly without asking customers to repeat themselves.'
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-violet-50 transition-colors"
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
