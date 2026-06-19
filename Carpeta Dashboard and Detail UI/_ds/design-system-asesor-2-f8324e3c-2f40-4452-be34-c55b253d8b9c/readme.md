# Asesor Jurídico — Design System

**Asesor Jurídico** is a legal case-management dashboard for Colombian law practices. It tracks lawsuits (*demandas*) and their case folders (*carpetas*) end-to-end: debtors, court proceedings (*actuaciones*), courts (*juzgados*), electronic invoicing (*facturas*), tasks and notes. The product is data-dense and operational — its job is to let an attorney see the state of every process at a glance and drill into any one of them.

The interface is built on **Material You (Material Design 3)** with a **blue → purple** brand palette taken from the scales-of-justice logo, and **Quicksand** as the primary typeface.

## Sources

- `uploads/schema.prisma` — the canonical data model. Every entity, status flag, and enum in this system maps to a Prisma model: `Carpeta`, `Demanda`, `Deudor`/`Codeudor`, `Actuacion`, `Proceso`, `Juzgado`, `Factura`/`EmisorDeFactura`, `Notificacion`, `MedidasCautelares`, `Nota`, `Task`, `User`. The `Category` and `TipoProceso` enums drive the category accents and process-type labels.
- `uploads/icon.svg`, `uploads/icon1.png`, `uploads/favicon.ico` — the brand mark (copied into `assets/`).
- No codebase or Figma was provided beyond the schema, so product screens were **designed** against the data model using Material 3 conventions (rather than recreated from an existing UI). See CAVEATS.

---

## CONTENT FUNDAMENTALS

The product speaks **Colombian Spanish**, in the register of a professional legal tool — precise, neutral, never chatty.

- **Language:** Spanish. Domain terms stay in their legal form: *carpeta, demanda, deudor, actuación, juzgado, radicado, mandamiento de pago, medidas cautelares, liquidación, avalúo.* Don't translate or simplify these.
- **Person & address:** Address the user formally with **usted** ("Iniciar sesión", "Acceda a su tablero"). Avoid first person; the app does not have a "voice/personality."
- **Casing:** Sentence case for everything user-facing — buttons ("Nueva carpeta", "Exportar"), titles ("Detalle de la demanda"), labels. UPPERCASE + letter-spacing is reserved for small overline labels (column headers, field labels like "CAPITAL ADEUDADO").
- **Numbers & money:** Colombian formatting — thousands with `.` (`$ 12.450.000`), dates as `dd MMM yyyy` (`09 jun 2026`) or ISO in dense tables. Always set in the mono typeface so columns align. Cédulas and NITs keep their dotted grouping (`52.918.347`, `900.482.112-3`).
- **Tone examples:**
  - Empty/blocked: factual, no exclamation — "Sin actuaciones registradas."
  - Status: short noun phrases — "En proceso", "Por revisar", "Terminado", "Vencido".
  - Actions: imperative verb + object — "Aportar prueba de notificación", "Solicitar avalúo del inmueble".
- **Emoji:** none. This is a formal legal product. Iconography is the Material Symbols set only.

---

## VISUAL FOUNDATIONS

**Overall vibe:** calm, structured, professional. A light, blue-tinted neutral canvas with the brand blue reserved for primary actions and the purple for secondary/selected states. Information density is high but breathing room comes from generous padding and clear type hierarchy — not decoration.

- **Color:** Material 3 tonal roles. Primary = brand blue `#3060A8`; secondary = brand purple `#6048A8`; tertiary = a muted teal for chart/category accent. Surfaces are a cool, faintly-blue neutral (`--md-surface` ≈ `#FAF8FF`) with five container elevations. Domain colors (case status + the `Category` enum) are defined once as tokens and reused everywhere as chips/dots.
- **Backgrounds:** flat color only. No photographic imagery, no texture, no patterns. The **one** gradient in the system is the login splash (blue→purple, 150°); product surfaces never use gradients. Cards sit on `--md-surface` / `--md-surface-container-*`.
- **Type:** Quicksand (400/500/600/700) for all UI; 600 is the workhorse "medium emphasis" weight since Quicksand 500 reads light. Roboto Mono (tabular) for every number, ID, date, and money value. Material 3 type scale, retuned with slightly tighter line-heights for Quicksand's wide geometry.
- **Spacing:** 4px baseline grid (`--space-1`…`--space-9`). Page padding `--space-6` (32px); card padding `--space-5` (24px); control gaps `--space-2`/`--space-3`.
- **Corner radius:** MD3 shape scale. Buttons & chips are pill/`full`; cards `md` (12px); **text fields and selects are `xs` (4px)** — deliberately squarer for a data-entry feel. Status chips `sm` (8px).
- **Borders:** 1px `--md-outline-variant` for outlined cards, table row separators, and field borders. Focused fields go to 2px `--md-primary`.
- **Shadows / elevation:** MD3 levels 0–5. Outlined cards have no shadow (border only); elevated cards use level 1; the stat KPI cards use elevation 1; menus/dialogs would use 2–3. Shadows are soft, neutral, never colored.
- **Hover states:** MD3 **state layers** — a `currentColor` overlay at 8% opacity (`--md-state-hover`). Table rows tint with 5% primary. Nav items tint with 8% on-surface. No movement on hover except cards meant to be clicked (elevation bump).
- **Press states:** state layer to 12% (`--md-state-press`). No scale/shrink transform.
- **Focus:** visible 3px `--blue-70` outline, offset 2px (inset on tabs).
- **Transparency / blur:** used sparingly via `color-mix(... transparent)` for state layers and category dots. No glassmorphism / backdrop-blur.
- **Motion:** quick and functional. `--duration-short` 150ms for state changes, `--duration-medium` 250ms for larger transitions, MD3 standard easing `cubic-bezier(0.2,0,0,1)`. No bounces, no infinite/looping decorative animation. Tab indicator and switch thumb slide; everything else is a color/opacity fade.
- **Layout rules:** fixed 264px sidebar + fluid main column; sticky top bar (64px) with page title, search, and the single primary action; scrollable content region. Tables are full-width inside an outlined card.
- **Cards:** rounded 12px, 1px outline OR elevation-1 (not both — `outlined` vs `elevated`), `filled` variant uses `--md-surface-container` with no border for low-emphasis grouping.

---

## ICONOGRAPHY

- **System:** [**Material Symbols Rounded**](https://fonts.google.com/icons) (variable icon font), loaded from Google Fonts in `tokens/fonts.css`. Rounded optical style is chosen to echo Quicksand's geometry. Weight 400, optical size 20–24, `FILL 0` by default; active nav items set `FILL 1`.
- **Usage:** `<span class="material-symbols-rounded">gavel</span>`. The `.fill` modifier class flips to the filled variant. Components take icon props as **ligature names** (e.g. `icon="add"`, `icon="receipt_long"`).
- **Common ligatures in this product:** `folder` / `folder_open` (carpetas), `gavel` / `balance` (legal), `account_balance` (juzgados/banco), `person` (deudor), `history` (actuaciones), `receipt_long` (facturas), `payments` (capital), `rate_review` (por revisar), `task_alt` (terminado), `warning` (vencido), `event` (agenda), `search`, `add`, `more_vert`, `chevron_right`.
- **No SVG icon sprite** ships with the system (none was provided); the font is the single source. **Logo** is a real raster/vector asset in `assets/` — never redraw it.
- **Emoji / unicode icons:** never used.

---

## Index / manifest

**Root**
- `styles.css` — the single entry point consumers link. `@import`s only.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill wrapper.

**`tokens/`** — `fonts.css` (Quicksand, Roboto Mono, Material Symbols), `colors.css` (MD3 roles + status/category domain colors), `typography.css` (type scale), `spacing.css` (spacing, radius, elevation, motion, layout), `base.css` (resets).

**`components/`** — reusable React primitives (each: `Name.jsx` + `Name.d.ts` + `Name.prompt.md`, one card per folder):
- `forms/` — **Button**, **IconButton**, **TextField**, **Select**, **Checkbox**, **Switch**
- `data/` — **Card**, **StatusChip**, **Chip**, **Avatar**, **Badge**
- `navigation/` — **Tabs**

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`ui_kits/asesor/`** — interactive product recreation: `index.html` (login → dashboard → case detail flow), `Sidebar`, `TopBar`, `CarpetasView` (KPI stats + filterable case table), `CarpetaDetail` (tabbed: resumen / demanda / deudor / actuaciones / facturas / tareas), `LoginView`, plus `data.js`, `helpers.js`, `kit.css`.

**`assets/`** — `logo-mark.svg`, `logo-mark.png`, `favicon.ico`.

---

## CAVEATS

- **No existing UI was provided** — only the Prisma schema and the logo. The product screens are an original Material 3 design built to fit the data model, not a recreation of a real Asesor Jurídico interface. If you have the actual app (code or Figma), share it and the UI kit can be aligned to it.
- **Fonts load from Google Fonts CDN** (Quicksand, Roboto Mono, Material Symbols) rather than self-hosted binaries, so the compiler reports 0 `@font-face` rules. This works for any online consumer; if you need a fully offline/self-hosted bundle, provide the font files and they'll be embedded.
