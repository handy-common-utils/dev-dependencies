import type { Linter } from 'eslint';

import { buildJsConfig, buildTsConfig, buildESLintConfig as originalBuildESLintConfig } from 'eslint-config-sensible-prettier-typescript';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pluginChaiFriendly = require('eslint-plugin-chai-friendly');
import globals from 'globals';

export { buildJsConfig, buildPrettierConfig, buildTsConfig, customiseESLintConfig } from 'eslint-config-sensible-prettier-typescript';

/**
 * Builds a TypeScript Mocha/Chai -specific ESLint configuration object.
 * @param files File patterns to apply this configuration to. Or if unspecified the default `['**\/*.spec.ts', '**\/*.spec.int.ts']` will be used.
 * @param languageOptions Additional language options to merge
 * @returns TypeScript Mocha/Chai -specific ESLint configuration object
 */
export function buildSpecTsConfig(files?: Linter.Config['files'], languageOptions?: Linter.Config['languageOptions']): Linter.Config {
  const tsConfig = buildTsConfig(files, languageOptions);
  return {
    ...tsConfig,
    files: files ?? ['**/*.spec.ts', '**/*.spec.int.ts'],
    languageOptions: {
      ...tsConfig.languageOptions,
      globals: {
        ...globals.node,
        ...globals.mocha,
        ...tsConfig.languageOptions?.globals,
      },
    },
    plugins: {
      ...tsConfig.plugins,
      'chai-friendly': pluginChaiFriendly,
    },
    rules: {
      ...tsConfig.rules,
      'no-unused-expressions': 'off', // disable original rule
      '@typescript-eslint/no-unused-expressions': 'off', // disable TypeScript ESLint version
      'chai-friendly/no-unused-expressions': 'warn',
    },
  };
}

/**
 * Builds a JavaScript Mocha/Chai -specific ESLint configuration object.
 * @param files File patterns to apply this configuration to. Or if unspecified the default `['**\/*.spec.js', '**\/*.spec.int.js']` will be used.
 * @param languageOptions Additional language options to merge
 * @returns JavaScript Mocha/Chai -specific ESLint configuration object
 */
export function buildSpecJsConfig(files?: Linter.Config['files'], languageOptions?: Linter.Config['languageOptions']): Linter.Config {
  const jsConfig = buildJsConfig(files, languageOptions);
  return {
    ...jsConfig,
    files: files ?? ['**/*.spec.js', '**/*.spec.int.js'],
    languageOptions: {
      ...jsConfig.languageOptions,
      globals: {
        ...globals.node,
        ...globals.mocha,
        ...jsConfig.languageOptions?.globals,
      },
    },
    plugins: {
      ...jsConfig.plugins,
      'chai-friendly': pluginChaiFriendly,
    },
    rules: {
      ...jsConfig.rules,
      'no-unused-expressions': 'off', // disable original rule
      'chai-friendly/no-unused-expressions': 'warn',
    },
  };
}

/**
 * Builds a complete ESLint 9 flat configuration array.
 *
 * This function returns a comprehensive ESLint configuration that includes:
 * - Global ignore patterns
 * - Base JavaScript recommended rules
 * - Prettier integration
 * - JSDoc rules
 * - TypeScript configurations for various file types
 * - JavaScript configurations for various file types
 * - Browser and Node.js globals where appropriate
 * - Mocha/Chai friendly rules
 *
 * @param options - Optional configuration options.
 *   - defaultSourceType: Default source type for TypeScript and JavaScript files that don't have source type indicated in the file name extension.
 *
 * @returns Complete ESLint flat configuration array
 *
 * @example
 * ```javascript
 * const { defineConfig } = require('eslint/config');
 *
 * // Use the complete configuration
 * const config = buildESLintConfig();
 *
 * // Extend with custom rules
 * module.exports = defineConfig([
 *   ...config,
 *   { rules: { 'no-console': 'warn' } }
 * ]);
 * ```
 */
export function buildESLintConfig(options: Parameters<typeof originalBuildESLintConfig>[0]): Linter.Config[] {
  const config = originalBuildESLintConfig(options);
  return [...config, buildSpecTsConfig(), buildSpecJsConfig()];
}
