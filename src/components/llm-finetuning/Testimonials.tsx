'use client';

import { motion } from 'framer-motion';
import { useSectionTranslations } from '@/hooks/useTranslations';

const SHOW_TESTIMONIALS = false; // fabricated placeholder quotes removed 2026-08; set true after adding real client quotes to the locale files

export default function Testimonials() {
    const t = useSectionTranslations('aiServices.llmFinetuning');

    if (!SHOW_TESTIMONIALS) return null;

    const getTestimonials = () => {
        try {
            const items = t('testimonials.items');
            if (Array.isArray(items) && items.length > 0) return items;
        } catch (e) { /* fallback */ }
        return [
            {
                quote: "The fine-tuned model understands our legal terminology perfectly. It drafts documents that require minimal editing\u2014something generic models couldn't do.",
                author: "Elizabeth Chen",
                role: "Partner, Law Firm",
            },
            {
                quote: "Fine-tuning on our support data created an assistant that sounds like our best agents. Customer satisfaction scores improved immediately.",
                author: "Mark Stevens",
                role: "CX Director, Tech Company",
            },
            {
                quote: "Our fine-tuned medical model achieves 95% accuracy on domain-specific tasks where GPT-4 struggled at 70%. The investment was absolutely worth it.",
                author: "Dr. James Wilson",
                role: "Chief Medical Informatics Officer",
            },
        ];
    };

    const testimonials = getTestimonials();
    const eyebrow = t('testimonials.eyebrow') || 'Client Success Stories';
    const title = t('testimonials.title') || 'What Our Clients Say';

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-0.5 bg-violet-600"></div>
                        <span className="text-xs font-medium text-violet-600 uppercase tracking-wide">
                            {eyebrow}
                        </span>
                        <div className="w-8 h-0.5 bg-violet-600"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        {title}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-6">
                                <svg className="h-8 w-8 text-violet-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                </svg>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {testimonial.quote}
                            </p>
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                                    <span className="text-lg font-medium text-violet-600">
                                        {testimonial.author.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
