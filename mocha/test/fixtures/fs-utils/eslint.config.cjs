const { eslintConfig } = require('eslint-config-sensible-prettier-typescript');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  // These global ignore patterns are just examples, feel free to remove or modify
  {
    ignores: ['dist', 'coverage', 'api-docs'],
  },
  ...eslintConfig(),
  // Add your customizations here
]);
