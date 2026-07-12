'use server';

import { getTemplateById } from '#@/memoriales/manifests/registry';
import { buildSchema } from '#@/memoriales/lib/build-schema';
import { buildContext } from '#@/memoriales/lib/build-context';

const RENDER_URL
  = process.env.MEMORIALES_RENDER_URL ?? 'http://127.0.0.1:8787/render';

export type GenerateResult =
  | { ok: true; filename: string; base64: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function generateMemorial(
  templateId: string,
  rawValues: unknown,
): Promise<GenerateResult> {
  const template = getTemplateById( templateId );

  if ( !template ) {
    return {
      ok     : false,
      message: 'Plantilla no encontrada.',
    };
  }

  // 1. Server-side validation — never trust the client.
  const parsed = buildSchema( template )
    .safeParse( rawValues );

  if ( !parsed.success ) {
    const fieldErrors: Record<string, string[]> = {};

    for ( const issue of parsed.error.issues ) {
      const path = issue.path.join( '.' );

      if ( !path ) {
        continue;
      }

      ( fieldErrors[ path ] ??= [] ).push( issue.message );
    }

    return {
      ok     : false,
      message: 'Revise los campos marcados.',
      fieldErrors,
    };
  }

  // 2. Apply formatters (cedula / currencyCOP / dateLong …) + derived fields → render-ready context.
  const context = buildContext(
    template, parsed.data 
  );

  // 3. Hand off to the Python renderer.
  let res: Response;

  try {
    res = await fetch(
      RENDER_URL, {
        method : 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify( {
          templateId,
          context,
        } ),
        cache: 'no-store',
      } 
    );
  } catch {
    return {
      ok     : false,
      message: 'El servicio de documentos no está disponible.',
    };
  }

  if ( !res.ok ) {
    const detail = await res.text()
      .catch( () => {
        return '';
      } );

    console.error( `[memoriales] render ${ res.status }: ${ detail }` );

    return {
      ok     : false,
      message: 'No se pudo generar el documento. Intente de nuevo.',
    };
  }

  // 4. Return bytes as base64; the client turns this into a Blob download.
  const buffer = Buffer.from( await res.arrayBuffer() );

  return {
    ok      : true,
    filename: `memorial-${ template.id }.docx`,
    base64  : buffer.toString( 'base64' ),
  };
}
