# Dev Dependencies with Mocha/Chai/Istanbul/nyc: @handy-common-utils/dev-dependencies-mocha

This package provides recommended dev dependencies for projects using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Istanbul/nyc](https://istanbul.js.org/) as the test runner.
It can be used to accelerate the scaffolding of TypeScript projects.

[![Version](https://img.shields.io/npm/v/@handy-common-utils/dev-dependencies-mocha.svg)](https://npmjs.org/package/@handy-common-utils/dev-dependencies-mocha)
[![Downloads/week](https://img.shields.io/npm/dw/@handy-common-utils/dev-dependencies-mocha.svg)](https://npmjs.org/package/@handy-common-utils/dev-dependencies-mocha)

If you don't like `mocha`, try one of these instead:

- [@handy-common-utils/dev-dependencies-jest](https://www.npmjs.com/package/@handy-common-utils/dev-dependencies-jest) - Dev dependencies with `Jest` as the testing framework.
- [@handy-common-utils/dev-dependencies-common](https://www.npmjs.com/package/@handy-common-utils/dev-dependencies-common) - Dev dependencies without a testing framework.

## Getting Started

### 0. Create the project

If not yet, you can start a new project using `npm init`.

### 1. Add as dependency

Just add it as a dev dependency:

```sh
npm install -D @handy-common-utils/dev-dependencies-mocha
```

### 2. Copy common configuration files

For new projects, you may want to copy these common configuration files to start with.
Here's the command line for copying those files:

```
cp ./node_modules/@handy-common-utils/dev-dependencies-mocha/{tsconfig.json,eslint.config.cjs,.prettierignore,prettier.config.cjs,.mocharc.yml,.nycrc.yml} .
```

Feel free to modify them to suit your needs.

### 3. Update `package.json`

#### Scripts

If you are developing an NPM package, you may want to add these to your `package.json`:

```json
"scripts": {
  "format:all": "prettier --write --ignore-unknown .",
  "pretest": "eslint .",
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
  "pretest": "eslint .",
  "test": "nyc mocha",
  "compile": "shx rm -rf dist && tsc",
  "start": "npm run compile && node dist/index.js"
},
```

If you have command line scripts, you may want to use this line for `prepare`:

```json
  "prepare": "npm run compile && shx chmod +x dist/bin/*.js",
```

#### Prettier in pre-commit hook

If you'd like to use Prettier in a pre-commit hook, you can add `husky` to the `prepare` script in your `package.json`.

Also, these need to be added to `package.json`:

```json
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
```

And these two files need to be added to the `.husky` directory:

`.gitignore`:

```
-
```

`pre-commit`:

```shell
npx lint-staged
```

### 4. Start coding!

By default, your code goes to `src/`, test cases go to `test/`, and compiled `.js` files go to `dist/`.
Feel free to change the configurations if this convention does not suit your needs.
