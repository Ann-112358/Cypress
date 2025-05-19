const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    //baseUrl: 'https://qauto.forstudy.space/',
    defaultCommandTimeout: 5000,
    retries: { "runMode": 2, "openMode": 3 },
    video: false,
    screenshotOnRunFailure: true,
    testIsolation: true
  },
});
