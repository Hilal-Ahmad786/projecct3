'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ServiceData } from '@/data/services'

export default function ServiceFAQ({ faq }: { faq: ServiceData['faq'] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    if (!faq || faq.length === 0) return null

    return (
        <section id="faq" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600">Common questions about our services.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faq.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900">{item.question}</span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
