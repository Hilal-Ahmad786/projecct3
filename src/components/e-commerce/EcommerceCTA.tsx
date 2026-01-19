'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function EcommerceCTA() {
    return (
        <section className="py-32 bg-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-900/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Launch Your Online Store?
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                        Let&apos;s discuss your e-commerce vision and create a store that converts visitors into loyal customers. Get a free consultation and custom proposal.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-emerald-500 !text-white hover:!bg-emerald-600 !border-emerald-500">
                            Schedule Free Consultation
                        </Button>
                        <Button href="/services/e-commerce/portfolio" variant="outline" size="lg" className="!text-white !border-gray-700 hover:!bg-gray-800">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
