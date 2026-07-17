/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import searchPage from "../../../support/pages/SearchPage";

Given('que estou na página de produtos', () => {
    cy.log('Acessando página de produtos')
    searchPage.visit()
})

When('busco o termo {string}', (termo) => {
    searchPage.search(termo)
})

Then('a lista deve exibir produtos que tenham o termo {string}', (termo) => {
    searchPage.productItems().should('have.length.greaterThan', 0)

    searchPage.productNames().then(($produtos) => {
        const nomes = Cypress.$.makeArray($produtos).map((el) =>
            el.innerText.toLowerCase()
        )
        const termoEncontrado = nomes.some((nome) =>
            nome.includes(termo.toLowerCase())
        )

        expect(termoEncontrado, `Esperava encontrar "${termo}" em algum dos produtos: ${nomes.join(', ')}`)
            .to.be.true
    })
})

And('o resultado deve ser exibido', () => {
    searchPage.searchedProductsTitle().should('be.visible')
})

Then('a lista de produtos deve ser atualizada', () => {
    searchPage.productsList().should('be.visible')
})

And('nenhum produto deve ser exibido', () => {
    searchPage.productItems().should('not.exist')
})
