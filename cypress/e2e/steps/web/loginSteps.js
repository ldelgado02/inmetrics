/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../../support/pages/LoginPage";

Given('que estou na página de login', () => {
    cy.log('Acessando a página de login')
    loginPage.visit()
})

When('eu preecho o email {string} e a senha {string}', (email, senha) => {
    loginPage.fillEmail(email)
    loginPage.fillPassword(senha)
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
