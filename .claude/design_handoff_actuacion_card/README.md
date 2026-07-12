# Handoff: Actuación Card — Success / Loading / Error States

## Overview
The "Actuación Card" displays a single court-proceeding entry (`actuación`) inside R&S Asesoría Jurídica's case-management app (see Data Model → `Actuacion` in the bound design system). This bundle covers the three states the card needs when fetching actuación data from the API: **loaded** (existing), **loading (skeleton)**, and **error**.

## About the Design Files
The files in this bundle are **design references created in HTML** (Design Components in an internal prototyping tool) — they show the intended look, responsive behavior, and content, not production code to copy directly. The task is to **recreate these HTML designs in the target codebase's existing environment** (React/Next.js, per the bound R&S design system) using its established components, tokens, and patterns — not to ship this HTML as-is.

The R&S Asesoría Jurídica design system (Material 3 tokens: `--md-sys-*`, Quicksand + IBM Plex Mono, Material Symbols Rounded icons) is the single source of truth for colors, type, shape, and elevation. All three states are built from those same tokens.

## Fidelity
**High-fidelity.** Colors, typography, spacing, icons, and copy are final per the R&S design system. Implement pixel-for-pixel using the codebase's existing design-system components (`Button`, `Chip`, `Badge`).

## The three states

### 1. Loaded — `ActuacionCard.dc.html`
The baseline, already-shipped card. Shows:
- Icon (`gavel`) + actuación title (2-line clamp) + fecha (calendar icon, right-aligned)
- Anotación text (italic + "Sin anotación registrada." placeholder when null)
- Chip for `codRegla`, doc-attached indicator, cantidad
- Radicado (llaveProceso), N.° de acción, "Última actuación" badge when `isUltimaAct`
- Rango de fechas (inicial–final), shown only if both are present
- Carpeta N.°, fecha de registro, ID de proceso
- Left accent bar: primary purple when `isUltimaAct`, transparent otherwise

### 2. Loading — `ActuacionCardSkeleton.dc.html`
Shimmer skeleton shown while the actuación is being fetched. Structurally mirrors every tier of the loaded card (same fields present/absent at the same widths) so there's no layout jump when data arrives — only the content swaps from bone shapes to real text/icons.
- Shimmer: `linear-gradient` sweep (`surface-container-high` → `surface-container-highest` → `surface-container-high`), `background-size: 400% 100%`, animated via `background-position` over 1.6s ease-in-out infinite loop
- Accent bar rendered neutral (`surface-container-high`, no purple — state isn't known yet)
- `role="status"` + `aria-live="polite"` + `aria-label="Cargando actuación"` for screen readers
- No props — pure presentational state, mount whenever the fetch is in flight

### 3. Error — `ActuacionCardError.dc.html`
Shown when the fetch for that individual actuación fails (the row of data errors independently — other cards/rows keep loading normally).
- Card surface uses the M3 **error** role: `error-container` background, `error` border/accent, `on-error-container` text — never `on-surface`
- `error` icon + "No se pudo cargar la actuación" title + human message (prop `message`)
- Reference/error code (prop `errorCode`, e.g. `TIMEOUT_503`) shown once the card is wide enough
- **Reintentar** (retry) button — text-variant `Button` from the design system, wired to `onRetry` callback prop
- Carpeta number for orientation in dense tables (prop `carpetaNumero`)
- Optional technical detail block (prop `detail`, e.g. raw error message) — only rendered if provided, and only shown at the widest tier (developer/debug info, lowest priority)
- `role="alert"` for screen readers

## Responsive / container-query behavior (all three states share this)
All three cards use **CSS container queries** (`container-type: inline-size`), not viewport media queries — the card's tier is driven by its own rendered width (it sits inside table cells / grid tracks of varying size), not the screen size. Tiers, identical across all three components:

- **< 240px (bare/inline tier):** no card chrome — transparent background, no border, no shadow, no radius, no accent bar. Reads as plain text in a dense table cell. Only the base row (icon + title + fecha) and the note/message line show.
- **≥ 240px:** becomes a real card — `surface-container-low` background (`error-container` for the error state), `outline-variant` border, elevation level 1, `shape-corner-large` (16px) radius, 4px accent bar appears, padding 14px. The "sm" tier row appears (chips/attachments for loaded; ref code + retry button for error; a matching skeleton row for loading).
- **≥ 340px:** the "md" tier appears (radicado/acción-n°/badge for loaded; carpeta info for error/loading), and the header switches from stacked to a row (title left, fecha right).
- **≥ 460px:** the "lg" tier appears (rango de fechas for loaded; technical detail block for error; matching skeleton bar for loading), padding grows to 18px.
- **≥ 600px:** the "xl" tier appears (carpeta/registrado/ID metadata grid for loaded and loading only — the error card has no xl tier, its content is fully shown by lg), padding grows to 22px.

Implement this with real CSS container queries (`container-type: inline-size`) on a wrapper around the card, exactly as in the HTML — do not substitute viewport media queries, since the card's size is set by its layout slot, not the screen.

## Interactions & Behavior
- **Loading → Loaded/Error transition:** swap the skeleton component for the loaded or error component when the fetch settles. No shared animation is prescribed — a simple cross-fade (~150–200ms) is reasonable if the target design system has one.
- **Retry:** clicking "Reintentar" on the error card re-triggers the fetch for that single actuación and, while in flight, that row should show the loading skeleton again (not a full-page reload).
- **Independent failure:** each actuación fetches and can fail independently — one card erroring must not block or blank out sibling cards in the same list/table.
- No hover/press states beyond the design system's own `Button`/`Chip` state layers (opacity .08 hover / .12 pressed, per the bound design system).

## State Management
Suggested shape per actuación row (adapt to the codebase's existing data-fetching pattern, e.g. React Query/SWR):
```
{
  status: 'loading' | 'success' | 'error',
  data?: Actuacion,       // fields below, present when status === 'success'
  error?: { message: string, code?: string, detail?: string }, // when status === 'error'
}
```
Render `ActuacionCardSkeleton` while `status === 'loading'`, `ActuacionCard` while `'success'`, `ActuacionCardError` while `'error'`.

## Props reference

**ActuacionCard** (loaded): `actuacion` (string), `fechaActuacion` (date string), `anotacion` (string | null), `fechaInicial` / `fechaFinal` (date string | null), `fechaRegistro` (date string), `codRegla` (string), `conDocumentos` (boolean), `cant` (number), `llaveProceso` (string), `consActuacion` (number), `isUltimaAct` (boolean), `carpetaNumero` (number), `idProceso` (string), `createdAt` (date string).

**ActuacionCardSkeleton** (loading): no props — pure visual placeholder.

**ActuacionCardError** (error): `message` (string), `carpetaNumero` (number), `errorCode` (string | null), `detail` (string | null), `onRetry` (() => void).

## Design Tokens
All values come from the bound R&S Asesoría Jurídica design system — do not hardcode hex values in the target codebase, reference the same token names:
- Colors: `--md-sys-color-surface-container-low/high/highest`, `--md-sys-color-outline-variant`, `--md-sys-color-primary`, `--md-sys-color-error`, `--md-sys-color-error-container`, `--md-sys-color-on-error-container`, `--md-sys-color-on-surface`, `--md-sys-color-on-surface-variant`
- Typography: `--md-sys-typescale-title-small/medium`, `--md-sys-typescale-body-small/medium`, `--md-sys-typescale-label-small/medium`; fonts Quicksand (UI text) and IBM Plex Mono (reference numbers, money, radicado, IDs)
- Shape: `--md-sys-shape-corner-small`, `--md-sys-shape-corner-large` (16px), `--md-sys-shape-corner-full`
- Elevation: `--md-sys-elevation-level1`
- Icons: Material Symbols Rounded — `gavel`, `calendar_month`, `attach_file`, `tag`, `date_range`, `error`, `refresh`, `code`

## Assets
No images/icons beyond the Material Symbols Rounded webfont (loaded via Google Fonts link) and the design system's own component bundle. No brand logo appears on this card.

## Files
- `ActuacionCard.dc.html` — loaded state (pre-existing, included for reference/comparison)
- `ActuacionCardSkeleton.dc.html` — loading state (new)
- `ActuacionCardError.dc.html` — error state (new)

Each file is self-contained HTML (loads the design-system bundle from a relative `_ds/` path in the source project — that path won't resolve outside the prototyping tool; treat the files purely as markup/style/token reference, not as includable code).
