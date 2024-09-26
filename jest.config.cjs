module.exports = {
  roots: ['<rootDir>/packages'],
  testEnvironment: 'jsdom',
  testMatch: ['**/(*.)+(spec|test).+(ts|js|tsx)'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
    '^.+\\.js$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/tests/utils/stylesMock.js',
  },
  transformIgnorePatterns: ['node_modules/(?!html-void-elements)'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup/index.ts'],
  // just collect basic module
  collectCoverageFrom: [
    '<rootDir>/packages/{basic-modules,code-highlight,core,editor,list-module,table-module,upload-image-module,video-module}/src/**/*.(ts|tsx)',
  ],
  coveragePathIgnorePatterns: [
    'dist',
    'locale',
    'index.ts',
    'config.ts',
    'browser-polyfill.ts',
    'node-polyfill.ts',
    '/node_modules/',
    '\\.d\\.ts$',
  ],
}
