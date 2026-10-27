'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedVisual, { prefersReducedMotion } from './AnimatedVisual';

const modes = [
  { id: 'platform', label: 'Platform tabanlı' },
  { id: 'headless', label: 'Headless' },
] as const;

export default function ArchitectureToggle() {
  const wrap = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<(typeof modes)[number]['id']>('platform');
  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        timer = window.setTimeout(() => {
          if (!chosen) setMode('headless');
        }, 2200);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [chosen]);

  const select = (next: (typeof modes)[number]['id']) => {
    setChosen(true);
    setMode(next);
  };

  return (
    <figure className="m-0">
      <div ref={wrap} className="ecom-architecture-demo" data-mode={mode} data-chosen={chosen}>
        <div role="group" aria-label="E-ticaret mimari örneği" className="mb-3 inline-flex rounded-full border border-heritage-sand bg-white p-1">
          {modes.map((item) => <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => select(item.id)} className={`min-h-9 rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise ${mode === item.id ? 'bg-heritage-turquoise-deep text-white' : 'text-gray-700 hover:text-heritage-turquoise-deep'}`}>{item.label}</button>)}
        </div>
        <AnimatedVisual name="ecom-architecture" labels={[1,2,3].map((n) => ({slot:`slot-layer-${n}`,text:['Mağaza arayüzü','Ticaret altyapısı','Uygulamalar'][n-1]}))} />
      </div>
      <figcaption className="mt-3 text-xs leading-5 text-gray-600">Örnek gösterim · Katmanların nasıl ayrıldığını gösterir; her proje için önerilen bir mimari değildir.</figcaption>
    </figure>
  );
}
