/// <reference types="cypress" />
import dataFactory from './DataFactory'

/**
 * DataProvider
 * Camada de CONSUMO. É a única classe que os Steps devem importar
 * quando precisarem de dados de teste.
 *
 * Estratégia:
 *  - fromFixture = true  -> dado FIXO e sensível (credencial real de login),
 *    lido do .env via Cypress.env(). Nunca é gerado, porque precisa
 *    corresponder a uma conta que realmente existe no sistema.
 *  - fromFixture = false (padrão) -> dado NOVO, descartável, delegado
 *    ao DataFactory. Usado quando o cenário precisa de dado único
 *    por execução (ex.: cadastro de novo usuário).
 */
class DataProvider {
    getUser({ fromFixture = false } = {}) {
        if (fromFixture) {
            return cy.wrap({
                email: Cypress.env('loginEmail'),
                password: Cypress.env('loginPassword'),
            })
        }
        return cy.wrap(dataFactory.buildUser())
    }

    getSearchTerm() {
        return dataFactory.buildSearchTerm()
    }

    getCartItem() {
        return cy.wrap(dataFactory.buildCartItem())
    }

    getBatch(builderName, quantidade) {
        return cy.wrap(dataFactory.buildBatch(builderName, quantidade))
    }
}

export default new DataProvider()
