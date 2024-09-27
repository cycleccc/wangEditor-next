const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:8881',
    specPattern: './**/*.spec.{js,ts}',
  },
})
