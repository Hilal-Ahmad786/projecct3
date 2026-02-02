'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSectionTranslations } from '@/hooks/useTranslations';

export default function SecurityTestimonials() {
    const t = useSectionTranslations('cybersecurity');

    const getTestimonials = () => {
        try {
            const items = t('testimonials.items');
            if (Array.isArray(items) && items.length > 0) return items;
        } catch (e) { /* fallback */ }
        return [
            {
                quote: 'Their penetration testing uncovered critical vulnerabilities we had missed for years. The remediation support was exceptional, and our security posture has improved dramatically.',
                author: 'Michael Chen',
                role: 'CTO, FinanceHub Inc.',
                rating: 5
            },
            {
                quote: 'The 24/7 SOC monitoring has been a game-changer. We detected and stopped a ransomware attack within minutes. Their incident response team was professional and thorough.',
                author: 'Sarah Johnson',
                role: 'CISO, HealthCare Systems',
                rating: 5
            },
            {
                quote: 'Achieving SOC 2 compliance seemed daunting until we partnered with them. Their expertise streamlined the entire process and we were certified ahead of schedule.',
                author: 'David Martinez',
                role: 'VP of Engineering, CloudScale',
                rating: 5
            }
        ];
    };

    const testimonials = getTestimonials();
    const eyebrow = t('testimonials.eyebrow') || 'Client Success Stories';
    const title = t('testimonials.title') || 'Trusted by Security-Conscious Organizations';

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-red-500 font-medium tracking-wider uppercase text-sm mb-4 block">
                        {eyebrow}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        {title}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-red-50 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-red-500" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-bold">
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{item.author}</div>
                                    <div className="text-sm text-gray-500">{item.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
