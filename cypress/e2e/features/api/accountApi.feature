Feature: API de criação de conta

@api
Scenario: Criar conta via API com dados únicos
    When eu envio um POST para createAccount com um novo usuário
    Then a conta deve ser criada via API com sucesso
