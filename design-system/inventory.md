# Component inventory — R&S Asesoría Jurídica Design System

Extracted from the Claude Design handoff "Design system showcase page"
(id `a14c1882-cc83-49c6-b36f-7a102a20c03d`), design system
"R&S Asesoría Jurídica — Design System" (`_ds_manifest.json`). The
components and their variant subtitles are literal text from the
handoff's manifest — no variant was invented.

## Actions (`components/actions/`)

- **Button / IconButton** — shared catalog card "Buttons & Icon Buttons":
  Filled, tonal, elevated, outlined, text · icon buttons.

## Data display (`components/data-display/`)

- **Card, Chip, Badge, Avatar** — shared catalog card "Cards, Chips, Badges & Avatars":
  Surfaces and descriptors.

## Forms (`components/forms/`)

- **TextField, Switch, Checkbox** — shared catalog card "Form controls":
  Text fields, switch, checkbox.

## Navigation (`components/navigation/`)

- **Tabs, ListItem** — shared catalog card "Tabs & List items":
  In-view navigation and list rows.

## Foundations (`guidelines/*.card.html`)

Foundation specimens included in the same manifest (not UI components,
but they document variants via the same catalog cards):

### Brand
- **Case categories & process types** — Color language for Carpeta categories and tipo de proceso.
- **Logo lockups** — R&S monogram — on light and on dark.
- **Scales mark** — The justice-scales emblem in purple/blue.

### Colors
- **Dark scheme** — The same roles under `[data-theme=dark]`.
- **Neutral & outline** — Background, on-surface text, dividers.
- **Primary — purple** — Brand purple #6A4FA8 and its container/on roles.
- **Secondary — violet-grey** — Muted supporting tone for chips & secondary fills.
- **Semantic — error & success** — Status colors for case state & validation.
- **Surfaces & containers** — Tonal surface ladder — lowest → highest.
- **Tertiary — blue** — Brand blue accent #3A5BA9 from the scales mark.

### Spacing & shape
- **Elevation** — M3 tonal shadow levels 1 → 5.
- **Corner radius** — M3 shape scale — 4 → full.
- **Spacing scale** — 4dp grid — the rhythm of every layout.

### Type
- **Title, Body & Label** — Quicksand (UI) + Inter (running text, cv11).
- **Display & Headline** — Fraunces, high opsz — the only text with saturated color.
- **Monospace — references** — IBM Plex Mono for NIT, radicados & money.

## Notes

- Exact per-prop variants (e.g. the `variant=` enum values of each
  component) aren't available: each component's `.jsx`/`.d.ts` source
  is bundled inside `_ds_bundle.js` in the handoff and couldn't be
  retrieved file-by-file via the Design API (`get_file` returned 404
  for those paths). The variant text above is the literal subtitle the
  handoff itself assigns to each catalog card (`cards[].subtitle` in
  `_ds_manifest.json`).
- Full component list per `_ds_manifest.json.components`:
  Button, IconButton, Avatar, Badge, Card, Chip, Checkbox, Switch,
  TextField, ListItem, Tabs (11 total).
