// src/components/legal/LegalPage.tsx
// Shared server component that renders a legal document (privacy / terms / cookies)
// in a clean typographic layout. RTL is handled by the [locale] layout's dir attribute;
// we use logical utilities (text-start) so the layout mirrors automatically.

import { Locale } from '@/lib/i18n';
import { LegalDocument, lastUpdatedLabels } from '@/data/legal';

interface LegalPageProps {
  document: LegalDocument;
  locale: Locale;
}

const dateLocaleMap: Record<Locale, string> = {
  en: 'en-US',
  tr: 'tr-TR',
  de: 'de-DE',
  ur: 'ur-PK',
  ar: 'ar-SA',
};

function formatDate(isoDate: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(dateLocaleMap[locale], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(`${isoDate}T00:00:00Z`));
  } catch {
    return isoDate;
  }
}

export default function LegalPage({ document, locale }: LegalPageProps) {
  return (
    <main className="bg-white">
      <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-20 text-start">
        <header className="mb-10 border-b border-gray-200 pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {document.title}
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            {lastUpdatedLabels[locale]}:{' '}
            <time dateTime={document.lastUpdated}>
              {formatDate(document.lastUpdated, locale)}
            </time>
          </p>
          <p className="mt-6 text-base leading-relaxed text-gray-700">
            {document.intro}
          </p>
        </header>

        {document.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              {section.heading}
            </h2>
            {section.body.split('\n\n').map((paragraph, i) => (
              <p
                key={i}
                className="mb-3 text-base leading-relaxed text-gray-700 whitespace-pre-line"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
