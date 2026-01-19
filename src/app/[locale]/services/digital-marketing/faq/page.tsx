'use client';

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How long does it take to see results from digital marketing?',
            answer: 'Results timelines vary by channel and strategy. Paid advertising (PPC, social ads) can generate immediate traffic and leads within days of launch. SEO is a longer-term investment, typically showing significant improvements in 3-6 months, with compounding results over time. Email marketing campaigns can show results within weeks. We set realistic expectations during onboarding and provide regular progress reports throughout your campaign.'
        },
        {
            question: 'What is included in your digital marketing services?',
            answer: 'Our comprehensive digital marketing services include: Search Engine Optimization (SEO), Pay-Per-Click Advertising (Google Ads, Bing Ads), Social Media Marketing and Advertising, Content Marketing and Strategy, Email Marketing Automation, Conversion Rate Optimization, Marketing Analytics and Reporting, and Brand Strategy. We customize service packages based on your specific goals, budget, and industry requirements.'
        },
        {
            question: 'What is your minimum contract length and pricing?',
            answer: 'We recommend a minimum of 3 months to properly implement, test, and optimize marketing strategies. After the initial period, we offer flexible month-to-month options. For SEO clients, we typically recommend 6-12 month commitments for best results. Pricing is customized based on your goals, market competition, and required services. We offer packages starting from $2,500/month for small businesses to enterprise-level engagements.'
        },
        {
            question: 'Do you guarantee specific results or rankings?',
            answer: 'We do not guarantee specific rankings or results, as search algorithms constantly evolve and market conditions change. Any agency making such guarantees should be approached with caution. What we do guarantee is: transparent reporting, data-driven strategies, continuous optimization, and our full commitment to achieving the best possible outcomes. Our track record demonstrates consistent ROI improvements, and we share detailed case studies during our consultation.'
        },
        {
            question: 'How do you measure and report marketing success?',
            answer: 'We track KPIs aligned with your specific business goals, which may include: website traffic, conversion rates, lead volume and quality, cost per acquisition (CPA), return on ad spend (ROAS), keyword rankings, engagement metrics, and overall marketing ROI. You will receive detailed monthly reports with performance dashboards, insights, and strategic recommendations. We also schedule regular review calls to discuss results and adjust strategies.'
        },
        {
            question: 'Can you work with our existing marketing team or other agencies?',
            answer: 'Absolutely! We frequently collaborate with in-house marketing teams, creative agencies, and other vendors. We can serve as your complete marketing department, augment your existing team with specialized expertise, or focus on specific channels while you handle others. We believe in transparent collaboration and will work seamlessly with your existing partners to achieve shared goals.'
        },
        {
            question: 'What industries do you have experience with?',
            answer: 'We have extensive experience across many industries including: E-commerce and retail, B2B SaaS and technology, Healthcare and medical practices, Professional services (legal, financial, consulting), Real estate and property management, Hospitality and restaurants, Manufacturing and industrial, and Non-profit organizations. Our data-driven approach allows us to quickly understand any market and develop effective, tailored strategies.'
        },
        {
            question: 'How do you stay current with digital marketing changes?',
            answer: 'Digital marketing evolves rapidly, and staying current is essential to our success. Our team maintains certifications in Google Ads, Google Analytics, HubSpot, Meta Blueprint, and other platforms. We attend industry conferences, participate in beta programs with major platforms, and dedicate time weekly to research and training. We also run internal experiments to test new strategies before implementing them for clients.'
        },
        {
            question: 'What makes your agency different from other marketing agencies?',
            answer: 'Several factors set us apart: 1) Data-driven approach with transparent reporting and analytics, 2) Dedicated account managers who understand your business deeply, 3) No long-term contracts locking you in, 4) Full-stack capabilities across all digital channels, 5) Focus on revenue and business outcomes, not just vanity metrics, 6) Proactive communication and strategic recommendations, and 7) Proven track record with case studies demonstrating real results.'
        },
        {
            question: 'How do I get started with your digital marketing services?',
            answer: 'Getting started is simple: 1) Schedule a free consultation call where we discuss your business goals and challenges, 2) We conduct an initial audit of your current marketing efforts and competitive landscape, 3) We present a customized strategy and proposal tailored to your needs, 4) Upon approval, we begin onboarding with detailed discovery and setup, 5) Campaign launch with ongoing optimization and reporting. Contact us today to schedule your free consultation and marketing audit.'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Digital Marketing Questions Answered
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Find answers to common questions about our digital marketing services, process, and what you can expect when working with us.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-pink-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-pink-500 flex-shrink-0" />
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

                <div className="mt-16 text-center">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto border border-gray-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
                        <p className="text-gray-600 mb-6">
                            Our team is here to help. Schedule a free consultation to discuss your specific marketing needs and get personalized answers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors"
                            >
                                Schedule a Consultation
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                            <a
                                href="mailto:hello@example.com"
                                className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Email Us Directly
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
