// src/components/ServicesSection.tsx
'use client';
import { useState } from 'react';
import SectionHeader from '@/components/SectionHeader';
import ServiceIcon from '@/components/ServiceIcon';
import Button from '@/components/Button';

const services = [ /* MDL-01…MDL-07 tanımları */ ];

export default function ServicessSection() {
  const [openId, setOpenId] = useState<string|null>(null);
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Modüllerimiz" title="Size Özel Parçalar" className="text-center mb-12" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(svc => (
            <div key={svc.id} className="relative group bg-white rounded-xl shadow hover:shadow-lg transition">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ServiceIcon id={svc.id} className="h-6 w-6 text-[#1E531B]" />
                  <h3 className="text-lg font-semibold">{svc.title}</h3>
                </div>
                <button
                  onClick={() => setOpenId(openId===svc.id? null: svc.id)}
                  className="text-gray-400 hover:text-[#1E531B] transition"
                  aria-label="Detay Göster/Gizle"
                >
                  {openId===svc.id ? '−' : '+'}
                </button>
              </div>

              {/* Accordion */}
              {openId===svc.id && (
                <div className="px-6 pb-6 text-gray-600 space-y-2">
                  <p>{svc.description}</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Özel şablon & tasarım</li>
                    <li>Mobil & SEO optimizasyonu</li>
                    <li>Hız & güvenlik testleri</li>
                  </ul>
                  <div className="mt-4">
                    <Button href={svc.href} variant="secondary" size="sm">
                      Daha Fazla Oku
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
