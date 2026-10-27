'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedVisual, { prefersReducedMotion } from './AnimatedVisual';

type Scenario = { id: string; label: string; levels: number[] };
type ScopeMetersProps = { factors?: string[]; scenarios?: Scenario[]; scopeKey?: string; caption?: string };
const corporateFactors = ['Sayfa ve şablonlar', 'Tasarım ve marka', 'Dil ve içerik', 'Yönetim paneli', 'Entegrasyonlar', 'Site taşıma'];
const corporateScenarios: Scenario[] = [
  { id: 'tanitim', label: 'Tanıtım sitesi', levels: [0.35, 0.5, 0.25, 0.35, 0.12, 0.2] },
  { id: 'katalog', label: 'Çok dilli katalog sitesi', levels: [0.75, 0.6, 0.9, 0.7, 0.6, 0.5] },
];

export default function ScopeMeters({ factors = corporateFactors, scenarios = corporateScenarios, scopeKey = 'corporate', caption }: ScopeMetersProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const selected = scenarios[active] ?? scenarios[0];

  useEffect(() => {
    selected.levels.forEach((level, i) => {
      const fill = wrap.current?.querySelector<SVGGElement>(`[data-part="fill-${i + 1}"]`);
      if (fill) fill.style.transform = `scaleX(${level})`;
    });
  }, [selected]);

  useEffect(() => {
    const el = wrap.current;
    if (!el || touched || prefersReducedMotion() || !('IntersectionObserver' in window) || scenarios.length < 2) return;
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      timer = window.setTimeout(() => setActive(1), 2200);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [touched, scenarios.length]);

  return (
    <figure className="m-0">
      <div role="group" aria-label="Örnek proje türü" className="mb-4 inline-flex flex-wrap rounded-full border border-heritage-sand bg-white p-1">
        {scenarios.map((scenario, i) => <button key={scenario.id} type="button" aria-pressed={active === i} onClick={() => { setTouched(true); setActive(i); }} className={`min-h-9 rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise ${active === i ? 'bg-heritage-turquoise-deep text-white' : 'text-gray-700 hover:text-heritage-turquoise-deep'}`}>{scenario.label}</button>)}
      </div>
      <div ref={wrap} data-scope={scopeKey} className={`scope-meters ${scopeKey === 'ecom' ? 'scope-meters-ecom' : ''}`}>
        <AnimatedVisual name="scope-meters" labels={[
          ...factors.map((factor, i) => ({ slot: `slot-meter-${i + 1}`, text: factor, delay: i * 0.08 })),
          { slot: 'slot-low', text: <span className="w-full text-center text-[0.85em] text-gray-500">Düşük</span> },
          { slot: 'slot-mid', text: <span className="w-full text-center text-[0.85em] text-gray-500">Orta</span> },
          { slot: 'slot-high', text: <span className="w-full text-center text-[0.85em] text-gray-500">Yüksek</span> },
        ]} />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-gray-600">{caption || <>Örnek gösterim · <strong className="font-semibold text-gray-800">{selected.label}</strong> için kapsam etkenlerinin göreli ağırlığı. Gerçek kapsam ve fiyat, ihtiyaçlarınız netleştikten sonra teklifte belirlenir.</>}</figcaption>
    </figure>
  );
}
