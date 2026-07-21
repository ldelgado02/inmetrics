# Inmetrics - Automação de Testes

Projeto de automação de testes desenvolvido para o processo seletivo, cobrindo cenários web e de API.

## Tecnologias

- JavaScript
- Cypress
- Cucumber (cypress-cucumber-preprocessor)
- Page Object Model (POM)
- Service Object (organização das chamadas de API)
- dotenv (gerenciamento de variáveis de ambiente)
- Allure Report (relatório de execução dos testes)

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── features/       -> arquivos .feature (cenários em Gherkin)
│   │   ├── web/
│   │   └── api/
│   └── steps/           -> step definitions
│       ├── web/
│       └── api/      
└── support/
    ├── pages/          -> Page Objects (POM)
    └── services/       -> Service Objects (chamadas de API)

allure-results/     -> gerado ao rodar os testes (ignorado no Git)
allure-report/      -> gerado pelo allure:generate (ignorado no Git)
```

## Planejamento

A abordagem do projeto seguiu a seguinte ordem:

1. **Definição do BDD com Cucumber**: optou-se por usar Cucumber para deixar os cenários escritos em linguagem natural (Gherkin), facilitando a leitura e tornando os testes mais organizados e reutilizáveis.
2. **Definição dos cenários**: primeiro foram mapeados e escritos os cenários de teste nas features (login, busca, carrinho e API), cobrindo os fluxos principais e alternativos de cada desafio.
3. **Criação dos steps**: em seguida, foram implementados os step definitions correspondentes a cada linha das features.
4. **Aplicação do POM (Page Object Model)**: o projeto foi reorganizado utilizando POM, separando os seletores e ações de cada página em classes próprias (`cypress/support/pages`), deixando os steps mais limpos e a manutenção mais simples.
5. **Configuração de variáveis de ambiente**: os dados sensíveis/configuráveis do projeto (credenciais de login e ID da action do Trello) foram movidos para um arquivo `.env`, evitando que fiquem expostos diretamente nas features e nos steps.
6. **Implementação de relatório com Allure**: foi adicionado o Allure Report para gerar relatórios de execução dos testes, facilitando a visualização dos resultados.
7. **Aplicação do Service Object na API**: por fim, a chamada de API do Trello foi movida para um Service Object (`cypress/support/services`), seguindo a mesma lógica de organização do POM, deixando o step de API mais limpo e a manutenção mais simples.

## Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior
- Java 8 ou superior (necessário para o Allure Report gerar e abrir o relatório)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ldelgado02/inmetrics.git
```

2. Entre na pasta do projeto:

```bash
cd inmetrics
```

3. Instale as dependências:

```bash
npm install
```

4. Configure as variáveis de ambiente. O projeto já disponibiliza um `.env.example` com os valores preenchidos para facilitar a avaliação. Escolha uma das opções:

**Opção 1 - Renomear o arquivo**

Renomeie o `.env.example` para `.env` (remova o `.example` do nome).

**Opção 2 - Criar o arquivo e copiar o conteúdo**

Crie um arquivo `.env` na raiz do projeto e copie o conteúdo do `.env.example` para dentro dele.

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

## Cenários cobertos

### Cenários web

Os testes web utilizam o site [Automation Exercise](https://www.automationexercise.com/), uma alternativa compatível com o desafio proposto.

### Login

- Login com credenciais válidas.
- Login com senha inválida.
- Validação de mensagem de credencial inválida.

#### Busca de produtos

- Busca de produto existente.
- Busca de produto inexistente.
- Validação da exibição dos resultados da busca.

#### Carrinho e checkout

- Inclusão de produto no carrinho.
- Validação do produto incluído no carrinho.
- Validação do produto na tela de checkout.
- Inclusão repetida do mesmo produto, com validação de quantidade e valor total.
- Remoção de produto do carrinho.

### Cenários de API

Os testes de API utilizam o endpoint público do Trello:

```text
GET https://api.trello.com/1/actions/{actionId}
```

A chamada está centralizada no Service Object:

```text
cypress/support/services/TrelloService.js
```

#### Cenários positivos

- Validação do status code `200`.
- Exibição e validação do campo `data.list.name`.
- Validação do tempo de resposta.
- Validação de que o ID retornado é igual ao ID consultado.
- Validação da estrutura principal do JSON.
- Validação de campos obrigatórios.
- Validação dos tipos dos campos.
- Validação de datas no formato ISO 8601.
- Validação do header `Content-Type` como `application/json`.

#### Cenários negativos

- Consulta de uma action inexistente, com validação do status `404`.
- Envio de requisição `POST` para a action, com validação do status `404`.


## Como executar os testes

### Modo interativo (Test Runner)

```bash
npm run cy:open
```

### Rodar tudo (headless)

```bash
npm run cy:run
```

### Rodar tudo com navegador visível

```bash
npm run cy:run:headed
```

### Executar testes Web

Executar todos os cenários Web:

```bash
npm run cy:run:web
```
Executar uma feature web específica:

```bash
npm run cy:run:login
npm run cy:run:search
npm run cy:run:cart
```
### Executar testes de API

Executar todos os cenários de API:

```bash
npm run cy:run:trello
```

Executar uma feature de API específica:

```bash
npm run cy:run:trello:positive
npm run cy:run:trello:negative
```

## Relatório de testes (Allure)

O projeto gera relatórios de execução utilizando o Allure Reports.

### Opção rápida (roda tudo de uma vez)

```bash
npm run cy:run:allure
```

Esse comando roda todos os testes, gera o relatório e já abre no navegador.

### Opção passo a passo

1. Rode os testes normalmente (isso gera os resultados na pasta `allure-results`):

```bash
npm run cy:run
```

2. Gere o relatório HTML a partir dos resultados:

```bash
npm run allure:generate
```

3. Abra o relatório no navegador:

```bash
npm run allure:open
```

### Atenção ao rodar features específicas

A pasta `allure-results` **acumula** os resultados de cada execução, sem sobrescrever os anteriores. Isso significa que, se você rodar `npm run cy:run:trello` (ou qualquer outra feature específica) depois de já ter rodado `cy:run` ou `cy:run:allure`, o relatório gerado vai **misturar** os resultados da execução antiga com os novos, mostrando testes que não rodaram naquela vez.

Para evitar isso, limpe os resultados antes de rodar uma feature específica e gerar o relatório:

```bash
npm run allure:clean
npm run cy:run:trello
npm run allure:generate
npm run allure:open
```

O `npm run cy:run:allure` já faz essa limpeza automaticamente antes de rodar, então esse cuidado é necessário apenas quando os comandos são executados separadamente.

## Boas práticas aplicadas

- Cenários descritos em Gherkin com Cucumber.
- Separação entre features e step definitions.
- Page Objects para ações e seletores da interface web.
- Service Object para centralizar chamadas da API.
- Dados configuráveis carregados pelo `.env`.
- Separação dos cenários positivos e negativos de API.
- Execução seletiva por scripts npm.
- Relatórios de execução com Allure.

## Observações

- Os testes de login utilizam um usuário de teste próprio, criado no site Automation Exercise.
- O teste de API consome um endpoint público do Trello, sem necessidade de autenticação.
