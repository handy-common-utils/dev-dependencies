import { describe, it, expect, jest } from '@jest/globals';
import { within, cd, $, ProcessOutput, fs } from 'zx';

async function withinFsUtils<R>(callback: () => R|Promise<R>): Promise<R> {
  return within(async () => {
    cd('test/fixtures/fs-utils');
    return Promise.resolve(callback());
  })
}

async function withChangedFile(file: string, change: (content: string) => string, callback: () => Promise<void>): Promise<void> {
  const originalContent = fs.readFileSync(file, 'utf8');
  const changedContent = change(originalContent);
  expect(changedContent).not.toEqual(originalContent);
  fs.writeFileSync(file, changedContent);
  try {
    await callback();
  } finally {
    fs.writeFileSync(file, originalContent);
  }
}

jest.setTimeout(60000);
describe('Test project fs-utils', function () {
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
      function readFileContent() {
        return fs.readFileSync('README.md', 'utf8');
      }
      const originalReadme = readFileContent();
      await $`node ../../../../node_modules/@handy-common-utils/dev-utils/dist/bin/generate-api-docs-and-update-readme.js`;
      const updatedReadme = readFileContent();
      expect(updatedReadme).toEqual(originalReadme);
    });
  });

  it(`should "npm test" fail when there's compilation error in src`, async () => {
    await withinFsUtils(async () => {
      await withChangedFile('src/fs-utils.ts', content => content.replace('Promise.', 'Promise1.'), async () => {
        try {
          const output = await $`npm test`;
          expect(output.exitCode).toEqual(1);
        } catch (error) {
          console.log(error);
          const output = error as ProcessOutput;
          expect(output.exitCode).toEqual(1);
        }
      });
    });
  });
  it(`should "npm test" fail when there's compilation error in test`, async () => {
    await withinFsUtils(async () => {
      await withChangedFile('test/fs-utils.spec.ts', content => content.replace('FsUtils.replaceInFiles', 'FsUtils.replaceInFiles2'), async () => {
        try {
          const output = await $`npm test`;
          expect(output.exitCode).toEqual(1);
        } catch (error) {
          const output = error as ProcessOutput;
          expect(output.exitCode).toEqual(1);
        }
      });
    });
  });
  it(`should "npm test" fail when there's test case failed`, async () => {
    await withinFsUtils(async () => {
      await withChangedFile('test/fs-utils.spec.ts', content => content.replace('.toEqual(', '.not.toEqual('), async () => {
        try {
          const output = await $`npm test`;
          expect(output.exitCode).toEqual(1);
        } catch (error) {
          const output = error as ProcessOutput;
          expect(output.exitCode).toEqual(1);
        }
      });
    });
  });
});
