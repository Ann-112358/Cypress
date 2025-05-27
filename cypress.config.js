const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space/',
    defaultCommandTimeout: 3000,
    retries: { "runMode": 1, "openMode": 2 },
    video: false,
    screenshotOnRunFailure: true,
    testIsolation: true
  },
});
