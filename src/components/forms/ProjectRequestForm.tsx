'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/Button';
import ReCaptcha, { useReCaptcha } from '@/components/ReCaptcha';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';
import FileUpload from './FileUpload';
import BudgetCalculator, { BudgetEstimate } from './BudgetCalculator';
import { trackContactFormConversion, trackQuoteConversion } from '@/lib/analytics';

// Storage key for form progress
const FORM_STORAGE_KEY = 'paksoft_project_request_draft';

// Localized client-side validation messages (site locales: en/tr/de/ur/ar)
const VALIDATION_MESSAGES: Record<string, { nameMin: string; emailInvalid: string; websiteInvalid: string; serviceRequired: string; descriptionMin: string }> = {
  en: {
    nameMin: 'Name must be at least 2 characters',
    emailInvalid: 'Please enter a valid email address',
    websiteInvalid: 'Please enter a valid URL (e.g. https://example.com)',
    serviceRequired: 'Please select a service',
    descriptionMin: 'Please provide at least 50 characters',
  },
  tr: {
    nameMin: 'İsim en az 2 karakter olmalıdır',
    emailInvalid: 'Lütfen geçerli bir e-posta adresi girin',
    websiteInvalid: 'Lütfen geçerli bir URL girin (örn. https://ornek.com)',
    serviceRequired: 'Lütfen bir hizmet seçin',
    descriptionMin: 'Lütfen en az 50 karakter girin',
  },
  de: {
    nameMin: 'Der Name muss mindestens 2 Zeichen lang sein',
    emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    websiteInvalid: 'Bitte geben Sie eine gültige URL ein (z. B. https://beispiel.de)',
    serviceRequired: 'Bitte wählen Sie eine Dienstleistung aus',
    descriptionMin: 'Bitte geben Sie mindestens 50 Zeichen ein',
  },
  ur: {
    nameMin: 'نام کم از کم 2 حروف کا ہونا چاہیے',
    emailInvalid: 'براہ کرم درست ای میل ایڈریس درج کریں',
    websiteInvalid: 'براہ کرم درست URL درج کریں (مثلاً https://example.com)',
    serviceRequired: 'براہ کرم ایک سروس منتخب کریں',
    descriptionMin: 'براہ کرم کم از کم 50 حروف درج کریں',
  },
  ar: {
    nameMin: 'يجب أن يتكون الاسم من حرفين على الأقل',
    emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
    websiteInvalid: 'يرجى إدخال رابط صحيح (مثل https://example.com)',
    serviceRequired: 'يرجى اختيار خدمة',
    descriptionMin: 'يرجى إدخال 50 حرفًا على الأقل',
  },
};

// Form validation schema (messages localized per site locale)
function makeProjectRequestSchema(locale: string) {
  const m = VALIDATION_MESSAGES[locale] ?? VALIDATION_MESSAGES.en;
  return z.object({
    // Step 1: Contact Info
    name: z.string().min(2, m.nameMin),
    email: z.string().email(m.emailInvalid),
    phone: z.string().optional(),
    company: z.string().optional(),
    website: z.string().url(m.websiteInvalid).optional().or(z.literal('')),

    // Step 2: Project Type
    serviceType: z.string().min(1, m.serviceRequired),
    projectTitle: z.string().optional(),

    // Step 3: Project Details
    description: z.string().min(50, m.descriptionMin),
    goals: z.string().optional(),
    targetAudience: z.string().optional(),

    // Step 4: Technical Requirements
    techPreferences: z.string().optional(),
    integrations: z.string().optional(),
    performanceReqs: z.string().optional(),

    // Step 5: Budget & Timeline
    budgetRange: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE', 'CUSTOM']),
    timeline: z.enum(['URGENT', 'STANDARD', 'FLEXIBLE', 'LONG_TERM']),
    urgencyLevel: z.enum(['LOW', 'NORMAL', 'HIGH', 'CRITICAL']).default('NORMAL'),
    preferredStartDate: z.string().optional(),
    additionalNotes: z.string().optional(),
  });
}

type FormData = z.infer<ReturnType<typeof makeProjectRequestSchema>>;

interface ProjectRequestFormProps {
  prefilledService?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

const TOTAL_STEPS = 5;

// Service-type labels localized for all 5 site locales (en/tr/de/ur/ar)
const SERVICE_LABELS: { value: string; labels: Record<string, string> }[] = [
  { value: 'web-development', labels: { en: 'Web Development', tr: 'Web Geliştirme', de: 'Webentwicklung', ur: 'ویب ڈویلپمنٹ', ar: 'تطوير الويب' } },
  { value: 'mobile-development', labels: { en: 'Mobile App Development', tr: 'Mobil Uygulama Geliştirme', de: 'Mobile-App-Entwicklung', ur: 'موبائل ایپ ڈویلپمنٹ', ar: 'تطوير تطبيقات الجوال' } },
  { value: 'ai-solutions', labels: { en: 'AI Solutions', tr: 'Yapay Zeka Çözümleri', de: 'KI-Lösungen', ur: 'AI حل', ar: 'حلول الذكاء الاصطناعي' } },
  { value: 'machine-learning', labels: { en: 'Machine Learning', tr: 'Makine Öğrenmesi', de: 'Maschinelles Lernen', ur: 'مشین لرننگ', ar: 'تعلم الآلة' } },
  { value: 'data-analytics', labels: { en: 'Data Analytics', tr: 'Veri Analitiği', de: 'Datenanalyse', ur: 'ڈیٹا اینالیٹکس', ar: 'تحليلات البيانات' } },
  { value: 'python-automation', labels: { en: 'Python Automation', tr: 'Python Otomasyonu', de: 'Python-Automatisierung', ur: 'پائتھن آٹومیشن', ar: 'أتمتة بايثون' } },
  { value: 'digital-marketing', labels: { en: 'Digital Marketing', tr: 'Dijital Pazarlama', de: 'Digitales Marketing', ur: 'ڈیجیٹل مارکیٹنگ', ar: 'التسويق الرقمي' } },
  { value: 'ui-ux-design', labels: { en: 'UI/UX Design', tr: 'UI/UX Tasarımı', de: 'UI/UX-Design', ur: 'UI/UX ڈیزائن', ar: 'تصميم UI/UX' } },
  { value: 'api-development', labels: { en: 'API Development', tr: 'API Geliştirme', de: 'API-Entwicklung', ur: 'API ڈویلپمنٹ', ar: 'تطوير API' } },
  { value: 'e-commerce', labels: { en: 'E-Commerce Solutions', tr: 'E-Ticaret Çözümleri', de: 'E-Commerce-Lösungen', ur: 'ای کامرس حل', ar: 'حلول التجارة الإلكترونية' } },
  { value: 'devops-cloud', labels: { en: 'DevOps & Cloud', tr: 'DevOps ve Bulut', de: 'DevOps & Cloud', ur: 'DevOps اور کلاؤڈ', ar: 'DevOps والسحابة' } },
  { value: 'cybersecurity', labels: { en: 'Cybersecurity', tr: 'Siber Güvenlik', de: 'Cybersicherheit', ur: 'سائبر سیکیورٹی', ar: 'الأمن السيبراني' } },
  { value: 'conversational-ai', labels: { en: 'Conversational AI', tr: 'Konuşma Yapay Zekası', de: 'Konversations-KI', ur: 'کنورسیشنل AI', ar: 'الذكاء الاصطناعي الحواري' } },
  // New AI Services
  { value: 'prompt-engineering', labels: { en: 'Prompt Engineering', tr: 'Prompt Mühendisliği', de: 'Prompt-Engineering', ur: 'پرامپٹ انجینئرنگ', ar: 'هندسة الأوامر' } },
  { value: 'ai-agents', labels: { en: 'AI Agents Development', tr: 'Yapay Zeka Ajanları Geliştirme', de: 'KI-Agenten-Entwicklung', ur: 'AI ایجنٹس ڈویلپمنٹ', ar: 'تطوير وكلاء الذكاء الاصطناعي' } },
  { value: 'rag-solutions', labels: { en: 'RAG Solutions', tr: 'RAG Çözümleri', de: 'RAG-Lösungen', ur: 'RAG حل', ar: 'حلول RAG' } },
  { value: 'mlops-deployment', labels: { en: 'MLOps & Deployment', tr: 'MLOps ve Dağıtım', de: 'MLOps & Deployment', ur: 'MLOps اور ڈیپلائمنٹ', ar: 'MLOps والنشر' } },
  { value: 'computer-vision', labels: { en: 'Computer Vision', tr: 'Bilgisayarlı Görü', de: 'Computer Vision', ur: 'کمپیوٹر ویژن', ar: 'الرؤية الحاسوبية' } },
  { value: 'llm-finetuning', labels: { en: 'LLM Fine-tuning', tr: 'LLM İnce Ayarı', de: 'LLM-Feinabstimmung', ur: 'LLM فائن ٹیوننگ', ar: 'الضبط الدقيق لنماذج LLM' } },
  { value: 'other', labels: { en: 'Other', tr: 'Diğer', de: 'Sonstiges', ur: 'دیگر', ar: 'أخرى' } },
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  status: 'uploading' | 'complete' | 'error';
  progress: number;
  error?: string;
}

export default function ProjectRequestForm({
  prefilledService,
  onSuccess,
  onClose,
}: ProjectRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [budgetEstimate, setBudgetEstimate] = useState<BudgetEstimate | null>(null);
  const [hasDraft, setHasDraft] = useState(false);

  const { dir, isLoading, locale } = useTranslations();
  const t = useSectionTranslations('forms.projectRequest');
  const { executeReCaptcha } = useReCaptcha();

  // Localized service options + validation schema for the current locale
  const services = useMemo(
    () =>
      SERVICE_LABELS.map(({ value, labels }) => ({
        value,
        label: labels[locale] ?? labels.en,
      })),
    [locale]
  );
  const projectRequestSchema = useMemo(() => makeProjectRequestSchema(locale), [locale]);

  // Load saved draft from localStorage
  const loadDraft = useCallback(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        // Check if draft is less than 7 days old
        if (Date.now() - draft.timestamp < 7 * 24 * 60 * 60 * 1000) {
          return draft.data;
        }
        // Remove expired draft
        localStorage.removeItem(FORM_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
    return null;
  }, []);

  // Check for existing draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setHasDraft(true);
    }
  }, [loadDraft]);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(projectRequestSchema),
    defaultValues: {
      serviceType: prefilledService || '',
      budgetRange: 'MEDIUM',
      timeline: 'STANDARD',
      urgencyLevel: 'NORMAL',
    },
    mode: 'onChange',
  });

  // Watch form values for auto-save and budget calculator
  const formValues = watch();
  const serviceType = watch('serviceType');
  const timeline = watch('timeline');
  const urgencyLevel = watch('urgencyLevel');

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't save if form is pristine or submitted
    if (!formValues.name && !formValues.email && !formValues.serviceType) return;

    const saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: formValues,
          step: currentStep,
        }));
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }, 1000); // Debounce saves

    return () => clearTimeout(saveTimeout);
  }, [formValues, currentStep]);

  // Restore draft
  const restoreDraft = useCallback(() => {
    const draft = loadDraft();
    if (draft) {
      reset(draft);
      setHasDraft(false);
    }
  }, [loadDraft, reset]);

  // Clear draft
  const clearDraft = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FORM_STORAGE_KEY);
    }
    setHasDraft(false);
  }, []);

  const stepFields: (keyof FormData)[][] = [
    ['name', 'email', 'phone', 'company', 'website'],
    ['serviceType', 'projectTitle'],
    ['description', 'goals', 'targetAudience'],
    ['techPreferences', 'integrations', 'performanceReqs'],
    ['budgetRange', 'timeline', 'urgencyLevel', 'preferredStartDate', 'additionalNotes'],
  ];

  const validateCurrentStep = async () => {
    const fields = stepFields[currentStep - 1];
    const result = await trigger(fields);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Include uploaded files and budget estimate in submission
      // Optional bot check — resolves to '' when reCAPTCHA isn't configured
      // or failed to load, so it never blocks the submission.
      const captchaToken = await executeReCaptcha('project_request');

      const submitData = {
        ...data,
        ...(captchaToken ? { captchaToken } : {}),
        attachments: uploadedFiles.filter(f => f.status === 'complete').map(f => ({
          name: f.name,
          url: f.url,
          type: f.type,
          size: f.size,
        })),
        budgetEstimate: budgetEstimate ? {
          min: budgetEstimate.minBudget,
          max: budgetEstimate.maxBudget,
          estimatedDays: budgetEstimate.estimatedDays,
        } : undefined,
      };

      const response = await fetch('/api/project-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit request');
      }

      // Clear draft on successful submission
      clearDraft();

      // Fire conversions: high-intent project request = lead + quote request.
      trackContactFormConversion('project_request');
      trackQuoteConversion(
        (data as { projectType?: string }).projectType || 'project_request',
        budgetEstimate?.maxBudget,
      );

      setSubmitSuccess(true);
      onSuccess?.();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('successTitle')}</h3>
        <p className="text-gray-600 mb-8">{t('successMessage')}</p>
        <Button variant="primary" onClick={onClose}>
          {t('close')}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto" dir={dir}>
      <ReCaptcha />
      {/* Draft Restoration Banner */}
      {hasDraft && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-blue-800">
              {t('draftFound') || 'You have an unsaved draft. Would you like to continue?'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={clearDraft}
              className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
            >
              {t('discard') || 'Discard'}
            </button>
            <button
              type="button"
              onClick={restoreDraft}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t('restore') || 'Restore'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                  ${
                    step < currentStep
                      ? 'bg-gray-900 text-white'
                      : step === currentStep
                      ? 'bg-gray-900 text-white ring-4 ring-gray-200'
                      : 'bg-gray-100 text-gray-400'
                  }`}
              >
                {step < currentStep ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {step < 5 && (
                <div
                  className={`h-0.5 w-12 sm:w-16 lg:w-24 mx-2 transition-colors
                    ${step < currentStep ? 'bg-gray-900' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {t('step')} {currentStep} {t('of')} {TOTAL_STEPS}
          </p>
          <p className="text-lg font-medium text-gray-900">{t(`steps.step${currentStep}`)}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <Step1ContactInfo register={register} errors={errors} dir={dir} t={t} />
            )}
            {currentStep === 2 && (
              <Step2ProjectType
                register={register}
                errors={errors}
                dir={dir}
                t={t}
                services={services}
              />
            )}
            {currentStep === 3 && (
              <Step3ProjectDetails register={register} errors={errors} dir={dir} t={t} />
            )}
            {currentStep === 4 && (
              <Step4TechRequirements
                register={register}
                errors={errors}
                dir={dir}
                t={t}
                uploadedFiles={uploadedFiles}
                onFilesChange={setUploadedFiles}
              />
            )}
            {currentStep === 5 && (
              <Step5BudgetTimeline
                register={register}
                errors={errors}
                dir={dir}
                t={t}
                serviceType={serviceType}
                timeline={timeline}
                urgencyLevel={urgencyLevel}
                onEstimateChange={setBudgetEstimate}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Error Message */}
        {submitError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {submitError}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="secondary"
            onClick={currentStep === 1 ? onClose : prevStep}
          >
            {currentStep === 1 ? t('cancel') : t('previous')}
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button type="button" variant="primary" onClick={nextStep}>
              {t('next')}
            </Button>
          ) : (
            <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

// Step Components
interface StepProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

function Step1ContactInfo({ register, errors, dir, t }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label={t('fields.name')}
          error={errors.name?.message}
          required
        >
          <input
            {...register('name')}
            type="text"
            autoComplete="name"
            className="form-input"
            placeholder={t('placeholders.name')}
            dir={dir}
          />
        </FormField>

        <FormField
          label={t('fields.email')}
          error={errors.email?.message}
          required
        >
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            className="form-input"
            placeholder={t('placeholders.email')}
            dir="ltr"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label={t('fields.phone')} error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className="form-input"
            placeholder={t('placeholders.phone')}
            dir="ltr"
          />
        </FormField>

        <FormField label={t('fields.company')} error={errors.company?.message}>
          <input
            {...register('company')}
            type="text"
            autoComplete="organization"
            className="form-input"
            placeholder={t('placeholders.company')}
            dir={dir}
          />
        </FormField>
      </div>

      <FormField label={t('fields.website')} error={errors.website?.message}>
        <input
          {...register('website')}
          type="url"
          autoComplete="url"
          className="form-input"
          placeholder="https://example.com"
          dir="ltr"
        />
      </FormField>
    </div>
  );
}

function Step2ProjectType({
  register,
  errors,
  dir,
  t,
  services,
}: StepProps & { services: { value: string; label: string }[] }) {
  return (
    <div className="space-y-6">
      <FormField
        label={t('fields.serviceType')}
        error={errors.serviceType?.message}
        required
      >
        <select {...register('serviceType')} className="form-input" dir={dir}>
          <option value="">{t('placeholders.selectService')}</option>
          {services.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label={t('fields.projectTitle')} error={errors.projectTitle?.message}>
        <input
          {...register('projectTitle')}
          type="text"
          className="form-input"
          placeholder={t('placeholders.projectTitle')}
          dir={dir}
        />
      </FormField>
    </div>
  );
}

function Step3ProjectDetails({ register, errors, dir, t }: StepProps) {
  return (
    <div className="space-y-6">
      <FormField
        label={t('fields.description')}
        error={errors.description?.message}
        required
      >
        <textarea
          {...register('description')}
          rows={4}
          className="form-input resize-none"
          placeholder={t('placeholders.description')}
          dir={dir}
        />
      </FormField>

      <FormField label={t('fields.goals')} error={errors.goals?.message}>
        <textarea
          {...register('goals')}
          rows={3}
          className="form-input resize-none"
          placeholder={t('placeholders.goals')}
          dir={dir}
        />
      </FormField>

      <FormField label={t('fields.targetAudience')} error={errors.targetAudience?.message}>
        <input
          {...register('targetAudience')}
          type="text"
          className="form-input"
          placeholder={t('placeholders.targetAudience')}
          dir={dir}
        />
      </FormField>
    </div>
  );
}

interface Step4Props extends StepProps {
  uploadedFiles: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

function Step4TechRequirements({ register, errors, dir, t, uploadedFiles, onFilesChange }: Step4Props) {
  return (
    <div className="space-y-6">
      <FormField label={t('fields.techPreferences')} error={errors.techPreferences?.message}>
        <textarea
          {...register('techPreferences')}
          rows={3}
          className="form-input resize-none"
          placeholder={t('placeholders.techPreferences')}
          dir={dir}
        />
      </FormField>

      <FormField label={t('fields.integrations')} error={errors.integrations?.message}>
        <textarea
          {...register('integrations')}
          rows={3}
          className="form-input resize-none"
          placeholder={t('placeholders.integrations')}
          dir={dir}
        />
      </FormField>

      <FormField label={t('fields.performanceReqs')} error={errors.performanceReqs?.message}>
        <textarea
          {...register('performanceReqs')}
          rows={3}
          className="form-input resize-none"
          placeholder={t('placeholders.performanceReqs')}
          dir={dir}
        />
      </FormField>

      {/* File Upload Section */}
      <div className="pt-4 border-t border-gray-200">
        <FileUpload
          onFilesChange={onFilesChange}
          maxFiles={5}
          maxSizeMB={10}
          label={t('fields.attachments') || 'Project Attachments (Optional)'}
          hint={t('hints.attachments') || 'Upload RFP documents, mockups, wireframes, or reference materials'}
        />
      </div>
    </div>
  );
}

interface Step5Props extends StepProps {
  serviceType: string;
  timeline: string;
  urgencyLevel: string;
  onEstimateChange: (estimate: BudgetEstimate) => void;
}

function Step5BudgetTimeline({
  register,
  errors,
  dir,
  t,
  serviceType,
  timeline,
  urgencyLevel,
  onEstimateChange,
}: Step5Props) {
  return (
    <div className="space-y-6">
      {/* Budget Calculator */}
      <BudgetCalculator
        serviceType={serviceType}
        timeline={timeline}
        urgencyLevel={urgencyLevel}
        onEstimateChange={onEstimateChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label={t('fields.budgetRange')}
          error={errors.budgetRange?.message}
          required
        >
          <select {...register('budgetRange')} className="form-input" dir={dir}>
            <option value="SMALL">{t('budgetOptions.small')}</option>
            <option value="MEDIUM">{t('budgetOptions.medium')}</option>
            <option value="LARGE">{t('budgetOptions.large')}</option>
            <option value="ENTERPRISE">{t('budgetOptions.enterprise')}</option>
            <option value="CUSTOM">{t('budgetOptions.custom')}</option>
          </select>
        </FormField>

        <FormField
          label={t('fields.timeline')}
          error={errors.timeline?.message}
          required
        >
          <select {...register('timeline')} className="form-input" dir={dir}>
            <option value="URGENT">{t('timelineOptions.urgent')}</option>
            <option value="STANDARD">{t('timelineOptions.standard')}</option>
            <option value="FLEXIBLE">{t('timelineOptions.flexible')}</option>
            <option value="LONG_TERM">{t('timelineOptions.longTerm')}</option>
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label={t('fields.urgencyLevel')} error={errors.urgencyLevel?.message}>
          <select {...register('urgencyLevel')} className="form-input" dir={dir}>
            <option value="LOW">{t('urgencyOptions.low')}</option>
            <option value="NORMAL">{t('urgencyOptions.normal')}</option>
            <option value="HIGH">{t('urgencyOptions.high')}</option>
            <option value="CRITICAL">{t('urgencyOptions.critical')}</option>
          </select>
        </FormField>

        <FormField
          label={t('fields.preferredStartDate')}
          error={errors.preferredStartDate?.message}
        >
          <input
            {...register('preferredStartDate')}
            type="date"
            className="form-input"
            dir="ltr"
          />
        </FormField>
      </div>

      <FormField label={t('fields.additionalNotes')} error={errors.additionalNotes?.message}>
        <textarea
          {...register('additionalNotes')}
          rows={4}
          className="form-input resize-none"
          placeholder={t('placeholders.additionalNotes')}
          dir={dir}
        />
      </FormField>
    </div>
  );
}

// Form Field Component
interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
