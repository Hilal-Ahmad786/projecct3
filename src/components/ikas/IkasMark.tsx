// The official ikas wordmark (public/images/Tech/ikas.svg, 91×24) and app
// icon, kept at their original ratio. Used as a small platform mark only —
// never styled as a partner badge.

import type { ReactNode } from 'react';
import { IKAS_INDEPENDENCE_NOTE, IKAS_OFFICIAL_URL } from './ikasTurkishCopy';

const WORDMARK = '/images/Tech/ikas.svg';
const ICON = '/images/Tech/brand/ikas-icon.png';

/** Wordmark. Decorative by default; pass `label` when it stands alone. */
export function IkasWordmark({ height = 16, label, className = '' }: { height?: number; label?: string; className?: string }) {
  return <img src={WORDMARK} alt={label ?? ''} aria-hidden={label ? undefined : true} width={Math.round((height * 91) / 24)} height={height} className={`inline-block shrink-0 ${className}`} style={{ height, width: 'auto' }} />;
}

/** Square app icon (rounded). */
export function IkasIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return <img src={ICON} alt="" aria-hidden="true" width={size} height={size} className={`inline-block shrink-0 rounded ${className}`} style={{ width: size, height: size }} />;
}

const outbound = 'font-semibold text-heritage-turquoise-deep underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heritage-turquoise focus-visible:ring-offset-2';

/** Outbound link to an official ikas page, opened in a new tab. */
export function IkasExternalLink({ href = IKAS_OFFICIAL_URL, children, className = '' }: { href?: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={`${outbound} ${className}`}>{children}<span aria-hidden="true"> ↗</span><span className="sr-only"> (yeni sekmede açılır)</span></a>;
}

/** Hero footnote for Turkish ikas pages: platform mark, ikas.com link, independence note. */
export function IkasPlatformNote() {
  return <div className="max-w-xl space-y-1 text-xs leading-5 text-gray-500">
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1"><IkasIcon size={18} /><span><span className="font-semibold text-gray-700">ikas</span> altyapısındaki mağazalar için kurulum ve geliştirme</span><span aria-hidden="true">·</span><IkasExternalLink>ikas.com</IkasExternalLink></p>
    <p>{IKAS_INDEPENDENCE_NOTE}</p>
  </div>;
}

/** Hero scene wrapper: floating green ikas app icon over the page's scene. */
export function IkasHeroScene({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div aria-hidden="true" data-ikas-loop className="ikas-badge-float absolute left-[3%] top-[3%] z-20 rounded-[20px] bg-white p-1.5 shadow-[0_12px_30px_rgba(18,25,38,0.18)] ring-1 ring-black/5">
        <IkasIcon size={56} className="rounded-2xl" />
      </div>
    </div>
  );
}
