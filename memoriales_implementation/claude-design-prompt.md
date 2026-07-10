# Claude Design prompt — `/memoriales` UI prototype

> **Before pasting:** replace the `‹…›` placeholders in the "Design system" section with your actual tokens / existing component references, or attach the relevant CSS Modules and token files so the prototype is built *inside* your system rather than inventing one.

---

## Role & goal

You are building a UI prototype for a new route `/memoriales` in an existing Next.js (App Router) legal application. The feature lets a user (1) pick a legal-document template, (2) fill a form containing exactly the fields that template requires, and (3) generate and download a filled `.docx`. Build only the **UI and its states** as a working, data-driven prototype. Do **not** implement the docx rendering or server actions — a separate engineering pass does that. But structure the components so that pass can wire in cleanly.

## Product flow (three states on one route)

1. **Selection** — a labelled `select` plus a list/grid of available templates. Each item shows a display name and a one-line description. Selecting one reveals (or navigates to) the form for that template. Keep the selected template visible/changeable.
2. **Form** — fields grouped into fieldsets that correspond to nested objects (e.g. a "Datos del deudor" fieldset → `deudor.nombre`, `deudor.cedula`). The form is **generated from a manifest** (schema below), never hardcoded per template, so one form component serves every template.
3. **Generation & result** — on submit, cycle through: `idle → validating → generating → success | error`. Success shows a prominent download action + a "generar otro" reset; error shows a readable message + retry. Show inline field-level validation errors on the form.

## Data contract (build the UI generic against this)

The form and selection must render from this manifest shape. Include 2–3 example manifests (e.g. `memorial-aporta-liquidacion`, `memorial-notificacion`) so the prototype demonstrates different field sets.

```ts
type FieldType = 'text' | 'number' | 'date' | 'currency' | 'textarea' | 'select';

interface FieldDef {
  name: string;        // key within its group, e.g. "nombre"
  label: string;       // Spanish label, e.g. "Nombre del deudor"
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[]; // for type 'select'
}

interface FieldGroup {
  key: string;         // becomes the nested object key, e.g. "deudor"
  legend: string;      // fieldset legend, e.g. "Datos del deudor"
  fields: FieldDef[];
}

interface MemorialTemplate {
  id: string;              // "aporta-liquidacion"
  displayName: string;     // "Memorial que aporta liquidación del crédito"
  description: string;     // one line for the selector
  groups: FieldGroup[];    // → assembled into { deudor: {...}, juzgado: "...", ... }
}
```

The submitted value must be the nested object implied by the groups, e.g. `{ deudor: { nombre, cedula }, juzgado, radicado }`.

## Reusable component inventory (each its own CSS Module)

Design these as generic, composable pieces — they will be reused across every template:

- **`TemplateSelector`** — the `select` + descriptive list, controlled by `selectedId`.
- **`MemorialForm`** — iterates `groups`, renders a `Fieldset` per group.
- **`Fieldset`** — `<fieldset><legend>` + its fields.
- **`Field`** — label + control + error slot + help text; switches control by `FieldType`. One module handles all input types via variants, not one module per type.
- **`GenerationStatus`** — renders the `idle/validating/generating/success/error` states, including the download button and retry.
- **`SubmitBar`** — primary submit + secondary reset, with disabled/loading treatment.

## Styling constraints (non-negotiable)

- **CSS Modules only**, kebab-case filenames (`memorial-form.module.css`), no Tailwind, no CSS-in-JS.
- Use the design-system tokens for all color/spacing/typography/radii — no raw hex or magic numbers.
- Components must be reusable across all templates: no per-template CSS. Variation comes from data (the manifest) and reusable variants/modifiers, not new stylesheets.
- TypeScript strict mode; props fully typed against the contract above.
- All UI copy in **Spanish** (Colombian legal register): "Seleccione un memorial", "Generando documento…", "Descargar .docx", "Vuelva a intentarlo", etc.

## Interaction & accessibility

- Every control has an associated `<label>`; fieldsets use `<legend>`.
- Field errors linked via `aria-describedby`; invalid controls get `aria-invalid`.
- On submit failure, move focus to the first invalid field; on success, move focus to the download action.
- Loading/generating state uses `aria-busy` and disables the submit; the status region is a polite live region (`aria-live="polite"`).
- Fully keyboard-operable; visible focus states from the design system.

## Design system

- Tokens: ‹paste your CSS custom properties / token file, or the color, spacing, typography, radius, elevation scales›
- Existing patterns to match: ‹reference your existing form field / button / select components so these are consistent with them›
- Fonts: Fraunces (headings) + Inter (body) via `next/font/google`.

## Deliverables

1. The route composition for `/memoriales` orchestrating the three states.
2. The reusable components above, each with its own kebab-case CSS Module.
3. 2–3 example manifests conforming to the contract, wired so the prototype actually renders different forms when you switch templates.
4. Mock submit handling that just *simulates* the `validating → generating → success/error` transitions (no real backend) so all states are demonstrable.

Keep the boundary clean: the form emits the nested object and calls an injected `onSubmit(values)` prop — do not implement the real submission. That prop is where the engineering pass attaches the server action.
