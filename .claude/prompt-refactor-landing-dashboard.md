# Task: Split landing page and dashboard into separate layouts

## Context

This is a Next.js App Router project (TypeScript strict, CSS Modules, kebab-case filenames, no Tailwind, Spanish UI copy). Right now the landing page and the dashboard are tangled together: the root layout renders the dashboard's left navigation rail and its chrome, so every route — including `/` — inherits dashboard styling. The landing page and the app shell need to be fully separated.

The design system already contains a finished landing page template with its own responsive implementation. **That template is the source of truth.** Match it exactly — layout, spacing, breakpoints, typography, tokens. If existing CSS Modules in the current root layout conflict with it, rewrite or delete them. Do not compromise on fidelity to preserve existing styles.

The landing page template, its markup, and its tokens are specified in this handoff document. Treat everything in this handoff as the specification; treat the existing codebase as the thing being changed to match it.

## Before you write any code

1. Read the landing page template in this handoff and list the components, tokens, and breakpoints it uses.
2. Map the current route tree and note every file that imports the navigation rail or root-layout styles.
3. **Determine the current authentication setup by reading the code — do not assume.** Inspect the auth config, session helpers, provider components, `middleware.ts`, and any protected-route logic, and report back which session API the top bar should use and how the user's name and avatar are exposed on the session object. This auth was implemented recently, so the code is authoritative over any assumptions.
4. Report a migration plan back to me. **Do not start editing until I approve it.**

## Target route structure

```
app/
  layout.tsx              → contexts/providers ONLY. No styles, no chrome, no nav.
  page.tsx                → landing page. New CSS Module, built from the design system template.
  landing/                → (optional) landing-only components + styles
  dashboard/
    layout.tsx            → navigation rail + all app shell chrome (moved from root layout)
    page.tsx              → dashboard home
    memoriales/
    amortizacion/
    bitacora/
    tareas/
    Notas/
    Carpetas/
    Carpetas_alt/
    ...every other route that currently depends on the navigation rail
```

## Phase 1 — Strip the root layout

- Reduce `app/layout.tsx` to providers, contexts, fonts, and metadata. No visual chrome, no imported layout stylesheet.
- Remove the navigation rail and app-shell markup from it entirely.
- Keep `<html>`/`<body>` and anything genuinely global (theme provider, session provider, etc.).

## Phase 2 — Build the landing page

- Rewrite `app/page.tsx` to implement the design system landing template exactly.
- Write a **new** CSS Module for it (kebab-case filename). Do not reuse dashboard styles.
- **Mobile-first**: base styles target the smallest viewport; scale up with `min-width` media queries matching the design system's breakpoints.
- Top bar requirements:
  - Signed out → "Iniciar sesión" button.
  - Signed in → user's name and avatar, plus a link to `/dashboard`.
  - Use the existing auth implementation you identified in step 3 above. Do not introduce a new auth library, a new session provider, or a parallel way of reading the session.
  - If the session provider currently lives in the root layout, it stays there — the root layout keeps providers, it only loses its styling and chrome.
  - Handle the loading/unresolved session state so the bar doesn't flash between signed-out and signed-in.

## Phase 3 — Move the dashboard

- Create `app/dashboard/layout.tsx` holding the navigation rail and all app-shell styling moved out of the root layout.
- Move every dashboard route listed above under `app/dashboard/`.
- Update **all** internal references to the moved routes:
  - `<Link href>` and `router.push()` calls across the codebase
  - `middleware.ts` matchers and auth-protected path lists
  - any hardcoded paths in constants, config, tests, or API redirects
  - `next.config` redirects/rewrites
- Add redirects from the old top-level paths to their `/dashboard/*` equivalents so existing links don't 404.
- Preserve the existing route segment casing exactly as-is (`Notas`, `Carpetas`, `Carpetas_alt`) — do not rename or lowercase them in this pass.

## Constraints

- CSS Modules only. No Tailwind, no inline style objects for layout.
- TypeScript strict — no `any`, no `@ts-ignore`.
- Spanish UI copy throughout.
- Server Components by default; add `"use client"` only where interactivity requires it.
- Do not change data fetching, Prisma queries, or business logic in this refactor. Structure and styling only.

## Acceptance criteria

- [ ] `/` renders the landing page with zero dashboard chrome and no navigation rail.
- [ ] `app/layout.tsx` imports no layout stylesheet and renders no visual elements.
- [ ] Every dashboard route resolves under `/dashboard/*` and shows the navigation rail.
- [ ] Old top-level dashboard URLs redirect rather than 404.
- [ ] Landing page matches the design system template at 360px, 768px, 1024px, and 1440px.
- [ ] Top bar shows the correct signed-in vs signed-out state.
- [ ] `pnpm build` and `pnpm lint` pass clean.

## Working style

Work phase by phase. After each phase, show me the files changed and a short summary before moving on. If the design system template conflicts with something in the existing code, tell me rather than guessing.
