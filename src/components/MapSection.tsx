// src/components/MapSection.tsx
'use client'

export default function MapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="aspect-[16/6] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18…"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            title="PakTechnology Lokasyon"
          />
        </div>
      </div>
    </section>
  )
}
