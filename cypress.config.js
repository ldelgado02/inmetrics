const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");
const { allureCypress } = require("allure-cypress/reporter");

const options = browserify.defaultOptions;
options.browserifyOptions.transform[1][1].global = true;
options.browserifyOptions.transform[1][1].ignore = [/node_modules\/(?!allure-cypress)/];

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber(options));
      allureCypress(on, config);
      return config;
    },
  },
});