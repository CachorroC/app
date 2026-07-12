@AGENTS.md

This repository uses `AGENTS.md` as the canonical AI guidance file.

Key conventions:

- Next.js 16+ with the `app` router and React 19
- Alias imports: `#@/*`, `components/*`, `types/*`
- Sass + typed CSS/SCSS modules with `tcm src` validation
- Prisma + PostgreSQL is the primary database layer
- Preferred scripts: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm db:migrate`, `pnpm db:push`, `pnpm prisma:generate`
