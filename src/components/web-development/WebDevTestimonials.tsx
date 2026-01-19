'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

export default function WebDevTestimonials() {
    const testimonials = [
        {
            quote: 'They transformed our outdated website into a modern, high-performing platform. Our conversion rates increased by 40% within the first month.',
            author: 'Sarah Mitchell',
            role: 'CEO, TechStart Solutions',
            rating: 5
        },
        {
            quote: 'The team delivered our e-commerce platform ahead of schedule with exceptional attention to detail. Their technical expertise is unmatched.',
            author: 'Michael Chen',
            role: 'Founder, Urban Retail',
            rating: 5
        },
        {
            quote: 'Professional, responsive, and incredibly skilled. They built a complex dashboard that our team loves using every day.',
            author: 'Emily Rodriguez',
            role: 'CTO, DataFlow Analytics',
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gray-500 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Client Success Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                        What Our Clients Say
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
                            className="bg-gray-50 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-gray-900" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
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
