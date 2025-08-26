const { eslintConfig } = require('eslint-config-sensible-prettier-typescript');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  ...eslintConfig(),
  // Add your customizations here
]);
