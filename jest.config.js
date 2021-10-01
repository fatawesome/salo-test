module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/tests/fileTransformer.js'
  }
}
