# Prompt — Componente editor de notas (Claude Design)

Build a **note editor form component** for a Colombian legal case-management app (R&S Asesoría Jurídica). All UI copy in Spanish.

## Design system

Use **R&S Asesoría Jurídica — Design System** as the single source of truth:
https://claude.ai/design/p/28e31e8b-96f5-4107-8e05-8203b25a3b63

Rules:

- Compose from existing components in that system. Do not invent new primitives.
- Use only its color, spacing, radius, elevation and typography tokens. No new hex values, no arbitrary pixel values.
- If a needed pattern doesn't exist in the system (e.g. drag handle, tag chip), build it from existing tokens and primitives and flag it explicitly as a proposed addition rather than silently inventing a style.
- Match the system's existing form field anatomy: label, control, helper text, error text, required marker.

## Output conventions

This design hands off to Claude Code, so:

- **CSS Modules only** — no Tailwind, no utility classes, no inline style objects except for genuinely dynamic values (e.g. an etiqueta's `color`).
- **kebab-case filenames**: `editor-de-nota.tsx`, `editor-de-nota.module.css`, `bloque-verificacion.tsx`, etc.
- **TypeScript strict mode** — no `any`, explicit prop interfaces, discriminated unions for the block variants.
- Next.js App Router; this is a client component (`"use client"`).
- Mobile-first CSS; media queries only scale _up_.
- Spanish identifiers where they mirror the Prisma model (`titulo`, `estado`, `bloques`), English for generic React plumbing (`onChange`, `isSaving`).
- **Server actions**: build the necessary server actions and action state so that it can get submited to the database as a new note, can be used to edit an existing note and edit it sending the necessary data to the server action to update just what was changed and to delete from database if delet button selected.

## Data model

From the Prisma schema, model `notes` — **not** the legacy `Nota` model.

| Campo                    | Control                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `titulo`                 | Required, single-line text, max 200 chars                                                                                             |
| `resumen`                | Optional textarea (2–3 rows), max 400 chars, live character counter                                                                   |
| `estado`                 | Enum select: PENDIENTE / EN_REVISION / ATENDIDA / ARCHIVADA                                                                           |
| `fijada`                 | Boolean toggle, labeled "Fijar nota"                                                                                                  |
| `carpetaId`              | Optional relation to Carpeta — searchable combobox by número/nombre, clearable                                                        |
| `etiquetas`              | Multi-select chips; each etiqueta has `nombre` + `color` (hex), so chips render in their own color; allow create-on-type              |
| `usuarios_en_notes`      | Assign users with a per-user role: RESPONSABLE / COLABORADOR / OBSERVADOR. Row = avatar + nombre + inline role select + remove button |
| `creadaEn` / `editadaEn` | Read-only metadata, small muted text in the footer — not editable inputs                                                              |
| `archivadaEn`            | Read-only; only visible when `estado === ARCHIVADA`                                                                                   |

## Cuerpo de la nota — `note_bloques`

An ordered list of blocks (`orden`), each with a `tipo` enum. The user can **add**, **reorder** (drag handle) and **delete** blocks. Three variants:

- **`PARRAFO`** — auto-growing textarea bound to `texto`.
- **`LISTA`** — bulleted list of `bloque_items`. Enter creates the next item; Backspace on an empty item removes it and focuses the previous.
- **`VERIFICACION`** — same list behavior, but each `bloque_item` has a checkbox bound to `completado`, and shows its `completadoEn` timestamp (relative, e.g. "hace 2 días") once checked.

Include an "Agregar bloque" affordance that lets the user pick the tipo.

## Tareas vinculadas

A note has many `tareas` via `noteOrigenId`, and any `bloque_item` in a VERIFICACION block can be promoted to a tarea (1:1 through `bloque_items.tareaId`).

Design:

- A **"Tareas vinculadas"** section listing each tarea as a compact row: `titulo`, `estado` badge (PENDIENTE / EN_PROGRESO / ATENDIDA / ARCHIVADA), `prioridad` badge (BAJA / MEDIA / ALTA / URGENTE), and `fechaLimite`.
- When `esTermino` is `true`, mark the row distinctly — this is a procedural deadline and is the highest-urgency state in the whole component.
- An overdue `fechaLimite` renders in the system's error/danger treatment.
- On each checklist item, a hover/focus affordance: **"Convertir en tarea"**. Once linked, the item shows a persistent tarea indicator instead, and clicking it opens the linked tarea.

## Controls

Date picker for every `DateTime` field. Selects for every enum — no free-text where an enum exists. Chips for etiquetas. Combobox for relations.

## States to design

1. **Default** — existing note loaded and populated.
2. **Empty / nueva nota** — only `titulo` present and focused, one empty PARRAFO block.
3. **Saving** — controls disabled, spinner on the save action.
4. **Validation errors** — `titulo` empty or over 200 chars; `resumen` over 400.
5. **Dirty state** — sticky footer with "Guardar" / "Descartar" and an unsaved-changes indicator.
6. **Read-only** — when the note is ARCHIVADA or the current user's rol is OBSERVADOR/LECTOR.

## Layout

Mobile-first, single column, comfortable touch targets. At desktop breakpoints, the metadata panel (estado, fijada, carpeta, etiquetas, usuarios) moves to a right-hand sidebar while the block editor takes the main column. The sticky action footer persists at all breakpoints.

## Accessibility

Every control labeled. Errors linked with `aria-describedby`. Drag-reorder must have a keyboard equivalent. Checkbox state changes announced. Focus visible using the design system's focus ring token.
