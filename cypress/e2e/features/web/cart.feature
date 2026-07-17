Feature: Validar carrinho de compras
    Eu como usuário do sistema, 
    Quero adicionar produtos no carrinho
    E validar carrinho de compras

    Background: Estar na página inicial do sistema Automation Exercise
        Given que estou na página de login

    @web @cart
    Scenario: Adicionar produto no carrinho vazio e validar quantidade e valor
        When adiciono um produto no carrinho
        And clico no botão "View Cart"
        Then produto adicionado deve ser exibido

    @web @cart
    Scenario: Atualizar quantidade e valor ao adicionar produto já existente no carrinho
        Given eu adiciono um produto no carrinho
        And clico no botão "Continue Shopping"
        And adiciono o mesmo produto no carrinho
        And clico no botão "View Cart"
        Then quantidade do produto deve ser atualizada para 2
        And valor total deve ser atualizado corretamente

    @web @cart
    Scenario: Remover produto do carrinho
        Given que já tenho um produto adicionado no carrinho
        And entro ná página do carrinho
        When clico no botão de excluir produto
        Then o produto deve ser removido do carrinho
        And mensagem de "carrinho vazio" deve ser exibida