// src/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'
import { trackContactFormConversion } from '@/lib/analytics'

// WhatsApp business number
const WHATSAPP_NUMBER = '905525677164'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [sendToWhatsApp, setSendToWhatsApp] = useState(true)

  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('contact.form')
  const notificationT = useSectionTranslations('notifications.success')
  const errorT = useSectionTranslations('notifications.error')
  const commonT = useSectionTranslations('common')

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{commonT('loading')}</p>
        </div>
      </section>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  // Get subject label from value
  const getSubjectLabel = (value: string) => {
    const labels: Record<string, string> = {
      general: t('subjects.generalInquiry'),
      web: t('subjects.webDevelopment'),
      mobile: t('subjects.mobileApp'),
      ai: t('subjects.aiSolutions'),
      marketing: t('subjects.digitalMarketing'),
      support: t('subjects.technicalSupport'),
      partnership: t('subjects.partnership'),
      other: t('subjects.other')
    }
    return labels[value] || value
  }

  // Send to WhatsApp
  const sendViaWhatsApp = () => {
    const subjectLabel = getSubjectLabel(form.subject)
    const message = `
*${t('newInquiry')}*

*${t('fullName')}:* ${form.name}
*${t('emailAddress')}:* ${form.email}
${form.phone ? `*${t('phone')}:* ${form.phone}\n` : ''}*${t('subject')}:* ${subjectLabel}

*${t('message')}:*
${form.message}
    `.trim()

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const result = await response.json()

      if (!result.success) {
        // Handle validation errors
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors.map((err: { field: string; message: string }) =>
            `${err.field}: ${err.message}`
          ).join('\n')
          alert(errorMessages)
        } else {
          alert(result.message || errorT('general'))
        }
        return
      }

      // Fire lead conversion (GA4 generate_lead + Google Ads + FB/LinkedIn)
      trackContactFormConversion('contact_page')

      // Send to WhatsApp if option is checked
      if (sendToWhatsApp) {
        sendViaWhatsApp()
      }

      alert(notificationT('messageSent'))
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      alert(errorT('general'))
    } finally {
      setSending(false)
    }
  }

  // Direct WhatsApp button handler
  const handleWhatsAppOnly = () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert(t('fillAllFields'))
      return
    }
    sendViaWhatsApp()
  }

  // Subject options
  const subjectOptions = [
    { value: '', label: t('subjectPlaceholder') },
    { value: 'general', label: t('subjects.generalInquiry') },
    { value: 'web', label: t('subjects.webDevelopment') },
    { value: 'mobile', label: t('subjects.mobileApp') },
    { value: 'ai', label: t('subjects.aiSolutions') },
    { value: 'marketing', label: t('subjects.digitalMarketing') },
    { value: 'support', label: t('subjects.technicalSupport') },
    { value: 'partnership', label: t('subjects.partnership') },
    { value: 'other', label: t('subjects.other') }
  ]

  return (
    <section id="contact-form" className="py-16 bg-gray-50" dir={dir}>
      <div className="container mx-auto px-6 lg:px-8 max-w-xl">
        <SectionHeader
          eyebrow=""
          title={t('title')}
          className="text-center mb-8"
        />

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="grid gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('fullName')} *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={t('fullNamePlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                value={form.name}
                onChange={handleChange}
                dir={dir}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('emailAddress')} *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                value={form.email}
                onChange={handleChange}
                dir="ltr" // Email is always LTR
              />
            </div>

            {/* Phone (Optional) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('phone')}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder={t('phonePlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
                value={form.phone}
                onChange={handleChange}
                dir="ltr" // Phone is always LTR
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('subject')} *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors bg-white"
                value={form.subject}
                onChange={handleChange}
                dir={dir}
              >
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t('message')} *
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder={t('messagePlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none transition-colors"
                value={form.message}
                onChange={handleChange}
                dir={dir}
              />
            </div>

            {/* WhatsApp checkbox */}
            <div className="flex items-center gap-3">
              <input
                id="sendToWhatsApp"
                type="checkbox"
                checked={sendToWhatsApp}
                onChange={(e) => setSendToWhatsApp(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="sendToWhatsApp" className="text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('alsoSendWhatsApp')}
              </label>
            </div>
          </div>

          {/* Required fields note */}
          <p className="text-sm text-gray-500 mt-4">
            * {t('requiredFields')}
          </p>

          {/* Submit buttons */}
          <div className={`mt-6 flex flex-col sm:flex-row gap-3 ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={sending}
              loading={sending}
              className="flex-1"
            >
              {sending ? t('sending') : t('sendMessage')}
            </Button>

            <button
              type="button"
              onClick={handleWhatsAppOnly}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium
                         bg-green-500 text-white border border-green-500 rounded-sm
                         hover:bg-green-600 hover:border-green-600 transition-all duration-250
                         focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('sendViaWhatsApp')}
            </button>
          </div>
        </form>

        {/* Next steps info */}
        <div className="mt-8 bg-white rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('whatHappensNext')}
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• {t('nextStep1')}</p>
            <p>• {t('nextStep2')}</p>
            <p>• {t('nextStep3')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
