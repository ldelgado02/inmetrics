/// <reference types="cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import cartPage from "../../../support/pages/CartPage";

let produtoNome = "";

function adicionarProdutoAoCarrinho() {
    cartPage.productName()
        .invoke('text')
        .then((texto) => {
            produtoNome = texto.trim()
        })

    cartPage.addProductToCart()
}

When('adiciono um produto no carrinho', () => {
    adicionarProdutoAoCarrinho()
})

And('clico no botão {string}', (nomeBotao) => {
    cartPage.clickButton(nomeBotao)
})

Then('produto adicionado deve ser exibido', () => {
    cartPage.cartTable()
        .contains(produtoNome)
        .should('be.visible')
})

And('produto deve ser exibido na tela de pagamento', () => {
    cartPage.checkoutTable()
        .contains(produtoNome)
        .should('be.visible')
})


Given('eu adiciono um produto no carrinho', () => {
    adicionarProdutoAoCarrinho()
})

And('adiciono o mesmo produto no carrinho', () => {
    adicionarProdutoAoCarrinho()
})

Then('quantidade do produto deve ser atualizada para {int}', (quantidadeEsperada) => {
    cartPage.firstRowQuantity()
        .invoke('text')
        .then((texto) => {
            expect(texto.trim()).to.eq(String(quantidadeEsperada))
        })
})

And('valor total deve ser atualizado corretamente', () => {
    cartPage.firstRowPrice()
        .invoke('text')
        .then((precoTexto) => {
            const precoUnitario = parseInt(precoTexto.replace(/\D/g, ''), 10)

            cartPage.firstRowQuantity()
                .invoke('text')
                .then((quantidadeTexto) => {
                    const quantidade = parseInt(quantidadeTexto.trim(), 10)
                    const totalEsperado = precoUnitario * quantidade

                    cartPage.cartTotalPrice()
                        .invoke('text')
                        .then((totalTexto) => {
                            const totalAtual = parseInt(totalTexto.replace(/\D/g, ''), 10)
                            expect(totalAtual, `Total esperado: ${totalEsperado}, total exibido: ${totalAtual}`)
                                .to.eq(totalEsperado)
                        })
                })
        })
})


Given('que já tenho um produto adicionado no carrinho', () => {
    adicionarProdutoAoCarrinho()
    cartPage.continueShoppingButton().click()
})

And('entro ná página do carrinho', () => {
    cartPage.visit()
})

When('clico no botão de excluir produto', () => {
    cartPage.deleteFirstProduct()
})

Then('o produto deve ser removido do carrinho', () => {
    cartPage.cartRows().should('not.exist')
})

And('mensagem de {string} deve ser exibida', (mensagem) => {
    if (mensagem === 'carrinho vazio') {
        cy.contains('Cart is empty!').should('be.visible')
    } else {
        cy.contains(mensagem).should('be.visible')
    }
})
