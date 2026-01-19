'use client';

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'What data sources can you integrate with?',
            answer: 'We can integrate with virtually any data source including databases (SQL, NoSQL), cloud platforms (AWS, GCP, Azure), SaaS applications (Salesforce, HubSpot, Shopify), spreadsheets, APIs, and IoT devices. Our team has experience connecting to hundreds of different data sources.'
        },
        {
            question: 'How long does it take to implement an analytics solution?',
            answer: 'Implementation timelines vary based on complexity. A basic dashboard with a few data sources typically takes 2-4 weeks. More comprehensive enterprise solutions with data warehouse setup and multiple integrations can take 2-4 months. We provide detailed timelines during our discovery phase.'
        },
        {
            question: 'Do you provide training for our team?',
            answer: 'Yes, comprehensive training is included with all our analytics solutions. We offer hands-on training sessions, documentation, video tutorials, and ongoing support to ensure your team can effectively use and maintain the dashboards and reports we build.'
        },
        {
            question: 'Can you work with our existing BI tools?',
            answer: 'Absolutely. We have expertise in all major BI platforms including Power BI, Tableau, Looker, and Qlik. We can enhance your existing setup, build new solutions, or help migrate to a different platform if needed.'
        },
        {
            question: 'How do you ensure data security and privacy?',
            answer: 'Data security is paramount. We implement role-based access controls, data encryption, and follow industry best practices. We are experienced with compliance requirements including GDPR, HIPAA, and SOC 2. All data remains within your infrastructure or approved cloud environments.'
        },
        {
            question: 'Do you offer ongoing support and maintenance?',
            answer: 'Yes, we offer flexible support packages including dashboard maintenance, data pipeline monitoring, report updates, and performance optimization. We can also provide dedicated analytics support on a retainer basis for organizations requiring continuous assistance.'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Data Analytics Questions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Answers to frequently asked questions about our data analytics services.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-cyan-600 flex-shrink-0" />
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

                <div className="max-w-xl mx-auto text-center mt-16 p-8 bg-white rounded-2xl border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Still have questions?</h3>
                    <p className="text-gray-600 mb-6">
                        We would be happy to discuss your specific analytics needs and answer any questions.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </main>
    );
}
