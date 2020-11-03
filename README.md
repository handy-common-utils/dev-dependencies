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

Feel free to modify them for your needs.

These scripts can be added to your `package.json`:

```json
"scripts": {
  "pretest": "eslint . --ext .ts",
  "test": "nyc mocha -r ts-node/register test/**/*spec.ts",
  "prepare": "shx rm -rf dist && tsc",
  "preversion": "generate-api-docs-and-update-readme && git add README.md"
}
```

If you have command line scripts, use this line for `prepare`:

```json
  "prepare": "shx rm -rf dist && tsc && shx chmod +x dist/bin/*.js",
```