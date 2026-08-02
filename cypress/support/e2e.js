// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'allure-cypress'
import dataCleaner from './data/DataCleaner'

// Limpeza automática: qualquer dado registrado no DataCleaner
// durante o cenário é removido ao final dele, independente de
// o teste ter passado ou falhado.
afterEach(() => {
    dataCleaner.cleanupAll()
})

// O automationexercise.com carrega anúncios de terceiros em iframes que,
// ocasionalmente, disparam um SecurityError de acesso cross-origin.
// Isso não tem relação com a aplicação sob teste, então ignoramos
// especificamente essa mensagem — qualquer outro erro real continua
// falhando o teste normalmente.
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Blocked a frame with origin')) {
        return false
    }
    return true
})

// Bloqueia domínios conhecidos de anúncios de terceiros antes de cada
// teste. Isso evita que o iframe de anúncio sequer carregue, eliminando
// na origem tanto o SecurityError de acesso cross-origin quanto o erro
// de serialização do allure-cypress ao tentar registrar o passo.
beforeEach(() => {
    cy.intercept(
        /doubleclick\.net|googlesyndication\.com|googletagservices\.com|adservice\.google\.com|amazon-adsystem\.com|taboola\.com|outbrain\.com/,
        { statusCode: 204, body: '' }
    )
})