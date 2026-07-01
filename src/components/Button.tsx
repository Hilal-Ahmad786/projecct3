// src/components/Button.tsx
import LocalizedLink from '@/components/LocalizedLink';
import React from 'react';

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'emerald' | 'crimson' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: `
    bg-gray-900 text-white border border-gray-900
    hover:bg-gray-700 hover:border-gray-700
    focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
    transition-all duration-250 ease-standard
    hover:-translate-y-0.5
  `,
  secondary: `
    bg-white text-gray-900 border border-gray-200
    hover:bg-gray-50 hover:border-gray-300
    focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
    transition-all duration-250 ease-standard
  `,
  ghost: `
    bg-transparent text-gray-600 border border-transparent
    hover:bg-gray-50 hover:text-gray-900
    focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
    transition-all duration-250 ease-standard
  `,
  outline: `
    bg-transparent text-heritage-turquoise border border-heritage-turquoise
    hover:bg-heritage-turquoise hover:text-white
    focus:ring-2 focus:ring-heritage-turquoise focus:ring-offset-2
    transition-all duration-250 ease-standard
  `,
  emerald: `
    bg-white text-heritage-turquoise-deep border border-heritage-turquoise
    hover:bg-heritage-turquoise hover:text-white hover:border-heritage-turquoise
    focus:ring-2 focus:ring-heritage-turquoise focus:ring-offset-2
    transition-all duration-250 ease-standard
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-heritage-turquoise
    before:scale-x-0 before:origin-left before:transition-transform before:duration-250
    hover:before:scale-x-100 before:z-[-1]
  `,
  crimson: `
    bg-white text-heritage-terracotta-deep border border-heritage-terracotta
    hover:bg-heritage-terracotta hover:text-white hover:border-heritage-terracotta
    focus:ring-2 focus:ring-heritage-terracotta focus:ring-offset-2
    transition-all duration-250 ease-standard
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-heritage-terracotta
    before:scale-x-0 before:origin-left before:transition-transform before:duration-250
    hover:before:scale-x-100 before:z-[-1]
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-6 py-2.5 text-sm font-medium',
  lg: 'px-8 py-3 text-base font-medium',
};

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  ...rest
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-sm font-medium
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:transform-none
    relative z-10
  `;

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <svg 
          className="animate-spin h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && (
        <span className="flex-shrink-0 transition-transform duration-250 group-hover:scale-110" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span className="relative z-10">{children}</span>
      {!loading && rightIcon && (
        <span className="flex-shrink-0 transition-transform duration-250 group-hover:translate-x-0.5" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <LocalizedLink
        href={href}
        className={`${classes} group`}
        aria-disabled={disabled || loading}
        tabIndex={disabled || loading ? -1 : undefined}
      >
        {content}
      </LocalizedLink>
    );
  }

  return (
    <button 
      className={`${classes} group`} 
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  );
}