'use client';

import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function DesignCTA() {
    return (
        <section className="py-32 bg-gradient-to-br from-pink-600 to-fuchsia-500 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-700/30 to-transparent" />

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/20 rounded-full" />
            <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/10 rounded-sm transform rotate-45" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                        Ready to Transform Your User Experience?
                    </h2>
                    <p className="text-xl text-pink-100 mb-12 leading-relaxed">
                        Let us help you create digital experiences that your users will love.
                        From initial concept to final design, we are here to bring your vision to life.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-white !text-pink-600 hover:!bg-pink-50 !border-white">
                            Schedule a Consultation
                        </Button>
                        <Button href="/services/ui-ux-design/portfolio" variant="outline" size="lg" className="!text-white !border-white/30 hover:!bg-white/10">
                            View Case Studies
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
