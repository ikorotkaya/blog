/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
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
};
