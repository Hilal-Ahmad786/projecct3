// src/components/ai-services/AIServicePage.tsx
// Reusable AI Service page component for new AI 2026 services

'use client';

import { useTranslations } from '@/hooks/useTranslations';
import Button from '@/components/Button';
import ParticleNetwork from '@/components/ParticleNetwork';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import {
  SparklesIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface AIServicePageProps {
  serviceKey: string;
  accentColor?: 'emerald' | 'blue' | 'purple' | 'orange';
}

const iconMap: Record<string, any> = {
  sparkles: SparklesIcon,
  cpu: CpuChipIcon,
  shield: ShieldCheckIcon,
  chart: ChartBarIcon,
  clock: ClockIcon,
  currency: CurrencyDollarIcon,
};

const colorClasses = {
  emerald: {
    button: 'bg-emerald-600 hover:bg-emerald-700',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-600',
    light: 'bg-emerald-100 text-emerald-600',
  },
  blue: {
    button: 'bg-blue-600 hover:bg-blue-700',
    accent: 'text-blue-400',
    bg: 'bg-blue-600',
    light: 'bg-blue-100 text-blue-600',
  },
  purple: {
    button: 'bg-purple-600 hover:bg-purple-700',
    accent: 'text-purple-400',
    bg: 'bg-purple-600',
    light: 'bg-purple-100 text-purple-600',
  },
  orange: {
    button: 'bg-orange-600 hover:bg-orange-700',
    accent: 'text-orange-400',
    bg: 'bg-orange-600',
    light: 'bg-orange-100 text-orange-600',
  },
};

export default function AIServicePage({ serviceKey, accentColor = 'emerald' }: AIServicePageProps) {
  const { t } = useTranslations();
  const colors = colorClasses[accentColor];

  // Get translations for this service
  const title = t(`aiServices.${serviceKey}.title`);
  const subtitle = t(`aiServices.${serviceKey}.subtitle`);
  const description = t(`aiServices.${serviceKey}.description`);

  // Default features if not provided in translations
  const defaultFeatures = [
    'Enterprise-grade security',
    'Scalable architecture',
    'Custom integration',
    '24/7 monitoring',
    'Performance optimization',
    'Dedicated support',
  ];

  const defaultProcess = [
    { step: 1, title: 'Discovery', description: 'We analyze your current systems and identify AI opportunities.' },
    { step: 2, title: 'Strategy', description: 'We design a custom AI implementation plan tailored to your needs.' },
    { step: 3, title: 'Development', description: 'Our team builds and tests the AI solution with rigorous QA.' },
    { step: 4, title: 'Deployment', description: 'We deploy and monitor the solution, ensuring seamless integration.' },
  ];

  const defaultBenefits = [
    { icon: 'clock', title: 'Save Time', description: 'Automate repetitive tasks and focus on what matters.' },
    { icon: 'currency', title: 'Reduce Costs', description: 'Lower operational costs with intelligent automation.' },
    { icon: 'chart', title: 'Scale Easily', description: 'Grow your AI capabilities as your business expands.' },
    { icon: 'shield', title: 'Stay Secure', description: 'Enterprise-grade security for all AI implementations.' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-gray-900">
        <div className="absolute inset-0">
          <ParticleNetwork className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
        </div>

        <div className="container mx-auto relative z-10 px-4 pt-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-lg mb-8 border border-white/10`}>
              <SparklesIcon className={`w-8 h-8 ${colors.accent}`} />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {title}
            </h1>

            <p className="text-xl text-gray-300 mb-4">
              {subtitle}
            </p>

            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary" size="lg" className={colors.button}>
                Get Started
              </Button>
              {/* ! prefixes required: plain utilities can lose to the variant's
                  own colors depending on CSS source order. */}
              <Button href="#process" variant="ghost" size="lg" className="!text-white !border-white hover:!bg-white hover:!text-gray-900">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our AI Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver measurable results with cutting-edge AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultBenefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || SparklesIcon;
              return (
                <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${colors.light} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Deliver</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI solutions tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {defaultFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <CheckCircleIcon className={`w-5 h-5 flex-shrink-0 ${colors.accent.replace('text-', 'text-')}`} />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-gray-600">From concept to deployment, we follow a proven methodology.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {defaultProcess.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${colors.bg} text-white flex items-center justify-center text-xl font-bold`}>
                    0{step.step}
                  </div>
                  <div className="flex-grow text-center md:text-left bg-gray-50 p-6 rounded-xl w-full">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${colors.bg} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Schedule a free consultation to explore how AI can drive your business forward.
          </p>
          <Button href="/contact" variant="secondary" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Book a Free Consultation
          </Button>
        </div>
      </section>
    </main>
  );
}
