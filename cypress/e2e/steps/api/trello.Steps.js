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