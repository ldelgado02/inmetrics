Feature: API de verificação de login

@api
Scenario: Verificar login com credenciais válidas
    When eu envio um POST para verifyLogin com credenciais válidas
    Then o response code retornado deve ser 200
    And a mensagem deve conter "User exists!"

@api
Scenario: Verificar login sem o parâmetro email
    When eu envio um POST para verifyLogin sem o parâmetro email
    Then o response code retornado deve ser 400
    And a mensagem deve conter "Bad request, email or password parameter is missing in POST request."

@api
Scenario: Verificar login com credenciais inválidas
    When eu envio um POST para verifyLogin com credenciais inválidas
    Then o response code retornado deve ser 404
    And a mensagem deve conter "User not found!"
