# @handy-common-utils/dev-dependencies-mocha

This package contains dependencies that are common, including `mocha`, `chai` and `nyc`.
It can be used to accelerate the scaffolding of Typescript projects.

[![Version](https://img.shields.io/npm/v/@handy-common-utils/dev-dependencies-mocha.svg)](https://npmjs.org/package/@handy-common-utils/dev-dependencies-mocha)
[![Downloads/week](https://img.shields.io/npm/dw/@handy-common-utils/dev-dependencies-mocha.svg)](https://npmjs.org/package/@handy-common-utils/dev-dependencies-mocha)

If you don't like `mocha`, try one of these instead:

- [@handy-common-utils/dev-dependencies-common](../common) - Common dev dependencies without a testing framework.
- [@handy-common-utils/dev-dependencies-jest](../jest) - Common dev dependencies, including @handy-common-utils/dev-dependencies-common, `jest`, etc.

## How start a new project with `@handy-common-utils/dev-dependencies-mocha`

### 0. Initialise NPM

This can be done through `npm init`.

### 1. Add as dependency

Just add it as a dev dependency:

```sh
npm install -D @handy-common-utils/dev-dependencies-mocha
```

### 2. Copy common configuration files

For new projects, you may want to copy some common configuration files to start with.
Here's the command line for copying those files:

```
cp ./node_modules/@handy-common-utils/dev-dependencies-mocha/{tsconfig.json,.eslintrc.yml,.eslintignore,.prettierignore,.prettierrc.json,.mocharc.yml,.nycrc.yml} .
```

Feel free to modify them to suit your needs.

### 3. Update `package.json`

#### Scripts

If you are developing an NPM package, you may want to add these to your `package.json`:

```json
"scripts": {
  "format:all": "prettier --write --ignore-unknown .",
  "pretest": "eslint . --ext .ts",
  "test": "nyc mocha",
  "compile": "shx rm -rf dist && tsc",
  "prepack": "npm run compile",
  "prepublish": "npm run compile",
  "preversion": "generate-api-docs-and-update-readme && git add README.md"
},
```

If you are developing a command line tool, you may want to add these instead:

```json
"main": "dist/index.js",
"scripts": {
  "format:all": "prettier --write --ignore-unknown .",
  "pretest": "eslint . --ext .ts",
  "test": "nyc mocha",
  "compile": "shx rm -rf dist && tsc",
  "start": "npm run compile && node dist/index.js"
},
```

If you have command line scripts, you may want to use this line for `prepare`:

```json
  "prepare": "npm run compile && shx chmod +x dist/bin/*.js",
```

#### Prettier in pre commit hook

If you'd like to use prettier in pre commit hook, you can add `husky install` to the `prepare` script in your `package.json`.

And also these need to be added to `package.json`:

```json
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
```

And these two files need to be added to `.husky` directory:

File `.gitignore`:

```
-
```

File `pre-commit`:

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### 4. Start coding!

By default your code goes to `src/`, test cases go to `test/`, and compiled `.js` files go to `dist/`.
Feel free to change the configurations if this convention does not suit your needs.
