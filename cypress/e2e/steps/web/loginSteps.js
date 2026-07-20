/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../../support/pages/LoginPage";

Given('que estou na página de login', () => {
    cy.log('Acessando a página de login')
    loginPage.visit()
})

When('eu informo minhas credenciais válidas', () => {
    loginPage.fillEmail(Cypress.env('loginEmail'))
    loginPage.fillPassword(Cypress.env('loginPassword'))
})

When('eu informo um email válido e senha inválida {string}', (senhaInvalida) => {
    loginPage.fillEmail(Cypress.env('loginEmail'))
    loginPage.fillPassword(senhaInvalida)
})

And('clico no botão de login', () => {
    loginPage.clickLoginButton()
})

Then('devo logar no sistema corretamente', () => {
    loginPage.validateLoggedIn()
})

Then('mensagem de credenciaL inválida deve ser exibida', () => {
    loginPage.validateInvalidCredentials()
})
