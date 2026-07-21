Feature: API Trello

    Background: Consultar a action do Trello
        When eu envio uma requisição GET para a action do Trello
        Then então status code deve ser 200

    @api
    Scenario: Consultar API e validar nome na lista
        And o campo "name" da estrutura list deve estar preenchido

    @api
    Scenario: Validar tempo de resposta da API
        And o tempo de resposta deve ser menor que 2000 ms

    @api
    Scenario: Validar o ID retornado pela API
        And o id da resposta deve ser igual ao id da action consultada

    @api
    Scenario: Validar estrutura do JSON da resposta
        And os campos principais da resposta devem existir

    @api
    Scenario: Validar campos obrigatórios da resposta
        And os campos obrigatórios da resposta devem estar preenchidos

    @api
    Scenario: Validar tipos dos campos da resposta
        And os tipos dos campos da resposta devem estar corretos

    @api
    Scenario: Validar formato ISO da data
        And a data da resposta deve estar no formato ISO
    
    @api
    Scenario: Validar Content-Type
    Then o Content-Type deve ser "application/json"