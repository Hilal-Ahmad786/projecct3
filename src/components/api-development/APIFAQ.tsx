'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function APIFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What is the difference between REST and GraphQL APIs?',
            answer: 'REST APIs use fixed endpoints that return predetermined data structures, while GraphQL APIs allow clients to specify exactly what data they need in a single request. REST is simpler to implement and cache, while GraphQL offers more flexibility and reduces over-fetching. We can help you choose the best approach based on your specific requirements.'
        },
        {
            question: 'How long does it take to develop a custom API?',
            answer: 'The timeline depends on the complexity of your requirements. A simple REST API with basic CRUD operations can be completed in 2-4 weeks, while a complex API with multiple integrations, authentication systems, and advanced features may take 2-3 months. We provide detailed estimates after reviewing your specifications.'
        },
        {
            question: 'What security measures do you implement?',
            answer: 'We implement comprehensive security including OAuth 2.0 / JWT authentication, HTTPS encryption, input validation, rate limiting, SQL injection prevention, XSS protection, and CORS configuration. For sensitive applications, we also implement audit logging, IP whitelisting, and compliance with standards like PCI-DSS or HIPAA.'
        },
        {
            question: 'Do you provide API documentation?',
            answer: 'Yes, every API we build comes with comprehensive documentation using OpenAPI (Swagger) specifications. This includes endpoint descriptions, request/response schemas, authentication details, error codes, and interactive testing capabilities. We also provide code examples in multiple programming languages.'
        },
        {
            question: 'Can you integrate with existing systems?',
            answer: 'Absolutely. We specialize in integrating APIs with existing systems including databases, CRMs, ERPs, payment gateways, cloud services, and legacy systems. We use middleware and adapters when needed to ensure seamless data flow between your systems.'
        },
        {
            question: 'What happens after the API is deployed?',
            answer: 'We offer ongoing support and maintenance packages that include monitoring, performance optimization, security updates, and feature enhancements. We also set up comprehensive logging and alerting so you can track API usage, identify issues, and make data-driven decisions about scaling.'
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-teal-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-teal-600 flex-shrink-0" />
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
