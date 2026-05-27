/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: '0.9375rem',
            color: theme('colors.neutral'),
            lineHeight: '1.75',
            a: {
              color: theme('colors.neutral'),
              '&:hover': {
                color: theme('colors.sage')
              }
            },
            p: {
              color: theme('colors.neutral'),
              fontSize: '1em',
              lineHeight: '1.75'
            },
            h1: {
              color: theme('colors.neutral'),
              fontSize: '1.8em',
              fontWeight: '300',
              marginTop: '0',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            },
            h2: {
              color: theme('colors.neutral'),
              fontSize: '1.4em',
              fontWeight: '300',
              letterSpacing: '-0.015em'
            },
            h3: {
              color: theme('colors.neutral'),
              fontSize: '1.05em',
              fontWeight: '500',
              letterSpacing: '-0.01em'
            },
            strong: {
              fontWeight: '500'
            },
            pre: {
              borderLeft: `2px solid ${theme('colors.sage')}`,
              borderRadius: '4px',
              padding: '1.25rem 1.5rem',
              boxShadow: 'none',
              overflowX: 'auto'
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: '0',
              fontWeight: '400',
              fontSize: '0.875em',
              fontFamily: '"JetBrains Mono", monospace'
            },
            code: {
              backgroundColor: theme('colors.code'),
              color: theme('colors.neutral'),
              borderRadius: '3px',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              fontWeight: '400',
              fontSize: '0.875em'
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' }
          }
        }
      })
    },
    colors: {
      sage: '#97B3AE',
      neutral: '#111111',
      canvas: '#F4F3EF',
      muted: '#666666',
      code: '#EDEAE4',
      tapa: {
        50: '#f4f3f2',
        100: '#e2e1df'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
