'use client';

import { motion } from 'framer-motion';
import {
    CodeBracketIcon,
    ServerIcon,
    ShieldCheckIcon,
    BoltIcon,
    CloudIcon,
    DocumentTextIcon,
    ArrowPathIcon,
    ChartBarIcon,
    LockClosedIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const features = [
    {
        icon: CodeBracketIcon,
        title: 'RESTful API Tasarimi',
        description: 'Modern REST mimarisi ile olceklenebilir, bakimi kolay ve yuksek performansli API\'ler gelistiriyoruz. HTTP standartlarina uygun endpoint\'ler tasarliyoruz.'
    },
    {
        icon: ServerIcon,
        title: 'GraphQL Servisleri',
        description: 'Esnek sorgulama yetenekleri sunan GraphQL API\'leri ile istemcilerin ihtiyac duydugu verileri tek bir istekle almasini sagliyoruz.'
    },
    {
        icon: ShieldCheckIcon,
        title: 'API Guvenligi',
        description: 'OAuth 2.0, JWT kimlik dogrulama ve gelismis yetkilendirme mekanizmalari ile API\'lerinizi guvenli hale getiriyoruz.'
    },
    {
        icon: BoltIcon,
        title: 'Yuksek Performans',
        description: 'Onbellekleme, veritabani optimizasyonu ve asenkron islem teknikleri ile milisaniye seviyesinde yanit sureleri sagliyoruz.'
    },
    {
        icon: CloudIcon,
        title: 'Webhook Entegrasyonu',
        description: 'Gercek zamanli bildirimler ve olay tabanli mimariler icin guvenilir webhook sistemleri gelistiriyoruz.'
    },
    {
        icon: DocumentTextIcon,
        title: 'API Dokumantasyonu',
        description: 'Swagger/OpenAPI ile interaktif ve kapsamli API dokumantasyonu olusturuyoruz. Gelisitricilerin hizli entegrasyon yapmasini sagliyoruz.'
    },
    {
        icon: ArrowPathIcon,
        title: 'Versiyon Yonetimi',
        description: 'Geriye donuk uyumlulugu koruyarak API versiyonlarini yonetiyoruz. Mevcut entegrasyonlari bozmadan yeni ozellikler ekliyoruz.'
    },
    {
        icon: ChartBarIcon,
        title: 'Rate Limiting & Kotalar',
        description: 'API kullanimini kontrol altinda tutan rate limiting ve kota sistemleri ile kaynaklarinizi koruyoruz.'
    },
    {
        icon: LockClosedIcon,
        title: 'Veri Sifreleme',
        description: 'SSL/TLS sertifikalari ve uctan uca sifreleme ile hassas verilerinizi koruma altina aliyoruz.'
    },
    {
        icon: GlobeAltIcon,
        title: 'Mikroservis Mimarisi',
        description: 'Bagimsiz olarak deploy edilebilen, olceklenebilen ve yonetilebilen mikroservis tabanli API\'ler gelistiriyoruz.'
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
                        <span className="text-teal-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Ozellikler
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            API Gelistirme Ozellikleri
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Modern API gelistirme hizmetlerimiz ile isletmenizi dijital dunyada one cikariyoruz.
                            Guvenli, olceklenebilir ve yuksek performansli API cozumleri sunuyoruz.
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
                            <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7 text-teal-600" />
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-teal-500 hover:!bg-teal-600 !border-teal-500">
                        API Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
