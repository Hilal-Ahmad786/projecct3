'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const projects = [
    {
        title: 'E-Ticaret Veri Boru Hatti',
        category: 'Veri Otomasyonu',
        description: 'Buyuk e-ticaret platformu icin otomatik veri toplama ve isleme sistemi. Gunluk 50.000 urun verisi otomatik guncelleniyor.',
        results: ['%90 zaman tasarrufu', '%99.9 dogruluk', '50.000+ gunluk kayit']
    },
    {
        title: 'Finansal Rapor Olusturucu',
        category: 'Rapor Otomasyonu',
        description: 'Otomatik finansal rapor olusturma ve dagitim sistemi. Excel ve PDF formatinda raporlar otomatik olarak ilgili kisilere gonderiliyor.',
        results: ['%80 daha hizli raporlama', 'Sifir hata', '100+ gunluk rapor']
    },
    {
        title: 'IK Is Akisi Otomasyonu',
        category: 'Surec Otomasyonu',
        description: 'Ise alim, oryantasyon ve bordro sureclerini kapsayan tam IK is akisi otomasyonu.',
        results: ['%70 verimlilik artisi', '500+ calisan', '7/24 calisma']
    },
    {
        title: 'Web Kazima Platformu',
        category: 'Veri Toplama',
        description: 'Coklu web sitesinden otomatik veri toplama platformu. Rakip fiyat analizi ve pazar arastirmasi icin kullaniliyor.',
        results: ['100+ web sitesi', 'Gercek zamanli veri', 'Otomatik uyarilar']
    },
    {
        title: 'Envanter Yonetim Sistemi',
        category: 'Stok Otomasyonu',
        description: 'Otomatik stok takibi, siparis olusturma ve tedarikci entegrasyonu saglayan envanter yonetim sistemi.',
        results: ['%95 stok dogrolugu', 'Otomatik siparisler', 'ERP entegrasyonu']
    },
    {
        title: 'Musteri Destek Botu',
        category: 'Iletisim Otomasyonu',
        description: 'Musteri sorgularini otomatik yanitlayan ve destek taleplerini yonlendiren akilli bot sistemi.',
        results: ['%60 yanitlama hizi', '7/24 destek', 'Coklu dil destegi']
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
                        <span className="text-orange-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Portfolyo
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Basari Hikayelerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Musterilerimiz icin gelistirdigimiz Python otomasyon cozumlerinden ornekler. Her proje, is sureclerini donusturmek ve verimlilik saglamak icin tasarlandi.
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
                            <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white/20">{index + 1}</span>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-orange-600 font-medium">{project.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.results.map((result, i) => (
                                        <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-orange-500 hover:!bg-orange-600 !border-orange-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
