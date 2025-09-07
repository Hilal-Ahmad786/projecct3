// src/components/ContactInfoSection.tsx
'use client'

import { EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/outline'

export default function ContactInfoSection() {
  const items = [
    {
      Icon: EnvelopeIcon,
      label: 'E-posta',
      value: 'info@paktechnology.com',
    },
    {
      Icon: PhoneIcon,
      label: 'Telefon',
      value: '+90 552 567 71 64',
    },
    {
      Icon: HomeIcon,
      label: 'Adres',
      value: 'Yozgat Bozok Üniversitesi, Bozok Teknopark, Yozgat / Türkiye',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map(({ Icon, label, value }) => (
          <div key={label} className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-[#1E531B]/10">
              <Icon className="h-8 w-8 text-[#1E531B]" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{label}</h4>
              <p className="text-gray-600">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
