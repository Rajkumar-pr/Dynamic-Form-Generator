module.exports = {
    preset: 'jest-playwright-preset',
    testEnvironment: 'jest-playwright-preset/lib/PlaywrightEnvironment',
    setupFilesAfterEnv: ['expect-playwright'],
    testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).[jt]s?(x)'],
  };
  