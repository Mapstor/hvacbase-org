/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#172554',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
        },
        success: '#16a34a',
        warning: '#ea580c',
        danger: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.brand.600'),
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: theme('colors.brand.300'),
              '&:hover': {
                color: theme('colors.brand.800'),
              },
            },
            'h2, h3, h4': {
              scrollMarginTop: '5rem',
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
