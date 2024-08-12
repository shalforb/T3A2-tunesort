module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };