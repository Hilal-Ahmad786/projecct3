'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';

const technologies = [
    { name: 'Google Ads', category: 'PPC Reklamcilik', color: 'bg-pink-500' },
    { name: 'Meta Ads', category: 'Sosyal Medya Reklamlari', color: 'bg-pink-600' },
    { name: 'Google Analytics', category: 'Web Analizi', color: 'bg-orange-500' },
    { name: 'SEMrush', category: 'SEO Araci', color: 'bg-orange-600' },
    { name: 'Ahrefs', category: 'SEO Araci', color: 'bg-blue-500' },
    { name: 'Mailchimp', category: 'E-posta Pazarlama', color: 'bg-yellow-500' },
    { name: 'HubSpot', category: 'CRM ve Otomasyon', color: 'bg-orange-400' },
    { name: 'Hootsuite', category: 'Sosyal Medya Yonetimi', color: 'bg-gray-600' },
    { name: 'Buffer', category: 'Icerik Planlama', color: 'bg-blue-400' },
    { name: 'Canva', category: 'Gorsel Tasarim', color: 'bg-cyan-500' },
    { name: 'Hotjar', category: 'Kullanici Analizi', color: 'bg-red-500' },
    { name: 'LinkedIn Ads', category: 'B2B Pazarlama', color: 'bg-blue-700' },
    { name: 'Moz', category: 'SEO Platformu', color: 'bg-blue-600' },
    { name: 'Sprout Social', category: 'Sosyal Medya', color: 'bg-green-500' },
    { name: 'Google Tag Manager', category: 'Izleme Yonetimi', color: 'bg-blue-500' },
    { name: 'Klaviyo', category: 'E-posta Otomasyonu', color: 'bg-green-600' },
];

export default function TechStackPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Pazarlama Araclari
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Kullandigimiz Teknolojiler
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Dijital pazarlama kampanyalarinizda en iyi sonuclari almak icin
                            sektorun lider araclarini ve platformlarini kullaniyoruz.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
                        >
                            <div className={`w-12 h-12 ${tech.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                                <span className="text-white font-bold text-lg">{tech.name.charAt(0)}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{tech.name}</h3>
                            <p className="text-sm text-gray-500">{tech.category}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Button href="/contact" variant="primary" size="lg" className="!bg-pink-500 hover:!bg-pink-600 !border-pink-500">
                        Gereksinimlerinizi Tartisalim
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
