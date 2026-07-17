Feature: Pesquisa de produtos existentes e inexistente
    Eu como usuário do sistema,
    Quero testar cenários de pesquisa de produtos.

    Background: Estar na página inicial do sistema Automation Exercise
        Given que estou na página de login

    @web @search
    Scenario: Pesquisa de produto existente
        When busco o produto X
        Then a lista de produtos deve ser atualizada
        And o resultado deve ser exibido

    @web @search
    Scenario: Pesquisa de produto inexistente
        When busco o produto X
        Then a lista de produtos deve ser atualizada
        And nenhum produto deve ser exibido