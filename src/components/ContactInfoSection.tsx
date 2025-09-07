// src/components/ContactInfoSection.tsx
'use client'

import { EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/outline'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'

export default function ContactInfoSection() {
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('contact.info')
  const tFooter = useSectionTranslations('footer.contactInfo')

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact info...</p>
        </div>
      </section>
    )
  }

  const items = [
    {
      Icon: EnvelopeIcon,
      label: tFooter('email.label'),
      value: tFooter('email.value'),
      href: `mailto:${tFooter('email.value')}`,
      ariaLabel: `Send email to ${tFooter('email.value')}`
    },
    {
      Icon: PhoneIcon,
      label: tFooter('phone.label'),
      value: tFooter('phone.value'),
      href: `tel:${tFooter('phone.value').replace(/\s/g, '')}`,
      ariaLabel: `Call ${tFooter('phone.value')}`
    },
    {
      Icon: HomeIcon,
      label: tFooter('location.label'),
      value: tFooter('location.value'),
      href: 'https://maps.google.com/maps?q=Yozgat+Bozok+University+Technopark+Turkey',
      ariaLabel: 'View location on Google Maps'
    },
  ]

  return (
    <section className="py-16 bg-white" dir={dir}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-4">
            {t('howToReach')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map(({ Icon, label, value, href, ariaLabel }) => (
            <div 
              key={label} 
              className={`flex items-start gap-4 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
            >
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex-shrink-0">
                <Icon className="h-6 w-6 text-gray-700" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-gray-900 mb-2">{label}</h4>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-600 hover:text-gray-900 transition-colors break-words"
                    aria-label={ariaLabel}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-gray-600 break-words">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Office Hours */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
              {t('officeHours')}
            </h3>
            <div className="space-y-3">
              <div className={`flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-600">{t('schedule.mondayFriday')}</span>
                <span className="font-medium text-gray-900">{t('schedule.mondayFridayTime')}</span>
              </div>
              <div className={`flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-600">{t('schedule.saturday')}</span>
                <span className="font-medium text-gray-900">{t('schedule.saturdayTime')}</span>
              </div>
              <div className={`flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <span className="text-gray-600">{t('schedule.sunday')}</span>
                <span className="font-medium text-gray-900">{t('schedule.sundayTime')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}