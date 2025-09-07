// src/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // TODO: post to your API
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
    setSending(false)
    alert('Mesajınız alındı, teşekkürler!')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact-form" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8 max-w-xl">
        <SectionHeader
          eyebrow="Bize Ulaşın"
          title="Projenizi Anlatın, Size Ulaşalım"
          className="text-center mb-8"
        />
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <div className="grid gap-6">
            <input
              name="name"
              type="text"
              required
              placeholder="Adınız"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFB800]"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="E-posta adresiniz"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFB800]"
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Projenizin kısa özeti"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFB800] resize-none"
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6 text-right">
            <Button type="submit" variant="primary" size="lg" disabled={sending}>
              {sending ? 'Gönderiliyor…' : 'Mesaj Gönder'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
