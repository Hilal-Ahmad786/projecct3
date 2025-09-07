// src/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations'

export default function ContactForm() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    subject: '',
    message: '' 
  })
  const [sending, setSending] = useState(false)
  
  const { dir, isLoading } = useTranslations()
  const t = useSectionTranslations('contact.form')
  const notificationT = useSectionTranslations('notifications.success')

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </section>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    
    try {
      // TODO: Replace with your actual API endpoint
      // await fetch('/api/contact', { 
      //   method: 'POST', 
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form) 
      // })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert(notificationT('messageSent'))
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setSending(false)
    }
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
          </div>

          {/* Required fields note */}
          <p className="text-sm text-gray-500 mt-4">
            * {t('requiredFields')}
          </p>

          {/* Submit button */}
          <div className={`mt-6 ${dir === 'rtl' ? 'text-left' : 'text-right'}`}>
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              disabled={sending}
              loading={sending}
            >
              {sending ? t('sending') : t('sendMessage')}
            </Button>
          </div>
        </form>

        {/* Next steps info */}
        <div className="mt-8 bg-white rounded-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What Happens Next?
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• We'll review your message within 24 hours</p>
            <p>• Our team will reach out to discuss your project</p>
            <p>• We'll provide a detailed proposal and timeline</p>
          </div>
        </div>
      </div>
    </section>
  )
}