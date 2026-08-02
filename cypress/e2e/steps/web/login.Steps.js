/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../../support/pages/LoginPage";
import signupPage from "../../../support/pages/SignupPage";
import dataProvider from "../../../support/data/DataProvider";

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

When('eu informo um e-mail não cadastrado e uma senha qualquer', () => {
    dataProvider.getUser().then((usuario) => {
        loginPage.fillEmail(usuario.email)
        loginPage.fillPassword(usuario.password)
    })
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

And('eu efetuo logout', () => {
    loginPage.clickLogout()
})

Then('devo ser redirecionado para a tela de login', () => {
    loginPage.validateLoggedOut()
})

When('eu preencho o formulário de cadastro com um novo usuário', () => {
    dataProvider.getUser().then((usuario) => {
        signupPage.startSignup(usuario.name, usuario.email)
        signupPage.fillAccountInformation(usuario)
    })
})

Then('a conta deve ser criada com sucesso', () => {
    signupPage.validateAccountCreated()
})

And('clico em continuar', () => {
    signupPage.clickContinue()
})

And('excluo a conta criada', () => {
    signupPage.deleteAccount()
})

Then('a conta deve ser removida com sucesso', () => {
    signupPage.validateAccountDeleted()
})
