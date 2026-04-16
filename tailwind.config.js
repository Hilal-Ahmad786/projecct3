/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a1a', // primary-dark
          gray: '#333333',    // primary-gray
        },
        secondary: {
          DEFAULT: '#666666', // secondary-gray
          light: '#999999',   // light-gray
        },
        accent: {
          emerald: '#16a085',
          crimson: '#c0392b',
          'emerald-light': '#e8f5f0',
          'crimson-light': '#fdeaea',
        },
        background: {
          gray: '#f8f8f8',
          cream: '#fafafa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'none': 'var(--radius-none)',
        'sm': 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.7)',
        'glass-strong': 'rgba(255, 255, 255, 0.85)',
        'glass-subtle': 'rgba(255, 255, 255, 0.5)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}


