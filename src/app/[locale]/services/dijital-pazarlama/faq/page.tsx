'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const faqs = [
    {
        question: 'Dijital pazarlama hizmetleriniz neleri kapsiyor?',
        answer: 'Dijital pazarlama hizmetlerimiz SEO (Arama Motoru Optimizasyonu), PPC reklamcilik (Google Ads, Meta Ads), sosyal medya pazarlamasi, icerik pazarlamasi, e-posta pazarlamasi, influencer pazarlama ve donusum orani optimizasyonunu kapsamaktadir. Her musterimiz icin ozellestirilmis stratejiler gelistiriyoruz.'
    },
    {
        question: 'Dijital pazarlama sonuclarini ne kadar surede gorebilirim?',
        answer: 'Sonuclar secilen stratejiye gore degisir. PPC kampanyalari aninda trafik getirebilirken, SEO genellikle 3-6 ay icerisinde belirgin sonuclar gosterir. Sosyal medya pazarlamasi ise 1-3 ay icerisinde etkilesim artisi saglar. Duzensiz raporlarla ilerlemenizi takip edersiniz.'
    },
    {
        question: 'Dijital pazarlama butcesi ne kadar olmalidir?',
        answer: 'Butce, hedeflerinize, sektorunuze ve rekabet ortamina gore degisir. Kucuk isletmeler icin aylik 5.000-15.000 TL araliginda etkili kampanyalar yurutebilirken, buyuk olcekli projeler icin 50.000 TL ve uzeri butceler gerekebilir. Ucretsiz danismanlik ile size uygun butceyi belirliyoruz.'
    },
    {
        question: 'Hangi sektorlere hizmet veriyorsunuz?',
        answer: 'E-ticaret, SaaS, saglik, egitim, finans, gayrimenkul, yiyecek-icecek, turizm ve daha bircok sektorde deneyimimiz bulunmaktadir. Her sektorun dinamiklerine uygun stratejiler gelistiriyor ve sektore ozel en iyi uygulamalari kullaniyoruz.'
    },
    {
        question: 'ROI (Yatirim Getirisi) nasil olculuyor?',
        answer: 'Google Analytics, reklam platformlarinin kendi analitik araclari ve CRM entegrasyonlari kullanarak detayli ROI olcumu yapiyoruz. Lead maliyeti, donusum orani, musteri yasam boyu degeri ve diger onemli metrikleri duzenli raporlarla paylasiyoruz.'
    },
    {
        question: 'Sozlesme suresi ne kadar?',
        answer: 'Genellikle minimum 3 aylik sozlesmeler oneriyoruz cunku dijital pazarlama sonuclari zaman alabilir. Ancak esnek sozlesme seceneklerimiz de mevcuttur. Aylik bazda veya proje bazinda calisma modellerimiz bulunmaktadir.'
    },
    {
        question: 'Raporlama ne siklikta yapiliyor?',
        answer: 'Aylik detayli performans raporlari sunuyoruz. Bunun yaninda, aktif kampanyalar icin haftalik ozet raporlar ve anlık erisebileceginiz canli dashboard panelleri sagliyoruz. Tum metrikleri seffaf bir sekilde paylasiyoruz.'
    },
    {
        question: 'Mevcut pazarlama ekibimizle birlikte calisabilir misiniz?',
        answer: 'Evet, mevcut ekibinizle uyum icerisinde calisabiliriz. Ekibinize egitim verebilir, belirli alanlarda destek saglayabilir veya tam kapsamli yonetim hizmeti sunabiliriz. Esnek isbirligi modelleri sunuyoruz.'
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
                        <span className="text-pink-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            SSS
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sikca Sorulan Sorular
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Dijital pazarlama hizmetlerimiz hakkinda en cok merak edilen sorularin cevaplari.
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-pink-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-pink-600 flex-shrink-0" />
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
                        Aradiginiz cevabi bulamadiniz mi? Dijital pazarlama uzmanlarimiz size yardimci olmak icin hazir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-pink-500 hover:!bg-pink-600 !border-pink-500">
                            Ekibimizle Iletisime Gecin
                        </Button>
                        <Button href="/services/dijital-pazarlama/pricing" variant="secondary" size="lg">
                            Fiyatlandirmayi Goruntule
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
