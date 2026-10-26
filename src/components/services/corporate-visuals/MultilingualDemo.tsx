'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedVisual, { prefersReducedMotion } from './AnimatedVisual';

const languages = [
  { code: 'TR', name: 'Türkçe', rtl: false },
  { code: 'EN', name: 'İngilizce', rtl: false },
  { code: 'DE', name: 'Almanca', rtl: false },
  { code: 'AR', name: 'Arapça', rtl: true },
  { code: 'UR', name: 'Urduca', rtl: true },
];
const SEGMENT = 42; // switcher segment width in SVG user units

// Language switcher demo: cycles through the five languages once when it
// scrolls into view and mirrors the page for Arabic and Urdu. Visitors can pick
// a language themselves (real buttons), which stops the automatic cycle.
export default function MultilingualDemo() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const rtl = languages[active].rtl;

  // Slide the active pill inside the inline SVG and mirror the page for RTL.
  useEffect(() => {
    const pill = wrap.current?.querySelector<SVGGElement>('[data-part="lang-active"]');
    if (pill) pill.style.transform = `translateX(${active * SEGMENT}px)`;
    const visual = wrap.current?.querySelector<HTMLElement>('.cv');
    if (visual) visual.dataset.rtl = String(languages[active].rtl);
  }, [active]);

  // Start one automatic tour when visible (never under reduced motion).
  useEffect(() => {
    const el = wrap.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setAuto(true); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % languages.length;
        if (next === 0) setAuto(false); // one full tour, then rest on Türkçe
        return next;
      });
    }, 1800);
    return () => window.clearInterval(timer);
  }, [auto]);

  const choose = (index: number) => { setAuto(false); setActive(index); };

  return (
    <figure className="m-0">
      <div ref={wrap}>
        <AnimatedVisual
          name="multilingual-page"
          className="rounded-2xl"
          labels={[
            ...languages.map((language, i) => ({
              slot: `slot-lang-${i + 1}`,
              text: <button
                type="button"
                onClick={() => choose(i)}
                aria-pressed={active === i}
                aria-label={`${language.name} örneğini göster`}
                className={`relative z-10 flex h-full w-full items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise ${active === i ? 'text-white' : 'text-gray-600 hover:text-heritage-turquoise-deep'}`}
              >{language.code}</button>,
            })),
            { slot: 'slot-direction', text: <span className="w-full text-center text-[0.8em] text-heritage-turquoise-deep">{rtl ? 'RTL' : 'LTR'}</span> },
          ]}
        />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-gray-600">
        Örnek gösterim · <strong className="font-semibold text-gray-800">{languages[active].name}</strong>
        {rtl ? ' seçildiğinde sayfa düzeni sağdan sola (RTL) döner.' : ' soldan sağa (LTR) düzende gösterilir.'} Dil düğmelerini kullanarak deneyebilirsiniz.
      </figcaption>
    </figure>
  );
}
