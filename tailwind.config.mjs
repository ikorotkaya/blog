/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Literata', 'sans-serif']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral'),
            a: {
              color: theme('colors.neutral'),
              fontSize: '1.1em',
              '&:hover': {
                color: theme('colors.smalt')
              }
            },
            p: {
              color: theme('colors.neutral'),
              fontSize: '1.1em',
            },
            h1: {
              color: theme('colors.neutral'),
              fontSize: '1.9em',
              fontWeight: '400',
            },
            h2: {
              color: theme('colors.neutral'),
              fontSize: '1.3em',
              fontWeight: '400',
            },
          }
        }
      })
    },
    colors: {
      smalt: '#889EAA',
      neutral: '#171717',
      tapa: {
        50: '#f4f3f2',
        100: '#e2e1df'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
