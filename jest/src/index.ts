import type { Linter } from 'eslint';

import { buildJsConfig, buildTsConfig, buildESLintConfig as originalBuildESLintConfig } from 'eslint-config-sensible-prettier-typescript';
import globals from 'globals';

export { buildJsConfig, buildPrettierConfig, buildTsConfig, customiseESLintConfig } from 'eslint-config-sensible-prettier-typescript';

/**
 * Builds a TypeScript Jest-specific ESLint configuration object.
 * @param files File patterns to apply this configuration to. Or if unspecified the default `['**\/*.test.ts', '**\/*.test.int.ts']` will be used.
 * @param languageOptions Additional language options to merge
 * @returns TypeScript Jest-specific ESLint configuration object
 */
export function buildTestTsConfig(files?: Linter.Config['files'], languageOptions?: Linter.Config['languageOptions']): Linter.Config {
  const tsConfig = buildTsConfig(files, languageOptions);
  return {
    ...tsConfig,
    files: files ?? ['**/*.test.ts', '**/*.test.int.ts'],
    languageOptions: {
      ...tsConfig.languageOptions,
      globals: {
        ...globals.node,
        ...globals.jest,
        ...tsConfig.languageOptions?.globals,
      },
    },
    plugins: {
      ...tsConfig.plugins,
    },
    rules: {
      ...tsConfig.rules,
    },
  };
}

/**
 * Builds a JavaScript Jest-specific ESLint configuration object.
 * @param files File patterns to apply this configuration to. Or if unspecified the default `['**\/*.test.js', '**\/*.test.int.js']` will be used.
 * @param languageOptions Additional language options to merge
 * @returns JavaScript Jest-specific ESLint configuration object
 */
export function buildTestJsConfig(files?: Linter.Config['files'], languageOptions?: Linter.Config['languageOptions']): Linter.Config {
  const jsConfig = buildJsConfig(files, languageOptions);
  return {
    ...jsConfig,
    files: files ?? ['**/*.test.js', '**/*.test.int.js'],
    languageOptions: {
      ...jsConfig.languageOptions,
      globals: {
        ...globals.node,
        ...globals.jest,
        ...jsConfig.languageOptions?.globals,
      },
    },
    plugins: {
      ...jsConfig.plugins,
    },
    rules: {
      ...jsConfig.rules,
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
 * - Jest friendly rules
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
  return [...config, buildTestTsConfig(), buildTestJsConfig()];
}
