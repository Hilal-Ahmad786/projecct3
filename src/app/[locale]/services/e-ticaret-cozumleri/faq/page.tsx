'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const faqs = [
    {
        question: 'E-ticaret sitesi kurulumu ne kadar surer?',
        answer: 'Projenin kapsamina bagli olarak, basit bir Shopify magazasi 2-4 haftada, orta olcekli bir WooCommerce sitesi 4-8 haftada, ozel gelistirme gerektiren projeler ise 8-16 haftada tamamlanabilir. Detayli zaman cizelgesi icin ucretsiz danismanlik randevusu alabilirsiniz.'
    },
    {
        question: 'Hangi odeme sistemlerini entegre edebiliyorsunuz?',
        answer: 'Turkiye\'de yaygin kullanilan iyzico, PayTR, Paratika gibi yerel odeme sistemlerinin yani sira Stripe, PayPal gibi uluslararasi odeme gecitlerini de entegre ediyoruz. Ayrica banka pos entegrasyonlari ve taksit secenekleri de sunuyoruz.'
    },
    {
        question: 'Mevcut web sitemi e-ticaret sitesine donusturebilir misiniz?',
        answer: 'Evet, mevcut web sitenizi e-ticaret platformuna donusturebiliriz. Marka kimliginizi koruyarak, mevcut tasariminizi e-ticaret ozellikleriye zenginlestiriyoruz. Alternatif olarak tamamen yeni bir tasarim da olusturabiliriz.'
    },
    {
        question: 'Stok ve siparis yonetimi nasil yapiliyor?',
        answer: 'Kullandiginiz platforma gore gelismis stok yonetimi paneli sunuyoruz. Stok uyarilari, otomatik fiyat guncellemeleri, varyant yonetimi ve depo entegrasyonu gibi ozellikler dahildir. Ayrica ERP sistemlerinizle entegrasyon da saglayabiliriz.'
    },
    {
        question: 'Kargo firmalarini entegre edebiliyor musunuz?',
        answer: 'Evet, Aras Kargo, Yurtici Kargo, MNG Kargo, Surat Kargo gibi Turkiye\'nin onde gelen kargo firmalariyla entegrasyon sagliyoruz. Otomatik kargo etiketi olusturma, takip numarasi bildirimi ve gonderi durumu guncelleme ozellikleri mevcuttur.'
    },
    {
        question: 'E-ticaret sitesi maliyeti ne kadar?',
        answer: 'Fiyatlandirma projenin kapsamina, secilen platforma ve ozel gereksinimlere gore degisir. Basit Shopify magazalari 15.000 TL\'den baslarken, ozel gelistirme projeleri 100.000 TL ve uzeri olabilir. Detayli fiyat teklifi icin bizimle iletisime gecin.'
    },
    {
        question: 'Lansman sonrasi destek ve bakim sunuyor musunuz?',
        answer: 'Evet, aylik ve yillik bakim paketleri sunuyoruz. Bu paketler guvenlik guncellemeleri, performans optimizasyonu, icerik guncellemeleri ve teknik destek icermektedir. 7/24 acil destek hatti da mevcuttur.'
    },
    {
        question: 'SEO ve dijital pazarlama hizmeti de aliyor musunuz?',
        answer: 'Evet, e-ticaret SEO, Google Ads, sosyal medya reklamlari ve e-posta pazarlama hizmetleri sunuyoruz. E-ticaret sitenizin trafigini ve satislarini artirmak icin kapsamli dijital pazarlama stratejileri olusturuyoruz.'
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                            Sikca Sorulan Sorular
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            E-Ticaret Hakkinda Merak Edilenler
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            E-ticaret cozumlerimiz hakkinda en cok sorulan sorulari cevapladik. Daha fazla bilgi icin bizimle iletisime gecebilirsiniz.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-3xl mx-auto space-y-4 mb-16">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-emerald-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                ) : (
                                    <PlusIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center bg-white rounded-2xl p-12 max-w-3xl mx-auto border border-gray-200"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Hala Sorulariniz mi Var?</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Aradiginiz cevabi bulamadiniz mi? E-ticaret uzmanlarimiz size yardimci olmak icin hazir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-emerald-500 hover:!bg-emerald-600 !border-emerald-500">
                            Ekibimizle Iletisime Gecin
                        </Button>
                        <Button href="/services/e-ticaret-cozumleri/pricing" variant="secondary" size="lg">
                            Fiyatlandirmayi Gorun
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
