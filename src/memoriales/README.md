# Memoriales

`/memoriales` lets a user pick a legal-document template, fill a form generated from its
manifest, and download a filled `.docx`. Rendering happens in a separate Python service
(`services/memoriales-render/`) using `docxtpl`/Jinja, because the templates use control
flow (`{% if %}` / `{% for %}`) that JS templating libraries don't support.

## Adding a memorial

1. Save the blank template as `src/memoriales/templates/{id}.docx` (kebab-case `id`).
2. Scaffold a draft manifest from its `{{ }}`/`{% %}` tags:
   ```bash
   pnpm tsx src/memoriales/tooling/scaffold-manifest.ts src/memoriales/templates/{id}.docx {id} > src/memoriales/manifests/{id}.ts
   ```
3. Enrich the draft: Spanish labels, correct `type`/`format`/`required`, `select` options,
   and mark any computed field `derived: true` (e.g. a written-out ordinal derived from a
   numeric field — see `lib/derive.ts`).
4. Nothing to do — `pnpm memoriales:generate-registry` runs automatically before `next dev`/
   `next build` (also runnable standalone) and picks up any new file in `manifests/`
   automatically. `pnpm test:memoriales` includes a guard that fails if a manifest file and
   the committed `registry.ts` ever drift.
5. Run `pnpm test:memoriales-parity` — it must pass before the template is considered done.
   It fails loudly if any `{{ }}`/`{% if %}`/`{% for %}` tag in the `.docx` has no matching
   manifest field, or vice versa.

## Layout

- `manifests/` — the typed contract (`types.ts`) plus one file per template + `registry.ts`.
- `lib/` — pure, unit-tested logic: `formatters.ts` (cedula/currencyCOP/dateLong/radicado),
  `derive.ts` (computed fields), `build-schema.ts` (manifest → Zod), `build-context.ts`
  (form values → render-ready context), `download.ts` (client-side Blob download).
- `actions/generate-memorial.ts` — the `'use server'` action: re-validates with the
  manifest's Zod schema, builds the render context, and POSTs it to the Python service.
- `components/` — the form UI (`TemplateSelector`, `MemorialForm`, `Fieldset`, `Field`,
  `GenerationStatus`, `SubmitBar`) plus the `ui/` primitives they're built from
  (`Button`, `IconButton`, `Switch`, `TextField`).
- `styles/` — the Material-3-derived design tokens (`tokens.module.scss`) and Google
  fonts (`fonts.ts`), scoped to `/memoriales` only.
- `tooling/` — dev-time scripts: `extract-docx-tags.ts` (Jinja tag extractor),
  `scaffold-manifest.ts` (manifest scaffolder), `memoriales-parity.test.ts` (the parity
  check above), `discover-manifests.ts` (finds every manifest file's exported template),
  `generate-registry.ts` (regenerates `manifests/registry.ts` from what's discovered),
  `registry-completeness.test.ts` (fails if the registry ever drifts from the directory).

## Tests

No test framework is installed; tests use Node's built-in `node:test` + `node:assert/strict`
via `tsx --test`:

```bash
pnpm test:memoriales-parity   # manifest <-> template parity only
pnpm test:memoriales          # + formatters/derive/build-context unit tests
```

## Running locally

```bash
pnpm dev   # runs `next dev` and the Python render service together (via concurrently)
```

The Python service needs its venv set up once: `services/memoriales-render/setup.sh`.
See `services/memoriales-render/README.md` for details, environment variables, and
deployment notes.
