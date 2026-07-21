/// <reference types="cypress" />
import { When, Then, And } from "cypress-cucumber-preprocessor/steps";
import trelloService from "../../../support/services/TrelloService";

let resposta

When('eu envio uma requisição GET para a action do Trello', () =>{
    trelloService.getAction(Cypress.env('trelloActionId')).then((response) =>{
        resposta = response
    })
})

Then('então status code deve ser {int}', (statusEsperado) => {
    expect(resposta.status).to.eq(statusEsperado)
})

And('o campo {string} da estrutura list deve estar preenchido', (campo) => {
    cy.log(`list.${campo}: ${resposta.body.data.list[campo]}`)
    expect(resposta.body.data.list[campo]).to.exist
})

And('o tempo de resposta deve ser menor que {int} ms', (tempoMaximo) => {
    expect(resposta.duration).to.be.lessThan(tempoMaximo)
})

And('o id da resposta deve ser igual ao id da action consultada', () => {
    expect(resposta.body.id).to.eq(Cypress.env('trelloActionId'))
})

And('os campos principais da resposta devem existir', () => {
    expect(resposta.body).to.have.property('id')
    expect(resposta.body).to.have.property('idMemberCreator')
    expect(resposta.body).to.have.property('data')
    expect(resposta.body).to.have.property('type')
    expect(resposta.body).to.have.property('date')
    expect(resposta.body.data).to.have.property('list')
    expect(resposta.body.data).to.have.property('board')
    expect(resposta.body.data).to.have.property('card')
})

And('os campos obrigatórios da resposta devem estar preenchidos', () => {
    expect(resposta.body.id).to.exist.and.not.be.empty
    expect(resposta.body.type).to.exist.and.not.be.empty
    expect(resposta.body.date).to.exist.and.not.be.empty
    expect(resposta.body.data.list.id).to.exist.and.not.be.empty
    expect(resposta.body.data.list.name).to.exist.and.not.be.empty
})

And('os tipos dos campos da resposta devem estar corretos', () => {
    expect(resposta.body.id).to.be.a('string')
    expect(resposta.body.type).to.be.a('string')
    expect(resposta.body.date).to.be.a('string')
    expect(resposta.body.data).to.be.an('object')
    expect(resposta.body.data.list).to.be.an('object')
    expect(resposta.body.data.list.name).to.be.a('string')
    expect(resposta.body.data.card.due).to.be.a('string')
})

And('a data da resposta deve estar no formato ISO', () => {
    const formatoISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    expect(resposta.body.date).to.match(formatoISO)
    expect(resposta.body.data.card.due).to.match(formatoISO)
})

When('eu envio uma requisição GET para uma action inexistente do Trello', () => {
    trelloService.getAction('000000000000000000000000', { failOnStatusCode: false }).then((response) => {
        resposta = response
    })
})

When('eu envio uma requisição POST para a action do Trello', () => {
    trelloService.getAction(Cypress.env('trelloActionId'), {
        method: 'POST',
        failOnStatusCode: false
    }).then((response) => {
        resposta = response
    })
})

Then('o Content-Type deve ser {string}', (contentTypeEsperado) => {
    expect(resposta.headers['content-type']).to.include(contentTypeEsperado)
})