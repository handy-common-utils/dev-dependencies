# @handy-common-utils/dev-dependencies-common

A shared set of recommended development dependencies for TypeScript projects.

This package is designed to speed up project setup by providing a consistent baseline of dev tooling across projects.

[![Version](https://img.shields.io/npm/v/@handy-common-utils/dev-dependencies-common.svg)](https://npmjs.org/package/@handy-common-utils/dev-dependencies-common)
[![Downloads/week](https://img.shields.io/npm/dw/@handy-common-utils/dev-dependencies-common.svg)](https://npmjs.org/package/@handy-common-utils/dev-dependencies-common)

## Usage

You can use this package directly if you don't need a testing framework, or if you prefer to choose and configure your own. Just add it as a dev-dependency of your project:

```sh
npm install -D @handy-common-utils/dev-dependencies-common
```

In most cases, however, you'll likely want to use one of the following presets that are built on top of it:

- [@handy-common-utils/dev-dependencies-mocha](https://www.npmjs.com/package/@handy-common-utils/dev-dependencies-mocha) - Adds `Mocha`, `Chai`, and `c8` for testing and coverage.
- [@handy-common-utils/dev-dependencies-jest](https://www.npmjs.com/package/@handy-common-utils/dev-dependencies-jest) - Adds `Jest` for testing and coverage.
