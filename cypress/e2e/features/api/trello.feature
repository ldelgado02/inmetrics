Feature: API Trello

@api
Scenario: Consultar API e validar nome na lista
    When eu envio uma requisição GET para a action do Trello
    Then então status code deve ser 200
    And o campo "name" da estrutura list deve estar preenchido
