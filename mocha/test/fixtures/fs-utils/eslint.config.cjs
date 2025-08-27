const { buildESLintConfig, customiseESLintConfig } = require('eslint-config-sensible-prettier-typescript');
const { defineConfig } = require('eslint/config');
const globals = require('globals');

const config = buildESLintConfig({ defaultSourceType: 'commonjs' });

customiseESLintConfig(
  config,
  (cfg) => [cfg.files].flat().some((f) => typeof f === 'string' && f.endsWith('.ts')),
  (cfg) => {
    cfg.languageOptions.globals = {
      ...globals.node,
      ...globals.mocha,
    };
  },
);

module.exports = defineConfig([
  // These global ignore patterns are just examples, feel free to remove or modify
  {
    ignores: ['dist', 'coverage', 'api-docs'],
  },
  ...config,
  // Add your customizations here
]);
