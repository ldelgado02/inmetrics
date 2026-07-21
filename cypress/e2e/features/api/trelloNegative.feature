Feature: Cenários Negativos - API Trello

@api
Scenario: Consultar action inexistente
    When eu envio uma requisição GET para uma action inexistente do Trello
    Then então status code deve ser 404

@api
Scenario: Enviar método não permitido para a action do Trello
    When eu envio uma requisição POST para a action do Trello
    Then então status code deve ser 404
