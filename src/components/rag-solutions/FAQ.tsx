'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What is RAG and how does it work?',
            answer: 'RAG (Retrieval-Augmented Generation) combines LLMs with your own knowledge base. When a user asks a question, the system retrieves relevant documents from your data, then uses an LLM to synthesize an answer based on that specific information. This grounds responses in your actual data rather than the model\'s training.'
        },
        {
            question: 'What types of documents can RAG systems process?',
            answer: 'RAG systems can ingest virtually any text-based content: PDFs, Word documents, web pages, wikis, databases, emails, chat logs, and more. We also support structured data, code repositories, and can incorporate images and tables with multimodal approaches.'
        },
        {
            question: 'How accurate are RAG system responses?',
            answer: 'With proper implementation, RAG systems achieve high accuracy because answers are grounded in your actual documents. We implement techniques like hybrid search, reranking, and citation verification to maximize accuracy. Unlike pure LLMs, RAG dramatically reduces hallucinations.'
        },
        {
            question: 'How do you handle sensitive or confidential data?',
            answer: 'We implement enterprise-grade security including encryption at rest and in transit, role-based access control, audit logging, and data isolation. RAG systems can be deployed on-premise or in private cloud environments. We also support document-level permissions for fine-grained access control.'
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
                                    <MinusIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
