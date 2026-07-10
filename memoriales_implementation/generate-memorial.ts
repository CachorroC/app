'use server';
// generate-memorial.ts
// Next stays the brain: validate + format + assemble context, then call the
// localhost docxtpl service and return the file as base64 for client download.
import { getTemplateById } from '@/memoriales/manifests/registry';
import { buildSchema } from '@/memoriales/lib/build-schema';
import { buildContext } from '@/memoriales/lib/build-context'; // applies field.format transforms

const RENDER_URL = process.env.MEMORIALES_RENDER_URL ?? 'http://127.0.0.1:8787/render';

export type GenerateResult =
  | { ok: true; filename: string; base64: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function generateMemorial(
  templateId: string,
  rawValues: unknown,
): Promise<GenerateResult> {
  const template = getTemplateById(templateId);
  if (!template) return { ok: false, message: 'Plantilla no encontrada.' };

  // 1. Server-side validation — never trust the client.
  const parsed = buildSchema(template).safeParse(rawValues);
  if (!parsed.success) {
    return {
      ok: false,
      message: 'Revise los campos marcados.',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // 2. Apply formatters (cedula / currencyCOP / dateLong …) → render-ready context.
  const context = buildContext(template, parsed.data);

  // 3. Hand off to the Python renderer.
  let res: Response;
  try {
    res = await fetch(RENDER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ templateId, context }),
      cache: 'no-store',
    });
  } catch {
    return { ok: false, message: 'El servicio de documentos no está disponible.' };
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error(`[memoriales] render ${res.status}: ${detail}`);
    return { ok: false, message: 'No se pudo generar el documento. Intente de nuevo.' };
  }

  // 4. Return bytes as base64; the client turns this into a Blob download.
  const buffer = Buffer.from(await res.arrayBuffer());
  const slug = template.id;
  return {
    ok: true,
    filename: `memorial-${slug}.docx`,
    base64: buffer.toString('base64'),
  };
}
