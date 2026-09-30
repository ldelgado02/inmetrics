/// <reference types="cypress" />
import { When, Then, And } from "cypress-cucumber-preprocessor/steps";
import loginService from "../../../support/services/LoginService";
import { parseJsonBody } from "../../../support/services/parseJsonBody";

let resposta;

function normalizarResposta(res) {
    resposta = { ...res, body: parseJsonBody(res) }
}

When('eu envio um POST para verifyLogin com credenciais válidas', () => {
    loginService.verifyLogin(Cypress.env('loginEmail'), Cypress.env('loginPassword')).then(normalizarResposta)
})

When('eu envio um POST para verifyLogin sem o parâmetro email', () => {
    loginService.verifyLogin(undefined, Cypress.env('loginPassword')).then(normalizarResposta)
})

When('eu envio um POST para verifyLogin com credenciais inválidas', () => {
    loginService.verifyLogin('email-nao-cadastrado@teste.com', 'senhaErrada123').then(normalizarResposta)
})

Then('o response code retornado deve ser {int}', (codigoEsperado) => {
    // Essa API sempre retorna HTTP 200 de verdade; o "response code"
    // documentado vem dentro do corpo JSON, no campo responseCode.
    expect(resposta.body.responseCode).to.eq(codigoEsperado)
})

And('a mensagem deve conter {string}', (mensagemEsperada) => {
    expect(resposta.body.message).to.include(mensagemEsperada)
})
