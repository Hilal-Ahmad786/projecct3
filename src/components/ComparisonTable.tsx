'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Feature {
  name: string;
  description?: string;
  category?: string;
}

interface Plan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: Record<string, boolean | string>;
  highlighted?: boolean;
  ctaText?: string;
  ctaUrl?: string;
}

interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  plans: Plan[];
  showCategories?: boolean;
}

export default function ComparisonTable({
  title = "Compare Plans",
  subtitle = "Find the perfect plan for your needs",
  features,
  plans,
  showCategories = false,
}: ComparisonTableProps) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  // Group features by category if showCategories is true
  const groupedFeatures = showCategories
    ? features.reduce((acc, feature) => {
        const category = feature.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(feature);
        return acc;
      }, {} as Record<string, Feature[]>)
    : { all: features };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gray-50 rounded-tl-xl w-1/4">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </span>
                </th>
                {plans.map((plan, index) => (
                  <th
                    key={plan.name}
                    className={`p-6 text-center ${
                      plan.highlighted
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-50'
                    } ${index === plans.length - 1 ? 'rounded-tr-xl' : ''}`}
                    onMouseEnter={() => setHoveredPlan(plan.name)}
                    onMouseLeave={() => setHoveredPlan(null)}
                  >
                    <div className="space-y-2">
                      {plan.highlighted && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 rounded-full mb-2">
                          Most Popular
                        </span>
                      )}
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        {plan.period && (
                          <span className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                            /{plan.period}
                          </span>
                        )}
                      </div>
                      {plan.description && (
                        <p className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                          {plan.description}
                        </p>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
                <>
                  {showCategories && category !== 'all' && (
                    <tr key={`category-${category}`}>
                      <td
                        colSpan={plans.length + 1}
                        className="px-4 py-3 bg-gray-100 text-sm font-semibold text-gray-700"
                      >
                        {category}
                      </td>
                    </tr>
                  )}
                  {categoryFeatures.map((feature, featureIndex) => (
                    <tr
                      key={feature.name}
                      className={`border-b border-gray-100 ${
                        featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="p-4">
                        <div>
                          <span className="font-medium text-gray-900">{feature.name}</span>
                          {feature.description && (
                            <p className="text-sm text-gray-500 mt-0.5">{feature.description}</p>
                          )}
                        </div>
                      </td>
                      {plans.map((plan) => (
                        <td
                          key={`${plan.name}-${feature.name}`}
                          className={`p-4 text-center ${
                            hoveredPlan === plan.name ? 'bg-gray-100/50' : ''
                          }`}
                        >
                          {renderFeatureValue(plan.features[feature.name])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-4 bg-gray-50 rounded-bl-xl"></td>
                {plans.map((plan, index) => (
                  <td
                    key={`cta-${plan.name}`}
                    className={`p-6 text-center ${
                      plan.highlighted ? 'bg-gray-900' : 'bg-gray-50'
                    } ${index === plans.length - 1 ? 'rounded-br-xl' : ''}`}
                  >
                    <a
                      href={plan.ctaUrl || '/contact'}
                      className={`inline-block px-6 py-3 rounded-lg font-semibold transition-colors ${
                        plan.highlighted
                          ? 'bg-white text-gray-900 hover:bg-gray-100'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {plan.ctaText || 'Get Started'}
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl overflow-hidden ${
                plan.highlighted
                  ? 'bg-gray-900 text-white ring-2 ring-gray-900'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Plan header */}
              <div className="p-6 text-center border-b border-gray-200/20">
                {plan.highlighted && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 rounded-full mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                      /{plan.period}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className={`text-sm ${plan.highlighted ? 'text-gray-300' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                )}
              </div>

              {/* Features list */}
              <div className="p-6">
                <ul className="space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature.name}
                      className="flex items-center gap-3"
                    >
                      {renderFeatureValue(plan.features[feature.name], true)}
                      <span className={`text-sm ${
                        plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                <a
                  href={plan.ctaUrl || '/contact'}
                  className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors ${
                    plan.highlighted
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.ctaText || 'Get Started'}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper to render feature values
function renderFeatureValue(value: boolean | string | undefined, isMobile = false) {
  if (value === true) {
    return (
      <span className={`inline-flex items-center justify-center ${isMobile ? '' : 'w-6 h-6'}`}>
        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }

  if (value === false || value === undefined) {
    return (
      <span className={`inline-flex items-center justify-center ${isMobile ? '' : 'w-6 h-6'}`}>
        <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }

  return (
    <span className="text-sm font-medium text-gray-700">
      {value}
    </span>
  );
}
