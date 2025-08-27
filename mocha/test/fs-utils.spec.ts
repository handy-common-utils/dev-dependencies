import { expect } from 'chai';
import { describe, it } from 'mocha';
import { $, cd, fs, path, ProcessOutput, within } from 'zx';

async function withinFsUtils<R>(callback: () => R | Promise<R>): Promise<R> {
  return within(async () => {
    cd(path.join(__dirname, 'fixtures/fs-utils'));
    return callback();
  });
}

async function withChangedFile(file: string, change: (content: string) => string, callback: () => Promise<void>): Promise<void> {
  const originalContent = fs.readFileSync(file, 'utf8');
  const changedContent = change(originalContent);
  expect(changedContent).to.not.equal(originalContent);
  fs.writeFileSync(file, changedContent);
  try {
    await callback();
  } finally {
    fs.writeFileSync(file, originalContent);
  }
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
      // eslint-disable-next-line unicorn/consistent-function-scoping
      function readFileContentAndTimestamp() {
        return {
          content: fs.readFileSync('README.md', 'utf8'),
          timestamp: fs.statSync('README.md').mtimeMs,
        };
      }
      const originalReadme = readFileContentAndTimestamp();
      expect(originalReadme.content).to.include('<!-- API start -->');
      await withChangedFile(
        'README.md',
        (content) => content.replace('<!-- API start -->', '<!-- API start -->\n<!-- This is a test comment -->'),
        async () => {
          expect(readFileContentAndTimestamp().content).to.include('<!-- This is a test comment -->');
          await $`node ../../../../node_modules/@handy-common-utils/dev-utils/dist/bin/generate-api-docs-and-update-readme.js`;
          const updatedReadme = readFileContentAndTimestamp();
          expect(updatedReadme.content).to.equal(originalReadme.content);
          expect(updatedReadme.timestamp).not.to.equal(originalReadme.timestamp);
        },
      );
    });
  });

  it('should "npm test" fail when there\'s compilation error in src', async () => {
    await withinFsUtils(async () => {
      await withChangedFile(
        'src/fs-utils.ts',
        (content) => content.replace('Promise.', 'Promise1.'),
        async () => {
          try {
            const output = await $`npm test`;
            expect(output.exitCode).to.equal(1);
          } catch (error) {
            const output = error as ProcessOutput;
            expect(output.exitCode).to.equal(1);
          }
        },
      );
    });
  });
  it('should "npm test" fail when there\'s compilation error in test', async () => {
    await withinFsUtils(async () => {
      await withChangedFile(
        'test/fs-utils.spec.ts',
        (content) => content.replace('FsUtils.replaceInFiles', 'FsUtils.replaceInFiles2'),
        async () => {
          try {
            const output = await $`npm test`;
            expect(output.exitCode).to.equal(1);
          } catch (error) {
            const output = error as ProcessOutput;
            expect(output.exitCode).to.equal(1);
          }
        },
      );
    });
  });
  it('should "npm test" fail when there\'s test case failed', async () => {
    await withinFsUtils(async () => {
      await withChangedFile(
        'test/fs-utils.spec.ts',
        (content) => content.replace('.to.', '.to.not.'),
        async () => {
          try {
            const output = await $`npm test`;
            expect(output.exitCode).to.equal(1);
          } catch (error) {
            const output = error as ProcessOutput;
            expect(output.exitCode).to.equal(1);
          }
        },
      );
    });
  });
});
