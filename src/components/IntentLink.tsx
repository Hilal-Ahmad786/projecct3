'use client';

// next/link that prefetches on intent (hover, focus, touch start) instead of
// when it scrolls into view. Static pages here prefetch their FULL payload
// (~120KB compressed, ~450KB to parse), so pages with many links were
// downloading and parsing megabytes on load, which made phones feel stuck.

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, type ComponentProps } from 'react';

// `prefetch` is accepted for drop-in compatibility with next/link but ignored:
// these links always prefetch on intent only (Vercel cost + page weight).
type Props = ComponentProps<typeof Link>;

export default function IntentLink({ href, onMouseEnter, onTouchStart, onFocus, prefetch: _prefetch, ...rest }: Props) {
  const router = useRouter();
  const done = useRef(false);
  const prefetch = useCallback(() => {
    if (done.current || typeof href !== 'string' || !href.startsWith('/')) return;
    done.current = true;
    router.prefetch(href);
  }, [href, router]);
  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={(e) => { prefetch(); onMouseEnter?.(e); }}
      onTouchStart={(e) => { prefetch(); onTouchStart?.(e); }}
      onFocus={(e) => { prefetch(); onFocus?.(e); }}
      {...rest}
    />
  );
}
