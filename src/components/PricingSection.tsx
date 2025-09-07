// src/components/PricingTable.tsx
'use client';

import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';

export default function PricingTable() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeCategory, setActiveCategory] = useState<'subscription' | 'project'>('subscription');

  const subscriptionTiers = [
    {
      name: 'SEO & Dijital Pazarlama',
      priceMonthly: 10000,
      priceAnnual: 90000, // 10% indirimli
      features: [
        'Teknik SEO optimizasyonu (site içi & dışı)',
        'Google & Meta Ads yönetimi',
        'Aylık performans raporları',
        '4 saat/ay reklam bütçe danışmanlığı',
      ],
    },
    {
      name: 'Bakım & Destek',
      priceMonthly: 5000,
      priceAnnual: 45000,
      features: [
        'Güvenlik güncellemeleri & yedekleme',
        'Sistem izleme & hızlı hata düzeltme',
        'Haftalık içerik & görsel güncellemeler',
        '7/24 SLA destek hattı',
      ],
    },
    {
      name: 'Otomasyon Bot Aboneliği',
      priceMonthly: 8000,
      priceAnnual: 72000,
      features: [
        '2 özelleştirilmiş Python botu',
        'Veri çekme, gönderme & raporlama akışları',
        'Aylık bot bakımı & hata giderme',
        'API izleme & güncelleme desteği',
      ],
    },
    {
      name: 'UI/UX Tasarım Aboneliği',
      priceMonthly: 7000,
      priceAnnual: 63000,
      features: [
        'Yeni sayfa & bölüm tasarımları',
        'Kullanıcı testi & geri bildirim döngüsü',
        'A/B test destek & analiz raporu',
        'Figma kaynak dosya teslimi',
      ],
    },
    {
      name: 'DevOps & CI/CD Aboneliği',
      priceMonthly: 6000,
      priceAnnual: 54000,
      features: [
        'Pipeline izleme & hata uyarıları',
        'Otomatik test & deploy bakımı',
        'Container / Kubernetes desteği',
        'Aylık performans optimizasyonu',
      ],
    },
    {
      name: 'AI Model Hosting & Güncelleme',
      priceMonthly: 12000,
      priceAnnual: 108000,
      features: [
        'ML/NLP model hosting',
        'Aylık yeniden eğitim & versiyonlama',
        'API endpoint yönetimi',
        '7/24 uptime SLA',
      ],
    },
  ];

  const projectTiers = [
    {
      name: 'Kurumsal Web Sitesi',
      price: '20.000–40.000₺',
      features: [
        'Next.js/React tabanlı modern tasarım',
        'SEO & hız optimizasyonu',
        '4–6 haftalık Agile sprint',
        '1 ay ücretsiz bakım & eğitim',
      ],
    },
    {
      name: 'E-Ticaret Mağaza Projesi',
      price: '25.000–50.000₺',
      features: [
        'Shopify/WooCommerce entegrasyonu',
        'Çok dilli & ödeme altyapısı',
        'Ödeme & kargo entegrasyonları',
        '2 hafta ücretsiz destek & eğitim',
      ],
    },
    {
      name: 'MERN Uygulama Projesi',
      price: '30.000–60.000₺',
      features: [
        'MongoDB, Express, React, Node.js kurulumu',
        'Kullanıcı yönetimi & yetkilendirme',
        'RESTful API dokümantasyonu',
        '1 ay ücretsiz bakım & revizyon',
      ],
    },
    {
      name: 'Mobil Uygulama Projesi',
      price: '40.000–80.000₺',
      features: [
        'React Native iOS/Android derlemesi',
        'UI/UX prototip & kullanıcı testi',
        'App Store & Play Store yayınlama',
        '2 hafta ücretsiz hata düzeltme',
      ],
    },
    {
      name: 'Veri Analizi & BI Dashboards',
      price: '18.000–40.000₺',
      features: [
        'Power BI / Tableau panelleri',
        'Özelleştirilmiş KPI takibi',
        'Excel/CSV entegrasyon akışları',
        '1 ay ücretsiz veri bakımı',
      ],
    },
    {
      name: 'DevOps & CI/CD Kurulum',
      price: '10.000–25.000₺',
      features: [
        'Jenkins / GitHub Actions kurulumu',
        'Container & Kubernetes konfigürasyonu',
        'Otomatik test & deploy pipeline',
        '1 hafta ücretsiz izleme desteği',
      ],
    },
    {
      name: 'Özel Kurumsal Çözüm',
      price: 'Teklif Bazlı',
      features: [
        'Tüm modüller & entegrasyonlar',
        'Özel SLA & premium destek',
        'Kurulum, eğitim & dokümantasyon',
        'Uzun dönem strateji danışmanlığı',
      ],
    },
  ];

  const periodLabel = billingCycle === 'monthly' ? '/ay' : '/yıl';

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#1E531B]/10 via-white/50 to-[#FFB800]/10">
      {/* Background decor */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-[#1E531B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-[#FFB800]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-[120%] h-[40%] bg-gradient-to-br from-[#1E531B]/20 to-[#FFB800]/20 -skew-y-6 -translate-x-1/2 pointer-events-none" />

      <div className="relative container mx-auto px-6 z-10">
        <SectionHeader
          eyebrow="Fiyatlandırma"
          title="Aylık & Proje Bazlı Seçeneklerimiz"
          className="text-center mb-16"
        />

        {/* Category Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveCategory('subscription')}
            className={`px-4 py-2 font-medium rounded-full transition ${
              activeCategory === 'subscription'
                ? 'bg-[#1E531B] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Abonelik Paketleri
          </button>
          <button
            onClick={() => setActiveCategory('project')}
            className={`px-4 py-2 font-medium rounded-full transition ${
              activeCategory === 'project'
                ? 'bg-[#1E531B] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Proje Bazlı Hizmetler
          </button>
        </div>

        {activeCategory === 'subscription' ? (
          <>
            {/* Billing Toggle */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-l-full border ${
                  billingCycle === 'monthly'
                    ? 'bg-[#1E531B] text-white border-[#1E531B]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                Aylık
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-r-full border ${
                  billingCycle === 'annual'
                    ? 'bg-[#1E531B] text-white border-[#1E531B]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                Yıllık (10% İndirim)
              </button>
            </div>

            {/* Subscription Grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {subscriptionTiers.map((tier) => {
                const price =
                  billingCycle === 'monthly'
                    ? tier.priceMonthly
                    : tier.priceAnnual;
                return (
                  <div
                    key={tier.name}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex flex-col h-full"
                  >
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">
                      {tier.name}
                    </h4>
                    <p className="text-3xl sm:text-4xl font-extrabold mb-4">
                      {price.toLocaleString('tr-TR')}₺
                      <span className="text-lg font-normal ml-1">
                        {periodLabel}
                      </span>
                    </p>
                    <ul className="mb-6 space-y-2 text-sm sm:text-base text-gray-600 flex-grow">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start">
                          <span className="text-[#FFB800] mr-2">✔</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="/contact"
                      variant="primary"
                      className="mt-auto w-full py-3 text-base font-medium"
                    >
                      Teklif Al
                    </Button>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-center text-gray-500 text-sm italic">
              Tüm abonelik paketlerimiz 14 günlük iade garantilidir.
            </p>
          </>
        ) : (
          <>
            {/* Project Grid */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {projectTiers.map((tier) => (
                <div
                  key={tier.name}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition p-6 flex flex-col h-full"
                >
                  <h4 className="text-lg sm:text-xl font-semibold mb-2">
                    {tier.name}
                  </h4>
                  <p className="text-3xl sm:text-4xl font-extrabold mb-4">
                    {tier.price}
                  </p>
                  <ul className="mb-6 space-y-2 text-sm sm:text-base text-gray-600 flex-grow">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start">
                        <span className="text-[#1E531B] mr-2">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant="primary"
                    className="mt-auto w-full py-3 text-base font-medium"
                  >
                    Detaylı Teklif
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-gray-500 text-sm italic">
              Tüm tek seferlik proje hizmetlerimiz %100 memnuniyet garantilidir.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
