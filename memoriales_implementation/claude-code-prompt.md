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

# Claude Code prompt — `/memoriales`: wire the UI, build the manifest layer, and stand up the Python render backend

## What this is

Make the `/memoriales` feature fully functional. A user picks a legal-document template (a "memorial"), fills a form containing exactly that template's fields, and downloads a `.docx` with the values filled in. Rendering uses **`docxtpl`** (Python/Jinja) because the templates use full Jinja syntax (`{{ }}`, `{% if %}`, `{% for %}`). Next.js owns the form, validation, and orchestration; a small **FastAPI service on localhost** owns the docx rendering.

**This is a fresh project.** There is no existing Python service — you build the venv and backend from scratch, described below. Do not assume any prior `build_context.py` or pipeline exists.

## Stack & conventions (follow strictly)

- Next.js App Router, TypeScript **strict**. CSS Modules only, kebab-case filenames, no Tailwind. Zod 4. `useActionState`.
- All user-facing copy in **Spanish** (Colombian legal register).
- Do not restyle the prototype's components; only wire props/state/logic.

## Assets already produced (integrate these, don't reinvent)

Place them at these locations and treat them as the starting point:

| Provided file               | Destination                                        | Role                                                                   |
| --------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| `extract-docx-tags.ts`      | `src/memoriales/tooling/extract-docx-tags.ts`      | dev-time Jinja-tag extractor (handles Word run-splitting + loop scope) |
| `scaffold-manifest.ts`      | `src/memoriales/tooling/scaffold-manifest.ts`      | CLI that scaffolds a draft manifest from a `.docx`                     |
| `memoriales-parity.test.ts` | `src/memoriales/tooling/memoriales-parity.test.ts` | manifest ⇄ template parity test (**apply the fix in §7**)              |
| `memoriales-manifests.ts`   | split into `src/memoriales/manifests/*`            | the two real manifests + extended types + registry                     |
| `render_service.py`         | `services/memoriales-render/render_service.py`     | FastAPI renderer (**replace with the id-based version in §8**)         |
| `generate-memorial.ts`      | `src/memoriales/actions/generate-memorial.ts`      | server action calling the render service                               |

Also present: the Claude Design UI prototype for `/memoriales`, whose form component emits a nested values object via an injected `onSubmit(values)` prop and renders the `idle → validating → generating → success → error` states.

Install: `pnpm add -D fflate concurrently` (fflate for the extractor/tests; concurrently to run both dev servers).

## The two real templates (this is the exact shape — verify with the parity test, don't re-derive by hand)

Both were extracted from the actual `.docx` files. Filenames must be normalized to `{id}.docx` (see §2).

**`aportando-liquidacion-credito`** — pure interpolation, no loops/conditionals. Context shape:

```
{ deudor: { nombre },
  juzgado: { tipo, numero, numero_escrito, ciudad },
  radicado: { numero, año },       // note the ñ in "año" — keep the key exactly
  cuantia_value, tipo_proceso }
```

**`aportando-291-y-292`** — adds a date, a boolean gate, and a **string list**. Context shape:

```
{ deudor: { nombre },
  juzgado: { tipo, numero, numero_escrito, ciudad },
  radicado: { numero, año },
  cuantia_value, tipoproceso, fecha_auto,
  has_anexos,                       // bool  -> {% if has_anexos %}
  anexos_list }                     // string[] -> {% for anexo in anexos_list %}{{ anexo }}{% endfor %}
```

Two real inconsistencies to handle, not paper over:

- `tipo_proceso` (template 1) vs `tipoproceso` (template 2) — different variable names for the same concept. Keep both manifest fields as-is so each renders correctly, but leave a `// TODO: unificar en las plantillas` marker.
- `anexos_list` items are **plain strings** (`{{ anexo }}`), so it is `string[]`, NOT an array of objects. Model it with the `stringList` field type; `buildContext` must emit a flat array of strings.

## Project structure to create

```
src/memoriales/
  manifests/
    types.ts                       # extended contract (§3)
    aportando-liquidacion-credito.ts
    aportando-291-y-292.ts
    registry.ts                    # memorialesRegistry + getTemplateById
  templates/
    aportando-liquidacion-credito.docx     # renamed
    aportando-291-y-292.docx               # renamed from aportando_291_y_292.docx
  lib/
    build-schema.ts                # manifest -> Zod (§5)
    build-context.ts               # values -> render-ready context (§6)
    formatters.ts                  # cedula/currencyCOP/dateLong/radicado (§6)
    derive.ts                      # computed fields, e.g. numero_escrito (§6)
    download.ts                    # base64 -> Blob download (§6)
  actions/
    generate-memorial.ts           # 'use server' (§7)
  components/                      # the prototype's components + CSS Modules (wire only)
  tooling/                         # the three provided dev scripts
app/memoriales/page.tsx
services/memoriales-render/        # the Python backend (§8)
  render_service.py
  requirements.txt
  .venv/                           # created by setup, git-ignored
```

## 2. Template files

Rename the uploaded files so each is `{id}.docx` (kebab-case). This lets the render service map `templateId -> {id}.docx` with no lookup table and a strict id regex as the traversal guard:

- `aportando-liquidacion-credito.docx` (already matches)
- `aportando_291_y_292.docx` → `aportando-291-y-292.docx`

Templates are read **only** by the Python service at runtime and by TS tooling at dev/test time — Next never reads them at runtime, so no `outputFileTracingIncludes` is needed.

## 3. Manifest contract (extended types)

Split `memoriales-manifests.ts` into per-file modules. The `types.ts` must include the additions:

- `FieldType` gains `'boolean'` (checkbox) and `'stringList'` (string[]).
- `FieldGroup` gains optional `key` (omit → top-level scalars) and `repeatable` (array of objects).
- `FieldDef` gains optional `derived?: boolean` — derived fields are **excluded from the form and from the input Zod schema** but **computed into the render context**. Use it for `juzgado.numero_escrito` (§6).

Keep the two provided manifests verbatim (they already encode the real shapes). Mark `juzgado.numero_escrito` with `derived: true` in both.

## 4. Spec generation for future templates (codify this workflow)

Adding a memorial must be a fixed recipe, and the scaffolder is how a "spec" (manifest) gets generated from a `.docx` so a human only fills labels/types:

1. Save the template as `src/memoriales/templates/{id}.docx`.
2. `pnpm tsx src/memoriales/tooling/scaffold-manifest.ts src/memoriales/templates/{id}.docx {id} > src/memoriales/manifests/{id}.ts`
3. Enrich the draft: Spanish labels, field `type`, `format`, `required`, `select` options, mark `derived` fields.
4. Register it in `registry.ts`.
5. `pnpm test memoriales-parity` — must pass before the template is considered done.

Document this as a short `src/memoriales/README.md`.

## 5. Form management & validation

- `buildSchema(template)` → a Zod schema built from the manifest, **skipping `derived` fields**: `number`/`currency` → `z.coerce.number()`, `date` → date/ISO string, `boolean` → `z.boolean()` (default false), `stringList` → `z.array(z.string())` (optional), `select` → `z.enum(options)`, else `z.string().min(1)` when required. Spanish error messages.
- Wire the prototype's form with React Hook Form + `zodResolver(buildSchema(template))`. Assemble the nested values object from group keys on submit (`{ [group.key]: {…} }`, scalars top-level, repeatable → array, stringList → `string[]`).
- The `has_anexos` checkbox reveals the `anexos_list` rows; when unchecked, submit `anexos_list: []`.
- Drive the prototype's status states with `useActionState` around the server action; surface Zod `fieldErrors` back onto the fields.

## 6. Context assembly, formatters, derived fields, download

`buildContext(template, values)` produces the exact dict the templates expect:

- Nested group (`key`, not repeatable) → `context[key] = { field: format(value) }`.
- Top-level scalar group (no `key`) → `context[field.name] = format(value)`.
- Repeatable group → `context[key] = rows.map(formatRow)`.
- `stringList` → `context[name] = (rows ?? []).map(s => s.trim()).filter(Boolean)`.
- `boolean` → `context[name] = Boolean(value)`.

`formatters.ts` (pure, unit-tested), applied per `field.format`:

- `currencyCOP` → `Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 })` → `$1.234.567`.
- `dateLong` → `Intl.DateTimeFormat('es-CO', { day:'numeric', month:'long', year:'numeric' })` → `10 de julio de 2026`.
- `radicado` → strip whitespace/non-digits, keep as string.
- `cedula` → thousands-separated string (kept for future templates).

`derive.ts` — computed fields added **after** base assembly. Implement `juzgado.numero_escrito` from `juzgado.numero` via `ordinalMasculino(n)` (Spanish masculine ordinal, e.g. 4 → "Cuarto"), covering 1–99 (Bogotá civil juzgados go into the 80s):

```
units = [ , primero, segundo, tercero, cuarto, quinto, sexto, séptimo, octavo, noveno]
tens  = [ , décimo, vigésimo, trigésimo, cuadragésimo, quincuagésimo, sexagésimo, septuagésimo, octogésimo, nonagésimo]
// n<10 -> units[n]; n multiple of 10 -> tens[n/10]; else tens[t] + " " + units[u]
```

If `numero` can't be parsed to an int in range, fall back to passing the raw `numero` string through as `numero_escrito` (so nothing breaks), and log a warning. (If you'd rather keep it manual, drop `derived` from the field and let the user type it — but derived is preferred, since it prevents the digit/letters mismatch.)

`download.ts` — client helper: decode the action's `base64` to a `Blob` (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`), `URL.createObjectURL`, click a temporary `<a download={filename}>`, then revoke.

## 7. Server action

Use the provided `generate-memorial.ts` as the basis. It must: look up the template, `buildSchema().safeParse` server-side (never trust the client), `buildContext` (formatters + derive), POST `{ templateId, context }` to `MEMORIALES_RENDER_URL`, and return `{ ok:true, filename, base64 }` or a structured Spanish error. Handle fetch failure (service down) distinctly from a 4xx/5xx render error.

**Parity-test fix (apply in `memoriales-parity.test.ts`):** the current `manifestPaths` mis-handles the two new types. A `stringList` field must normalize to `${base}[]` (so `anexos_list` → `anexos_list[]`, matching the loop the extractor sees), a `boolean` field goes into the `booleans` set, and `derived` fields are **excluded entirely** (they have no template tag of their own — `numero_escrito` does appear as a tag, so do NOT exclude it; exclude only fields that are purely computed with no `{{ }}`). Concretely: `numero_escrito` is `derived` **and** present in the docx, so it stays in `paths`; a hypothetical derived-with-no-tag field would be excluded. Make the rule: include a field's path unless it is `derived` AND its tag is absent from the extracted set.

## 8. Python render backend (build from scratch)

Create `services/memoriales-render/`.

`requirements.txt`:

```
fastapi>=0.110
uvicorn[standard]>=0.29
docxtpl>=0.18
```

`render_service.py` — id-based file resolution (replaces the allowlist version):

```python
import io, os, re
from pathlib import Path
from docxtpl import DocxTemplate
from jinja2 import ChainableUndefined  # lenient: missing nested keys render empty, not error
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel

ID_RE = re.compile(r"^[a-z0-9-]+$")
DEFAULT_DIR = Path(__file__).resolve().parents[2] / "src" / "memoriales" / "templates"
TEMPLATES_DIR = Path(os.environ.get("MEMORIALES_TEMPLATES_DIR", DEFAULT_DIR)).resolve()
DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

app = FastAPI(title="memoriales-render")

class RenderRequest(BaseModel):
    templateId: str
    context: dict

@app.get("/health")
def health():
    return {"ok": True, "templatesDir": str(TEMPLATES_DIR)}

@app.post("/render")
def render(req: RenderRequest):
    if not ID_RE.match(req.templateId):
        raise HTTPException(400, "templateId inválido")
    path = (TEMPLATES_DIR / f"{req.templateId}.docx").resolve()
    if TEMPLATES_DIR not in path.parents:          # traversal guard (belt-and-suspenders)
        raise HTTPException(400, "Ruta no permitida")
    if not path.is_file():
        raise HTTPException(404, "Plantilla no encontrada")
    doc = DocxTemplate(str(path))
    try:
        doc.render(req.context, jinja_env=_env())
    except Exception as exc:
        raise HTTPException(422, f"Error al renderizar: {exc}")
    buf = io.BytesIO(); doc.save(buf)
    return Response(content=buf.getvalue(), media_type=DOCX_MIME)

def _env():
    from docxtpl import DocxTemplate as _D
    import jinja2
    return jinja2.Environment(undefined=ChainableUndefined)
```

(If `jinja_env` wiring is awkward with your docxtpl version, drop it and rely on the server-side Zod validation guaranteeing all fields are present — but keep the lenient env if it works, so an optional/empty nested value never 500s.)

**Setup script** (`services/memoriales-render/setup.sh` or documented in the README):

```bash
cd services/memoriales-render
python3 -m venv .venv
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt
.venv/bin/pip freeze > requirements.lock   # reproducible installs
```

**Run (dev):**

```bash
.venv/bin/uvicorn render_service:app --host 127.0.0.1 --port 8787 --reload
```

Bind to `127.0.0.1` only — the renderer must never be publicly reachable. No auth needed on the same host.

## 9. Local dev & environment

- `.env.local` (Next): `MEMORIALES_RENDER_URL=http://127.0.0.1:8787/render`
- The render service reads `MEMORIALES_TEMPLATES_DIR` (defaults to the repo's `src/memoriales/templates`).
- `package.json` scripts to run both together:

```json
{
  "scripts": {
    "dev": "concurrently -n web,render -c blue,magenta \"pnpm dev:web\" \"pnpm dev:render\"",
    "dev:web": "next dev",
    "dev:render": "cd services/memoriales-render && .venv/bin/uvicorn render_service:app --host 127.0.0.1 --port 8787 --reload"
  }
}
```

- Gitignore `services/memoriales-render/.venv/`.

## 10. Deployment (self-hosted Linux; adjust as needed)

Provide a `systemd` unit so the renderer runs as a managed service alongside Next:

```ini
# /etc/systemd/system/memoriales-render.service
[Unit]
Description=Memoriales docx render service
After=network.target
[Service]
WorkingDirectory=/opt/app/services/memoriales-render
Environment=MEMORIALES_TEMPLATES_DIR=/opt/app/src/memoriales/templates
ExecStart=/opt/app/services/memoriales-render/.venv/bin/uvicorn render_service:app --host 127.0.0.1 --port 8787
Restart=on-failure
[Install]
WantedBy=multi-user.target
```

Alternative: a `docker-compose` service (Python image, `command: uvicorn ... --host 0.0.0.0`), reachable from the Next container at `http://memoriales-render:8787` — set `MEMORIALES_RENDER_URL` accordingly. Mount or bake in the templates dir.

## 11. Acceptance criteria

- Selecting either template renders exactly its fields (dynamic from the manifest; no per-template UI code). `aportando-291-y-292` shows the `has_anexos` toggle and reveals the anexos rows.
- Submitting valid data downloads a `.docx` with every `{{ }}` replaced, `{% if has_anexos %}` respected, `{% for anexo in anexos_list %}` producing one entry per string, `cuantia_value` as COP, `fecha_auto` as a long Spanish date, and `juzgado.numero_escrito` derived from `numero`.
- Invalid/missing required fields caught both client- and server-side with Spanish messages; a downed render service yields a clear "servicio no disponible" message, not a crash.
- `pnpm test memoriales-parity` passes for both templates and fails when a manifest/template mismatch is introduced.
- `formatters`, `derive`, and `build-context` have unit tests. Strict TypeScript passes; no `any` in the public surface; prototype styling untouched.
- `services/memoriales-render` sets up cleanly from `requirements.txt` in a fresh venv and serves `/health`.

```

```
