'use server';

import { getTemplateById } from '#@/memoriales/manifests/registry';
import { buildSchema } from '#@/memoriales/lib/build-schema';
import { buildContext } from '#@/memoriales/lib/build-context';

const RENDER_URL
  = process.env.MEMORIALES_RENDER_URL ?? 'http://127.0.0.1:8787/render';

export type GenerateErrorSource =
  | 'validation'
  | 'unknown-template'
  | 'render-service-unreachable'
  | 'render-service-error';

export type GenerateResult =
  | { ok: true; filename: string; base64: string }
  | {
      ok          : false;
      message     : string;
      fieldErrors?: Record<string, string[]>;
      source?     : GenerateErrorSource;
      technical?  : string;
    };

export async function generateMemorial(
  templateId: string,
  rawValues: unknown,
): Promise<GenerateResult> {
  const template = getTemplateById( templateId );

  if ( !template ) {
    return {
      ok     : false,
      message: 'Plantilla no encontrada.',
      source : 'unknown-template',
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
      source : 'validation',
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
  } catch ( err ) {
    console.error(
      `[memoriales] render fetch failed for "${ templateId }":`, err
    );

    return {
      ok       : false,
      message  : 'No se pudo conectar con el servicio de generación de documentos.',
      source   : 'render-service-unreachable',
      technical: err instanceof Error
        ? err.message
        : String( err ),
    };
  }

  if ( !res.ok ) {
    const body = await res.text()
      .catch( () => {
        return '';
      } );

    let detail = body;

    try {
      const parsed = JSON.parse( body ) as { detail?: unknown };

      if ( typeof parsed.detail === 'string' ) {
        detail = parsed.detail;
      }
    } catch {
      // body wasn't JSON — keep the raw text as detail.
    }

    console.error( `[memoriales] render ${ res.status }: ${ detail }` );

    const message = res.status === 404
      ? 'El generador de documentos no encontró el archivo de la plantilla (problema de despliegue).'
      : res.status === 422
        ? 'El generador de documentos no pudo completar la plantilla.'
        : res.status === 400
          ? 'El generador de documentos rechazó el identificador de la plantilla.'
          : 'No se pudo generar el documento. Intente de nuevo.';

    return {
      ok       : false,
      message,
      source   : 'render-service-error',
      technical: `HTTP ${ res.status }: ${ detail }`,
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
