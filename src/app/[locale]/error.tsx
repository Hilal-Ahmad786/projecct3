'use client';

// Route-level error boundary for all localized pages. Catches client-side
// render exceptions (e.g. during navigation) and shows a recoverable UI
// instead of the bare "Application error" white screen.
import { useEffect } from 'react';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces the real error in the browser console / server logs for triage.
    console.error('Route error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Bir şeyler ters gitti
        </h2>
        <p className="text-gray-600 mb-6">
          Sayfa yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
          >
            Tekrar Dene
          </button>
          <button
            onClick={() => { window.location.href = '/'; }}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Ana Sayfa
          </button>
        </div>
      </div>
    </div>
  );
}
