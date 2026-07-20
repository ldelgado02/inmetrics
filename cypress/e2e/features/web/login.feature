Feature: Login válido e inválido
    Eu como usuário do sistema,
    Quero testar cenários de login

    Background: Estar na página de login do sistema Automation Exercise
        Given que estou na página de login

    @web @login
    Scenario: Login com credenciais válidas
        When eu informo minhas credenciais válidas
        And clico no botão de login
        Then devo logar no sistema corretamente

    @web @login
    Scenario: Login com credenciais inválidas
        When eu informo um email válido e senha inválida "testeinvalido"
        And clico no botão de login
        Then mensagem de credenciaL inválida deve ser exibida
