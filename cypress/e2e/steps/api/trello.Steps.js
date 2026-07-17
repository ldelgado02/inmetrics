/// <reference types="cypress" />
import { When, Then, And } from "cypress-cucumber-preprocessor/steps";

let resposta

When('eu envio uma requisição GET para a action {string} do Trello', (actionId) =>{
    cy.request({
      method: 'GET',
      url: `https://api.trello.com/1/actions/${actionId}`
    }).then((response) =>{
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