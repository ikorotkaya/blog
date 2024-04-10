/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 70,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none',
  bracketSpacing: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}
