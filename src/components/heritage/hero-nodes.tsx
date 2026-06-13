'use client';

// Shared capability-node config + icon glyphs for the homepage hero
// scenes (orbital + static hub). Icons are clean, language-neutral line
// glyphs centred on (0,0), drawn in the node colour.

import React from 'react';
import { H } from '@/components/services/hero-visuals/primitives';

export const HERO_NODES = [
  { angle: -90, color: H.turquoise,  icon: 'code' },     // web / software
  { angle: -30, color: H.lapis,      icon: 'ai' },        // AI
  { angle:  30, color: H.terracotta, icon: 'mobile' },   // mobile
  { angle:  90, color: H.saffron,    icon: 'cloud' },     // cloud / infra
  { angle: 150, color: H.turquoise,  icon: 'design' },   // design
  { angle: 210, color: H.lapis,      icon: 'growth' },   // marketing / growth
] as const;

export function HeroIcon({ kind, color }: { kind: string; color: string }) {
  const s = { fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'code':
      return <g {...s}><path d="M-6 -5 L-11 0 L-6 5" /><path d="M6 -5 L11 0 L6 5" /><path d="M2 -7 L-2 7" /></g>;
    case 'ai':
      // one bold, clean 4-point sparkle — the modern "AI" glyph
      return (
        <g>
          <path d="M0 -11 C1 -3.5 3.5 -1 11 0 C3.5 1 1 3.5 0 11 C-1 3.5 -3.5 1 -11 0 C-3.5 -1 -1 -3.5 0 -11 Z" fill={color} />
        </g>
      );
    case 'mobile':
      return <g {...s}><rect x="-6" y="-9" width="12" height="18" rx="2.5" /><path d="M-1.5 6 H1.5" /></g>;
    case 'cloud':
      return <g {...s}><path d="M-8 4 a4 4 0 0 1 1 -7.8 a5.5 5.5 0 0 1 10.6 -1.2 a3.8 3.8 0 0 1 0.4 9 H-7 z" /></g>;
    case 'design':
      // artist's colour palette with paint dots — unmistakably "design"
      return (
        <g>
          <path
            d="M-0.5 -9.5 a9.5 9.5 0 1 0 4.5 17.8 a1.9 1.9 0 0 0 -0.9 -3.5 a2.3 2.3 0 0 1 1.3 -4.2 L7.5 -4 A9.5 9.5 0 0 0 -0.5 -9.5 Z"
            fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round"
          />
          <circle cx="-4.5" cy="-3" r="1.5" fill={H.terracotta} />
          <circle cx="-0.5" cy="-5.8" r="1.5" fill={H.saffron} />
          <circle cx="3.6" cy="-3.6" r="1.5" fill={H.turquoise} />
          <circle cx="-5.2" cy="2" r="1.5" fill={H.lapis} />
        </g>
      );
    case 'growth':
      // rocket — body, window, fins, flame
      return (
        <g {...s}>
          <path d="M0 -10 C5 -4.5 6 1 4 6.5 L-4 6.5 C-6 1 -5 -4.5 0 -10 Z" />
          <circle cx="0" cy="-3.5" r="2.2" />
          <path d="M-4 5.5 L-8 10 L-3.5 8 Z" fill={color} stroke="none" />
          <path d="M4 5.5 L8 10 L3.5 8 Z" fill={color} stroke="none" />
          <path d="M-2.2 7 Q0 12.5 2.2 7" fill={H.saffron} stroke="none" />
        </g>
      );
    default:
      return null;
  }
}
