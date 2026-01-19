'use client';

import { motion } from 'framer-motion';
import {
    MagnifyingGlassIcon,
    CursorArrowRaysIcon,
    ChatBubbleLeftRightIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    ChartBarIcon,
    DevicePhoneMobileIcon,
    VideoCameraIcon,
    UserGroupIcon,
    PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const features = [
    {
        icon: MagnifyingGlassIcon,
        title: 'Arama Motoru Optimizasyonu (SEO)',
        description: 'Web sitenizin arama motorlarinda ust siralarda yer almasini saglayan kapsamli SEO stratejileri. Anahtar kelime arastirmasi, teknik SEO ve icerik optimizasyonu ile organik trafiginizi artirin.'
    },
    {
        icon: CursorArrowRaysIcon,
        title: 'Tikla-Ode Reklamcilik (PPC)',
        description: 'Google Ads ve diger platformlarda hedefli reklam kampanyalari. Yatirim getirinizi maksimize eden, donusum odakli PPC stratejileri ile aninda sonuclar alin.'
    },
    {
        icon: ChatBubbleLeftRightIcon,
        title: 'Sosyal Medya Pazarlamasi',
        description: 'Facebook, Instagram, LinkedIn ve diger sosyal medya platformlarinda marka bilinirliginizi artirin. Etkilesim odakli icerik ve topluluk yonetimi hizmetleri.'
    },
    {
        icon: DocumentTextIcon,
        title: 'Icerik Pazarlamasi',
        description: 'Hedef kitlenizi cezbeden ve donusume yonlendiren kaliteli icerik uretimi. Blog yazilari, infografikler, e-kitaplar ve daha fazlasi.'
    },
    {
        icon: EnvelopeIcon,
        title: 'E-posta Pazarlamasi',
        description: 'Kisisellestirilmis e-posta kampanyalari ile musteri sadakati olusturun. Otomatik e-posta akislari, segmentasyon ve A/B testleri ile yuksek acilma oranlari.'
    },
    {
        icon: ChartBarIcon,
        title: 'Analitik ve Raporlama',
        description: 'Detayli performans analizi ve ozellestirilmis raporlar. Veri odakli kararlaar almanizi saglayan kapsamli analitik paneller.'
    },
    {
        icon: DevicePhoneMobileIcon,
        title: 'Mobil Pazarlama',
        description: 'Mobil cihazlara ozel pazarlama stratejileri. Uygulama pazarlamasi, SMS kampanyalari ve mobil reklamcilik cozumleri.'
    },
    {
        icon: VideoCameraIcon,
        title: 'Video Pazarlama',
        description: 'YouTube ve sosyal medya icin profesyonel video icerik uretimi. Video reklamlar, tanitim videolari ve canli yayin stratejileri.'
    },
    {
        icon: UserGroupIcon,
        title: 'Influencer Pazarlama',
        description: 'Markaniz icin dogru influencer\'lari bulun ve isbirligi yapin. Otantik icerik ve genis kitlelere ulasim saglayan kampanyalar.'
    },
    {
        icon: PresentationChartLineIcon,
        title: 'Donusum Orani Optimizasyonu',
        description: 'Web sitenizin ziyaretcilerini musterilere donusturun. A/B testleri, kullanici deneyimi analizi ve donusum hunisi optimizasyonu.'
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
                        <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Ozellikler
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Dijital Pazarlama Hizmetlerimiz
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Isletmenizi buyutmek icin kapsamli dijital pazarlama cozumleri sunuyoruz.
                            Her biri uzman ekibimiz tarafindan ozenle yonetilen hizmetlerimizi kesfedin.
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
                            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7 text-pink-600" />
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-pink-500 hover:!bg-pink-600 !border-pink-500">
                        Pazarlama Kampanyanizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
