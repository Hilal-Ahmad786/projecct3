'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function MobileCTA() {
    return (
        <section className="py-32 bg-blue-600 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700/50 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Build Your Mobile App?
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                        Let's discuss your app idea and create a mobile experience that your users will love. Schedule a free consultation with our mobile development experts today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-blue-600 hover:!bg-blue-50 !border-white">
                            Schedule Free Consultation
                        </Button>
                        <Button href="/projects" variant="outline" size="lg" className="!text-white !border-blue-400 hover:!bg-blue-700">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
