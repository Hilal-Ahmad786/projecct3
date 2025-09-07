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

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '', subject: '' });
  const [sending, setSending] = useState(false);

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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSending(false);
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '', subject: '' });
  };

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: 'Email',
      value: 'info@paktechnology.com',
      href: 'mailto:info@paktechnology.com',
      description: 'Send us an email anytime'
    },
    {
      icon: PhoneIcon,
      title: 'Phone',
      value: '+90 552 567 71 64',
      href: 'tel:+905525677164',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: MapPinIcon,
      title: 'Location',
      value: 'Yozgat, Turkey',
      href: 'https://maps.google.com/maps?q=Yozgat,Turkey',
      description: 'Visit our office'
    },
    {
      icon: ClockIcon,
      title: 'Response Time',
      value: '< 24 hours',
      href: null,
      description: 'Average response time'
    }
  ];

  const subjects = [
    'General Inquiry',
    'Web Development',
    'Mobile App Development',
    'AI/ML Solutions',
    'Digital Marketing',
    'Technical Support',
    'Partnership',
    'Other'
  ];

  return (
    <section className="section bg-gray-50 relative overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute bottom-16 left-16 w-20 h-20 opacity-[0.03]">
        <div 
          className="w-full h-full border border-gray-900"
          style={{ clipPath: 'circle(45% at 30% 70%)' }}
        />
      </div>

      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Start a Conversation"
          subtitle="Ready to transform your digital presence? We'd love to hear about your project and explore how we can help you achieve your goals."
          className="mb-16"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-title text-gray-900 mb-6">How to Reach Us</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {contactMethods.map(({ icon: Icon, title, value, href, description }) => (
                  <div key={title} className="card">
                    <div className="flex items-center gap-3 mb-4">
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
                        <p className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                          {value}
                        </p>
                        <p className="text-caption text-gray-500">{description}</p>
                      </a>
                    ) : (
                      <>
                        <p className="font-medium text-gray-900">{value}</p>
                        <p className="text-caption text-gray-500">{description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="card">
              <h4 className="font-medium text-gray-900 mb-4">Office Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">Closed</span>
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
                  title="Our Location"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card">
              <h3 className="text-title text-gray-900 mb-6">Send us a Message</h3>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400 transition-colors bg-white"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-4">
                  <p className="text-xs text-gray-500">
                    * Required fields
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      ) : undefined
                    }
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </div>
            </form>

            {/* Additional Info */}
            <div className="mt-6 p-6 bg-white border border-gray-200 rounded-sm">
              <h4 className="font-medium text-gray-900 mb-3">What Happens Next?</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-gray-600">1</span>
                  </div>
                  <span>We'll review your message within 24 hours</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-gray-600">2</span>
                  </div>
                  <span>Our team will reach out to discuss your project</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-gray-600">3</span>
                  </div>
                  <span>We'll provide a detailed proposal and timeline</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}