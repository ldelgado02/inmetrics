/// <reference types="cypress" />

class SignupPage {
    // Formulário "New User Signup!" (mesma página de login)
    newUserNameInput = () => cy.get('[data-qa="signup-name"]')
    newUserEmailInput = () => cy.get('[data-qa="signup-email"]')
    signupButton = () => cy.get('[data-qa="signup-button"]')

    // Formulário "Enter Account Information"
    genderRadio = () => cy.get('label[for="id_gender1"]')
    passwordInput = () => cy.get('[data-qa="password"]')
    daysSelect = () => cy.get('#days')
    monthsSelect = () => cy.get('#months')
    yearsSelect = () => cy.get('#years')
    firstNameInput = () => cy.get('#first_name')
    lastNameInput = () => cy.get('#last_name')
    addressInput = () => cy.get('#address1')
    countrySelect = () => cy.get('[data-qa="country"]')
    stateInput = () => cy.get('#state')
    cityInput = () => cy.get('#city')
    zipcodeInput = () => cy.get('#zipcode')
    mobileNumberInput = () => cy.get('#mobile_number')
    createAccountButton = () => cy.get('[data-qa="create-account"]')

    // Confirmação
    accountCreatedMessage = () => cy.get('[data-qa="account-created"]')
    continueButton = () => cy.get('[data-qa="continue-button"]')

    // Exclusão (fecha o ciclo de vida do dado gerado para o cenário)
    deleteAccountLink = () => cy.get('a[href="/delete_account"]')
    accountDeletedMessage = () => cy.get('[data-qa="account-deleted"]')

    startSignup(nome, email) {
        this.newUserNameInput().type(nome)
        this.newUserEmailInput().type(email)
        this.signupButton().click()
    }

    fillAccountInformation(usuario) {
        const [primeiroNome, ...resto] = usuario.name.split(' ')
        const ultimoNome = resto.join(' ') || 'Silva'
        const telefoneNumerico = usuario.phone.replace(/\D/g, '').slice(0, 11)

        this.genderRadio().click()
        this.passwordInput().type(usuario.password)
        this.daysSelect().select(usuario.birthDay)
        this.monthsSelect().select(usuario.birthMonth)
        this.yearsSelect().select(usuario.birthYear)
        this.firstNameInput().clear().type(primeiroNome)
        this.lastNameInput().clear().type(ultimoNome)
        this.addressInput().type(usuario.address)
        this.countrySelect()
            .select(usuario.country)
            .should('have.value', usuario.country)
        this.countrySelect()
            .find('option:selected')
            .should('have.text', usuario.country)
        this.stateInput().type(usuario.state)
        this.cityInput().type(usuario.city)
        this.zipcodeInput().type(usuario.zipcode)
        this.mobileNumberInput().type(telefoneNumerico)
        this.createAccountButton().click()
    }

    validateAccountCreated() {
        this.accountCreatedMessage()
            .should('be.visible')
            .invoke('text')
            .then((texto) => {
                expect(texto.toLowerCase()).to.include('account created')
            })
    }

    clickContinue() {
        this.continueButton().click()
    }

    deleteAccount() {
        this.deleteAccountLink().click()
    }

    validateAccountDeleted() {
        this.accountDeletedMessage()
            .should('be.visible')
            .invoke('text')
            .then((texto) => {
                expect(texto.toLowerCase()).to.include('account deleted')
            })
    }
}

export default new SignupPage()
