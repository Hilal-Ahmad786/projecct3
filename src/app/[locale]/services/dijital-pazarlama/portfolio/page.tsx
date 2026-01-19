'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const projects = [
    {
        title: 'SaaS Buyume Kampanyasi',
        category: 'B2B Pazarlama',
        description: 'Yazilim startup\'i icin cok kanalli dijital pazarlama kampanyasi ile %300 buyume.',
        results: ['%300 MRR artisi', '%50 daha dusuk CAC', 'Ayda 10K lead']
    },
    {
        title: 'E-Ticaret Lansmani',
        category: 'Perakende Pazarlama',
        description: 'Moda markasi icin kapsamli dijital pazarlama stratejisi ve basarili lansman.',
        results: ['Ilk ay 2M TL', '500K erisim', '8x ROAS']
    },
    {
        title: 'Yerel Isletme SEO',
        category: 'Yerel SEO',
        description: 'Restoran zinciri icin SEO ve yerel pazarlama stratejisi ile genisleme.',
        results: ['#1 yerel siralama', '%200 ziyaretci artisi', '50+ sube']
    },
    {
        title: 'Sosyal Medya Kampanyasi',
        category: 'Sosyal Medya',
        description: 'Kozmetik markasi icin viral sosyal medya kampanyasi ve influencer isbirlikleri.',
        results: ['1M+ etkilesim', '100K yeni takipci', '%150 satis artisi']
    },
    {
        title: 'E-posta Pazarlama Otomasyonu',
        category: 'E-posta Pazarlama',
        description: 'Online egitim platformu icin kisisellestirilmis e-posta pazarlama sistemi.',
        results: ['%45 acilma orani', '%12 tiklanma orani', '%80 kayit artisi']
    },
    {
        title: 'PPC Kampanya Yonetimi',
        category: 'PPC Reklamcilik',
        description: 'Saglik sektoru markasi icin Google Ads ve Meta Ads kampanyalari.',
        results: ['%60 maliyeti dusurme', '5x donusum artisi', '250K tiklanma']
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
                        <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Portfolyo
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Basari Hikayelerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Musterilerimiz icin gerceklestirdigimiz basarili dijital pazarlama
                            kampanyalarindan ornekler. Somut sonuclar ve olculebilir basarilar.
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
                            <div className="h-48 bg-gradient-to-br from-pink-400 to-pink-600 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white/20">{index + 1}</span>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-pink-600 font-medium">{project.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.results.map((result, i) => (
                                        <span key={i} className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded-full">
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-pink-500 hover:!bg-pink-600 !border-pink-500">
                        Kampanyanizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
