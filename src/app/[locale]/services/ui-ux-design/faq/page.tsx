'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
    {
        question: 'What is the difference between UI and UX design?',
        answer: 'UI (User Interface) design focuses on the visual elements users interact with - colors, typography, buttons, and layouts. UX (User Experience) design is about the overall feel and functionality, ensuring the product is intuitive, efficient, and enjoyable to use. We specialize in both, creating designs that look beautiful and work seamlessly.'
    },
    {
        question: 'How long does a typical design project take?',
        answer: 'Project timelines vary based on scope and complexity. A simple landing page design might take 1-2 weeks, while a complete mobile app design could take 6-8 weeks. During our initial consultation, we will provide a detailed timeline based on your specific requirements and priorities.'
    },
    {
        question: 'Do you provide design files and assets?',
        answer: 'Absolutely! Upon project completion, you receive all design files (Figma, Sketch, or your preferred format), exported assets, style guides, and component specifications. Everything you need for development and future updates is included in our deliverables.'
    },
    {
        question: 'Can you work with our existing brand guidelines?',
        answer: 'Yes, we excel at working within established brand systems. We will study your brand guidelines thoroughly and create designs that extend your visual identity consistently while potentially suggesting improvements where appropriate.'
    },
    {
        question: 'Do you offer ongoing design support?',
        answer: 'We offer flexible support options including retainer agreements for continuous design needs, ad-hoc project work, and design system maintenance. Many clients find ongoing partnerships valuable as their products evolve and grow.'
    },
    {
        question: 'How do you handle feedback and revisions?',
        answer: 'We use collaborative tools like Figma for real-time feedback and commenting. Each project includes designated revision rounds (varying by package), and we work iteratively to ensure you are completely satisfied with the final design. Additional revisions beyond the included rounds can be arranged if needed.'
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-indigo-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Answers to common questions about our UI/UX design services.
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-indigo-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-indigo-500 flex-shrink-0 transition-transform duration-300 ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${
                                    openIndex === index ? 'max-h-96' : 'max-h-0'
                                }`}
                            >
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-12 text-center">
                    <p className="text-gray-600">
                        Still have questions? <a href="/contact" className="text-indigo-600 font-medium hover:underline">Get in touch</a> and we will be happy to help.
                    </p>
                </div>
            </div>
        </main>
    );
}
