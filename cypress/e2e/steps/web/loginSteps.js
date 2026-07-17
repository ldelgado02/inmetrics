/// < reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('que estou na página de login', () => {
    cy.log('Acessando a página de login')
    cy.visit('https://www.automationexercise.com/login')
})

When('eu preecho o email {string} e a senha {string}', (email, senha) => {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)
})

And('clico no botão de login', () => {
    cy.get('[data-qa="login-button"]').click()
})

Then('devo logar no sistema corretamente', () => {
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible')
})


Then('mensagem de credenciaL inválida deve ser exibida', () => {
    cy.get('.login-form > form > p').should('contain', 'incorrect')
})