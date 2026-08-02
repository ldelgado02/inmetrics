/// <reference types="cypress" />

class LoginService {
    verifyLogin(email, password, options = {}) {
        return cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/verifyLogin',
            form: true,
            body: { email, password },
            failOnStatusCode: false,
            ...options
        })
    }
}

export default new LoginService()
