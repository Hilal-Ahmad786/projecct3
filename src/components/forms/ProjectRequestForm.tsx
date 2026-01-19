'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/Button';
import { useTranslations, useSectionTranslations } from '@/hooks/useTranslations';

// Form validation schema
const projectRequestSchema = z.object({
  // Step 1: Contact Info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),

  // Step 2: Project Type
  serviceType: z.string().min(1, 'Please select a service'),
  projectTitle: z.string().optional(),

  // Step 3: Project Details
  description: z.string().min(50, 'Please provide at least 50 characters'),
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

type FormData = z.infer<typeof projectRequestSchema>;

interface ProjectRequestFormProps {
  prefilledService?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

const TOTAL_STEPS = 5;

const services = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile App Development' },
  { value: 'ai-solutions', label: 'AI Solutions' },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'data-analytics', label: 'Data Analytics' },
  { value: 'python-automation', label: 'Python Automation' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'api-development', label: 'API Development' },
  { value: 'e-commerce', label: 'E-Commerce Solutions' },
  { value: 'devops-cloud', label: 'DevOps & Cloud' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'llm-integration', label: 'LLM Integration' },
  { value: 'rag-solutions', label: 'RAG Solutions' },
  { value: 'ai-agents', label: 'AI Agents Development' },
  { value: 'conversational-ai', label: 'Conversational AI' },
  { value: 'other', label: 'Other' },
];

export default function ProjectRequestForm({
  prefilledService,
  onSuccess,
  onClose,
}: ProjectRequestFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { dir, isLoading } = useTranslations();
  const t = useSectionTranslations('forms.projectRequest');

  const {
    register,
    handleSubmit,
    trigger,
    watch,
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
      const response = await fetch('/api/project-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit request');
      }

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
              <Step4TechRequirements register={register} errors={errors} dir={dir} t={t} />
            )}
            {currentStep === 5 && (
              <Step5BudgetTimeline register={register} errors={errors} dir={dir} t={t} />
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
            className="form-input"
            placeholder={t('placeholders.phone')}
            dir="ltr"
          />
        </FormField>

        <FormField label={t('fields.company')} error={errors.company?.message}>
          <input
            {...register('company')}
            type="text"
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

function Step4TechRequirements({ register, errors, dir, t }: StepProps) {
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
    </div>
  );
}

function Step5BudgetTimeline({ register, errors, dir, t }: StepProps) {
  return (
    <div className="space-y-6">
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
