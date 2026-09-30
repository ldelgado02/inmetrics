# Inmetrics - Automação de Testes

[![Cypress + Allure](https://github.com/ldelgado02/inmetrics/actions/workflows/cypress-allure.yml/badge.svg?branch=main)](https://github.com/ldelgado02/inmetrics/actions/workflows/cypress-allure.yml)
[![Allure Report](https://img.shields.io/badge/Allure-relat%C3%B3rio-orange)](https://ldelgado02.github.io/inmetrics/)

Projeto de automação de testes desenvolvido para o processo seletivo, cobrindo cenários web e de API.

Os testes rodam automaticamente no GitHub Actions a cada alteração na `main`, e o relatório mais recente fica publicado em **https://ldelgado02.github.io/inmetrics/**.

## Tecnologias

- JavaScript
- Cypress
- Cucumber (cypress-cucumber-preprocessor)
- Page Object Model (POM)
- Service Object (organização das chamadas de API)
- dotenv (gerenciamento de variáveis de ambiente)
- Allure Report (relatório de execução dos testes)
- GitHub Actions (integração contínua)
- GitHub Pages (publicação do relatório Allure com histórico)

## Estrutura do projeto

```
.github/
└── workflows/
    └── cypress-allure.yml -> pipeline de CI (testes + relatório Allure)
scripts/
└── allure-executor.js  -> gera o executor.json do Allure com dados do run no CI
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
    ├── services/       -> Service Objects (chamadas de API)
    │   ├── TrelloService.js
    │   ├── LoginService.js
    │   └── AccountService.js
    └── data/           -> Geração, consumo e limpeza de massa de dados
        ├── DataFactory.js
        ├── DataProvider.js
        └── DataCleaner.js

allure-results/     -> gerado ao rodar os testes (ignorado no Git)
allure-report/      -> gerado pelo allure:generate (ignorado no Git)
.nvmrc              -> versão do Node usada localmente e no CI
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
8. **Integração contínua com GitHub Actions**: a execução, que antes era apenas manual, passou a rodar automaticamente a cada `push` e `pull_request`, com as credenciais protegidas em GitHub Secrets e o relatório Allure publicado no GitHub Pages, mantendo o histórico de execuções.

## Pré-requisitos

- Node.js 20.1 ou superior (recomendado: 24, definido no `.nvmrc`; exigência do Cypress 15)
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

4. Configure as variáveis de ambiente. Copie o `.env.example` para `.env` e preencha os valores (o `.env` é ignorado pelo Git e nunca deve ser versionado):

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

| Variável | Uso |
|---|---|
| `LOGIN_EMAIL` | E-mail de uma conta existente no automationexercise.com |
| `LOGIN_PASSWORD` | Senha dessa conta |
| `TRELLO_ACTION_ID` | ID de uma action pública do Trello |

## Cenários cobertos

### Cenários web

Os testes web utilizam o site [Automation Exercise](https://www.automationexercise.com/), uma alternativa compatível com o desafio proposto.

### Login

- Login com credenciais válidas.
- Login com senha inválida.
- Login com e-mail não cadastrado.
- Logout após login válido.
- Cadastro de novo usuário com dados únicos (gerados dinamicamente via `DataFactory`/`DataProvider`), incluindo a exclusão da conta ao final do cenário.
- Validação de mensagem de credencial inválida.

#### Busca de produtos

- Busca de produto existente.
- Busca de produto inexistente.
- Busca com termo vazio.
- Busca case-insensitive (termo em maiúsculas retornando os mesmos resultados que em minúsculas).
- Validação da exibição dos resultados da busca.

#### Carrinho e checkout

- Inclusão de produto no carrinho.
- Validação do produto incluído no carrinho.
- Validação do produto na tela de checkout.
- Inclusão repetida do mesmo produto, com validação de quantidade e valor total.
- Inclusão de dois produtos diferentes no carrinho.
- Remoção de produto do carrinho.

### Cenários da API de Produtos

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

### API de verificação de login

Além do Trello, o projeto também cobre a API pública de prática do próprio Automation Exercise:

```text
POST https://automationexercise.com/api/verifyLogin
```

A chamada está centralizada no Service Object:

```text
cypress/support/services/LoginService.js
```

**Particularidade importante desta API:** ela sempre retorna HTTP `200` de verdade, independente do resultado. O "response code" documentado pela API (200, 400, 404) vem **dentro do corpo JSON**, no campo `responseCode` — não no status HTTP real. Os steps (`cypress/e2e/steps/api/loginApi.Steps.js`) validam esse campo, em vez do status HTTP.

- Login com credenciais válidas → `responseCode 200`, mensagem "User exists!".
- Login sem o parâmetro `email` → `responseCode 400`, mensagem de parâmetro faltando.
- Login com credenciais inválidas → `responseCode 404`, mensagem "User not found!".

### API de criação de conta

```text
POST https://automationexercise.com/api/createAccount
DELETE https://automationexercise.com/api/deleteAccount
```

A chamada está centralizada no Service Object:

```text
cypress/support/services/AccountService.js
```

- Criação de conta com dados únicos gerados pelo `DataFactory`/`DataProvider` → `responseCode 201`, mensagem "User created!".
- A conta criada é registrada no `DataCleaner` e excluída automaticamente via API ao final do cenário (ver seção "Massa de dados" abaixo).


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
npm run cy:run:loginApi
npm run cy:run:accountApi
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

O relatório inclui a aba **Environment** (URL base, versões de Cypress/Node, sistema operacional e, no CI, branch e commit) e a aba **Categories**, que agrupa as falhas em: falha de rede/serviço externo, timeout/elemento não encontrado, falha de asserção e erro no código de teste.

## Integração contínua (GitHub Actions)

O projeto tem um workflow, [`.github/workflows/cypress-allure.yml`](.github/workflows/cypress-allure.yml), que executa toda a suíte (API + Web) em um runner Ubuntu, gera o relatório Allure e o publica no GitHub Pages.

📊 **Relatório mais recente:** https://ldelgado02.github.io/inmetrics/

### Quando o workflow roda

| Gatilho | Quando dispara | Publica no GitHub Pages? |
|---|---|---|
| `push` | A cada commit enviado para a `main` | Sim |
| `pull_request` | A cada PR aberto ou atualizado contra a `main` | Não, fica só como artifact |
| `workflow_dispatch` | Manualmente, em **Actions → Cypress + Allure → Run workflow** | Sim (quando disparado na `main`) |

Só a `main` publica no Pages, para que resultados de branches em desenvolvimento não se misturem ao histórico oficial. Execuções na mesma branch ficam em fila (`concurrency`): duas execuções não disputam a publicação nem a mesma conta de login do site.

### Etapas do pipeline

1. **Checkout e Node**: baixa o código e instala o Node na versão definida em `.nvmrc`.
2. **Testes Cypress**: a action oficial [`cypress-io/github-action`](https://github.com/cypress-io/github-action) instala as dependências (`npm ci`), guarda em cache o npm e o binário do Cypress (as execuções seguintes ficam mais rápidas) e roda `npm run cy:run:ci` no Chrome em modo headless.
3. **Histórico do Allure**: recupera a pasta `history/` do relatório já publicado na branch `gh-pages` e a copia para `allure-results/`. É isso que alimenta o gráfico de **Trend**.
4. **Executor**: `npm run allure:executor` gera o `executor.json`, que liga o relatório ao run do GitHub (número do run, branch e link direto para o log).
5. **Relatório**: o Allure CLI (com Java 17) gera o HTML em `allure-report/`.
6. **Artifacts**: anexa ao run os resultados brutos, o relatório HTML e, se algo falhar, os screenshots e vídeos do Cypress. Ficam disponíveis por 14 dias.
7. **Publicação**: envia o relatório para a branch `gh-pages`, servida pelo GitHub Pages.
8. **Status final**: se algum teste falhou, o job termina com erro (❌).

As etapas 3 a 7 rodam **mesmo quando há testes falhando** (`if: always()`), porque é justamente nesse caso que o relatório é mais útil. Para não mascarar o problema, o passo de testes usa `continue-on-error`, e a falha é reaplicada no último passo: o relatório é publicado e o workflow continua vermelho.

### Credenciais (GitHub Secrets)

Nenhuma credencial fica no código. No CI, os valores vêm de **Repository secrets** (Settings → Secrets and variables → Actions → *New repository secret*), um secret por variável e com o mesmo nome usado no `.env`:

| Secret | Uso |
|---|---|
| `LOGIN_EMAIL` | E-mail da conta de teste no automationexercise.com |
| `LOGIN_PASSWORD` | Senha dessa conta |
| `TRELLO_ACTION_ID` | ID da action pública do Trello |

O workflow expõe esses secrets como variáveis de ambiente, e o `cypress.config.js` os lê da mesma forma que lê o `.env` na máquina local. Por isso, o código dos testes é igual nos dois ambientes. Nos logs, o GitHub substitui os valores por `***`.

> Se um secret não existir, o GitHub entrega uma string vazia, sem erro. O sintoma típico são requisições para `https://api.trello.com/1/actions/` (sem o ID) e o login válido retornando "User not found".

### O que o relatório Allure mostra

- **Overview**: total de testes, percentual de sucesso e o gráfico **Trend**, com a evolução entre os runs publicados.
- **Environment**: URL base, versões de Cypress e Node, sistema operacional, branch e commit da execução.
- **Executors**: identifica o run do GitHub Actions, com link direto para o log.
- **Categories**: agrupa as falhas por causa provável: falha de rede/serviço externo, timeout/elemento não encontrado, falha de asserção (possível defeito do produto) e erro no código de teste.

No gráfico Trend, **verde** indica testes que passaram, **vermelho** (*failed*) indica asserções que não bateram com o esperado e **amarelo** (*broken*) indica testes que quebraram antes de validar algo, como uma requisição com erro ou uma configuração faltando.

### Onde encontrar os resultados de um run

- **Relatório publicado** (somente `main`): https://ldelgado02.github.io/inmetrics/, também linkado no resumo do run.
- **Artifacts**: em Actions, abra o run e role até *Artifacts*:
  - `allure-report-<n>`: relatório HTML. Para abrir localmente, descompacte e rode `npx allure open <pasta>`, porque o `index.html` não abre com duplo clique.
  - `allure-results-<n>`: resultados brutos do Allure.
  - `cypress-falhas-<n>`: screenshots e vídeos, gerados apenas quando há falha.

### Scripts usados pelo CI

| Script | Descrição |
|---|---|
| `npm run cy:run:ci` | Roda todos os testes no Chrome em modo headless |
| `npm run allure:executor` | Gera o `executor.json` com dados do run (não faz nada fora do GitHub Actions) |
| `npm run allure:generate` | Gera o relatório HTML (o mesmo script usado localmente) |

O fluxo local (`npm run cy:run:allure` e os demais scripts) continua funcionando da mesma forma. As únicas diferenças no CI são a gravação de vídeo, ativada só no CI, e o `executor.json`.

### Cuidados para o projeto rodar em Linux

Na máquina de desenvolvimento (Windows) e no runner (Ubuntu) o comportamento precisa ser o mesmo. Dois pontos foram ajustados para isso:

- **Nomes de arquivo com maiúsculas e minúsculas**: o Linux diferencia `cartPage.js` de `CartPage.js`, e o Windows não. Os nomes dos Page Objects precisam bater exatamente com os `import`.
- **Transpilação de dependências**: o `@faker-js/faker` é distribuído apenas como módulo ES e precisa passar pelo Babel. A regra de exclusão de `node_modules` no `cypress.config.js` usa `[\\/]` para funcionar com os separadores de caminho dos dois sistemas.

## Massa de dados: geração, consumo e limpeza

Alguns cenários precisam de dados únicos a cada execução (ex.: cadastro de usuário, que falha se o e-mail já existir). Para isso, o projeto tem uma camada dedicada em `cypress/support/data/`, com três classes de responsabilidade única:

### `DataFactory.js` — geração

É a única classe que gera dado novo, usando a biblioteca [`@faker-js/faker`](https://fakerjs.dev/). Não sabe de onde o dado é consumido nem quem faz a limpeza depois — só gera.

- `buildUser()`: nome, e-mail, senha, telefone, endereço, data de nascimento e um país sorteado **apenas entre os países aceitos pelo `<select>` de cadastro do site** (a lista completa de países do mundo real não serviria, pois o site só aceita um conjunto fixo de opções).
- `buildSearchTerm()`: sorteia um termo de busca plausível para o catálogo do site.
- `buildCartItem()` / `buildBatch()`: geram dado de produto/quantidade e lotes de dados. Ficam disponíveis para cenários futuros que precisem de carrinho com dado fake, mas **não são usados pelos cenários atuais** (o carrinho hoje usa produtos reais da listagem do site, não dado gerado).

### `DataProvider.js` — consumo

É a porta de entrada usada pelos Steps. Decide entre duas fontes, dependendo do que o cenário precisa:

- **Dado fixo e sensível** (`getUser({ fromFixture: true })`): lê a credencial real de login diretamente do `.env` via `Cypress.env()`. Usado no cenário de login válido, porque precisa ser uma conta que **realmente existe** no site — não pode ser gerada.
- **Dado novo e descartável** (`getUser()`, padrão): delega para o `DataFactory`. Usado no cenário de cadastro (precisa de e-mail único a cada execução) e no cenário de login com e-mail não cadastrado (precisa de um e-mail garantidamente inexistente).

### `DataCleaner.js` — limpeza

Funciona como um registro (ledger): um Step que cria algo via API chama `dataCleaner.register(tipo, payload)`, e o hook `afterEach` global (em `cypress/support/e2e.js`) chama `cleanupAll()` ao final de cada cenário, removendo tudo que foi registrado — mesmo que o teste falhe no meio.

**Uso real hoje:** o cenário de API `accountApi.feature` (`createAccount`) registra a conta criada com `dataCleaner.register('apiAccount', { email, password })`, e a limpeza (`deleteAccount` via API, usando o `AccountService`) acontece automaticamente no `afterEach`, sem nenhum passo explícito na feature.

**Por que o cenário de cadastro via UI (`login.feature`) não usa o `DataCleaner`:** excluir a conta criada pela UI exige estar logado naquela sessão específica e navegar até o link "Delete Account" (`SignupPage.deleteAccount()`) — uma operação de UI, não de API. O `DataCleaner` foi desenhado para limpezas via `cy.request()`, dissociadas de sessão de navegador; misturar UI ali quebraria essa responsabilidade única. Por isso, nesse cenário específico, a exclusão continua sendo um passo explícito na própria feature (`E excluo a conta criada`), deixando o ciclo de vida do teste visível para quem lê o `.feature`. Já na API, como a exclusão também é via `cy.request()`, o `DataCleaner` é a ferramenta certa — e é o que usamos.

## Tratamento de anúncios de terceiros no site sob teste

O `automationexercise.com` carrega anúncios de terceiros em iframes cross-origin, que ocasionalmente causavam dois problemas distintos durante a execução dos testes: um `SecurityError` interno do Cypress ao inspecionar a página, e um erro de serialização no `allure-cypress` ao tentar registrar o passo do teste. Nenhum dos dois tem relação com a aplicação sob teste.

A solução aplicada, em `cypress/support/e2e.js`, foi bloquear a rede de anúncios antes que ela carregue, via `cy.intercept()` em um `beforeEach` global, cobrindo os provedores mais comuns (Google Ads/DoubleClick, Amazon Ads, Taboola, Outbrain). Essa abordagem foi escolhida no lugar de desabilitar `chromeWebSecurity` (alternativa mais simples, porém mais abrangente) porque bloquear a origem do problema evita desligar uma proteção de segurança do navegador inteira, mantendo o teste útil para detectar eventuais problemas reais de CORS na aplicação.

## Boas práticas aplicadas

- Cenários descritos em Gherkin com Cucumber.
- Separação entre features e step definitions.
- Page Objects para ações e seletores da interface web.
- Service Object para centralizar chamadas da API.
- Dados configuráveis carregados pelo `.env`.
- Geração dinâmica de massa de dados com Faker, evitando colisão entre execuções (`DataFactory`/`DataProvider`).
- Camada de limpeza de dados via `DataCleaner`, usada de fato no cenário de criação de conta via API (registro + limpeza automática no `afterEach`).
- Bloqueio de domínios de terceiros para estabilidade dos testes, sem desabilitar proteções de segurança do navegador.
- Separação dos cenários positivos e negativos de API.
- Execução seletiva por scripts npm.
- Relatórios de execução com Allure, com ambiente, categorias de falha e histórico de execuções.
- Integração contínua com GitHub Actions: execução automática, credenciais em GitHub Secrets e relatório publicado mesmo quando há falhas, sem esconder o status de erro.

## Observações

- Os testes de login utilizam um usuário de teste próprio, criado no site Automation Exercise.
- O teste de API consome um endpoint público do Trello, sem necessidade de autenticação.
