'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function MarketingCTA() {
    return (
        <section className="py-32 bg-rose-600 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-500/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Accelerate Your Growth?
                    </h2>
                    <p className="text-xl text-rose-100 mb-12 leading-relaxed">
                        Let us create a customized digital marketing strategy that drives real results.
                        Schedule a free consultation and discover how we can help your business thrive online.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-rose-600 hover:!bg-rose-50 !border-white">
                            Schedule Free Consultation
                        </Button>
                        <Button href="/services/digital-marketing/portfolio" variant="outline" size="lg" className="!text-white !border-rose-300 hover:!bg-rose-500">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
