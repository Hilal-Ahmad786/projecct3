'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import APICTA from '@/components/api-development/APICTA';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What types of APIs do you develop?',
            answer: 'We specialize in developing RESTful APIs, GraphQL APIs, gRPC services, and WebSocket-based real-time APIs. Our team has extensive experience building APIs for e-commerce platforms, fintech applications, healthcare systems, IoT devices, and enterprise integrations. We choose the most appropriate API architecture based on your specific use case, performance requirements, and scalability needs.'
        },
        {
            question: 'How do you ensure API security?',
            answer: 'Security is built into every layer of our API development process. We implement OAuth 2.0 and JWT for authentication, role-based access control (RBAC) for authorization, rate limiting to prevent abuse, input validation and sanitization to prevent injection attacks, HTTPS/TLS encryption for data in transit, and comprehensive logging for audit trails. For sensitive industries, we ensure compliance with standards like PCI-DSS, HIPAA, and GDPR.'
        },
        {
            question: 'What is your typical API development timeline?',
            answer: 'Timeline varies based on complexity. A simple CRUD API might take 2-4 weeks, while a complex enterprise integration could take 2-3 months. Our typical project phases include: Discovery & Planning (1-2 weeks), API Design & Documentation (1-2 weeks), Development & Testing (4-8 weeks), and Deployment & Monitoring Setup (1-2 weeks). We provide detailed timelines after the initial consultation.'
        },
        {
            question: 'Do you provide API documentation?',
            answer: 'Absolutely! Comprehensive documentation is a standard deliverable for all our API projects. We provide interactive API documentation using OpenAPI/Swagger, Postman collections for easy testing, code examples in multiple programming languages, authentication guides and quickstart tutorials, and versioning documentation. Good documentation is essential for developer adoption and long-term maintainability.'
        },
        {
            question: 'How do you handle API versioning?',
            answer: 'We implement semantic versioning (v1, v2, etc.) through URL path versioning or header-based versioning depending on your needs. Our approach ensures backward compatibility for existing integrations while allowing new features to be added. We maintain multiple API versions simultaneously and provide clear migration guides when deprecating older versions, typically with a 6-12 month deprecation window.'
        },
        {
            question: 'What about API performance and scalability?',
            answer: 'Performance is a top priority. We design APIs to handle high traffic loads using strategies like database query optimization, multi-layer caching with Redis, horizontal scaling with load balancing, connection pooling, and asynchronous processing for heavy operations. We conduct load testing to ensure your API can handle expected traffic with room for growth, typically targeting sub-100ms response times for most endpoints.'
        },
        {
            question: 'Do you offer API monitoring and maintenance?',
            answer: 'Yes, we offer ongoing maintenance and monitoring packages. This includes 24/7 uptime monitoring with alerting, performance analytics and optimization, security patches and updates, bug fixes and minor enhancements, and regular health checks and reports. We use tools like Datadog, New Relic, or AWS CloudWatch to provide real-time visibility into your API performance.'
        },
        {
            question: 'Can you integrate with existing systems?',
            answer: 'Integration is one of our core strengths. We have experience integrating APIs with legacy systems, third-party services (payment gateways, CRMs, ERPs), cloud platforms (AWS, GCP, Azure), databases (SQL and NoSQL), and message queues (RabbitMQ, Kafka). We use adapter patterns and middleware to create clean integrations without disrupting your existing infrastructure.'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        API Development Questions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Get answers to common questions about our API development services, process, and best practices.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-teal-50 transition-colors"
                                >
                                    <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
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
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-16 bg-white rounded-2xl p-8 border border-gray-200 text-center"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
                        <p className="text-gray-600 mb-6">
                            Can&apos;t find the answer you&apos;re looking for? Our API experts are here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="primary" size="lg" className="!bg-teal-600 hover:!bg-teal-700 !border-teal-600">
                                Contact Us
                            </Button>
                            <Button href="mailto:info@paksoft.com" variant="secondary" size="lg">
                                Send Email
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="mt-20">
                <APICTA />
            </div>
        </main>
    );
}
