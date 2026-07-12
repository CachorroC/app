# Asesor Jurídico — Carpetas UI (Next.js)

Two screens for the legal case-management app, built against `schema.prisma` and the **Design System Asesor 2** (Material You, blue → purple brand, Quicksand + Roboto Mono).

1. **Dashboard** (`/carpetas`) — KPI strip, category filter chips, search, sortable dense table **and** a card-grid view (toggle top-right). Each row shows fecha, categoría, llave de proceso, etapa, and the última actuación with its anotación. Click a carpeta to open its detail.
2. **Detail** (`/carpetas/[numero]`) — every connected entity: Demanda, Deudor/Codeudor, Procesos, Actuaciones (timeline), Facturas, Notas, Tareas, Juzgado + Notificación. Two layouts: **Pestañas** (tabbed) and **Documento** (summary rail + stacked sections) — toggle top-right.

## Files

```
app/
  globals.css                 ← DS-aligned tokens; old --variable names kept (see below)
  layout.tsx                  ← <html lang="es">; set data-theme to pin light/dark
  carpetas/
    page.tsx                  ← dashboard route (server → CarpetasDashboard)
    [numero]/page.tsx         ← detail route (server → CarpetaDetail)
components/
  ui/                         ← Icon, StatusChip, CategoryDot (+ ui.module.css)
  Sidebar/                    ← nav + category list + theme toggle
  dashboard/CarpetasDashboard ← client: state for view/filter/search/sort/revisado
  detail/CarpetaDetail        ← client: state for tabs/view/tareas/notas
lib/
  types.ts                    ← TS types mirroring the Prisma models
  format.ts                   ← COP/date formatting, category/status/tipo metadata
  mockData.ts                 ← 7 fully-related carpetas (swap for Prisma queries)
```

Path alias `@/*` → project root (set in `tsconfig.json`: `"paths": { "@/*": ["./*"] }`).

## Theme

`globals.css` ships **light** as the default. Dark applies when:

- `<html data-theme="dark">` is set (the in-app toggle does this), or
- the OS is in dark mode and the app is not pinned with `data-theme="light"`.

## Responsive & touch

Both screens adapt from desktop down to phones:

- **Desktop (>1024px):** fixed 264px sidebar + dense table; detail uses the rail+sections (documento) or tabs layout.
- **Tablet (≤1080px):** KPI tiles collapse to 2 columns; the table scrolls horizontally inside its card.
- **Phone (≤768px):** the sidebar becomes an off-canvas **drawer** (hamburger in the top bar, tap-scrim to close); search drops to its own full-width row; the dashboard **forces the card view** (the dense table is hidden); the detail header wraps, the rail stacks above the sections, and key-value grids go to one/two columns.
- **Touch:** `touch-action: manipulation` (no 300ms delay) and no tap-flash globally; on coarse pointers hit targets grow to ≥44px (row checkboxes, segmented buttons, tabs, table cells). Nothing depends on hover — every affordance is tap-reachable and selecting a drawer item closes the drawer.

Breakpoints live in each component's `.module.css`; the drawer state (`navOpen` + `matchMedia('(max-width:768px)')`) lives in `CarpetasDashboard`.

## Variable naming

You asked to keep the **old** `globals.css` variable names. They're all kept (`--primary`, `--on-surface`, `--surface-container-low`, `--outline-variant`, `--title-large-*`, `--dp*`, `--elevation-*`, `--shape-corner-*`, …) but **repointed to the new design-system values**. The canonical DS tokens (`--md-*`, `--type-*`, `--space-*`, `--radius-*`) are also exposed, so either convention works. New components in this package use the DS names; your existing code keeps working unchanged.

## Fonts

`globals.css` references self-hosted webfonts in `/public/fonts/`. Copy the `.woff2` files from the design system's `assets/fonts/` (Quicksand, Roboto Mono, Material Symbols Rounded), or replace the `@font-face` blocks with the Google Fonts `<link>`s if you prefer the CDN.

## Wiring real data

Both routes are server components that currently import `lib/mockData`. Replace with Prisma:

```ts
const carpetas = await prisma.carpeta.findMany({
  include: {
    deudor: true,
    codeudor: true,
    demanda: { include: { medidas: true, notif: true } },
    procesos: true,
    actuaciones: { orderBy: { fecha: 'desc' } },
    facturas: true,
    notas: true,
    tareas: true,
    juzgado: true,
  },
});
```

`deriveStatus()` in `lib/format.ts` maps the `revisado`/`terminado`/`vencido` flags to the `CaseStatus` the StatusChip renders.
