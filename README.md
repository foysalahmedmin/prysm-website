# PRYSM

Mirror Try demo store: a frontend-only fashion storefront (clothing, accessories, jewelry) built to show how the Mirror Try virtual try-on plugin fits a store's own design.

## Requirements

- Node 24 (`nvm use`), pnpm 10

## Commands

| Command                                      | What it does                                                                |
| -------------------------------------------- | --------------------------------------------------------------------------- |
| `pnpm dev`                                   | Dev server on http://localhost:3001                                         |
| `pnpm verify`                                | Typecheck, lint, format check, unit tests, production build                 |
| `pnpm verify:full`                           | `verify` plus Playwright e2e                                                |
| `pnpm test` / `test:watch` / `test:coverage` | Vitest                                                                      |
| `pnpm e2e` / `e2e:ui`                        | Playwright (production build on port 3101; `E2E_DEV=1` uses the dev server) |

## Architecture rules

- Data and content are read only through `@/services` (enforced by ESLint).
- Client components call Server Actions, never services.
- Plans and design docs live outside this repo in `../docs/`. Start with `../docs/01-architecture.md`.
