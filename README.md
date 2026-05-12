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

```bash
npm start
```

Acesse [http://localhost:4200](http://localhost:4200)

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
