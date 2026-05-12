# Lista de Usuários

Aplicação Angular para listagem e gerenciamento de usuários, desenvolvida como teste técnico.

## Stack

- **Angular 21** (standalone components)
- **Angular Material** — componentes de UI
- **Signals** — gerenciamento de estado reativo
- **RxJS** — operadores assíncronos (switchMap, debounceTime, catchError, forkJoin)
- **Vitest** — testes unitários

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Executando o projeto

O projeto usa **JSON Server** como API mock. É necessário rodar os dois servidores juntos.

```bash
# Inicia a API mock (porta 3000) + Angular (porta 4200) simultaneamente
npm run dev
```

Ou separadamente em dois terminais:

```bash
npm run mock-api   # API: http://localhost:3000
npm start          # App: http://localhost:4200
```

## Testes

```bash
# Executar uma vez
npm test

# Modo watch
npm run test:watch

# Com relatório de cobertura (mínimo 60%)
npm run test:coverage
```

## Build de produção

```bash
npm run build
```

## Estrutura do projeto

```
src/
├── app/
│   ├── core/           # Serviços, modelos e guards globais
│   ├── features/
│   │   └── users/      # Feature de usuários (listagem + modal)
│   └── shared/         # Componentes e pipes reutilizáveis
└── styles.scss
```

# etapas de desenvolvimento

etapa 1
construir as telas conforme no documento
etapa 2
garantir 100% da funionalidade do sistema
etapa 3
melhorar o ui/ux da telas para alto nivel
