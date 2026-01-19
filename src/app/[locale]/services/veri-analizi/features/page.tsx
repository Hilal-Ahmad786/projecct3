'use client';

import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    PresentationChartLineIcon,
    TableCellsIcon,
    CircleStackIcon,
    CpuChipIcon,
    DocumentChartBarIcon,
    ArrowTrendingUpIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    BoltIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const features = [
    {
        icon: ChartBarIcon,
        title: 'Is Zekasi Panolari',
        description: 'Isletme verilerinizi anlamli gorsellere donusturen interaktif is zekasi panolari. Gercek zamanli karar alma icin kapsamli gorsellestirmeler.'
    },
    {
        icon: PresentationChartLineIcon,
        title: 'Veri Gorsellestirme',
        description: 'Karmasik veri setlerini kolayca anlasilan grafikler, tablolar ve interaktif gorsellere donusturun. Hikaye anlatimi icin guzel gorseller.'
    },
    {
        icon: TableCellsIcon,
        title: 'Tahminsel Analitik',
        description: 'Gelecek trendleri ve sonuclari tahmin etmek icin makine ogrenimi modellerinden yararlanin. Veriye dayali ongoru ile one gecin.'
    },
    {
        icon: CircleStackIcon,
        title: 'Gercek Zamanli Raporlama',
        description: 'Isletmenizin performansini canli olarak izleyen aninda raporlama sistemleri. Degisen kosullara hizla tepki verin.'
    },
    {
        icon: CpuChipIcon,
        title: 'Veri Madenciligi',
        description: 'Buyuk veri setlerinde gizli kaliplari, korelasyonlari ve icgoruler kesfetmek icin gelismis teknikler. Degerli bilgileri ortaya cikarin.'
    },
    {
        icon: DocumentChartBarIcon,
        title: 'Ozel Raporlar',
        description: 'Is ihtiyaclariniza ozel tasarlanmis raporlar. KPI\'larinizi ve metrikleri takip etmek icin kisisellestirilebilir sablonlar.'
    },
    {
        icon: ArrowTrendingUpIcon,
        title: 'Performans Analitigi',
        description: 'Isletme performansinizi olcun ve optimize edin. Temel metrikleri ve KPI\'lari takip ederek buyumeyi tesvik edin.'
    },
    {
        icon: GlobeAltIcon,
        title: 'Buyuk Veri Isleme',
        description: 'Buyuk hacimli verileri verimli bir sekilde isleyin ve analiz edin. Olceklenebilir cozumlerle petabaytlarca veriyi yonetin.'
    },
    {
        icon: ShieldCheckIcon,
        title: 'Veri Guvenligi',
        description: 'Hassas verilerinizi korumak icin kurumsal duzeyde guvenlik onlemleri. KVKK ve GDPR uyumlulugu saglanir.'
    },
    {
        icon: BoltIcon,
        title: 'Otomatik Icgorular',
        description: 'Yapay zeka destekli otomatik icgoru uretimi. Anomalileri, trendleri ve firsatlari otomatik olarak tespit edin.'
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
                        <span className="text-cyan-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Ozellikler
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Veri Analitigi Ozelliklerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Isletmenizi veriye dayali kararlara yonlendiren kapsamli veri analitigi cozumleri. Ham verileri eyleme gecirilebilir icgorulere donusturun.
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
                            <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7 text-cyan-600" />
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-cyan-500 hover:!bg-cyan-600 !border-cyan-500">
                        Analitik Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
