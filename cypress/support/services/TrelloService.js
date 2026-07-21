/// <reference types="cypress" />

class TrelloService {
    getAction(actionId, options = {}) {
        return cy.request({
            method: 'GET',
            url: `https://api.trello.com/1/actions/${actionId}`,
            ...options
        })
    }
}

export default new TrelloService()
