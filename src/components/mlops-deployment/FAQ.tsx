'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What is MLOps and why do we need it?',
            answer: 'MLOps (Machine Learning Operations) applies DevOps principles to ML systems. It addresses the unique challenges of ML: managing experiments, versioning data and models, automating training pipelines, monitoring model performance, and handling model drift. Without MLOps, ML projects often fail to move from notebooks to production.'
        },
        {
            question: 'What cloud platforms do you support?',
            answer: 'We have deep expertise in AWS (SageMaker, EKS), Google Cloud (Vertex AI, GKE), and Azure (Azure ML, AKS). We also support on-premise deployments and hybrid architectures. Our solutions are designed to be portable and avoid vendor lock-in where possible.'
        },
        {
            question: 'How do you handle model monitoring and drift detection?',
            answer: 'We implement comprehensive monitoring for input data distributions, prediction distributions, and model performance metrics. Automated alerts notify you of data drift, concept drift, or performance degradation. We can set up automated retraining triggers when drift exceeds thresholds.'
        },
        {
            question: 'What is the typical timeline for MLOps implementation?',
            answer: 'A basic MLOps pipeline for a single model typically takes 4-6 weeks. A comprehensive platform with multiple models, feature stores, and advanced monitoring takes 3-6 months. We start with high-value quick wins and expand capabilities iteratively.'
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
                                    <MinusIcon className="w-5 h-5 text-amber-600 flex-shrink-0" />
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
