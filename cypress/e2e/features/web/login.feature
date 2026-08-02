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

    @web @login @cadastro
    Scenario: Cadastro de novo usuário com dados únicos
        When eu preencho o formulário de cadastro com um novo usuário
        Then a conta deve ser criada com sucesso
        And clico em continuar
        And excluo a conta criada
        Then a conta deve ser removida com sucesso

    @web @login
    Scenario: Login com e-mail não cadastrado
        When eu informo um e-mail não cadastrado e uma senha qualquer
        And clico no botão de login
        Then mensagem de credenciaL inválida deve ser exibida

    @web @login @logout
    Scenario: Logout após login válido
        When eu informo minhas credenciais válidas
        And clico no botão de login
        Then devo logar no sistema corretamente
        And eu efetuo logout
        Then devo ser redirecionado para a tela de login
