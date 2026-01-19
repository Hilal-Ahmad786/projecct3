'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const projects = [
    {
        title: 'Moda Pazaryeri',
        category: 'Coklu Satici Platformu',
        description: 'Moda perakendecileri icin kapsamli coklu satici pazaryeri. Ozel tema, gelismis filtreleme ve satici paneli.',
        results: ['5M TL GMV', '100+ Satici', '50K+ Urun']
    },
    {
        title: 'B2B Toptan Satis Platformu',
        category: 'B2B E-Ticaret',
        description: 'Ozel fiyatlandirma ve siparis sistemi ile kurumsal B2B platformu. ERP entegrasyonu ve toplu siparis yonetimi.',
        results: ['10M TL Siparis', '500+ Musteri', 'API Entegrasyonu']
    },
    {
        title: 'Kozmetik Markasi',
        category: 'Shopify Plus',
        description: 'Premium kozmetik markasi icin yuksek donusumlu DTC magazasi. Kisisellestirilmis urun onerileri ve abonelik sistemi.',
        results: ['%300 Buyume', '%4.2 Donusum', 'Odul Kazanan']
    },
    {
        title: 'Organik Gida Marketi',
        category: 'WooCommerce',
        description: 'Organik ve dogal urunler satan online market. Sogutucu zincir lojistik entegrasyonu ve teslimat takibi.',
        results: ['2K+ Urun', 'Gunluk Teslimat', 'Abonelik Kutusu']
    },
    {
        title: 'Elektronik Magazasi',
        category: 'Ozel Gelistirme',
        description: 'Genis elektronik urun yelpazesi sunan e-ticaret sitesi. Urun karsilastirma, taksit secenekleri ve garanti takibi.',
        results: ['15K+ Urun', '99.9% Uptime', 'Mobil Uygulama']
    },
    {
        title: 'El Yapimi Urunler',
        category: 'Shopify',
        description: 'Zanaatkarlar icin el yapimi urunler pazaryeri. Satici profilleri, ozel siparis ve hikaye anlatimi ozellikleri.',
        results: ['200+ Zannatkar', 'Ozel Siparis', 'Sosyal Entegrasyon']
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
                        <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Portfolyo
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Basarili E-Ticaret Projelerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Farkli sektorlerden musterilerimiz icin gelistirdigimiz basarili e-ticaret projelerini inceleyin. Her proje, musterimizin benzersiz ihtiyaclarina gore ozellestirilmistir.
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
                            <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white/20">{index + 1}</span>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-emerald-600 font-medium">{project.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.results.map((result, i) => (
                                        <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-emerald-500 hover:!bg-emerald-600 !border-emerald-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
