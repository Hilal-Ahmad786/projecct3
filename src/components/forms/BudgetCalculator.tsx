'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface BudgetCalculatorProps {
  serviceType: string;
  timeline: string;
  urgencyLevel: string;
  features?: string[];
  onEstimateChange?: (estimate: BudgetEstimate) => void;
}

export interface BudgetEstimate {
  minBudget: number;
  maxBudget: number;
  estimatedDays: number;
  currency: string;
  breakdown: {
    category: string;
    amount: number;
    description: string;
  }[];
}

// Base prices for different services (in USD)
const SERVICE_BASE_PRICES: Record<string, { min: number; max: number; baseDays: number }> = {
  'web-development': { min: 5000, max: 25000, baseDays: 45 },
  'mobile-development': { min: 15000, max: 60000, baseDays: 90 },
  'ai-solutions': { min: 20000, max: 100000, baseDays: 60 },
  'machine-learning': { min: 25000, max: 120000, baseDays: 90 },
  'data-analytics': { min: 10000, max: 50000, baseDays: 30 },
  'python-automation': { min: 5000, max: 20000, baseDays: 21 },
  'digital-marketing': { min: 3000, max: 15000, baseDays: 30 },
  'ui-ux-design': { min: 5000, max: 30000, baseDays: 30 },
  'api-development': { min: 8000, max: 40000, baseDays: 45 },
  'e-commerce': { min: 10000, max: 50000, baseDays: 60 },
  'devops-cloud': { min: 8000, max: 40000, baseDays: 30 },
  'cybersecurity': { min: 15000, max: 80000, baseDays: 45 },
  'conversational-ai': { min: 15000, max: 70000, baseDays: 45 },
  'prompt-engineering': { min: 5000, max: 25000, baseDays: 14 },
  'ai-agents': { min: 20000, max: 100000, baseDays: 60 },
  'rag-solutions': { min: 15000, max: 75000, baseDays: 45 },
  'mlops-deployment': { min: 10000, max: 50000, baseDays: 30 },
  'computer-vision': { min: 25000, max: 150000, baseDays: 90 },
  'llm-finetuning': { min: 20000, max: 100000, baseDays: 45 },
  'other': { min: 5000, max: 50000, baseDays: 45 },
};

// Timeline multipliers
const TIMELINE_MULTIPLIERS: Record<string, { cost: number; days: number }> = {
  'URGENT': { cost: 1.5, days: 0.5 },      // 50% more cost, half the time
  'STANDARD': { cost: 1.0, days: 1.0 },    // Normal
  'FLEXIBLE': { cost: 0.9, days: 1.25 },   // 10% discount, 25% more time
  'LONG_TERM': { cost: 0.85, days: 1.5 },  // 15% discount, 50% more time
};

// Urgency surcharges
const URGENCY_SURCHARGES: Record<string, number> = {
  'LOW': 0,
  'NORMAL': 0,
  'HIGH': 0.1,      // 10% extra
  'CRITICAL': 0.25, // 25% extra
};

export default function BudgetCalculator({
  serviceType,
  timeline,
  urgencyLevel,
  features = [],
  onEstimateChange,
}: BudgetCalculatorProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const estimate = useMemo(() => {
    const service = SERVICE_BASE_PRICES[serviceType] || SERVICE_BASE_PRICES['other'];
    const timelineMult = TIMELINE_MULTIPLIERS[timeline] || TIMELINE_MULTIPLIERS['STANDARD'];
    const urgencySurcharge = URGENCY_SURCHARGES[urgencyLevel] || 0;

    // Calculate base costs
    let minCost = service.min * timelineMult.cost;
    let maxCost = service.max * timelineMult.cost;

    // Apply urgency surcharge
    minCost = minCost * (1 + urgencySurcharge);
    maxCost = maxCost * (1 + urgencySurcharge);

    // Calculate days
    const estimatedDays = Math.round(service.baseDays * timelineMult.days);

    // Create breakdown
    const breakdown = [
      {
        category: 'Base Development',
        amount: service.min,
        description: 'Core development and implementation',
      },
      {
        category: 'Design & UX',
        amount: Math.round(service.min * 0.2),
        description: 'User interface design and experience',
      },
      {
        category: 'Testing & QA',
        amount: Math.round(service.min * 0.15),
        description: 'Quality assurance and testing',
      },
      {
        category: 'Project Management',
        amount: Math.round(service.min * 0.1),
        description: 'Coordination and communication',
      },
    ];

    if (timeline === 'URGENT') {
      breakdown.push({
        category: 'Rush Delivery',
        amount: Math.round(service.min * 0.5),
        description: 'Expedited timeline premium',
      });
    }

    if (urgencySurcharge > 0) {
      breakdown.push({
        category: 'Priority Handling',
        amount: Math.round(service.min * urgencySurcharge),
        description: 'High priority project management',
      });
    }

    return {
      minBudget: Math.round(minCost),
      maxBudget: Math.round(maxCost),
      estimatedDays,
      currency: 'USD',
      breakdown,
    };
  }, [serviceType, timeline, urgencyLevel]);

  useEffect(() => {
    onEstimateChange?.(estimate);
  }, [estimate, onEstimateChange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!serviceType) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500 text-sm">
          Select a service type to see budget estimate
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Estimated Budget</h4>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          Auto-calculated
        </span>
      </div>

      {/* Main Estimate */}
      <div className="text-center mb-6">
        <div className="text-3xl md:text-4xl font-bold mb-2">
          {formatCurrency(estimate.minBudget)} - {formatCurrency(estimate.maxBudget)}
        </div>
        <p className="text-gray-400 text-sm">
          Estimated delivery: {estimate.estimatedDays} days
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-xl font-semibold">{estimate.estimatedDays}</div>
          <div className="text-xs text-gray-400">Days</div>
        </div>
        <div className="text-center border-x border-white/10">
          <div className="text-xl font-semibold">
            {Math.round(estimate.minBudget / estimate.estimatedDays)}
          </div>
          <div className="text-xs text-gray-400">$/Day</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold">
            {timeline === 'URGENT' ? '1.5x' : timeline === 'FLEXIBLE' ? '0.9x' : '1x'}
          </div>
          <div className="text-xs text-gray-400">Rate</div>
        </div>
      </div>

      {/* Breakdown Toggle */}
      <button
        type="button"
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full flex items-center justify-between py-3 px-4 bg-white/10 rounded-lg hover:bg-white/15 transition-colors text-sm"
      >
        <span>View Cost Breakdown</span>
        <svg
          className={`w-5 h-5 transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Breakdown Details */}
      {showBreakdown && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 space-y-3"
        >
          {estimate.breakdown.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
            >
              <div>
                <div className="text-sm font-medium">{item.category}</div>
                <div className="text-xs text-gray-400">{item.description}</div>
              </div>
              <div className="text-sm font-semibold">
                {formatCurrency(item.amount)}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 mt-4 text-center">
        * This is an estimate. Final pricing will be provided after consultation.
      </p>
    </motion.div>
  );
}
