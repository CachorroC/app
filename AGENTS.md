<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

**CRITICAL INSTRUCTION:** This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. **ALWAYS** read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed all deprecation notices.

## Project-Specific Guidance

- **Framework:** **Next.js 16+** with the `app` router and modern React 19.
- **Alias Conventions:** Use `#@/*` for imports from `src/*`. The paths `components/*` and `types/*` are also mapped.
- **Authentication:** Uses `next-auth` v5 beta.
- **Scripts:** Prefer `pnpm` when available. Key commands:
  - `pnpm dev` for local development
  - `pnpm build` for production build
  - `pnpm lint` for linting
  - `pnpm prisma:generate`
  - _WARNING:_ While scripts like `pnpm db:migrate` and `pnpm db:push` might exist, **DO NOT** run them from this repository. See the "Database & Prisma" rule below.
- **Database:** Prisma + PostgreSQL is primary. Generated Prisma code lives under `src/app/generated/prisma/` and **MUST NOT** be edited directly.
- **Styling Overview:** Uses `sass` plus typed CSS/SCSS modules, with `tcm src` validation enforced in build/dev scripts.

## Important Conventions

- **Preserve Existing Workspace Structure:** `src/app/` is the main app entry point.
- **Follow Existing Patterns:** Adhere to existing naming and folder patterns in `src/components/`, `src/lib/`, and `src/styles/`.

<!-- END:nextjs-agent-rules -->

# Agent Rules

Please strictly follow these rules during all interactions:

## 1. Code Quality & Typing

- **Clean Code:** Use TypeScript strict mode, single quotes, and functional patterns. Write brief JSDocs only when necessary.
- **Strict Type Checking:** ALWAYS follow best practices for type checking. NEVER use `as any`, `as unknown`, `as never`, `as undefined`, or `as Route`. ALWAYS use explicit types or interfaces tailored to meet the demands of the code.

## 2. Design System & Styling

**Source of truth:** Claude Design project `R&S Asesoría Jurídica — Design System` — `28e31e8b-96f5-4107-8e05-8203b25a3b63`, via the `claude-design`MCP server.
**Local cache:**`design-system/inventory.md`(components + variants),`design-system/tokens.css`(color, spacing, radius, font, shadow),`design-system/.synced-at` (ISO timestamp of last pull).

- **Design System First:** Before building or styling any UI, resolve the design system through this sequence — never build from memory:
  1. If `claude-design` MCP tools are available, query project `28e31e8b-96f5-4107-8e05-8203b25a3b63` for its current component inventory and tokens.
  2. Diff against the local cache. **MCP wins.** Rewrite `design-system/inventory.md`, `design-system/tokens.css`, and `design-system/.synced-at`, then list the token deltas and ask before editing `src/styles/globals.scss` any changed token values into `src/styles/globals.scss`. Report what changed before writing any component code.
  3. If MCP is unreachable or unauthenticated (run `/design-login`) **or** `.synced-at` is older than 7 days, proceed from the local cache but flag it as potentially stale up front.
  4. Build only from existing components, variants, and token values. Never invent new markup, colors, spacing, radii, fonts, or shadows. If something is genuinely missing, say so and ask — new primitives go into Claude Design first, not into the codebase.
- **SCSS Modules Only:** This project uses typed CSS modules, but the CSS files and the type definitions get created upon build. Types should always be written inside SCSS modules using nesting strategies and SCSS best practices.
- **No Tailwind or Inline Styles:** Do NOT use Tailwind CSS or inline styles under any circumstance.
- **Global Variables:** Use variable names from `src/styles/globals.scss`, which is the SCSS-side mirror of `design-system/tokens.css`. When tokens change upstream, transcribe them into `globals.scss` as part of the same sync — components consume `globals.scss` variables, never raw values from `tokens.css`.

## 3. Database & Prisma (CRITICAL)

- **Read-Only Prisma Setup:** This is a repository that ONLY runs `prisma db pull` from the main Prisma implementation. This folder only consumes from Prisma.
- **NO MIGRATIONS:** You CANNOT and MUST NOT run Prisma migrations from this repository.
- **Schema Changes:** Any changes to the Prisma schema MUST be requested from the user, so they can implement them on the Prisma implementation in the backend folder.

## 4. Operational Requirements

- **Water Tracker:** Append a 1-line footprint estimate to final summaries.

## 5. Plan Mode

- **Plan for implementation:** Always present to me a plan of what where your findings and what you'll be changing or implementing, which files will be edited or modified and why.
