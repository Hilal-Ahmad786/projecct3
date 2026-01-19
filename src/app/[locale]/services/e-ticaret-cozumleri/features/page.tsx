'use client';

import { motion } from 'framer-motion';
import {
    ShoppingCartIcon,
    CreditCardIcon,
    TruckIcon,
    ChartBarIcon,
    DevicePhoneMobileIcon,
    ShieldCheckIcon,
    CubeIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const features = [
    {
        icon: ShoppingCartIcon,
        title: 'Shopify Magaza Kurulumu',
        description: 'Profesyonel Shopify magaza kurulumu ile e-ticaret yolculugunuza hizli baslayin. Ozel tema tasarimi, urun yukleme ve SEO optimizasyonu dahil.'
    },
    {
        icon: CreditCardIcon,
        title: 'Odeme Sistemi Entegrasyonu',
        description: 'Guvenli odeme gecidi entegrasyonu ile musterilerinize kesintisiz odeme deneyimi sunun. Stripe, PayPal, iyzico ve yerel banka entegrasyonlari.'
    },
    {
        icon: TruckIcon,
        title: 'Kargo Entegrasyonu',
        description: 'Yurtici ve yurtdisi kargo firmalarini sisteminize entegre edin. Otomatik kargo takibi, fiyat hesaplama ve gonderi bildirimleri.'
    },
    {
        icon: ChartBarIcon,
        title: 'Satis Analitikleri',
        description: 'Detayli satis raporlari ve analitiklerle isletmenizi buyutun. Musteri davranislari, en cok satan urunler ve gelir takibi.'
    },
    {
        icon: DevicePhoneMobileIcon,
        title: 'Mobil Uyumlu Tasarim',
        description: 'Tum cihazlarda mukemmel gorunen responsive e-ticaret siteleri. Mobil oncelikli tasarim ile donusum oranlarinizi artirin.'
    },
    {
        icon: ShieldCheckIcon,
        title: 'Guvenlik ve SSL',
        description: 'En ust duzey guvenlik protokolleri ile musterilerinizin verilerini koruyun. SSL sertifikasi, PCI uyumlulugu ve guvenli odeme altyapisi.'
    },
    {
        icon: CubeIcon,
        title: 'Stok Yonetimi',
        description: 'Gelismis stok yonetimi sistemi ile envanterinizi kolayca yonetin. Otomatik stok uyarilari, varyant yonetimi ve depo entegrasyonu.'
    },
    {
        icon: UserGroupIcon,
        title: 'Musteri Yonetimi (CRM)',
        description: 'Musterilerinizi taniyin ve sadakat programlari olusturun. Segmentasyon, e-posta pazarlama ve kisisellestirilmis deneyimler.'
    },
    {
        icon: MagnifyingGlassIcon,
        title: 'SEO Optimizasyonu',
        description: 'Arama motorlarinda ust siralarda yer alin. Urun sayfasi SEO, site hizi optimizasyonu ve yapilandirilmis veri isareticileri.'
    },
    {
        icon: GlobeAltIcon,
        title: 'Coklu Dil ve Para Birimi',
        description: 'Global pazarlara acilim icin coklu dil ve para birimi destegi. Yerellestirilmis icerik, otomatik doviz kurulari ve uluslararasi kargo.'
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
                        <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            Ozellikler
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            E-Ticaret Cozumlerimizin Ozellikleri
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Modern e-ticaret cozumlerimiz ile online satis yapmak hic bu kadar kolay olmamisti. Isletmenizi buyutmek icin ihtiyaciniz olan tum ozellikler tek platformda.
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
                            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="w-7 h-7 text-emerald-600" />
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
                    <Button href="/contact" variant="primary" size="lg" className="!bg-emerald-500 hover:!bg-emerald-600 !border-emerald-500">
                        E-Ticaret Projenizi Baslatin
                    </Button>
                </motion.div>
            </div>
        </main>
    );
}
