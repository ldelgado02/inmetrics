/// <reference types="cypress" />

class SearchPage {
    searchInput = () => cy.get('[name="search"]')
    searchButton = () => cy.get('#submit_search')
    productItems = () => cy.get('.features_items .product-image-wrapper')
    productNames = () => cy.get('.features_items .productinfo p')
    productsList = () => cy.get('.features_items')
    searchedProductsTitle = () => cy.contains('Searched Products')

    visit() {
        cy.visit('https://www.automationexercise.com/products')
    }

    search(termo) {
        this.searchInput().type(termo)
        this.searchButton().click()
    }
}

export default new SearchPage()
