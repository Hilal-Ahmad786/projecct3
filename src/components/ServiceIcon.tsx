// src/components/ServiceIcon.tsx
import { FC, SVGProps } from 'react';

const icons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  'MDL-01': (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M3 4h18v16H3V4zm2 2v12h14V6H5z" fill="currentColor" />
      <path d="M7 8h10v2H7zM7 12h10v2H7z" fill="#fff" />
    </svg>
  ),
  'MDL-02': (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M4 6h16v4H4zM4 14h16v4H4z" fill="currentColor" />
    </svg>
  ),
  'MDL-03': (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2l3 6 6 .5-4.5 4 1 6-5.5-3-5.5 3 1-6L3 8.5 9 8l3-6z" fill="currentColor" />
    </svg>
  ),
  'MDL-04': (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M8 12h8M8 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'MDL-05': (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm6 2a4 4 0 110 8 4 4 0 010-8z" fill="currentColor"/>
    </svg>
  ),
  'MDL-06': (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm4 4h6v2H9V9zm0 4h6v2H9v-2z" fill="currentColor"/>
    </svg>
  ),
  'MDL-07': (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" fill="currentColor"/>
    </svg>
  ),
};

export default function ServiceIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const I = icons[id] || (() => null);
  return <I className={className} />;
}
