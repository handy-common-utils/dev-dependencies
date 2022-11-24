# @handy-common-utils/dev-dependencies

This package contains dependencies that are common

## How to use

### 1. Add as dependency

First, just add it as a dev dependency:

```sh
npm install -D @handy-common-utils/dev-dependencies
```

### 2. Copy common configuration files

For new project, you may want to copy some common configuration files for scaffolding 
Here's the command line for copying those files:

```
cp ./node_modules/@handy-common-utils/dev-dependencies/{tsconfig.json,.nycrc.yml,.eslintrc.yml,.eslintignore,.mocharc.yml} .
```

Feel free to modify them for your needs.

### 3. Update `package.json`

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

If you have command line scripts, you may want to use this line for `prepare`:

```json
  "prepare": "shx rm -rf dist && tsc && shx chmod +x dist/bin/*.js",
```
