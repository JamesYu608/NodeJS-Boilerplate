require('dotenv').config()

module.exports = {
  bail: true,
  verbose: true,
  modulePaths: [
    '<rootDir>/src',
  ],
  setupFilesAfterEnv: ['./integrationSetup'],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/test/',
  ]
}
