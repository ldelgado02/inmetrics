Feature: Pesquisa de produtos existentes e inexistente
    Eu como usuário do sistema,
    Quero testar cenários de pesquisa de produtos.

    Background: Estar na página inicial do sistema Automation Exercise
        Given que estou na página de produtos

    @web @search
    Scenario: Pesquisa de produto existente
        When busco o termo "frozen"
        Then a lista deve exibir produtos que tenham o termo "frozen"
        And o resultado deve ser exibido

    @web @search
    Scenario: Pesquisa de produto inexistente
        When busco o termo "XYZ"
        Then a lista de produtos deve ser atualizada
        And nenhum produto deve ser exibido