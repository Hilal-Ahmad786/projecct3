'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useSectionTranslations } from '@/hooks/useTranslations';
import Button from '@/components/Button';

export default function PricingPage() {
    const t = useSectionTranslations('devopsCloud.pricing');

    const tiers = [
        {
            name: t('tiers.0.name'),
            price: t('tiers.0.price'),
            period: t('tiers.0.period'),
            description: t('tiers.0.description'),
            features: [
                'Basic CI/CD pipeline setup',
                'Single cloud environment',
                'Monthly infrastructure review',
                '8x5 support coverage',
                'Basic monitoring setup',
                'Up to 5 deployments/day'
            ],
            cta: t('tiers.0.cta'),
            popular: false
        },
        {
            name: t('tiers.1.name'),
            price: t('tiers.1.price'),
            period: t('tiers.1.period'),
            description: t('tiers.1.description'),
            features: [
                'Advanced CI/CD with security scanning',
                'Multi-environment management',
                'Weekly optimization reviews',
                '24/7 support coverage',
                'Full observability stack',
                'Unlimited deployments',
                'Infrastructure as Code',
                'Disaster recovery setup'
            ],
            cta: t('tiers.1.cta'),
            popular: true
        },
        {
            name: t('tiers.2.name'),
            price: t('tiers.2.price'),
            period: t('tiers.2.period'),
            description: t('tiers.2.description'),
            features: [
                'Dedicated DevOps team',
                'Multi-cloud/hybrid support',
                'Custom SLA (up to 99.99%)',
                '24/7 dedicated support',
                'Advanced security & compliance',
                'FinOps cost optimization',
                'Training & enablement',
                'Quarterly business reviews'
            ],
            cta: t('tiers.2.cta'),
            popular: false
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-sky-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            {t('eyebrow')}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative p-8 rounded-2xl border-2 ${
                                tier.popular
                                    ? 'border-sky-500 bg-sky-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            } transition-all duration-300`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-sky-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                                <p className="text-gray-500 text-sm mb-4">{tier.description}</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                                    {tier.period && (
                                        <span className="text-gray-500">{tier.period}</span>
                                    )}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {tier.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start gap-3">
                                        <CheckIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                            tier.popular ? 'text-sky-600' : 'text-gray-400'
                                        }`} />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                href="/contact"
                                variant={tier.popular ? 'primary' : 'secondary'}
                                size="lg"
                                className={`w-full ${
                                    tier.popular
                                        ? '!bg-sky-500 hover:!bg-sky-600 !border-sky-500'
                                        : ''
                                }`}
                            >
                                {tier.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ / Custom Solution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-gray-50 rounded-2xl p-12 max-w-4xl mx-auto"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Need a Custom Solution?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Every infrastructure is unique. Let us analyze your requirements and create a tailored proposal that fits your specific needs and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-sky-500 hover:!bg-sky-600 !border-sky-500">
                            Request Custom Quote
                        </Button>
                        <Button href="/services/devops-cloud/faq" variant="secondary" size="lg">
                            View FAQ
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
