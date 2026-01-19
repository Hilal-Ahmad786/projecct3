'use client';

import { CheckIcon } from '@heroicons/react/24/solid';
import Button from '@/components/Button';

const tiers = [
    {
        name: 'Starter',
        price: '$15,000',
        period: 'starting from',
        description: 'Perfect for proof of concept and initial ML exploration.',
        features: [
            'Single use case implementation',
            'Data assessment & feasibility study',
            'Basic model development',
            'API endpoint deployment',
            '30-day post-launch support',
            'Documentation & training'
        ],
        cta: 'Get Started',
        popular: false
    },
    {
        name: 'Professional',
        price: '$35,000',
        period: 'starting from',
        description: 'Comprehensive ML solution for production environments.',
        features: [
            'Up to 3 interconnected models',
            'Advanced feature engineering',
            'Model optimization & tuning',
            'MLOps pipeline setup',
            'Real-time monitoring dashboard',
            '90-day support & maintenance',
            'Retraining automation',
            'Performance optimization'
        ],
        cta: 'Contact Sales',
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'tailored solution',
        description: 'Full-scale ML transformation for large organizations.',
        features: [
            'Unlimited models & use cases',
            'Custom ML platform development',
            'On-premise or private cloud deployment',
            'Dedicated ML engineering team',
            '24/7 support & SLA',
            'Quarterly model reviews',
            'Custom integrations',
            'Training & workshops',
            'Strategic consulting'
        ],
        cta: 'Schedule Call',
        popular: false
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <span className="text-indigo-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Pricing
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        ML Solutions Pricing
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Flexible pricing options to match your ML journey, from proof of concept to enterprise deployment.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-xl ${
                                tier.popular
                                    ? 'border-indigo-500 shadow-lg scale-105'
                                    : 'border-gray-100 hover:border-indigo-200'
                            }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                                </div>
                                <span className="text-sm text-gray-500">{tier.period}</span>
                                <p className="text-gray-600 mt-4">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                href="/contact"
                                variant={tier.popular ? 'primary' : 'secondary'}
                                size="lg"
                                className={`w-full justify-center ${
                                    tier.popular
                                        ? '!bg-indigo-600 hover:!bg-indigo-700 !border-indigo-600'
                                        : ''
                                }`}
                            >
                                {tier.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <p className="text-gray-500 mb-4">
                        All plans include initial consultation, project scoping, and detailed proposal.
                    </p>
                    <p className="text-gray-500">
                        Need a custom solution? <a href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">Contact us</a> for a personalized quote.
                    </p>
                </div>
            </div>
        </main>
    );
}
