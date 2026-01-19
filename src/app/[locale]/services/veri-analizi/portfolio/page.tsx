'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const projects = [
    {
        title: 'Perakende Analitik Panosu',
        category: 'Is Zekasi',
        description: 'Perakende zinciri icin gercek zamanli satis ve envanter analitigi. Kapsamli gorsellestirmeler ile karar alma sureclerini hizlandirdik.',
        image: '/images/portfolio/analytics-1.jpg',
        results: ['%40 daha iyi tahmin', '200+ magaza', '2M TL tasarruf']
    },
    {
        title: 'Saglik Verileri Platformu',
        category: 'Saglik Analitigi',
        description: 'Hastane agi icin hasta verileri analitik platformu. KVKK uyumlu, guvenli veri isleme ile hasta sonuclarini iyilestirdik.',
        image: '/images/portfolio/analytics-2.jpg',
        results: ['%30 daha hizli tani', '1M+ hasta', 'KVKK uyumlu']
    },
    {
        title: 'Pazarlama Atif Modeli',
        category: 'Pazarlama Analitigi',
        description: 'E-ticaret sirketi icin coklu temas noktasi atif modeli. Pazarlama harcamalarinin etkinligini olctuk ve optimize ettik.',
        image: '/images/portfolio/analytics-3.jpg',
        results: ['%25 ROI artisi', '50+ kanal', 'Gercek zamanli icgorular']
    },
    {
        title: 'Uretim Verimliligi Analizi',
        category: 'Endustriyel Analitik',
        description: 'Uretim tesisi icin verimlilik ve kalite kontrol analitigi. Makine ogrenmesi ile uretim hatalarini onceden tespit ettik.',
        image: '/images/portfolio/analytics-4.jpg',
        results: ['%35 verimlilik artisi', '500K+ veri noktasi', 'Prediktif bakim']
    },
    {
        title: 'Finansal Risk Panosu',
        category: 'Finansal Analitik',
        description: 'Banka icin kapsamli risk analizi ve raporlama sistemi. Regulator gereksinimlerini karsilayan otomatik raporlama.',
        image: '/images/portfolio/analytics-5.jpg',
        results: ['%50 rapor suresi azaltimi', '10+ risk metrigi', 'Otomatik uyari']
    },
    {
        title: 'Musteri Segmentasyonu',
        category: 'Musteri Analitigi',
        description: 'Telekom sirketi icin gelismis musteri segmentasyonu ve churn tahmini. Kisisellestirilmis pazarlama stratejileri gelistirdik.',
        image: '/images/portfolio/analytics-6.jpg',
        results: ['%20 churn azaltimi', '5M+ musteri', 'Kisisellestirilmis kampanyalar']
    }
];

export default function PortfolioPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Portfolyo
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Veri Analitigi Projelerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Cesitli sektorlerde gerceklestirdigimiz basarili veri analitigi projeleri. Musterilerimizin veriye dayali donusumune nasil yardimci oldugumuz.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
                        >
                            <div className="h-48 bg-gradient-to-br from-cyan-400 to-cyan-600 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white/20">{index + 1}</span>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-cyan-600 font-medium">{project.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.results.map((result, i) => (
                                        <span key={i} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">
                                            {result}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <Button href="/contact" variant="primary" size="lg" className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
