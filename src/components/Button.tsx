// src/components/Button.tsx
import Link from 'next/link';
import React from 'react';

type ButtonProps = {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'emerald' | 'crimson';
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
  emerald: `
    bg-white text-emerald-700 border border-emerald-600
    hover:bg-emerald-600 hover:text-white hover:border-emerald-600
    focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2
    transition-all duration-250 ease-standard
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-emerald-600 
    before:scale-x-0 before:origin-left before:transition-transform before:duration-250
    hover:before:scale-x-100 before:z-[-1]
  `,
  crimson: `
    bg-white text-red-700 border border-red-600
    hover:bg-red-600 hover:text-white hover:border-red-600
    focus:ring-2 focus:ring-red-600 focus:ring-offset-2
    transition-all duration-250 ease-standard
    relative overflow-hidden
    before:absolute before:inset-0 before:bg-red-600 
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
      <Link 
        href={href} 
        className={`${classes} group`}
        aria-disabled={disabled || loading}
        tabIndex={disabled || loading ? -1 : undefined}
      >
        {content}
      </Link>
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