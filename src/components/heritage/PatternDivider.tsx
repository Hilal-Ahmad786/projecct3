'use client';

// Modern Heritage: section divider — a centered band of girih motifs
// flanked by hairlines, replacing plain <hr>/border separators.

import React from 'react';
import GirihPattern from './GirihPattern';

interface PatternDividerProps {
  /** Stroke color; defaults to İznik turquoise */
  color?: string;
  /** Number of motifs in the band */
  motifs?: number;
  className?: string;
}

export default function PatternDivider({
  color = 'var(--heritage-turquoise)',
  motifs = 3,
  className = '',
}: PatternDividerProps) {
  return (
    <div
      className={`flex items-center justify-center gap-6 py-2 ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <span
        className="h-px flex-1 max-w-40"
        style={{ background: `linear-gradient(to right, transparent, ${color})`, opacity: 0.4 }}
      />
      <GirihPattern columns={motifs} rows={1} tile={48} color={color} opacity={0.5} />
      <span
        className="h-px flex-1 max-w-40"
        style={{ background: `linear-gradient(to left, transparent, ${color})`, opacity: 0.4 }}
      />
    </div>
  );
}
