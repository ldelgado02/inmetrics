/// <reference types="cypress" />
import { When, Then } from "cypress-cucumber-preprocessor/steps";
import accountService from "../../../support/services/AccountService";
import dataProvider from "../../../support/data/DataProvider";
import dataCleaner from "../../../support/data/DataCleaner";

let resposta;

When('eu envio um POST para createAccount com um novo usuário', () => {
    dataProvider.getUser().then((usuario) => {
        accountService.createAccount(usuario).then((res) => {
            // Registrado no DataCleaner: a exclusão via API acontece
            // automaticamente no afterEach global, sem precisar de um
            // passo explícito nesta feature (diferente do cenário de
            // cadastro via UI, que exclui explicitamente na feature).
            dataCleaner.register('apiAccount', { email: usuario.email, password: usuario.password })

            const body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
            resposta = { ...res, body }
        })
    })
})

Then('a conta deve ser criada via API com sucesso', () => {
    expect(resposta.body.responseCode).to.eq(201)
    expect(resposta.body.message).to.include('User created!')
})
