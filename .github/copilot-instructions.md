# Repository AI Instructions

This repository uses `AGENTS.md` as the primary AI guidance file.

Please read `AGENTS.md` before making changes. It contains repository-specific conventions for:

- Next.js 16+ with the `app` router and React 19
- `#@/*`, `components/*`, and `types/*` path aliases
- Sass + typed CSS/SCSS modules with `tcm src` validation
- Prisma + PostgreSQL conventions and generated code rules
- Preferred `pnpm` scripts for development, build, lint, and database workflows

Recommended entry points:

- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm db:migrate`
- `pnpm db:push`
- `pnpm prisma:generate`
