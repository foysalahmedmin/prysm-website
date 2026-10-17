# PRYSM — The Prism Atelier

Mirror Try flagship demo store: a high-refraction glassmorphic luxury fashion storefront (clothing, accessories, jewelry) demonstrating the seamless integration of the **Mirror Try** virtual try-on plugin.

## Design Archetype

- **Aesthetic:** High-refraction Glassmorphism, specular highlights, and chromatic dispersion edge styling.
- **Color Palette:** Daylight pale canvas (`#e9eef4`), deep ink (`#0e131d`), and subtle prismatic chromatic accents.
- **Typography:** Bricolage Grotesque (Display), Hanken Grotesk (Body), Geist Mono (Technical metadata).
- **Navigation:** Floating glass pill header, quick search overlay, right-rail frosted glass bag drawer.
- **Signature Motion:** Prismatic ambient `LightField` canvas background, dynamic cursor light angle physics (`usePointerAngle`), and subtle route cross-fade transitions.
- **Mirror Try Theme:** **The Lens** (`src/integration/mirror-try/theme-prysm.css`), featuring frosted glass panels, blurred backdrops, and chromatic accents.

## Requirements & Environment

- Node.js 24 (`nvm use 24`)
- pnpm 10

## Commands

| Command            | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| `pnpm dev`         | Start development server on `http://localhost:3001`        |
| `pnpm build`       | Production build                                           |
| `pnpm typecheck`   | Next.js route typegen & TypeScript compilation check       |
| `pnpm test`        | Run Vitest suite (42 test suites, 274 unit/contract tests) |
| `pnpm verify`      | Typecheck, lint, formatting, and unit tests                |
| `pnpm verify:full` | Full verification including Playwright e2e suites          |

## Architecture & Fences

- Data and content are accessed strictly through `@/services` (guarded by ESLint import fences and `src/config/fence.test.ts`).
- The Mirror Try plugin lives in `@/plugins/mirror-try` and is decoupled from core store logic via the `@/integration/mirror-try` bridge.
- Compliant with WCAG 2.1 AA accessibility and structured Schema.org (`Product`, `BreadcrumbList`, `Organization`) metadata.
