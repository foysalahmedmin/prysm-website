<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules

- Plans and design docs live outside this repo, in `../docs/`. Read `../docs/01-architecture.md` before changing structure.
- UI reads data and content only through `@/services`. Never import `@/data` or `@/content` outside `src/services/static/`.
- Client components never import `@/services`; call a Server Action instead.
- Write logic test-first. Run `pnpm verify` before every commit and `pnpm verify:full` before finishing a phase.
- Commits: Conventional Commits, authored with the developer's own git identity, no co-author trailers.
