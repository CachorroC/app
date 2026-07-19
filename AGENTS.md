<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Project-specific guidance

- Framework: **Next.js 16+** with the `app` router and modern React 19.
- Alias conventions: use `#@/*` for imports from `src/*`; also `components/*` and `types/*` are mapped.
- Styling: uses `sass` plus typed CSS/SCSS modules, with `tcm src` validation enforced in build/dev scripts.
- Database: Prisma + PostgreSQL is primary; generated Prisma code lives under `src/app/generated/prisma/` and must not be edited directly.
- Authentication: uses `next-auth` v5 beta.
- Scripts: prefer `pnpm` when available. Key commands:
  - `pnpm dev` for local development
  - `pnpm build` for production build
  - `pnpm lint` for linting
  - `pnpm db:migrate`, `pnpm db:push`, `pnpm prisma:generate`

## Important conventions

- Preserve existing workspace structure: `src/app/` is the main app entry point.
- Follow existing naming and folder patterns in `src/components/`, `src/lib/`, and `src/styles/`.

<!-- END:nextjs-agent-rules -->

# Agent Rules

1. **Clean Code**: TS strict mode, single quotes, functional
   patterns. Brief JSDocs only for complex types/returns.
2. **Water Tracker**: Append a 1-line footprint estimate to
   final summaries.
3. **Design System**: Before building or styling any UI, read
   `design-system/inventory.md` for existing components/variants and
   `design-system/tokens.css` for color/spacing/radius/font/shadow
   values (extracted from the R&S Claude Design handoff). Reuse them
   instead of inventing new markup, colors, or spacing values.
