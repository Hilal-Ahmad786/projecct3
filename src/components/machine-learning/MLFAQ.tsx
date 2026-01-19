'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function MLFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What types of machine learning projects do you work on?',
            answer: 'We work on a wide range of ML projects including predictive analytics, computer vision, natural language processing, recommendation systems, anomaly detection, and custom deep learning solutions. Our team has experience across industries from healthcare and finance to manufacturing and e-commerce.'
        },
        {
            question: 'How much data do I need to start a machine learning project?',
            answer: 'The data requirements vary by project type. For simpler models, a few thousand data points may suffice, while complex deep learning models may require millions. During our initial assessment, we evaluate your existing data and can recommend strategies for data collection or augmentation if needed.'
        },
        {
            question: 'How long does it take to develop a machine learning solution?',
            answer: 'Timeline depends on project complexity. A proof-of-concept can be delivered in 4-8 weeks. Production-ready solutions typically take 3-6 months, including data preparation, model development, testing, and deployment. We follow agile methodologies with regular milestones and demos.'
        },
        {
            question: 'Can you integrate ML models with our existing systems?',
            answer: 'Absolutely. We specialize in deploying ML models as APIs, microservices, or embedded solutions that integrate seamlessly with your existing infrastructure. We support cloud platforms (AWS, GCP, Azure), on-premise deployments, and edge computing scenarios.'
        },
        {
            question: 'How do you ensure the security of our data?',
            answer: 'Data security is paramount. We implement strict access controls, encryption at rest and in transit, and follow industry compliance standards (GDPR, HIPAA, SOC2). We can also work with anonymized data or implement federated learning approaches for sensitive applications.'
        },
        {
            question: 'What happens after the model is deployed?',
            answer: 'We provide comprehensive MLOps support including model monitoring, performance tracking, and automated retraining pipelines. Our team offers ongoing maintenance packages to ensure your models remain accurate and effective as your data and business evolve.'
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
