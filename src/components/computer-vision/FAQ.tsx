'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What types of computer vision applications do you build?',
            answer: 'We develop a wide range of applications: object detection and counting, quality inspection and defect detection, facial recognition, pose estimation, OCR and document processing, video analytics, autonomous systems guidance, medical image analysis, and more. If it involves understanding images or video, we can help.'
        },
        {
            question: 'How much training data do I need for a custom vision model?',
            answer: 'Requirements vary by complexity. Simple classification might need hundreds of images. Complex detection typically requires thousands. We use techniques like transfer learning, data augmentation, and synthetic data generation to achieve good results with limited data. We\'ll assess your data during discovery.'
        },
        {
            question: 'Can vision models run on edge devices?',
            answer: 'Yes, we specialize in edge deployment. We optimize models using quantization, pruning, and architecture search to run efficiently on NVIDIA Jetson, Intel NCS, mobile devices, and even microcontrollers. Real-time processing on edge eliminates latency and bandwidth costs.'
        },
        {
            question: 'How do you handle varying lighting and conditions?',
            answer: 'We design robust models through diverse training data, extensive augmentation, and domain adaptation techniques. We also implement pre-processing pipelines to normalize lighting, handle shadows, and adapt to different conditions. Testing across conditions is part of our validation process.'
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
                                    <MinusIcon className="w-5 h-5 text-rose-600 flex-shrink-0" />
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
