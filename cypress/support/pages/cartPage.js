/// <reference types="cypress" />

class CartPage {
    firstProduct = () => cy.get('.features_items .product-image-wrapper').first()
    productName = () => this.firstProduct().find('.productinfo p')
    addToCartButton = () => this.firstProduct().find('.productinfo .add-to-cart')

    viewCartButton = () => cy.get('.modal-content').contains('View Cart')
    continueShoppingButton = () => cy.get('.modal-content .btn-success')

    cartTable = () => cy.get('#cart_info_table')
    cartRows = () => cy.get('#cart_info_table tbody tr')
    firstRowQuantity = () => this.cartRows().first().find('.cart_quantity button')
    firstRowPrice = () => this.cartRows().first().find('.cart_price p')
    cartTotalPrice = () => cy.get('.cart_total_price')
    deleteButton = () => this.cartRows().first().find('.cart_quantity_delete')
    checkoutButton = () => cy.get('.cart_navigation').contains('Proceed To Checkout')
    checkoutTable = () => cy.get('#cart_info_table')

    visit() {
        cy.visit('/view_cart')
    }

    addProductToCart() {
        this.addToCartButton().should('be.visible').click()
    }

    clickButton(nomeBotao) {
        if (nomeBotao === 'View Cart') {
            this.viewCartButton().click()
        } else if (nomeBotao === 'Continue Shopping') {
            this.continueShoppingButton().click()
        } else {
            cy.contains(nomeBotao).click()
        }
    }

    deleteFirstProduct() {
        this.deleteButton().click()
    }
}

export default new CartPage()
