'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function SecurityFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What is included in a security assessment?',
            answer: 'Our comprehensive security assessment includes vulnerability scanning, penetration testing, security policy review, network architecture analysis, and a detailed report with prioritized recommendations. We evaluate your infrastructure, applications, and human factors to identify potential security gaps.'
        },
        {
            question: 'How quickly can you respond to a security incident?',
            answer: 'Our incident response team is available 24/7 with a guaranteed response time of under 15 minutes for critical incidents. We follow industry-standard incident response frameworks and work to contain threats immediately while preserving evidence for forensic analysis.'
        },
        {
            question: 'Which compliance frameworks do you support?',
            answer: 'We have expertise in major compliance frameworks including SOC 2 Type I & II, ISO 27001, GDPR, HIPAA, PCI-DSS, NIST, and FedRAMP. Our team can guide you through the entire compliance journey from gap assessment to certification.'
        },
        {
            question: 'How do you protect sensitive data during assessments?',
            answer: 'We follow strict data handling protocols with encrypted communications, secure testing environments, and comprehensive NDAs. Our team members hold security clearances and certifications. All findings are securely stored and shared only through encrypted channels.'
        },
        {
            question: 'What makes your penetration testing different?',
            answer: 'Our penetration tests go beyond automated scanning. Our certified ethical hackers (OSCP, CEH, GPEN) perform manual testing using real-world attack techniques. We provide detailed remediation guidance and offer retesting to verify fixes have been implemented correctly.'
        },
        {
            question: 'Do you offer ongoing security monitoring?',
            answer: 'Yes, our Security Operations Center (SOC) provides 24/7/365 monitoring using advanced SIEM solutions, threat intelligence feeds, and behavioral analytics. We detect, analyze, and respond to threats in real-time, providing you with continuous protection and monthly security reports.'
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-red-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
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
