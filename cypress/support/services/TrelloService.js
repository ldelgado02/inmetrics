/// <reference types="cypress" />

class TrelloService {
    getAction(actionId) {
        return cy.request({
            method: 'GET',
            url: `https://api.trello.com/1/actions/${actionId}`
        })
    }
}

export default new TrelloService()
