# Claude Code prompt — `/memoriales` backend, forms & docx rendering

Use the claude_design MCP (https://api.anthropic.com/v1/design/mcp, auth via /design-login) to import this project:
https://claude.ai/design/p/3f4c7219-8c8a-4409-80e0-404e835ff71a?file=Memoriales.dc.html

Implement: Memoriales.dc.html

## Context

Take the existing `/memoriales` UI prototype (built by Claude Design) and make it fully functional: robust form management, validation, and a server action that fills Jinja-style `{{ }}` variables in `.docx` templates and returns a downloadable filled document. Stack and conventions to follow strictly:

- Next.js App Router, TypeScript **strict** mode.
- **CSS Modules only**, kebab-case filenames, no Tailwind. Reuse the prototype's modules; do not restyle.
- Server-side rendering of documents (server actions), not client-side.
- All user-facing copy in **Spanish**.
- Do not modify the prototype's visual components beyond wiring props/state.

## Rendering engine decision

The templates use Jinja-style interpolation: `{{ deudor.nombre }}`, `{{ juzgado }}`, etc. Use **`docxtemplater`** (with `pizzip`) configured for `{{ }}` delimiters. **Assume interpolation-only** (no `{% for %}` / `{% if %}` control flow).

> If any template turns out to contain Jinja control-flow blocks (`{% … %}`), stop and flag it: docxtemplater uses incompatible loop/condition syntax (`{#loop}…{/loop}`), and we'd instead keep the existing Python `docxtpl` renderer behind a child-process/service call. Do not silently half-support control flow.

Install: `docxtemplater pizzip`.

## The manifest system (source of truth)

Create a typed manifest registry. Each template is described once; the form, the Zod schema, and the render context all derive from it. Adding a memorial = one manifest entry + one `.docx`.

```ts
type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'currency'
  | 'textarea'
  | 'select';
type FieldFormat = 'cedula' | 'currencyCOP' | 'dateLong' | 'radicado' | 'none';

interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  format?: FieldFormat; // value transform applied before injection
}

interface FieldGroup {
  key: string;
  legend: string;
  fields: FieldDef[];
}

interface MemorialTemplate {
  id: string;
  filename: string; // "memorial-aporta-liquidacion-template.docx"
  displayName: string;
  description: string;
  groups: FieldGroup[];
}
```

- Store the manifests keyed by `id` in a registry (`memorialesRegistry`), plus a `getTemplateById(id)` helper. Match the exact shape the prototype already consumes.
- Store the blank `.docx` templates **outside `/public`** (e.g. `src/memoriales/templates/`). Read them at runtime with `fs.readFile` via `process.cwd()`. Add `outputFileTracingIncludes` for that folder in `next.config` so the files ship in traced/serverless builds (harmless on a self-hosted Node server).

## Form management

- Build a **Zod schema per template from its manifest** (a `buildSchema(template)` function): required/optional, `number` for numeric/currency fields, coercion where needed, Spanish error messages.
- Wire the prototype's form with **React Hook Form + `zodResolver`** (dynamic schema), or `useActionState` with server-side Zod validation if you prefer keeping it native — pick one and keep it consistent. On submit, assemble the nested object from the group keys (`{ [group.key]: { …fields } }`, or scalar when a group is a single field) and pass it to the server action.
- Manage the `idle → validating → generating → success → error` state the prototype's `GenerationStatus` expects, via `useActionState`/local state. Surface field-level Zod errors back into the form.

## Server action (`generateMemorial`)

`'use server'`. Steps, with real error handling at each:

1. Accept `{ templateId, values }`. Look up the template; 404-style error if unknown.
2. Re-validate `values` server-side with the manifest's Zod schema (never trust the client). Return a structured `{ ok: false, fieldErrors }` on failure.
3. **Transform values** per each field's `format` before building the render context: `cedula`/`radicado` → grouped thousands separators, `currencyCOP` → COP formatting, `dateLong` → "10 de julio de 2026" (es-CO). Keep transforms in a small pure `formatters` module with unit tests.
4. Read the template file, load with `pizzip`, and render with `docxtemplater` configured as:

```ts
const doc = new Docxtemplater(zip, {
  delimiters: { start: '{{', end: '}}' }, // Jinja-style
  paragraphLoop: true,
  linebreaks: true,
  nullGetter: () => '', // empty for optional/missing
  parser: (tag) => ({
    // trims inner spaces of "{{ deudor.nombre }}"
    get(scope) {
      const path = tag.trim();
      if (path === '.') return scope;
      return path
        .split('.')
        .reduce((acc, key) => (acc == null ? undefined : acc[key]), scope);
    },
  }),
});
doc.render(context);
const buf = doc.getZip().generate({ type: 'nodebuffer' });
```

5. Return `{ ok: true, filename, base64: buf.toString('base64') }` with a descriptive Spanish `filename` (e.g. `memorial-aporta-liquidacion-<cedula>.docx`).
6. Catch docxtemplater render errors and map them to a readable Spanish message; log the underlying `error.properties.errors` server-side.

## Client download

On `{ ok: true }`, decode the base64 to a `Blob` (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`), `URL.createObjectURL`, click a temporary anchor with `download = filename`, then revoke the URL. Drive the prototype's success state and download button from this.

## Manifest ⇄ template parity check (required)

Add a dev-time guard so manifests and templates can't drift. Using docxtemplater's inspect module:

```ts
import InspectModule from 'docxtemplater/js/inspect-module';
// load each template with the InspectModule, render is not required:
const iModule = InspectModule();
new Docxtemplater(zip, {
  delimiters: { start: '{{', end: '}}' },
  modules: [iModule],
});
const tags = iModule.getAllTags(); // structured tags in the doc
```

Write a script/test (`predev` or a Vitest/Jest test) that, for every registered template, extracts its `{{ }}` tags and asserts:

- every tag path is covered by a manifest field, and
- every manifest field maps to an existing tag.
  Fail loudly listing the mismatches. This is the safety net for the whole system.

## File layout (follow existing conventions)

```
src/memoriales/
  templates/                         # blank .docx files (not in /public)
  manifests/                         # one file per template + registry.ts
  lib/
    build-schema.ts                  # manifest → Zod
    formatters.ts                    # cedula / currencyCOP / dateLong / radicado
    render-memorial.ts               # docxtemplater rendering, pure/testable
    validate-templates.ts           # parity check
  actions/
    generate-memorial.ts             # 'use server'
  components/                        # reuse prototype's components + CSS Modules
app/memoriales/page.tsx
```

## Acceptance criteria

- Selecting any registered template renders exactly its fields (dynamic, no per-template code).
- Submitting valid data returns a filled `.docx` that downloads, with every `{{ }}` replaced and formatters applied.
- Invalid/missing required fields are caught both client- and server-side with Spanish messages; no unhandled render throw ever reaches the user.
- The parity check passes for all templates and fails when a manifest/template mismatch is introduced.
- `formatters` and `render-memorial` have unit tests.
- Strict TypeScript passes; no `any` in the public surface; CSS Modules untouched stylistically.
