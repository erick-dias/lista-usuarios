# Lista de Usuários

Aplicação Angular para listagem e gerenciamento de usuários.

## Stack

- **Angular 21** — standalone components, signals, reactive forms
- **Angular Material** — componentes de UI (toolbar, dialog, form fields, FAB)
- **RxJS** — `switchMap`, `debounceTime`, `catchError`, `merge`, `startWith`
- **JSON Server** — API REST mock com persistência em `db.json`
- **Vitest** — testes unitários (cobertura mínima 60%)

---

## Pré-requisitos

- **Node.js** 18 ou superior → [nodejs.org](https://nodejs.org)
- **npm** 9 ou superior (já vem com o Node)

Verifique as versões instaladas:

```bash
node -v
npm -v
```

---

## Instalação

```bash
npm install
```

---

## Executando o projeto

> **Atenção:** o projeto depende de **dois servidores** rodando ao mesmo tempo:
>
> - **JSON Server** (porta 3000) — API mock que lê e escreve em `db.json`
> - **Angular** (porta 4200) — aplicação web

### Opção 1 — um único comando (recomendado)

```bash
npm run dev
```

Aguarde as duas mensagens aparecerem no terminal:

```
JSON Server rodando em http://localhost:3000
Angular Live Development Server está em http://localhost:4200
```

Abra o navegador em: **http://localhost:4200**

---

### Opção 2 — dois terminais separados

**Terminal 1** — API mock:

```bash
npm run mock-api
```

**Terminal 2** — Angular:

```bash
npm start
```

Abra o navegador em: **http://localhost:4200**

---

> Se aparecer a mensagem **"Erro ao carregar usuários"** na tela, é porque
> o JSON Server não está rodando. Verifique se a porta 3000 está ativa.

---

## Testes

```bash
# Executar uma vez
npm test

# Modo watch (re-executa ao salvar)
npm run test:watch

# Com relatório de cobertura (mínimo 60%)
npm run test:coverage
```

---

## Build de produção

```bash
npm run build
```

---

## Funcionalidades

- Listagem de usuários com nome, e-mail e botão de editar
- Filtro por nome com debounce de 300ms
- Estado de loading e mensagem de erro
- Modal de criação de novo usuário (botão `+` vermelho)
- Modal de edição com formulário pré-preenchido (ícone de lápis)
- Validações: e-mail, CPF e telefone com mensagens por campo
- Persistência real via JSON Server — alterações salvas no `db.json`

---

## Estrutura do projeto

```
├── db.json                        # Dados mock (lido/escrito pelo JSON Server)
└── src/app/
    ├── core/
    │   ├── models/user.model.ts   # Interface User
    │   └── services/users.service.ts  # HttpClient: GET, POST, PUT
    ├── features/
    │   └── users/
    │       ├── users-list/        # Tela de listagem
    │       └── user-form/         # Modal de cadastro/edição
    └── shared/
```

### etapa 1:

Construição as telas conforme no documento

### etapa 2:

Garantir 100% da funionalidade do sistema

## etapa 3:

Melhorar o ui/ux da telas para alto nivel
