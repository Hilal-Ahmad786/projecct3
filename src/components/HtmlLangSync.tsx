'use client';

import { useEffect } from 'react';

// The root layout hardcodes <html lang="en"> (it sits above the [locale]
// segment and can't read the locale param without forcing the whole app
// dynamic). This syncs the real locale/direction onto <html> after hydration
// so screen readers and browser translation get the correct language on
// tr/de/ur/ar pages. Crawler-visible lang/dir remain on the locale wrapper div.
export default function HtmlLangSync({ locale, dir }: { locale: string; dir: 'ltr' | 'rtl' }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);
  return null;
}
