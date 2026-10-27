'use client';

import { useState } from 'react';
import { z } from 'zod';
import { SERVICE_LABELS } from '@/components/forms/ProjectRequestForm';
import ReCaptcha, { useReCaptcha } from '@/components/ReCaptcha';
import { useTranslations } from '@/hooks/useTranslations';

const copy: Record<string, Record<string, string>> = {
  name: { tr: 'Adınız', en: 'Your name', de: 'Ihr Name', ar: 'اسمك', ur: 'آپ کا نام' },
  email: { tr: 'E-posta adresiniz', en: 'Email address', de: 'E-Mail-Adresse', ar: 'بريدك الإلكتروني', ur: 'ای میل ایڈریس' },
  company: { tr: 'Şirket (isteğe bağlı)', en: 'Company (optional)', de: 'Unternehmen (optional)', ar: 'الشركة (اختياري)', ur: 'کمپنی (اختیاری)' },
  website: { tr: 'Mevcut web sitesi (isteğe bağlı)', en: 'Current website (optional)', de: 'Aktuelle Website (optional)', ar: 'الموقع الحالي (اختياري)', ur: 'موجودہ ویب سائٹ (اختیاری)' },
  service: { tr: 'İlgilendiğiniz hizmet', en: 'Service of interest', de: 'Gewünschter Service', ar: 'الخدمة المطلوبة', ur: 'مطلوبہ سروس' },
  description: { tr: 'Projenizi kısaca anlatın', en: 'Briefly describe your project', de: 'Beschreiben Sie Ihr Projekt kurz', ar: 'صف مشروعك بإيجاز', ur: 'اپنے پروجیکٹ کی مختصر وضاحت کریں' },
  submit: { tr: 'Kısa Talep Gönder', en: 'Send a short enquiry', de: 'Kurze Anfrage senden', ar: 'إرسال استفسار مختصر', ur: 'مختصر درخواست بھیجیں' },
  sending: { tr: 'Gönderiliyor…', en: 'Sending…', de: 'Wird gesendet…', ar: 'جارٍ الإرسال…', ur: 'بھیجا جا رہا ہے…' },
  success: { tr: 'Talebiniz alındı. Paylaştığınız bilgiler değerlendirilmek üzere iletildi.', en: 'Your enquiry has been received and submitted for review.', de: 'Ihre Anfrage wurde zur Prüfung übermittelt.', ar: 'تم استلام استفسارك وإرساله للمراجعة.', ur: 'آپ کی درخواست موصول ہو گئی ہے اور جائزے کے لیے بھیج دی گئی ہے۔' },
  error: { tr: 'Talebiniz şu anda gönderilemedi. Lütfen tekrar deneyin veya iletişim sayfasındaki alternatif kanalları kullanın.', en: 'Your enquiry could not be sent. Please try again or use another contact option.', de: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder nutzen Sie einen anderen Kontaktweg.', ar: 'تعذر إرسال استفسارك. يرجى المحاولة مرة أخرى أو استخدام وسيلة اتصال أخرى.', ur: 'آپ کی درخواست بھیجی نہیں جا سکی۔ دوبارہ کوشش کریں یا رابطے کا دوسرا طریقہ استعمال کریں۔' },
  required: { tr: 'Bu alan zorunludur.', en: 'This field is required.', de: 'Dieses Feld ist erforderlich.', ar: 'هذا الحقل مطلوب.', ur: 'یہ خانہ ضروری ہے۔' },
  descHint: { tr: 'İlk değerlendirme için birkaç cümle yeterlidir.', en: 'A few sentences are enough to get started.', de: 'Ein paar Sätze reichen für den Anfang.', ar: 'تكفي بضع جملات للبدء.', ur: 'ابتدائی جائزے کے لیے چند جملے کافی ہیں۔' },
};

export default function ShortProjectRequestForm({ prefilledService = '' }: { prefilledService?: string }) {
  const { locale, dir } = useTranslations();
  const { executeReCaptcha } = useReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const t = (key: string) => copy[key]?.[locale] ?? copy[key]?.en ?? key;
  const initialService = SERVICE_LABELS.some((service) => service.value === prefilledService) ? prefilledService : 'other';

  async function submit(formData: FormData) {
    setError('');
    setIsSubmitting(true);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const website = String(formData.get('website') || '').trim();
    if (name.length < 2 || !z.string().email().safeParse(email).success || description.length < 10 || (website && !z.string().url().safeParse(website).success)) {
      setError(t('required'));
      setIsSubmitting(false);
      return;
    }
    try {
      const captchaToken = await executeReCaptcha('project_request');
      const response = await fetch('/api/project-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionMode: 'short',
          name,
          email,
          company: String(formData.get('company') || '').trim() || undefined,
          website: website || undefined,
          serviceType: String(formData.get('serviceType') || initialService),
          description,
          ...(captchaToken ? { captchaToken } : {}),
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || 'Request failed');
      }
      setSubmitted(true);
    } catch {
      setError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) return <p role="status" className="rounded-lg border border-heritage-turquoise/30 bg-heritage-turquoise-light p-5 text-sm leading-6 text-gray-900">{t('success')}</p>;

  const inputClass = 'mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise';
  return <form onSubmit={(event) => { event.preventDefault(); void submit(new FormData(event.currentTarget)); }} className="space-y-4" dir={dir}>
    <ReCaptcha />
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm font-medium text-gray-800">{t('name')}<input name="name" autoComplete="name" required minLength={2} className={inputClass} /></label>
      <label className="block text-sm font-medium text-gray-800">{t('email')}<input name="email" type="email" autoComplete="email" required className={inputClass} /></label>
      <label className="block text-sm font-medium text-gray-800">{t('company')}<input name="company" autoComplete="organization" className={inputClass} /></label>
      <label className="block text-sm font-medium text-gray-800">{t('website')}<input name="website" type="url" inputMode="url" placeholder="https://" className={inputClass} /></label>
    </div>
    <label className="block text-sm font-medium text-gray-800">{t('service')}<select name="serviceType" defaultValue={initialService} className={inputClass}>{SERVICE_LABELS.map((service) => <option key={service.value} value={service.value}>{service.labels[locale] ?? service.labels.en}</option>)}</select></label>
    <label className="block text-sm font-medium text-gray-800">{t('description')}<textarea name="description" required minLength={10} rows={5} className={inputClass} /><span className="mt-1 block text-xs font-normal text-gray-500">{t('descHint')}</span></label>
    {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    <button type="submit" disabled={isSubmitting} className="inline-flex min-h-11 items-center justify-center rounded-sm bg-heritage-turquoise-deep px-5 py-3 text-sm font-semibold text-white hover:bg-heritage-turquoise focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70">{isSubmitting ? t('sending') : t('submit')}</button>
  </form>;
}
