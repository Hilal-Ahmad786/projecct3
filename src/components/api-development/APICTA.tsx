'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function APICTA() {
    return (
        <section className="py-32 bg-teal-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-800/50 to-transparent" />

            {/* Decorative Code Elements */}
            <div className="absolute top-10 left-10 text-teal-700 text-6xl font-mono opacity-20">{'{'}</div>
            <div className="absolute bottom-10 right-10 text-teal-700 text-6xl font-mono opacity-20">{'}'}</div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Build Your API?
                    </h2>
                    <p className="text-xl text-teal-200 mb-12 leading-relaxed">
                        Let's discuss your project requirements and create an API solution
                        that powers your business growth. Get a free consultation today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-teal-900 hover:!bg-teal-50 !border-white">
                            Schedule Consultation
                        </Button>
                        <Button href="/services/api-development/portfolio" variant="outline" size="lg" className="!text-white !border-teal-600 hover:!bg-teal-800">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
