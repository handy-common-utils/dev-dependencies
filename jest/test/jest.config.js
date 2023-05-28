/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'test/tsconfig.json',
      },
    ],
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/fixtures/',
  ],
};
