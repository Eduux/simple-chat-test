## Next Front end test

This project uses: Next 15, Tailwind, Typescript, Open AI.

## Architecture

```
src
│── utils/               # Global utility functions
│── stores/              # Global state management using Context Api
│   ├── [store]/         # Individual stores
│   │   ├── ...files     # Store definitions
│── domain/              # Business logic and types
│   ├── [domain]/        # Specific domain modules
│   │   ├── ...files     # Business logic and type definitions
│── components/          # Reusable UI components (buttons, cards, etc.)
│   ├── ...commonComponents
│── app/                 # Main structure of Next.js 15
│   ├── api/             # API routes (Next.js App Router)
│   │   ├── [apiRoutes]  # Specific API route handlers
│   ├── [page]/          # Next.js pages
│   │   ├── _tests_/     # Unit and integration tests for pages
│   │   ├── ...files     # Page components and logic
```

## Getting Started

Install the dependencies

```bash
npm install
```

Run migrations

```bash
npm run db:chat
```

Run the development server:

```bash
npm run dev
```

Run tests

```bash
npm run test
```

# [Live demo vercel https://curotec-test.vercel.app/ ](https://curotec-test.vercel.app/)
