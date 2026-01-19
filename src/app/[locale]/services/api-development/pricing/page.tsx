'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import Button from '@/components/Button';
import { useSectionTranslations } from '@/hooks/useTranslations';

export default function PricingPage() {
    const t = useSectionTranslations('apiDevelopment.pricing');

    const tiers = [
        {
            name: 'Starter API',
            price: '$8,000 - $15,000',
            description: 'Perfect for small projects and MVPs',
            features: [
                'Up to 15 API endpoints',
                'JWT authentication',
                'Basic rate limiting',
                'Swagger documentation',
                'PostgreSQL integration',
                '2 weeks post-launch support'
            ],
            popular: false
        },
        {
            name: 'Professional API',
            price: '$15,000 - $35,000',
            description: 'For growing businesses with complex needs',
            features: [
                'Up to 50 API endpoints',
                'OAuth 2.0 implementation',
                'Advanced rate limiting & caching',
                'GraphQL or REST (your choice)',
                'Multiple database support',
                'Webhook integrations',
                '1 month post-launch support'
            ],
            popular: true
        },
        {
            name: 'Enterprise API',
            price: 'Custom Quote',
            description: 'For large-scale enterprise solutions',
            features: [
                'Unlimited endpoints',
                'Microservices architecture',
                'Multi-region deployment',
                'Custom security audit',
                'SLA guarantees',
                '24/7 monitoring & support',
                'Dedicated technical account manager'
            ],
            popular: false
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
                        {t('eyebrow')}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${
                                tier.popular
                                    ? 'border-teal-500 shadow-xl shadow-teal-100'
                                    : 'border-gray-200 hover:border-teal-200 hover:shadow-lg'
                            }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-teal-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <div className="text-3xl font-bold text-teal-600 mb-2">{tier.price}</div>
                                <p className="text-gray-500">{tier.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <CheckIcon className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                href="/contact"
                                variant={tier.popular ? 'primary' : 'secondary'}
                                size="lg"
                                className={`w-full ${tier.popular ? '!bg-teal-600 hover:!bg-teal-700 !border-teal-600' : ''}`}
                            >
                                Get Started
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 max-w-3xl mx-auto text-center"
                >
                    <div className="bg-white rounded-2xl p-8 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h3>
                        <p className="text-gray-600 mb-6">
                            Every API project is unique. Contact us to discuss your specific requirements
                            and get a tailored quote that fits your needs and budget.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/contact" variant="primary" size="lg" className="!bg-teal-600 hover:!bg-teal-700 !border-teal-600">
                                Schedule Consultation
                            </Button>
                            <Button href="/services/api-development/portfolio" variant="secondary" size="lg">
                                View Our Work
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 max-w-3xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Pricing FAQ</h3>
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">What is included in post-launch support?</h4>
                            <p className="text-gray-600">Post-launch support includes bug fixes, minor adjustments, performance monitoring, and technical guidance. Extended support packages are available for ongoing maintenance.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">Can I upgrade my plan later?</h4>
                            <p className="text-gray-600">Absolutely! You can start with a smaller package and scale up as your needs grow. We design APIs with extensibility in mind.</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">What payment terms do you offer?</h4>
                            <p className="text-gray-600">We typically work with a 40% upfront, 30% at midpoint, and 30% upon completion structure. Custom payment terms are available for enterprise projects.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
