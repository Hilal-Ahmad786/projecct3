'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useSectionTranslations } from '@/hooks/useTranslations';
import Button from '@/components/Button';

export default function PricingPage() {
    const t = useSectionTranslations('apiDevelopment.pricing');

    const packages = [
        {
            name: t('packages.0.name'),
            price: t('packages.0.price'),
            description: t('packages.0.description'),
            features: Array.from({ length: 5 }, (_, i) => t(`packages.0.features.${i}`)),
            cta: t('packages.0.cta'),
            highlighted: false
        },
        {
            name: t('packages.1.name'),
            price: t('packages.1.price'),
            description: t('packages.1.description'),
            features: Array.from({ length: 7 }, (_, i) => t(`packages.1.features.${i}`)),
            cta: t('packages.1.cta'),
            highlighted: true
        },
        {
            name: t('packages.2.name'),
            price: t('packages.2.price'),
            description: t('packages.2.description'),
            features: Array.from({ length: 8 }, (_, i) => t(`packages.2.features.${i}`)),
            cta: t('packages.2.cta'),
            highlighted: false
        }
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Pricing
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`bg-white rounded-2xl p-8 shadow-sm border-2 transition-shadow ${
                                pkg.highlighted
                                    ? 'border-teal-500 shadow-lg scale-105'
                                    : 'border-gray-100 hover:shadow-md'
                            }`}
                        >
                            {pkg.highlighted && (
                                <span className="inline-block bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                                    Most Popular
                                </span>
                            )}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                            <p className="text-gray-600 mb-4">{pkg.description}</p>
                            <div className="mb-6">
                                <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckIcon className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                href="/contact"
                                variant={pkg.highlighted ? 'primary' : 'secondary'}
                                size="lg"
                                className={`w-full ${pkg.highlighted ? '!bg-teal-500 hover:!bg-teal-600 !border-teal-500' : ''}`}
                            >
                                {pkg.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
