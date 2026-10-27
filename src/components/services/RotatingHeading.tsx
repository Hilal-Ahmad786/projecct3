'use client';

import { Fragment, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { prefersReducedMotion } from '@/components/services/corporate-visuals/AnimatedVisual';

// Homepage-style split heading for service heroes: a short static line with
// the CSS 3D character reveal (.hero-enter-char), then a turquoise line whose
// words rotate (blur/slide swap + growing underline, as in components/Hero).
// The complete heading stays in the H1 as screen-reader/crawlable text; the
// animated version is decorative (aria-hidden). Under reduced motion the
// words do not rotate (MotionConfig reducedMotion="user" also flattens the
// transitions), and the server HTML shows the first word, so nothing is
// hidden before hydration.
export default function RotatingHeading({
  full,
  lead,
  words,
  className = 'text-display font-light text-gray-900 leading-none',
  interval = 3000,
}: {
  full: string;
  lead: string;
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2 || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), interval);
    return () => window.clearInterval(timer);
  }, [words.length, interval]);

  return (
    <h1 className={className}>
      <span className="sr-only">{full}</span>
      <span aria-hidden="true" className="block" style={{ perspective: '800px' }}>
        <span className="hero-float-a inline-block">
          {lead.split(/\s+/).map((word, wordIndex) => (
            <Fragment key={`${word}-${wordIndex}`}>
              {wordIndex > 0 ? ' ' : null}
              <span className="inline-block whitespace-nowrap">
                {word.split('').map((char, i) => (
                  <span key={`${char}-${i}`} className="hero-enter-char" style={{ animationDelay: `${(wordIndex * 8 + i) * 0.03}s` }}>
                    {char}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
        <br />
        <span className="hero-float-b relative inline-block overflow-hidden pb-2" style={{ minHeight: '1.2em' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              className="block font-normal"
              style={{ color: 'var(--heritage-turquoise)' }}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)', transition: { duration: 0.12 } }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {words[index].split(/\s+/).map((word, wordIndex) => (
                <Fragment key={`${word}-${wordIndex}`}>
                  {wordIndex > 0 ? ' ' : null}
                  <span className="inline-block whitespace-nowrap">{word}</span>
                </Fragment>
              ))}
            </motion.span>
          </AnimatePresence>
          <motion.span
            key={`underline-${index}`}
            className="absolute bottom-0 left-0 block h-0.5"
            style={{ background: 'linear-gradient(to right, var(--heritage-turquoise), var(--heritage-saffron))' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          />
        </span>
      </span>
    </h1>
  );
}
