// src/components/MapSection.tsx
'use client'

import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'

export default function MapSection() {
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('contact.map')

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading map...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white" dir={dir}>
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('address')}
          </p>
        </div>

        {/* Map Container */}
        <div className="aspect-[16/6] rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.503671658509!2d34.797728675449754!3d39.7732507945532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4080770251e0e48d%3A0xe1a01c5b46b28aa7!2sYozgat%20Bozok%20University%20Technopark%2C%20Yozgat%2C%20Turkey!5e0!3m2!1sen!2str!4v1752268868653!5m2!1sen!2str"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            title={t('title')}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Map Actions */}
        <div className="mt-6 text-center">
          <a
            href="https://maps.google.com/maps?q=Yozgat+Bozok+University+Technopark+Turkey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-sm hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            aria-label={`${t('getDirections')} - Opens in new tab`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {t('getDirections')}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Location Details */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              Location Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <svg className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <span className="font-medium text-gray-900">Address:</span>
                  <br />
                  <span className="text-gray-600">{t('address')}</span>
                </div>
              </div>
              <div className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <svg className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-medium text-gray-900">Visiting Hours:</span>
                  <br />
                  <span className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
              <div className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <svg className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <span className="font-medium text-gray-900">Phone:</span>
                  <br />
                  <a href="tel:+905525677164" className="text-gray-600 hover:text-gray-900 transition-colors">
                    +90 552 567 71 64
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}