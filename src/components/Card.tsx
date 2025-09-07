// src/components/Card.tsx
'use client'

import Link from 'next/link'
import { ReactNode, ElementType, AnchorHTMLAttributes } from 'react'
import { useTranslations } from '@/hooks/useTranslations'

interface CardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  className?: string
  href?: string
  as?: ElementType
  ariaLabel?: string
}

export default function Card({
  children,
  className = '',
  href,
  as: Component = 'div',
  ariaLabel,
  ...linkProps
}: CardProps) {
  const { dir } = useTranslations()

  const content = (
    <Component 
      className={className}
      dir={dir}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  )

  if (href) {
    return (
      <Link 
        href={href} 
        className={`block hover:no-underline focus:no-underline`}
        aria-label={ariaLabel}
        dir={dir}
        {...linkProps}
      >
        {content}
      </Link>
    )
  }

  return content
}