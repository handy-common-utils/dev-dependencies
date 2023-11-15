/* eslint-disable unicorn/prefer-module, node/no-extraneous-require, unicorn/prefer-module */

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: [
    'sensible-prettier-typescript',
  ],
  parserOptions: { tsconfigRootDir: __dirname },
};
