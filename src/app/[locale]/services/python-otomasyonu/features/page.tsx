'use client';

import { motion } from 'framer-motion';
import {
    CpuChipIcon,
    ClockIcon,
    DocumentTextIcon,
    CloudIcon,
    ChartBarIcon,
    CogIcon,
    ShieldCheckIcon,
    BoltIcon,
    CommandLineIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const features = [
    {
        icon: CpuChipIcon,
        title: 'Web Kazima ve Veri Cikarma',
        description: 'Web sitelerinden otomatik veri toplama, veri cikarma ve yapilandirma. BeautifulSoup ve Selenium ile guvenilir web scraping cozumleri.'
    },
    {
        icon: ClockIcon,
        title: 'Excel Otomasyonu',
        description: 'Excel dosyalarinin otomatik olusturulmasi, guncellenmesi ve raporlanmasi. Pandas ve OpenPyXL ile kapsamli Excel islemleri.'
    },
    {
        icon: DocumentTextIcon,
        title: 'E-posta Otomasyonu',
        description: 'Toplu e-posta gonderimi, e-posta izleme ve otomatik yanitlama sistemleri. SMTP ve IMAP protokolleri ile entegrasyon.'
    },
    {
        icon: CloudIcon,
        title: 'Dosya Yonetimi Otomasyonu',
        description: 'Dosya organizasyonu, yedekleme, senkronizasyon ve arsivleme islemlerinin otomatiklestirilmesi.'
    },
    {
        icon: ChartBarIcon,
        title: 'Veritabani Islemleri',
        description: 'Veritabani baglantilari, veri aktarimi, yedekleme ve raporlama islemlerinin otomatiklestirilmesi. SQL ve NoSQL destegi.'
    },
    {
        icon: CogIcon,
        title: 'API Entegrasyonu',
        description: 'Ucuncu parti API\'ler ile entegrasyon, veri senkronizasyonu ve otomatik veri transferi cozumleri.'
    },
    {
        icon: ShieldCheckIcon,
        title: 'Test Otomasyonu',
        description: 'Yazilim test sureclerinin otomatiklestirilmesi. Selenium, Pytest ve Robot Framework ile kapsamli test otomasyonu.'
    },
    {
        icon: BoltIcon,
        title: 'Is Sureci Otomasyonu',
        description: 'Tekrarlayan is sureclerinin otomatiklestirilmesi, is akisi yonetimi ve verimlilik artirma cozumleri.'
    },
    {
        icon: CommandLineIcon,
        title: 'Sistem Yonetimi Otomasyonu',
        description: 'Sunucu yonetimi, log analizi, sistem izleme ve bakim islemlerinin otomatiklestirilmesi.'
    },
    {
        icon: ArrowPathIcon,
        title: 'Zamanlanmis Gorevler',
        description: 'Belirli zaman araliginda calisacak otomatik gorevler, cron job\'lar ve planlı is yurutme sistemleri.'
    }
];

export default function FeaturesPage() {
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
                            Ozellikler
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Python Otomasyon Ozellikleri
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Is sureclerinizi hizlandiran, verimliligi artiran ve maliyetleri dusurmek icin tasarlanmis kapsamli Python otomasyon cozumleri.
                        </p>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                        >
                            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
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
                        Otomasyon Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
