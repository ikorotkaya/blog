/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Literata', 'sans-serif']
      }
    },
    colors: {
      smalt: {
        50: '#f3f7f8',
        100: '#e1ebec',
        200: '#c6d9db',
        300: '#9fbec1',
        400: '#709ba0',
        500: '#568186',
        600: '#496b71',
        700: '#40595e',
        800: '#3a4c50',
        900: '#344245',
        950: '#1f2a2d'
      },
      tapa: {
        50: '#f4f3f2',
        100: '#e2e1df',
        200: '#c7c4c1',
        300: '#a7a29d',
        400: '#8e8781',
        500: '#78716c',
        600: '#6d6561',
        700: '#585250',
        800: '#4d4846',
        900: '#443f3f',
        950: '#262322'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
