// src/components/ContactSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/SectionHeader';
import Button from '@/components/Button';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

export default function ContactSection() {
  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('contact');
  const tNotifications = useSectionTranslations('notifications.success');

  const [form, setForm] = useState({ name: '', email: '', message: '', subject: '' });
  const [sending, setSending] = useState(false);

  // Show loading state if translations are not ready
  if (isLoading) {
    return (
      <section className="section bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contact section...</p>
        </div>
      </section>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      // TODO: Replace with your actual API endpoint
      // await fetch('/api/contact', { 
      //   method: 'POST', 
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form) 
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(tNotifications('messageSent'));
      setForm({ name: '', email: '', message: '', subject: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: t('hero.contactMethods.email.label'),
      value: t('hero.contactMethods.email.value'),
      href: 'mailto:info@paktechnology.com',
      description: t('info.visitOffice')
    },
    {
      icon: PhoneIcon,
      title: t('hero.contactMethods.phone.label'),
      value: t('hero.contactMethods.phone.value'),
      href: 'tel:+905525677164',
      description: t('info.schedule.mondayFridayTime')
    },
    {
      icon: MapPinIcon,
      title: t('info.ourLocation'),
      value: t('map.address'),
      href: 'https://maps.google.com/maps?q=Yozgat,Turkey',
      description: t('info.getDirections')
    },
    {
      icon: ClockIcon,
      title: t('hero.contactMethods.responseTime.label'),
      value: t('hero.contactMethods.responseTime.value'),
      href: null,
      description: t('info.schedule.mondayFridayTime')
    }
  ];

  const subjectOptions = [
    { value: '', label: t('form.subjectPlaceholder') },
    { value: 'general', label: t('form.subjects.generalInquiry') },
    { value: 'web', label: t('form.subjects.webDevelopment') },
    { value: 'mobile', label: t('form.subjects.mobileApp') },
    { value: 'ai', label: t('form.subjects.aiSolutions') },
    { value: 'marketing', label: t('form.subjects.digitalMarketing') },
    { value: 'support', label: t('form.subjects.technicalSupport') },
    { value: 'partnership', label: t('form.subjects.partnership') },
    { value: 'other', label: t('form.subjects.other') }
  ];

  return (
    <section className="section bg-gray-50 relative overflow-hidden" dir={dir}>
      {/* Subtle geometric background */}
      <div className={`absolute bottom-16 w-20 h-20 opacity-[0.03] ${dir === 'rtl' ? 'left-16' : 'right-16'}`}>
        <div 
          className="w-full h-full border border-gray-900"
          style={{ clipPath: 'circle(45% at 30% 70%)' }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow={t('hero.eyebrow')}
          title={t('hero.title')}
          subtitle={t('hero.description')}
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-title text-gray-900 mb-6">{t('info.howToReach')}</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {contactMethods.map(({ icon: Icon, title, value, href, description }) => (
                  <div key={title} className="card">
                    <div className={`flex items-center gap-3 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-sm flex items-center justify-center">
                        <Icon className="h-5 w-5 text-gray-700" />
                      </div>
                      <h4 className="font-medium text-gray-900">{title}</h4>
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block group"
                      >
                        <p className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors break-words">
                          {value}
                        </p>
                        <p className="text-caption text-gray-500">{description}</p>
                      </a>
                    ) : (
                      <>
                        <p className="font-medium text-gray-900 break-words">{value}</p>
                        <p className="text-caption text-gray-500">{description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="card">
              <h4 className="font-medium text-gray-900 mb-4">{t('info.officeHours')}</h4>
              <div className="space-y-2 text-sm">
                <div className={`flex justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-600">{t('info.schedule.mondayFriday')}</span>
                  <span className="text-gray-900">{t('info.schedule.mondayFridayTime')}</span>
                </div>
                <div className={`flex justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-600">{t('info.schedule.saturday')}</span>
                  <span className="text-gray-900">{t('info.schedule.saturdayTime')}</span>
                </div>
                <div className={`flex justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-gray-600">{t('info.schedule.sunday')}</span>
                  <span className="text-gray-900">{t('info.schedule.sundayTime')}</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="card p-0 overflow-hidden">
              <div className="aspect-video bg-gray-100 border border-gray-200 rounded-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.503671658509!2d34.797728675449754!3d39.7732507945532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4080770251e0e48d%3A0xe1a01c5b46b28aa7!2sYozgat%2C%20Turkey!5e0!3m2!1sen!2str!4v1752268868653!5m2!1sen!2str"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title={t('info.ourLocation')}
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card">
              <h3 className="text-title text-gray-900 mb-6">{t('form.title')}</h3>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.fullName')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder={t('form.fullNamePlaceholder')}
                    dir={dir}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.emailAddress')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder={t('form.emailPlaceholder')}
                    dir="ltr" // Email is always LTR
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.subject')} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
                    placeholder={t('form.messagePlaceholder')}
                    dir={dir}
                  />
                </div>

                {/* Submit Button */}
                <div className={`flex items-center justify-between pt-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <p className="text-xs text-gray-500">
                    * {t('form.requiredFields')}
                  </p>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={sending}
                    loading={sending}
                    rightIcon={
                      !sending ? (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d={dir === 'rtl' ? "M7 8l4 4 4-4m0 6H9l10-6" : "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"} />
                        </svg>
                      ) : undefined
                    }
                  >
                    {sending ? t('form.sending') : t('form.sendMessage')}
                  </Button>
                </div>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-6 bg-white border border-gray-200 rounded-sm">
              <h4 className="font-medium text-gray-900 mb-3">{t('nextSteps.title')}</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-gray-600">1</span>
                  </div>
                  <span>{t('nextSteps.step1')}</span>
                </div>
                <div className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-gray-600">2</span>
                  </div>
                  <span>{t('nextSteps.step2')}</span>
                </div>
                <div className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-gray-600">3</span>
                  </div>
                  <span>{t('nextSteps.step3')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}