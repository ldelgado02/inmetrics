# Inmetrics - Automação de Testes

Projeto de automação de testes desenvolvido para o processo seletivo, cobrindo cenários web e de API.

## Tecnologias

- JavaScript
- Cypress
- Cucumber (cypress-cucumber-preprocessor)

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
│   └── pages/           -> Page Objects (POM)
└── fixtures/
```

## Planejamento

A abordagem do projeto seguiu a seguinte ordem:

1. **Definição do BDD com Cucumber**: optou-se por usar Cucumber para deixar os cenários escritos em linguagem natural (Gherkin), facilitando a leitura e tornando os testes mais organizados e reutilizáveis.
2. **Definição dos cenários**: primeiro foram mapeados e escritos os cenários de teste nas features (login, busca, carrinho e API), cobrindo os fluxos principais e alternativos de cada desafio.
3. **Criação dos steps**: em seguida, foram implementados os step definitions correspondentes a cada linha das features.
4. **Aplicação do POM (Page Object Model)**: por fim, o projeto foi reorganizado utilizando POM, separando os seletores e ações de cada página em classes próprias (`cypress/support/pages`), deixando os steps mais limpos e a manutenção mais simples.

## Pré-requisitos

- Node.js instalado
- npm instalado

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
