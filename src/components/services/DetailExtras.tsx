'use client';

// Additional service-detail sections: testimonials, mini case study,
// comparison table, related-services strip, and the "starting from"
// pricing panel. All data comes from the service's `content` JSON —
// no DB migration needed. Sections render nothing when data is absent.
//
// NOTE (2026-08): TestimonialsSection and CaseStudySection were seeded with
// DRAFT placeholder content (invented people/metrics). Their call site in
// ServiceDetailClient.tsx gates them on `content.trustApproved === true` —
// the owner sets that flag per-service after replacing with real content.

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import { useTranslations } from '@/hooks/useTranslations';

// ── Content types (stored in Service.content JSON) ───────────────────
export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
}

export interface CaseStudyData {
  title: string;
  client?: string;
  industry?: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
}

export interface ComparisonData {
  title?: string;
  subtitle?: string;
  /** Column headers; column 0 is the criteria label column. */
  columns: string[];
  rows: { label: string; values: (string | boolean)[] }[];
  /** 1-based index (into values) of "our" column to highlight. */
  highlightColumn?: number;
}

export interface PricingMetaData {
  startingFrom?: string;
  note?: string;
  factors?: string[];
}

// Translated label with EN fallback (key may be missing in a locale).
function useLabel() {
  const { t } = useTranslations();
  return (key: string, fallback: string) => {
    const v = t(key);
    return typeof v === 'string' && !v.startsWith('services.') ? v : fallback;
  };
}

// ── Testimonials ─────────────────────────────────────────────────────
export function TestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  const label = useLabel();
  if (!testimonials?.length) return null;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gray-400" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {label('services.detail.testimonials.eyebrow', 'Client Voices')}
            </span>
            <div className="w-8 h-0.5 bg-gray-400" />
          </div>
          <h2 className="text-headline text-gray-900">
            {label('services.detail.testimonials.title', 'What Our Clients Say')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((item, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="flex gap-0.5 mb-4" aria-hidden>
                {Array.from({ length: item.rating ?? 5 }).map((_, s) => (
                  <StarIcon key={s} className="w-4 h-4 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-gray-100">
                <div className="font-semibold text-gray-900 text-sm">{item.author}</div>
                {(item.role || item.company) && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {[item.role, item.company].filter(Boolean).join(' · ')}
                  </div>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Mini case study ──────────────────────────────────────────────────
export function CaseStudySection({ caseStudy }: { caseStudy: CaseStudyData }) {
  const label = useLabel();
  if (!caseStudy?.title) return null;

  return (
    <section className="py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-heritage-turquoise" />
            <span className="text-xs font-medium text-heritage-turquoise uppercase tracking-wide">
              {label('services.detail.caseStudy.eyebrow', 'Case Study')}
            </span>
          </div>
          <h2 className="text-headline text-white mb-2">{caseStudy.title}</h2>
          {(caseStudy.client || caseStudy.industry) && (
            <p className="text-gray-400 text-sm mb-10">
              {[caseStudy.client, caseStudy.industry].filter(Boolean).join(' — ')}
            </p>
          )}

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {label('services.detail.caseStudy.challenge', 'The Challenge')}
                </h3>
                <p className="text-gray-300 leading-relaxed">{caseStudy.challenge}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {label('services.detail.caseStudy.solution', 'Our Solution')}
                </h3>
                <p className="text-gray-300 leading-relaxed">{caseStudy.solution}</p>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                {label('services.detail.caseStudy.results', 'The Results')}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {caseStudy.results?.slice(0, 4).map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl border border-gray-800 bg-gray-900/60 px-5 py-4"
                  >
                    <div className="text-3xl font-bold text-heritage-turquoise leading-none">{r.value}</div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mt-2">{r.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Comparison table ─────────────────────────────────────────────────
function ComparisonCell({ value }: { value: string | boolean }) {
  if (value === true) return <CheckIcon className="w-5 h-5 text-emerald-500 mx-auto" aria-label="yes" />;
  if (value === false) return <XMarkIcon className="w-5 h-5 text-gray-300 mx-auto" aria-label="no" />;
  return <span className="text-sm text-gray-600">{value}</span>;
}

export function ComparisonSection({ comparison }: { comparison: ComparisonData }) {
  const label = useLabel();
  if (!comparison?.columns?.length || !comparison?.rows?.length) return null;
  const highlight = comparison.highlightColumn ?? 1;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gray-400" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {label('services.detail.comparison.eyebrow', 'Comparison')}
            </span>
            <div className="w-8 h-0.5 bg-gray-400" />
          </div>
          <h2 className="text-headline text-gray-900 mb-3">
            {comparison.title || label('services.detail.comparison.title', 'Is This the Right Approach for You?')}
          </h2>
          {comparison.subtitle && <p className="text-lg text-gray-600 font-light">{comparison.subtitle}</p>}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-gray-200"
        >
          <table className="w-full min-w-[560px] border-collapse bg-white">
            <thead>
              <tr className="border-b border-gray-200">
                {comparison.columns.map((col, i) => (
                  <th
                    key={i}
                    className={`px-5 py-4 text-sm font-semibold ${
                      i === 0
                        ? 'text-left text-gray-500 w-2/5'
                        : i === highlight
                          ? 'text-center text-heritage-turquoise-deep bg-heritage-turquoise/5'
                          : 'text-center text-gray-700'
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100 last:border-b-0">
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-800">{row.label}</td>
                  {row.values.map((v, vi) => (
                    <td
                      key={vi}
                      className={`px-5 py-3.5 text-center ${vi + 1 === highlight ? 'bg-heritage-turquoise/5' : ''}`}
                    >
                      <ComparisonCell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

// ── "Starting from" pricing panel (quote-first services) ─────────────
export function PricingMetaPanel({ pricingMeta, serviceSlug }: { pricingMeta: PricingMetaData; serviceSlug: string }) {
  const label = useLabel();
  if (!pricingMeta?.startingFrom && !pricingMeta?.factors?.length) return null;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-8 md:p-10 text-center shadow-sm">
          {pricingMeta.startingFrom && (
            <>
              <div className="text-sm text-gray-500 mb-1">
                {label('services.detail.pricingMeta.startingFrom', 'Starting from')}
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-6">{pricingMeta.startingFrom}</div>
            </>
          )}

          {pricingMeta.factors && pricingMeta.factors.length > 0 && (
            <div className="text-left max-w-md mx-auto mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
                {label('services.detail.pricingMeta.factorsTitle', 'What determines the price')}
              </h3>
              <ul className="space-y-2">
                {pricingMeta.factors.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckIcon className="w-4 h-4 text-heritage-turquoise flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-sm text-gray-500 mb-6">
            {pricingMeta.note || label('services.detail.pricingMeta.note', 'Every project is different — get an exact quote within 24 hours.')}
          </p>
          <Button href={`/start-project?service=${serviceSlug}`} variant="primary" size="lg">
            {label('services.detail.pricingMeta.cta', 'Get an Exact Quote')}
          </Button>
        </div>
      </div>
    </section>
  );
}
