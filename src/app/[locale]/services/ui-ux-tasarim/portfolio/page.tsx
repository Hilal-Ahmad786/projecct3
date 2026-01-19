'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const projects = [
    {
        title: 'Bankacilik Uygulamasi Yeniden Tasarimi',
        category: 'Mobil Uygulama Tasarimi',
        description: 'Lider bir bankanin mobil uygulamasini tamamen yeniden tasarladik. Kullanici deneyimini koken degistirerek etkilesimi arttirdik.',
        results: ['%200 etkilesim artisi', '4.8 uygulama puani', '1M+ kullanici']
    },
    {
        title: 'E-Ticaret UX Donusumu',
        category: 'Web Tasarimi',
        description: 'Oncu bir moda perakendecisi icin kapsamli kullanici deneyimi donusumu gerceklestirdik. Alisveris deneyimini optimize ettik.',
        results: ['%45 donusum artisi', '%60 hemen cikma azalmasi', 'Odul kazanan']
    },
    {
        title: 'Saglik Yonetim Paneli',
        category: 'Dashboard Tasarimi',
        description: 'Saglik profesyonelleri icin sezgisel ve kullanici dostu bir yonetim paneli tasarladik. Karmasik verileri basitce sunuyoruz.',
        results: ['%80 daha hizli islemler', '%95 memnuniyet', '10K+ gunluk kullanici']
    },
    {
        title: 'Finans Platformu Tasarimi',
        category: 'Web Uygulama Tasarimi',
        description: 'Karmasik finansal verileri gorsellestirebilen, kullanici dostu bir yatirim platformu tasarladik.',
        results: ['%150 kullanici artisi', '%35 islem artisi', 'Fintech odulu']
    },
    {
        title: 'Egitim Uygulamasi',
        category: 'Mobil Uygulama Tasarimi',
        description: 'Ogrenciler icin eglenceli ve etkilesimli bir ogrenme deneyimi olusturan egitim uygulamasi tasarladik.',
        results: ['%90 tamamlama orani', '4.9 uygulama puani', '500K+ indirme']
    },
    {
        title: 'Restoran Siparis Sistemi',
        category: 'Coklu Platform Tasarimi',
        description: 'Restoran zincirleri icin masaustu, tablet ve mobil cihazlarda calisan siparis yonetim sistemi tasarladik.',
        results: ['%40 siparis artisi', '%25 bekleme suresi azalmasi', '200+ restoran']
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
                        <span className="text-indigo-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Portfolyo
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Basari Hikayelerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Fark yaratan tasarimlarimiza goz atin. Her proje, kullanici odakli
                            yaklasimimizi ve yaratici cozumlerimizi yansitir.
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
                            <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white/20">{index + 1}</span>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-indigo-600 font-medium">{project.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.results.map((result, i) => (
                                        <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-indigo-500 hover:!bg-indigo-600 !border-indigo-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
