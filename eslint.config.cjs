const { buildESLintConfig } = require('eslint-config-sensible-prettier-typescript');
const { defineConfig } = require('eslint/config');

const config = buildESLintConfig({ defaultSourceType: 'commonjs' });

module.exports = defineConfig([
  // These global ignore patterns are just examples, feel free to remove or modify
  {
    ignores: ['mocha/test/fixtures/**/*', 'jest/test/fixtures/**/*'],
  },
  ...config,
  // Add your customizations here
  {
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
]);
