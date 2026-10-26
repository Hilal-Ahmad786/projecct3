'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import AnimatedVisual, { prefersReducedMotion } from './AnimatedVisual';

// Before/after redesign comparison. A native range input drives the split, so
// it works with keyboard, touch and screen readers. When it scrolls into view
// the handle sweeps once from "before" to the middle to show the idea.
export default function BeforeAfterCompare() {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    setSplit(88);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      setIntro(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setSplit(50)));
      window.setTimeout(() => setIntro(false), 1300);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="m-0">
      <div ref={ref} className="cv-compare relative select-none overflow-hidden rounded-2xl focus-within:ring-2 focus-within:ring-heritage-turquoise focus-within:ring-offset-2" data-intro={intro} style={{ '--cv-split': `${split}%` } as CSSProperties}>
        <AnimatedVisual name="redesign-before" />
        <div className="cv-compare-after absolute inset-0" aria-hidden="true">
          <AnimatedVisual name="redesign-after" />
        </div>
        <span aria-hidden="true" className="cv-compare-handle pointer-events-none absolute inset-y-[5%] w-0.5 -translate-x-1/2 bg-heritage-turquoise-deep" style={{ left: `${split}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-heritage-turquoise-deep text-white shadow-md">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 5 2 10l5 5M13 5l5 5-5 5" /></svg>
          </span>
        </span>
        <span aria-hidden="true" className="absolute left-[6%] top-[12%] rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">Önce</span>
        <span aria-hidden="true" className="absolute right-[6%] top-[12%] rounded-full bg-heritage-turquoise-deep px-2.5 py-1 text-xs font-semibold text-white shadow-sm">Sonra</span>
        <input
          type="range"
          min={5}
          max={95}
          value={split}
          onChange={(event) => { setIntro(false); setSplit(Number(event.target.value)); }}
          aria-label="Eski ve yenilenmiş site görünümünü karşılaştırın"
          aria-valuetext={`Yenilenmiş görünüm yüzde ${100 - split}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-0"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-gray-600">Örnek gösterim · Kaydırarak eski ve yenilenmiş sayfa düzenini karşılaştırın.</figcaption>
    </figure>
  );
}
