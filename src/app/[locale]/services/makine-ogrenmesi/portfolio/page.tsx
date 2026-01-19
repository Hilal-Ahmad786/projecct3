'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const projects = [
    {
        title: 'Kestirimci Bakim Sistemi',
        category: 'Endustriyel ML',
        description: 'Uretim tesislerinde ekipman arizalarini onceden tahmin eden makine ogrenmesi sistemi. Planlanmamis duruslari minimuma indiriyor.',
        results: ['%95 tahmin dogrulugu', '%40 maliyet azaltimi', '7/24 izleme']
    },
    {
        title: 'Musteri Kayip Tahmini',
        category: 'Is Analitigi',
        description: 'Telekom sektorunde musteri kayiplarini onceden tahmin eden derin ogrenme modeli. Proaktif mudahale imkani sagliyor.',
        results: ['%30 kayip azaltimi', '2M+ musteri', 'Anlik skorlama']
    },
    {
        title: 'Tibbi Goruntu Analizi',
        category: 'Saglik Yapay Zekasi',
        description: 'Tibbi goruntuleme teshislerinde doktorlara yardimci olan bilgisayarli goru sistemi. Erken teshis oranlarini arttiriyor.',
        results: ['%98 dogruluk', 'FDA onay sureci', '100K+ tarama']
    },
    {
        title: 'Talep Tahmin Motoru',
        category: 'Tedarik Zinciri',
        description: 'Perakende sektorunde satis ve talep tahminleri yapan ML sistemi. Stok optimizasyonu ve tedarik planlamasini iyilestiriyor.',
        results: ['%25 stok optimizasyonu', '500+ magaza', 'Haftalik tahminler']
    },
    {
        title: 'Dolandiricilik Tespit Sistemi',
        category: 'Finans Guvenlik',
        description: 'Bankacilik islemlerinde anlik dolandiricilik tespiti yapan anomali tespit sistemi. Milyonlarca islemi saniyeler icinde tartiyor.',
        results: ['%99.5 tespit orani', 'Anlik karar', '10M+ islem/gun']
    },
    {
        title: 'Dogal Dil Chatbot',
        category: 'Musteri Hizmetleri',
        description: 'E-ticaret platformu icin gelistirilen yapay zeka destekli musteri hizmetleri chatbotu. Turkce ve Ingilizce destek sunuyor.',
        results: ['%70 otomasyon', '5 dil destegi', '24/7 aktif']
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
                        <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Portfolyo
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Basarili ML Projelerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Farkli sektorlerde gerceklestirdigimiz makine ogrenmesi projelerinden ornekler.
                            Veriye dayali cozumlerle isletmeleri donusturuyoruz.
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
                            <div className="h-48 bg-gradient-to-br from-violet-400 to-purple-500 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl font-bold text-white/20">{index + 1}</span>
                                </div>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-sm text-violet-600 font-medium">{project.category}</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.results.map((result, i) => (
                                        <span key={i} className="text-xs bg-violet-50 text-violet-700 px-2 py-1 rounded-full">
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
                    <Button href="/tr/iletisim" variant="primary" size="lg" className="!bg-violet-500 hover:!bg-violet-600 !border-violet-500">
                        Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
