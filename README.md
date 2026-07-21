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
├── support/
│   ├── pages/           -> Page Objects (POM)
│   └── services/        -> Service Objects (chamadas de API)
└── fixtures/

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

- Node.js instalado
- npm instalado
- Java instalado (necessário para o Allure Report gerar e abrir o relatório)

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

### Rodar uma feature específica

```bash
npm run cy:run:login
npm run cy:run:cart
npm run cy:run:search
npm run cy:run:trello
```

## Relatório de testes (Allure)

O projeto gera relatórios de execução utilizando o Allure Reports.

### Opção rápida (roda tudo de uma vez)

```bash
npm run cy:run:allure
```

Esse comando roda os testes, gera o relatório e já abre no navegador.

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

## Cenários cobertos

### Web (site: Automation Exercise - automationexercise.com)

- **Login**: login com credenciais válidas e inválidas
- **Busca**: busca de produto existente e inexistente
- **Carrinho**: adicionar produto, atualizar quantidade/valor ao adicionar produto repetido, remover produto, e validar produto na tela de pagamento (checkout)

### API

- GET na action do Trello, validando o status code da resposta e exibindo o campo `name` da estrutura `list`

## Observações

- Os testes de login utilizam um usuário de teste próprio, criado no site Automation Exercise.
- O teste de API consome um endpoint público do Trello, sem necessidade de autenticação.
- As dependências do projeto foram revisadas com o `depcheck` para conter apenas o que é efetivamente utilizado.