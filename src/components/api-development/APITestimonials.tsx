'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

export default function APITestimonials() {
    const testimonials = [
        {
            quote: 'Their API development team delivered exactly what we needed. The documentation was exceptional and the integration process was seamless. Our development time was cut in half.',
            author: 'Michael Chen',
            role: 'CTO, TechFlow Solutions',
            rating: 5
        },
        {
            quote: 'We needed a complex GraphQL API to unify our data sources. The team not only delivered on time but also suggested optimizations that improved our query performance by 40%.',
            author: 'Sarah Williams',
            role: 'VP of Engineering, DataSync Inc',
            rating: 5
        },
        {
            quote: 'The security implementation was top-notch. OAuth 2.0, rate limiting, and comprehensive logging - everything we needed for enterprise compliance. Highly recommended.',
            author: 'David Kumar',
            role: 'Security Lead, FinanceHub',
            rating: 5
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                        Client Testimonials
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
                            className="bg-teal-50 p-8 rounded-2xl relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(item.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5 text-teal-600" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                                &quot;{item.quote}&quot;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-teal-200 rounded-full flex items-center justify-center text-teal-700 font-bold">
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
