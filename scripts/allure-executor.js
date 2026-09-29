/**
 * Gera allure-results/executor.json com os dados da execução no GitHub Actions
 * (número do run, link do run e link do relatório publicado no GitHub Pages).
 * O Allure usa esse arquivo no widget "Executors" e para ligar cada ponto do
 * gráfico de Tendência ao run correspondente.
 *
 * Fora do GitHub Actions o script não faz nada, para não afetar o fluxo local.
 */
const fs = require("fs");
const path = require("path");

const {
  GITHUB_ACTIONS,
  GITHUB_SERVER_URL,
  GITHUB_REPOSITORY,
  GITHUB_RUN_ID,
  GITHUB_RUN_NUMBER,
  GITHUB_RUN_ATTEMPT,
  GITHUB_WORKFLOW,
  GITHUB_REF_NAME,
  ALLURE_REPORT_URL,
} = process.env;

if (!GITHUB_ACTIONS) {
  console.log("allure-executor: fora do GitHub Actions, executor.json não gerado.");
  process.exit(0);
}

const [owner, repo] = GITHUB_REPOSITORY.split("/");
const reportUrl = ALLURE_REPORT_URL || `https://${owner}.github.io/${repo}/`;
const runUrl = `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`;
const attempt = GITHUB_RUN_ATTEMPT && GITHUB_RUN_ATTEMPT !== "1" ? ` (tentativa ${GITHUB_RUN_ATTEMPT})` : "";

const executor = {
  name: "GitHub Actions",
  type: "github",
  url: `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions`,
  buildOrder: Number(GITHUB_RUN_NUMBER),
  buildName: `${GITHUB_WORKFLOW} #${GITHUB_RUN_NUMBER}${attempt} (${GITHUB_REF_NAME})`,
  buildUrl: runUrl,
  reportUrl,
  reportName: "Relatório de testes - Inmetrics",
};

const resultsDir = path.resolve(__dirname, "..", "allure-results");
fs.mkdirSync(resultsDir, { recursive: true });
fs.writeFileSync(path.join(resultsDir, "executor.json"), JSON.stringify(executor, null, 2));

console.log("allure-executor: executor.json gerado", executor);
