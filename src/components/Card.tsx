// src/components/Card.tsx
'use client'

import Link from 'next/link'
import { ReactNode, ElementType, AnchorHTMLAttributes } from 'react'

interface CardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  className?: string
  href?: string
  as?: ElementType
}

export default function Card({
  children,
  className = '',
  href,
  as: Component = 'div',
  ...linkProps
}: CardProps) {
  const content = (
    <Component className={className}>
      {children}
    </Component>
  )

  if (href) {
    return (
      <Link href={href} className={`block hover:no-underline focus:no-underline`} {...linkProps}>
        {content}
      </Link>
    )
  }

  return content
}
