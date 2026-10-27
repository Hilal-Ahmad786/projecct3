'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { corporateVisuals, type CorporateVisualName } from './svgData';
import './corporate-visuals.css';
import './ecom-visuals.css';

// Playback states:
// - undefined ("static"): no animation — the fully assembled final artwork.
//   This is what server HTML, no-JS visitors and reduced-motion users see.
// - "ready": JS is running and motion is allowed; the choreography is applied
//   but paused at its first frame until the visual scrolls into view.
// - "play": the choreography runs once.
export type VisualState = 'ready' | 'play' | undefined;

export type VisualLabel = { slot: string; text: ReactNode; delay?: number; className?: string };

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Plays once when the element is ~35% visible. Returns null under reduced motion. */
export function useVisualPlayback<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<VisualState>(undefined);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    setState('ready');
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => setState('play'));
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  // Restart: drop the animation for a frame, then apply it again.
  const replay = () => {
    if (state !== 'play') return;
    setState(undefined);
    requestAnimationFrame(() => requestAnimationFrame(() => setState('play')));
  };
  return { ref, state, replay };
}

interface AnimatedVisualProps {
  name: CorporateVisualName;
  labels?: VisualLabel[];
  className?: string;
  style?: CSSProperties;
  /** Controlled playback (e.g. a parent sequencing several visuals). */
  state?: VisualState;
  /** Replays when the pointer enters the closest `[data-cv-hover]` ancestor (or the visual). */
  replayOnHover?: boolean;
  children?: ReactNode;
}

export default function AnimatedVisual({ name, labels = [], className = '', style, state: controlled, replayOnHover = false, children }: AnimatedVisualProps) {
  const visual = corporateVisuals[name];
  const own = useVisualPlayback<HTMLDivElement>();
  const state = controlled !== undefined ? controlled : own.state;

  useEffect(() => {
    if (!replayOnHover || controlled !== undefined) return;
    const target = own.ref.current?.closest('[data-cv-hover]') ?? own.ref.current;
    if (!target) return;
    const onEnter = () => own.replay();
    target.addEventListener('pointerenter', onEnter);
    return () => target.removeEventListener('pointerenter', onEnter);
  });

  return (
    <div ref={own.ref} className={`cv cv-${name} relative ${className}`} data-state={state} style={style}>
      <svg
        viewBox={visual.viewBox}
        className="block h-auto w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
        dangerouslySetInnerHTML={{ __html: visual.markup }}
      />
      {labels.map(({ slot, text, delay = 0, className: labelClass = '' }) => {
        const box = (visual.slots as Record<string, { x: number; y: number; w: number; h: number }>)[slot];
        if (!box) return null;
        return (
          <span
            key={slot}
            className={`cv-label ${labelClass}`}
            style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%`, '--cv-label-delay': `${delay}s` } as CSSProperties}
          >
            {text}
          </span>
        );
      })}
      {children}
    </div>
  );
}
