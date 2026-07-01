// src/components/MotionProvider.tsx
'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Client boundary that makes every framer-motion animation in the subtree
 * respect the user's OS-level "prefers-reduced-motion" setting.
 *
 * Server components can still be passed through as {children} — only this
 * wrapper itself needs to be a client component.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
