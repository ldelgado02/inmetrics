/// <reference types="cypress" />

/**
 * DataCleaner
 * Responsável pela LIMPEZA da massa de dados criada durante a execução.
 *
 * Funciona como um registro (ledger): cada vez que um Step CRIA algo
 * (cartão no Trello, estado local de carrinho/sessão, etc.), ele chama
 * `dataCleaner.register(...)`. Ao final de cada cenário, o hook global
 * em e2e.js chama `dataCleaner.cleanupAll()` e cada item registrado é
 * removido pelo tipo correspondente.
 *
 * Critério de limpeza: só é registrado (e portanto só é limpo) o que
 * foi efetivamente CRIADO pela automação nesta execução. Dados fixos
 * (ex.: credencial de login do .env, action do Trello pré-existente)
 * NUNCA são registrados aqui — não pertencem ao ciclo de vida do teste.
 */
class DataCleaner {
    constructor() {
        this._registry = []
    }

    register(type, payload) {
        this._registry.push({ type, payload })
    }

    cleanupAll() {
        if (this._registry.length === 0) return

        this._registry.forEach(({ type, payload }) => {
            switch (type) {
                case 'trelloCard':
                    cy.request({
                        method: 'DELETE',
                        url: `https://api.trello.com/1/cards/${payload.id}`,
                        failOnStatusCode: false,
                    })
                    break

                case 'localState':
                    // Ex.: carrinho, sessão, localStorage criados durante o cenário
                    cy.clearCookies()
                    cy.clearLocalStorage()
                    break

                default:
                    cy.log(`DataCleaner: tipo "${type}" sem estratégia de limpeza definida`)
            }
        })

        this._registry = []
    }
}

export default new DataCleaner()
