'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import Button from '@/components/Button';

const pricingTiers = [
    {
        name: 'Starter',
        price: '$2,500',
        period: 'one-time',
        description: 'Perfect for small automation tasks and simple scripts.',
        features: [
            'Single automation script',
            'Basic web scraping or file automation',
            'Up to 3 data sources',
            'Email delivery of results',
            '30-day support',
            'Basic documentation'
        ],
        highlighted: false,
        ctaText: 'Get Started'
    },
    {
        name: 'Professional',
        price: '$7,500',
        period: 'one-time',
        description: 'Comprehensive automation solution for growing businesses.',
        features: [
            'Up to 5 automation scripts',
            'Advanced web scraping with anti-detection',
            'Unlimited data sources',
            'Database integration',
            'Scheduled task execution',
            'Error handling & alerts',
            '90-day support',
            'Full documentation & training'
        ],
        highlighted: true,
        ctaText: 'Most Popular'
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'quote',
        description: 'Full-scale automation infrastructure for large organizations.',
        features: [
            'Unlimited automation scripts',
            'Complex multi-system workflows',
            'Custom API development',
            'Cloud deployment (AWS/GCP)',
            'Real-time monitoring dashboard',
            '24/7 error alerting',
            '12-month priority support',
            'Dedicated account manager',
            'SLA guarantee'
        ],
        highlighted: false,
        ctaText: 'Contact Sales'
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <span className="text-orange-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Automation Investment Plans
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Transparent pricing for Python automation solutions. Choose the plan that fits your needs.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative rounded-2xl p-8 ${
                                tier.highlighted
                                    ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/25 scale-105'
                                    : 'bg-white border border-gray-200'
                            }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gray-900 text-white text-sm font-medium px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className={`text-2xl font-bold mb-2 ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                    {tier.name}
                                </h3>
                                <div className="mb-2">
                                    <span className={`text-4xl font-bold ${tier.highlighted ? 'text-white' : 'text-gray-900'}`}>
                                        {tier.price}
                                    </span>
                                    {tier.period !== 'quote' && (
                                        <span className={`text-sm ${tier.highlighted ? 'text-orange-100' : 'text-gray-500'}`}>
                                            {' '}/{tier.period}
                                        </span>
                                    )}
                                </div>
                                <p className={`text-sm ${tier.highlighted ? 'text-orange-100' : 'text-gray-500'}`}>
                                    {tier.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                            tier.highlighted ? 'text-white' : 'text-orange-500'
                                        }`} />
                                        <span className={tier.highlighted ? 'text-white' : 'text-gray-600'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                href="/contact"
                                variant={tier.highlighted ? 'secondary' : 'primary'}
                                size="lg"
                                className={`w-full justify-center ${
                                    tier.highlighted
                                        ? '!bg-white !text-orange-600 hover:!bg-gray-100'
                                        : '!bg-orange-500 !text-white hover:!bg-orange-600 !border-orange-500'
                                }`}
                            >
                                {tier.ctaText}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-500 mb-4">
                        All plans include a free initial consultation and ROI assessment.
                    </p>
                    <p className="text-gray-500">
                        Need something specific?{' '}
                        <a href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">
                            Contact us for a custom quote
                        </a>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
