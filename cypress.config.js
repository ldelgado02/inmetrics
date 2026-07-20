const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");
const { allureCypress } = require("allure-cypress/reporter");
require("dotenv").config();

const options = browserify.defaultOptions;
options.browserifyOptions.transform[1][1].global = true;
options.browserifyOptions.transform[1][1].ignore = [/node_modules\/(?!allure-cypress)/];

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    specPattern: "**/*.feature",
    env: {
      loginEmail: process.env.LOGIN_EMAIL,
      loginPassword: process.env.LOGIN_PASSWORD,
      trelloActionId: process.env.TRELLO_ACTION_ID,
    },
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber(options));
      allureCypress(on, config);
      return config;
    },
  },
});