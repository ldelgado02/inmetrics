const os = require("os");
const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");
const { allureCypress } = require("allure-cypress/reporter");
require("dotenv").config();

const options = browserify.defaultOptions;
options.browserifyOptions.transform[1][1].global = true;
options.browserifyOptions.transform[1][1].ignore = [/node_modules\/(?!allure-cypress)/];

const isCI = !!process.env.CI;

// Categorias exibidas na aba "Categories" do Allure. A ordem importa:
// cada teste entra na primeira categoria cujo filtro corresponder.
// (?s) permite que o regex atravesse mensagens de erro com várias linhas.
const allureCategories = [
  {
    name: "Falha de rede / serviço externo",
    matchedStatuses: ["failed", "broken"],
    messageRegex: "(?s).*(cy\\.request\\(\\) failed|cy\\.visit\\(\\) failed|ECONNREFUSED|ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up).*",
  },
  {
    name: "Timeout / elemento não encontrado",
    matchedStatuses: ["failed", "broken"],
    messageRegex: "(?s).*Timed out retrying.*",
  },
  {
    name: "Falha de asserção (possível defeito do produto)",
    matchedStatuses: ["failed"],
  },
  {
    name: "Erro no código de teste",
    matchedStatuses: ["broken"],
  },
];

module.exports = defineConfig({
  // Vídeo só no CI: facilita investigar falhas no runner sem pesar a execução local
  video: isCI,
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
      allureCypress(on, config, {
        environmentInfo: {
          "Base URL": config.baseUrl,
          "Cypress": config.version,
          "Node": process.version,
          "OS": `${os.type()} ${os.release()}`,
          "Execução": process.env.GITHUB_ACTIONS ? "GitHub Actions" : isCI ? "CI" : "Local",
          ...(process.env.GITHUB_REF_NAME && { "Branch": process.env.GITHUB_REF_NAME }),
          ...(process.env.GITHUB_SHA && { "Commit": process.env.GITHUB_SHA.slice(0, 7) }),
        },
        categories: allureCategories,
      });
      return config;
    },
  },
});