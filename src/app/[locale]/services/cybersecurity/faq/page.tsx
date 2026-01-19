'use client';

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        question: 'How do you assess our current security posture?',
        answer: 'We begin with a comprehensive security assessment that includes vulnerability scanning, penetration testing, configuration reviews, and policy analysis. This gives us a complete picture of your current state and helps identify gaps that need to be addressed.'
    },
    {
        question: 'What industries do you specialize in?',
        answer: 'We have extensive experience across multiple industries including financial services, healthcare, manufacturing, retail, and technology. Our team understands industry-specific compliance requirements like PCI-DSS, HIPAA, SOX, and GDPR.'
    },
    {
        question: 'How quickly can you respond to a security incident?',
        answer: 'Our incident response team is available 24/7. For clients with our Professional or Enterprise packages, we guarantee initial response within 15 minutes for critical incidents. We have established playbooks and procedures to contain threats quickly and minimize damage.'
    },
    {
        question: 'Do you provide compliance support?',
        answer: 'Yes, we provide comprehensive compliance support for frameworks including ISO 27001, SOC 2 Type I & II, GDPR, HIPAA, PCI-DSS, and NIST. We help with gap assessments, policy development, control implementation, and audit preparation.'
    },
    {
        question: 'Can you work with our existing security tools?',
        answer: 'Absolutely. We integrate with most major security platforms and can work with your existing technology stack. If we identify gaps, we\'ll recommend solutions that complement your current investments rather than requiring complete replacements.'
    },
    {
        question: 'How do you stay current with evolving threats?',
        answer: 'Our team continuously monitors threat intelligence feeds, participates in security research communities, and maintains certifications like CISSP, CEH, and OSCP. We also conduct regular training and participate in threat hunting exercises to stay ahead of emerging attack techniques.'
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-red-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Security Questions Answered
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Common questions about our cybersecurity services and approach.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-red-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                                ) : (
                                    <PlusIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
