const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space/',
    defaultCommandTimeout: 10000,
    retries: { "runMode": 1, "openMode": 1 },
    video: false,
    screenshotOnRunFailure: true,
    testIsolation: true
  },
  env: {
    AUTH_EMAIL: `bohachenko.anna+test2@gmail.com`,
    AUTH_PASSWORD: `123456Qwerty`
  }
});
