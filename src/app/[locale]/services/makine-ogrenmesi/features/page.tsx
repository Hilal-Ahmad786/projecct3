'use client';

import { motion } from 'framer-motion';
import {
    CpuChipIcon,
    CircleStackIcon,
    ChartBarIcon,
    SparklesIcon,
    EyeIcon,
    ChatBubbleBottomCenterTextIcon,
    ArrowTrendingUpIcon,
    ShieldCheckIcon,
    CogIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const features = [
    {
        icon: CpuChipIcon,
        title: 'Derin Ogrenme Modelleri',
        description: 'Sinir aglari ve derin ogrenme algoritmalari ile karmasik veri kaliplarini cozumleyin. TensorFlow ve PyTorch kullanarak ozel modeller gelistiriyoruz.'
    },
    {
        icon: ChatBubbleBottomCenterTextIcon,
        title: 'Dogal Dil Isleme (NLP)',
        description: 'Metin analizi, duygu analizi, chatbot ve dil modelleri ile isletmenizin iletisim sureclerini otomatiklestirin.'
    },
    {
        icon: EyeIcon,
        title: 'Bilgisayarli Goru',
        description: 'Goruntu tanima, nesne tespiti ve video analizi cozumleri. Uretim hatlari, guvenlik ve saglik sektorunde uygulamalar.'
    },
    {
        icon: ArrowTrendingUpIcon,
        title: 'Tahminsel Analitik',
        description: 'Gecmis verilerden gelecegi tahmin edin. Satis tahmini, talep planlama ve risk degerlendirmesi icin ML modelleri.'
    },
    {
        icon: SparklesIcon,
        title: 'Oneri Sistemleri',
        description: 'Kullanici davranislarini analiz ederek kisisellestirilmis oneriler sunun. E-ticaret ve icerik platformlari icin ideal.'
    },
    {
        icon: CircleStackIcon,
        title: 'Veri Madenciligi',
        description: 'Buyuk veri kumelerinden degerli icerikler cikarin. Musteri segmentasyonu ve pazar analizi icin gelismis teknikler.'
    },
    {
        icon: ChartBarIcon,
        title: 'Anomali Tespiti',
        description: 'Normalden sapmalari otomatik olarak tespit edin. Dolandiricilik onleme, kalite kontrol ve sistem izleme icin idealdir.'
    },
    {
        icon: ShieldCheckIcon,
        title: 'Model Guvenilirliği',
        description: 'Aciklanabilir yapay zeka (XAI) ile model kararlarini anlasilir kilin. Uyumluluk ve denetim gereksinimleri icin.'
    },
    {
        icon: CogIcon,
        title: 'MLOps ve Otomasyon',
        description: 'Model yasam dongusunu otomatiklestirin. Surekli egitim, izleme ve dagitim pipeline\'lari olusturuyoruz.'
    },
    {
        icon: RocketLaunchIcon,
        title: 'Gercek Zamanli ML',
        description: 'Milisaniyeler icinde tahmin yapan sistemler. Canli veri akislari uzerinde anlik karar verme yetenegi.'
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
                        <span className="text-violet-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Ozellikler
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Makine Ogrenmesi Cozumlerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Isletmenizi donusturecek yapay zeka ve makine ogrenmesi cozumleri.
                            Verilerinizden deger yaratin, sureclerinizi otomatiklestirin.
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
                            <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7 text-violet-600" />
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
                    <Button href="/tr/iletisim" variant="primary" size="lg" className="!bg-violet-500 hover:!bg-violet-600 !border-violet-500">
                        ML Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
