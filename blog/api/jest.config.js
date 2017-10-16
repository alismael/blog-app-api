module.exports = {
    testEnvironment: 'node',
    transform: {
      '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
    },
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js',
      'jsx',
    ],
    testRegex: '(/__tests__/.spec.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.{ts,tsx,js,jsx}',
      '!src/**/*.d.ts'
    ],
  };