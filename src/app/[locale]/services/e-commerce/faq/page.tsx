'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'Which e-commerce platform should I choose: Shopify, WooCommerce, or Magento?',
            answer: 'The best platform depends on your specific needs. Shopify is excellent for quick launches, ease of use, and businesses that want a hosted solution without technical overhead. WooCommerce is ideal if you already have a WordPress site or need full code access for customization. Magento is best for large enterprises with complex requirements and high traffic volumes. We offer a free consultation to evaluate your needs and recommend the best solution.'
        },
        {
            question: 'How long does it take to build an e-commerce store?',
            answer: 'Timeline varies based on complexity and platform. A standard Shopify store with theme customization can be launched in 4-6 weeks. Custom WooCommerce builds typically take 8-12 weeks. Complex Magento implementations or headless commerce solutions may take 3-6 months. We provide detailed project timelines during our discovery phase, and we always plan for thorough testing before launch.'
        },
        {
            question: 'What payment gateways do you integrate?',
            answer: 'We integrate all major payment gateways including Stripe (our recommended choice for most businesses), PayPal, Square, Authorize.net, and Braintree. We also implement buy-now-pay-later solutions like Klarna, Afterpay, and Affirm. For international stores, we support regional payment methods including iDEAL, Bancontact, and Alipay. All integrations are PCI-compliant to ensure secure transactions.'
        },
        {
            question: 'Can you migrate my existing store to a new platform?',
            answer: 'Yes, we specialize in e-commerce migrations and have successfully migrated stores from legacy platforms to Shopify, WooCommerce, and Magento. Our migration process includes transferring products, customers, order history, and content while preserving SEO rankings through proper URL redirects. We plan migrations carefully to minimize downtime, typically completing the switch during low-traffic periods.'
        },
        {
            question: 'Do you provide ongoing maintenance and support?',
            answer: 'Absolutely. We offer tiered maintenance packages that include security updates, performance monitoring, bug fixes, and feature enhancements. Our support team helps with content updates, platform upgrades, and technical issues. We provide different SLA levels depending on your needs, including 24/7 emergency support for mission-critical stores. Most clients choose our monthly retainer for predictable costs and priority support.'
        },
        {
            question: 'How do you optimize stores for higher conversions?',
            answer: 'We implement proven conversion optimization strategies from day one, including streamlined checkout flows (reducing cart abandonment by up to 35%), trust signals, urgency elements, and mobile optimization. Post-launch, we set up A/B testing, analyze user behavior through heatmaps, implement abandoned cart recovery emails, and continuously optimize the shopping experience based on data to improve conversion rates and average order value.'
        },
        {
            question: 'What is headless commerce and do I need it?',
            answer: 'Headless commerce separates the frontend (what customers see) from the backend (inventory, orders, etc.). This allows for highly custom storefronts, faster page loads, and omnichannel experiences. You might need headless if you require unique designs that templates cannot achieve, want to sell across multiple channels (web, mobile app, kiosks), or need the fastest possible performance. For most small to medium businesses, traditional platforms like Shopify are sufficient and more cost-effective.'
        },
        {
            question: 'How do you handle inventory management and fulfillment?',
            answer: 'We integrate your store with inventory management systems and fulfillment providers. This includes real-time stock sync across sales channels, low-stock alerts, multi-warehouse support, and integration with shipping carriers (FedEx, UPS, DHL). We can connect to fulfillment services like ShipBob, Deliverr, or Amazon FBA. For dropshipping businesses, we integrate with suppliers for automated order routing.'
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        FAQ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        E-Commerce Development Questions
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Find answers to common questions about our e-commerce development services, platforms, and process.
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-emerald-50 transition-colors"
                            >
                                <span className="font-semibold text-lg text-gray-900 pr-4">{faq.question}</span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-emerald-600 flex-shrink-0 transition-transform ${
                                        openIndex === index ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-12">
                    <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
                            <p className="text-gray-600 mb-6">
                                Our e-commerce experts are here to help. Schedule a free consultation to discuss your online store project.
                            </p>
                            <button className="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
                                Schedule Free Consultation
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto mt-8">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="p-6">
                            <div className="text-3xl font-bold text-emerald-500 mb-2">200+</div>
                            <p className="text-gray-600">Stores Launched</p>
                        </div>
                        <div className="p-6">
                            <div className="text-3xl font-bold text-emerald-500 mb-2">$50M+</div>
                            <p className="text-gray-600">Revenue Generated</p>
                        </div>
                        <div className="p-6">
                            <div className="text-3xl font-bold text-emerald-500 mb-2">98%</div>
                            <p className="text-gray-600">Client Satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
