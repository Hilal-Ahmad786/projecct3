'use client';

import { useEffect, useState } from 'react';

type TocItem = { id: string; title: string; depth: number };

// The site header hides on scroll-down and returns on scroll-up (it slides via
// a CSS transform). Its live bottom edge is published as --reading-top so the
// progress bar and sticky contents menus sit directly under it, or at the top
// of the viewport while it is hidden.
function headerBottom() {
  const header = document.querySelector('header');
  return header ? Math.max(0, Math.round(header.getBoundingClientRect().bottom)) : 0;
}

// Distance from the viewport top at which a heading counts as "being read".
function readingLine() {
  return headerBottom() + 96;
}

/** Thin bar under the fixed header showing how far through the article body the reader is. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    let frame = 0;
    let followUntil = 0;
    const root = document.documentElement;
    const update = () => {
      frame = 0;
      root.style.setProperty('--reading-top', `${headerBottom()}px`);
      // keep following the header while its slide transition runs
      if (performance.now() < followUntil) frame = requestAnimationFrame(update);
      const rect = target.getBoundingClientRect();
      const start = window.innerHeight * 0.25;
      const total = rect.height - window.innerHeight * 0.5;
      const value = total > 0 ? (start - rect.top) / total : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      followUntil = performance.now() + 450;
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      root.style.removeProperty('--reading-top');
    };
  }, [targetId]);

  return (
    <div
      role="progressbar"
      aria-label="Okuma ilerlemesi"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="pointer-events-none fixed inset-x-0 z-40 h-[3px] bg-heritage-turquoise-light/70"
      style={{ top: 'var(--reading-top, var(--navbar-h, 88px))' }}
    >
      <div className="h-full origin-left bg-heritage-turquoise" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

/** Table of contents that highlights the section currently being read. */
export function ArticleToc({ items, onNavigate }: { items: TocItem[]; onNavigate?: 'close-details' }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = readingLine();
      let current: string | null = null;
      for (const item of items) {
        const heading = document.getElementById(item.id);
        if (heading && heading.getBoundingClientRect().top <= line) current = item.id;
      }
      // At the very end of the page the last section is the one being read.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = items[items.length - 1]?.id ?? current;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <ol className="mt-3 space-y-1 border-s border-heritage-sand text-sm leading-6">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={(event) => {
                if (onNavigate === 'close-details') (event.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
              }}
              className={`-ms-px block border-s-2 py-1 pe-1 underline-offset-4 transition-colors focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise motion-reduce:transition-none ${item.depth === 3 ? 'ps-6' : 'ps-3'} ${isActive ? 'border-heritage-turquoise font-semibold text-heritage-turquoise-deep' : 'border-transparent text-gray-700 hover:text-heritage-turquoise-deep hover:underline'}`}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}
