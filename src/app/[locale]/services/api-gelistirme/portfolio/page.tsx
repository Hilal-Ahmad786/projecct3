'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const projects = [
    {
        title: 'Odeme Gecidi API',
        category: 'FinTech',
        description: 'Milyonlarca islemi isleyen yuksek performansli odeme islem API\'si. Bankalararasi entegrasyon ve gercek zamanli islem takibi.',
        results: ['%99.99 calisma suresi', '50ms yanit suresi', '10M+ islem']
    },
    {
        title: 'Saglik Entegrasyon API',
        category: 'Saglik',
        description: 'KVKK uyumlu, hastane sistemlerini ve hasta verilerini entegre eden API. Randevu sistemi ve e-recete entegrasyonu.',
        results: ['KVKK sertifikali', '100+ entegrasyon', '500K+ hasta']
    },
    {
        title: 'E-Ticaret Platform API',
        category: 'Perakende',
        description: 'Cok saticilikli pazar yerini destekleyen olceklenebilir GraphQL API. Envanter yonetimi ve siparis takibi.',
        results: ['1M+ urun', '50+ satici', '3 kat hizli sorgular']
    },
    {
        title: 'Lojistik Takip API',
        category: 'Lojistik',
        description: 'Filo yonetimi ve gercek zamanli kargo takibi icin gelistirilen API. GPS entegrasyonu ve rota optimizasyonu.',
        results: ['1000+ arac', 'Anlik takip', '%30 maliyet tasarrufu']
    },
    {
        title: 'IoT Veri Toplama API',
        category: 'IoT',
        description: 'Binlerce IoT cihazindan veri toplayan ve islenen yuksek hacimli API. Sensor verisi analizi ve alarm sistemi.',
        results: ['10K+ cihaz', 'Saniyede 100K istek', 'Gercek zamanli analiz']
    },
    {
        title: 'CRM Entegrasyon API',
        category: 'Kurumsal',
        description: 'Farkli CRM sistemlerini birlestiren ve veri senkronizasyonu saglayan API. Musteri 360 gorunumu ve raporlama.',
        results: ['5 CRM entegrasyonu', '50K+ musteri', 'Otomatik senkron']
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
                        <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Portfolyo
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Tamamladigimiz API Projeleri
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Farkli sektorlerde basariyla tamamladigimiz API projelerimizi inceleyin.
                            Her proje, musterilerimizin is hedeflerine ulasmalarini saglamistir.
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
                            <div className="h-48 bg-gradient-to-br from-teal-400 to-cyan-500 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white/20">{index + 1}</span>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-teal-600 font-medium">{project.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.results.map((result, i) => (
                                        <span key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-teal-500 hover:!bg-teal-600 !border-teal-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
