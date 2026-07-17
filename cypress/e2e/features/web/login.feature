Feature: Login válido e inválido
    Eu como usuário do sistema,
    Quero testar cenários de login

    Background: Estar na página de login do sistema Automation Exercise
        Given que estou na página de login

    @web @login
    Scenario: Login com credenciais válidas
        When eu preecho o email "teste2021@teste.com.br" e a senha "teste"
        And clico no botão de login
        Then devo logar no sistema corretamente

    @web @login
    Scenario: Login com credenciais inválidas
        When eu preecho o email "teste2021@teste.com.br" e a senha "testeinvalido"
        And clico no botão de login
        Then mensagem de credenciaL inválida deve ser exibida
