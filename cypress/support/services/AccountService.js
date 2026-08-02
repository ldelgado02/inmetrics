/// <reference types="cypress" />

class AccountService {
    createAccount(usuario, options = {}) {
        const [primeiroNome, ...resto] = usuario.name.split(' ')
        const ultimoNome = resto.join(' ') || 'Silva'

        return cy.request({
            method: 'POST',
            url: 'https://automationexercise.com/api/createAccount',
            form: true,
            body: {
                name: usuario.name,
                email: usuario.email,
                password: usuario.password,
                title: 'Mr',
                birth_date: usuario.birthDay,
                birth_month: usuario.birthMonth,
                birth_year: usuario.birthYear,
                firstname: primeiroNome,
                lastname: ultimoNome,
                company: 'QA Inmetrics',
                address1: usuario.address,
                address2: '',
                country: usuario.country,
                zipcode: usuario.zipcode,
                state: usuario.state,
                city: usuario.city,
                mobile_number: usuario.phone.replace(/\D/g, '').slice(0, 11),
            },
            failOnStatusCode: false,
            ...options
        })
    }

    deleteAccount(email, password, options = {}) {
        return cy.request({
            method: 'DELETE',
            url: 'https://automationexercise.com/api/deleteAccount',
            form: true,
            body: { email, password },
            failOnStatusCode: false,
            ...options
        })
    }
}

export default new AccountService()
