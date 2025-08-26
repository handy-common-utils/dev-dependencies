const { prettierConfig } = require('eslint-config-sensible-prettier-typescript');

module.exports = {
  ...prettierConfig(),
  // Override or extend the default config
};
