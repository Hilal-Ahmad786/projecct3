'use client';

// Sticky mobile CTA bar for service detail pages: fixed to the bottom on
// small screens only, slides in after the visitor scrolls past the hero.
// Pure CSS transition (no framer) — respects prefers-reduced-motion via the
// global reduced-motion rules, and the bar is SSR-hidden (translate-y-full)
// so it never flashes above the fold.

import { useEffect, useState } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslations } from '@/hooks/useTranslations';
import { trackWhatsAppClick } from '@/lib/analytics';
import { WhatsAppIcon, WHATSAPP_NUMBER } from './WhatsAppButton';

// New strings — inline 5-locale map (same pattern as other service components).
const GET_QUOTE_LABEL: Record<string, string> = {
  en: 'Get Quote',
  tr: 'Teklif Al',
  de: 'Angebot erhalten',
  ur: 'قیمت حاصل کریں',
  ar: 'احصل على عرض سعر',
};

const HERO_SCROLL_THRESHOLD = 480; // ≈ past the hero on a phone viewport

export default function StickyMobileCTA({ serviceSlug }: { serviceSlug?: string }) {
  const { locale, dir } = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > HERO_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const quoteLabel = GET_QUOTE_LABEL[locale] || GET_QUOTE_LABEL.en;
  const quoteHref = serviceSlug ? `/start-project?service=${serviceSlug}` : '/start-project';

  return (
    <div
      dir={dir}
      aria-hidden={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out
        ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div
        className="bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] px-4 pt-2.5"
        style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
      >
        {/* pe-16 keeps the trailing edge clear of the global floating action
            button (bottom-right in LTR, bottom-left in RTL). */}
        <div className="flex items-stretch gap-2 pe-16">
          <LocalizedLink
            href={quoteHref}
            tabIndex={visible ? 0 : -1}
            className="flex-1 inline-flex items-center justify-center rounded-sm bg-gray-900 text-white
              text-sm font-medium py-3 hover:bg-gray-700 transition-colors"
          >
            {quoteLabel}
          </LocalizedLink>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            onClick={() => trackWhatsAppClick('service_sticky_bar')}
            className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-[#25D366] text-white
              text-sm font-medium px-4 py-3 hover:bg-[#1DA851] transition-colors"
          >
            <WhatsAppIcon className="w-4.5 h-4.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
