# @handy-common-utils/dev-dependencies

This package contains dependencies that are common

## How to use

First, just add it as a dev dependency:

```sh
npm install -D @handy-common-utils/dev-dependencies
```

For new project, you may want to copy these files from `./node_modules/@handy-common-utils/dev-dependencies/` into your project's root directory:

* `tsconfig.json`
* `.nycrc.yml`
* `.eslintrc.yml`
* `.eslintignore`

Here's the command line for copying those files:

```
cp ./node_modules/@handy-common-utils/dev-dependencies/{tsconfig.json,.nycrc.yml,.eslintrc.yml} .
```

Feel free to modify them for your needs.

If you are developing for a NPM package, these scripts can be added to your `package.json`:

```json
"scripts": {
  "pretest": "eslint . --ext .ts",
  "test": "nyc mocha -r ts-node/register test/**/*spec.ts",
  "prepare": "shx rm -rf dist && tsc",
  "preversion": "generate-api-docs-and-update-readme && git add README.md"
},
```

If you are developing a command line tool, these can be added to your `package.json`:

```json
"main": "dist/index.js",
"scripts": {
  "pretest": "eslint . --ext .ts",
  "test": "nyc mocha",
  "prepare": "shx rm -rf dist && tsc",
  "start": "npm run prepare && node dist/index.js"
},
```

If you have command line scripts, use this line for `prepare`:

```json
  "prepare": "shx rm -rf dist && tsc && shx chmod +x dist/bin/*.js",
```
