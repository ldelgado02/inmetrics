/// <reference types="cypress" />

class LoginPage {
    emailInput = () => cy.get('[data-qa="login-email"]')
    passwordInput = () => cy.get('[data-qa="login-password"]')
    loginButton = () => cy.get('[data-qa="login-button"]')
    loggedInMenu = () => cy.get('.shop-menu > .nav > :nth-child(4) > a')
    errorMessage = () => cy.get('.login-form > form > p')

    visit() {
        cy.visit('https://www.automationexercise.com/login')
    }

    fillEmail(email) {
        this.emailInput().type(email)
    }

    fillPassword(senha) {
        this.passwordInput().type(senha)
    }

    clickLoginButton() {
        this.loginButton().click()
    }

    validateLoggedIn() {
        this.loggedInMenu().should('be.visible')
    }

    validateInvalidCredentials() {
        this.errorMessage().should('contain', 'incorrect')
    }
}

export default new LoginPage()
