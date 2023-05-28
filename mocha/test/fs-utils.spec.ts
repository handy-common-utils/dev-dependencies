import { describe, it } from 'mocha';
import 'zx/globals';

async function withinFsUtils<R>(callback: () => R|Promise<R>): Promise<R> {
  return within(async () => {
    cd('test/fixtures/fs-utils');
    return Promise.resolve(callback());
  })
}

describe('Test project fs-utils', function () {
  this.timeout(60000);
  it('npm ci', async () => {
    await withinFsUtils(async () => {
      await $`npm ci`;
    });
  });
  it('npm test', async () => {
    await withinFsUtils(async () => {
      await $`npm test`;
    });
  });
  it('generate-api-docs-and-update-readme', async () => {
    await withinFsUtils(async () => {
      await $`node ../../../../node_modules/@handy-common-utils/dev-utils/dist/bin/generate-api-docs-and-update-readme.js`;
    });
  });
});
