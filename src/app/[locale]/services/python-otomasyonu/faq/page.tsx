'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';

const faqs = [
    {
        question: 'Python otomasyonu nedir ve isletmeme nasil fayda saglar?',
        answer: 'Python otomasyonu, tekrarlayan is sureclerini Python programlama dili kullanarak otomatiklestirme islemidir. Veri girisi, rapor olusturma, e-posta gonderimi gibi manuel gorevleri otomatiklestirerek zaman tasarrufu saglar, hata oranlarini azaltir ve calisanlarinizin daha degerli islere odaklanmasina olanak tanir.'
    },
    {
        question: 'Hangi is sureclerini otomatiklestirebilirsiniz?',
        answer: 'Web kazima ve veri toplama, Excel ve rapor otomasyonu, e-posta islemleri, dosya yonetimi, veritabani islemleri, API entegrasyonlari, test otomasyonu, sistem yonetimi ve daha bircok is surecini otomatiklestirebiliriz. Her isletmenin ihtiyaclarina ozel cozumler gelistiriyoruz.'
    },
    {
        question: 'Bir otomasyon projesi ne kadar surer?',
        answer: 'Proje suresi, otomasyon cozumunun karmasikligina bagli olarak degisir. Basit otomasyon gorevleri 1-2 hafta icerisinde tamamlanabilirken, kapsamli sistemler 1-3 ay surebilir. Proje baslangicinda detayli zaman cizelgesi sunuyoruz.'
    },
    {
        question: 'Mevcut sistemlerimle entegre olabilir mi?',
        answer: 'Evet, Python otomasyon cozumlerimiz mevcut sistemlerinizle entegre olacak sekilde tasarlanir. ERP, CRM, muhasebe yazilimlari, veritabanlari ve diger ucuncu parti uygulamalarla sorunsuz entegrasyon saglariz.'
    },
    {
        question: 'Otomasyon cozumlerinin maliyeti nedir?',
        answer: 'Maliyet, projenin kapsamina ve karmasikligina gore degisir. Basit otomasyon scriptleri uygun fiyatlarla sunulurken, kapsamli otomasyon sistemleri daha yuksek butce gerektirebilir. Ucretsiz degerledirme gorusmesi ile projenize ozel fiyat teklifi sunuyoruz.'
    },
    {
        question: 'Proje sonrasi destek ve bakim hizmetleri sunuyor musunuz?',
        answer: 'Evet, tum otomasyon projelerimizde proje sonrasi destek ve bakim hizmetleri sunuyoruz. Sistemlerin surekli calismasini saglamak, guncellemeler yapmak ve gerektiginde iyilestirmeler gerceklestirmek icin uzun vadeli destek paketlerimiz mevcuttur.'
    },
    {
        question: 'Verilerim guvenli olacak mi?',
        answer: 'Veri guvenligi en onemli onceliklerimizden biridir. Tum otomasyon cozumlerimizde endustri standartlarinda guvenlik uygulamalari kullaniyoruz. Verileriniz sifrelenir, erisim kontrolleri uygulanir ve duzenli guvenlik denetimleri yapilir.'
    },
    {
        question: 'Otomasyon cozumu calismazsa ne olur?',
        answer: 'Tum projelerimizde kapsamli test sureclerinden gecirilmis, guvenilir cozumler sunuyoruz. Beklenmedik sorunlarda hizli mudahale garantisi veriyoruz. Ayrica sistem izleme ve otomatik uyari mekanizmalari ile sorunlari erkenden tespit ediyoruz.'
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
                        <span className="text-orange-600 font-medium tracking-wider uppercase text-sm mb-4 block">
                            SSS
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sikca Sorulan Sorular
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Python otomasyon hizmetlerimiz hakkinda en cok sorulan sorularin yanitlari.
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
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-orange-50 transition-colors"
                            >
                                <span className="font-medium text-gray-900 text-lg pr-4">{faq.question}</span>
                                {openIndex === index ? (
                                    <MinusIcon className="w-5 h-5 text-orange-600 flex-shrink-0" />
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Hala Sorulariniz mi Var?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Aradiginiz cevabi bulamadiniz mi? Otomasyon uzmanlarimiz size yardimci olmak icin hazir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg" className="!bg-orange-500 hover:!bg-orange-600 !border-orange-500">
                            Ekibimizle Iletisime Gecin
                        </Button>
                        <Button href="/services/python-otomasyonu" variant="secondary" size="lg">
                            Hizmetlere Geri Don
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
