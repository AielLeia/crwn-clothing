/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    'component|style',
    '(action|reducer|selector|types)',
    'util',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
