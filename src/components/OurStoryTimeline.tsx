// src/components/OurStoryTimeline.tsx
'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';

const milestones = [
  { year: '2021', label: 'Kuruluş & İlk MVP', desc: 'Ar-Ge desteğiyle Prototip Yayınlandı' },
  { year: '2022', label: 'Pilot Projeler',       desc: '3 farklı KOBİ ile saha testleri yapıldı' },
  { year: '2023', label: 'Teknopark Başvurusu',  desc: 'Bozok Teknopark’ta Ar-Ge Merkezine aday' },
  { year: '2024', label: 'Modüler Platform',     desc: 'MDL-01…MDL-07 modülleri yayında' },
  { year: '2025', label: 'Uluslararası Hedef',   desc: 'Orta Doğu ve Avrupa’ya açılım planı' },
];

export default function OurStoryTimeline() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Bizim Hikâyemiz"
          title="Kısa Bir Zaman Tüneli"
          className="text-center mb-16"
        />

        {/* Desktop: horizontal; Mobile: vertical */}
        <div className="relative overflow-hidden">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative md:flex-1 text-center md:text-left"
              >
                {/* Dot and connector */}
                <div className="relative z-10 flex items-center md:block">
                  <div className="h-4 w-4 rounded-full bg-[#FFB800] ring-4 ring-white mx-auto md:mx-0" />
                  {i < milestones.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-1/3 h-1 bg-[#FFB800]" />
                  )}
                </div>

                <div className="mt-4">
                  <span className="text-xl font-bold text-[#1E531B]">{m.year}</span>
                  <h4 className="mt-1 text-lg font-semibold text-gray-800">{m.label}</h4>
                  <p className="mt-2 text-gray-600">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
