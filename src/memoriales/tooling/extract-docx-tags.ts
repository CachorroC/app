// extract-docx-tags.ts
// Extracts Jinja tags from a .docx, handling Word's run-splitting and loop scope.
import { readFileSync } from 'node:fs';
import { unzipSync, strFromU8 } from 'fflate';

/** Normalized set of tags found in a template: scalar/interpolation paths, `{% if %}` condition variables, and `{% for %}` loop sources, respectively. */
export interface ExtractedTemplate {
  paths   : string[]; // normalized scalar/interpolation paths: "deudor.nombre", "pagos[].fecha"
  booleans: string[]; // condition variables from {% if X %}
  arrays  : string[]; // loop sources: "pagos", "pagos[].abonos"
}

/** Matches the zip entry names of document/header/footer XML parts inside a .docx (e.g. `word/document.xml`, `word/header1.xml`) — these are the parts scanned for tags. */
const XML_PART = /^word\/(document|header\d*|footer\d*)\.xml$/;
/** Matches either a `{{ ... }}` interpolation (capture group 1) or a `{% ... %}` statement (capture group 2) in the joined template text. */
const TOKEN = /\{\{\s*(.*?)\s*\}\}|\{%\s*(.*?)\s*%\}/g;

/**
 * Decodes the five basic XML entities (`&lt;` `&gt;` `&quot;` `&apos;` `&amp;`)
 * back to their literal characters. Needed because text inside Word XML is
 * entity-escaped, so tag tokens extracted from it must be unescaped first.
 * @param s - Raw text pulled from a Word XML part.
 * @returns The text with basic XML entities decoded.
 */
function decodeEntities( s: string ): string {
  return s
    .replace(
      /&lt;/g, '<' 
    )
    .replace(
      /&gt;/g, '>' 
    )
    .replace(
      /&quot;/g, '"' 
    )
    .replace(
      /&apos;/g, '\'' 
    )
    .replace(
      /&amp;/g, '&' 
    );
}

/** Strip all XML tags so a {{ tag }} that Word split across <w:r> runs rejoins. */
function joinedTemplateText( docxPath: string ): string {
  const zip = unzipSync( readFileSync( docxPath ) );
  const parts: string[] = [];

  for ( const name of Object.keys( zip ) ) {
    if ( XML_PART.test( name ) ) {
      const text = strFromU8( zip[ name ] )
        .replace(
          /<[^>]+>/g, '' 
        );

      parts.push( decodeEntities( text ) );
    }
  }

  return parts.join( '\n' );
}

/** Leading variable path of an expression, before filters/operators. */
function leadingPath( expr: string ): string {
  return expr
    .split( '|' )[ 0 ]
    .trim()
    .split( /[\s(+\-*/=<>!,]/ )[ 0 ];
}

/**
 * Extracts every Jinja tag from a .docx template. Unzips the file, joins its
 * XML text (so tags Word split across runs rejoin), scans for `{{ ... }}` and
 * `{% ... %}` tokens, and tracks a loop stack so variables referenced inside a
 * `{% for %}` block resolve to their `source[].field` form. Each tag is then
 * classified into `paths`, `booleans`, or `arrays` and the result is sorted.
 * Used by `scaffold-manifest.ts` to draft new manifests and by
 * `memoriales-parity.test.ts` to check manifest/template parity.
 * @param docxPath - Filesystem path to the .docx template.
 * @returns The extracted, normalized, sorted tag paths.
 */
export function extractDocxTags( docxPath: string ): ExtractedTemplate {
  const text = joinedTemplateText( docxPath );
  const paths = new Set<string>();
  const booleans = new Set<string>();
  const arrays = new Set<string>();
  const loopStack: { item: string; source: string }[] = [];

  const resolve = ( path: string ): string => {
    const [
      head,
      ...rest
    ] = path.split( '.' );
    const loop = [
      ...loopStack
    ].reverse()
      .find( ( l ) => {
        return l.item === head;
      } );

    return loop
      ? [
          `${ loop.source }[]`,
          ...rest
        ].join( '.' )
      : path;
  };

  let m: RegExpExecArray | null;

  TOKEN.lastIndex = 0;

  while ( ( m = TOKEN.exec( text ) ) !== null ) {
    if ( m[ 1 ] !== undefined ) {
      const p = leadingPath( m[ 1 ] );

      if ( p ) {
        paths.add( resolve( p ) );
      }

      continue;
    }

    const stmt = ( m[ 2 ] ?? '' ).trim();
    const forM = /^for\s+(\w+)\s+in\s+(.+)$/.exec( stmt );
    const ifM = /^(?:el)?if\s+(.+)$/.exec( stmt );

    if ( forM ) {
      const source = resolve( leadingPath( forM[ 2 ] ) );

      arrays.add( source );
      loopStack.push( {
        item: forM[ 1 ],
        source,
      } );
    } else if ( /^endfor$/.test( stmt ) ) {
      loopStack.pop();
    } else if ( ifM ) {
      const cond = leadingPath( ifM[ 1 ] );

      if ( cond ) {
        booleans.add( resolve( cond ) );
      }
    }
  }

  for ( const a of arrays ) {
    paths.delete( a );
  } // arrays are represented via their [] item paths

  for ( const b of booleans ) {
    paths.delete( b );
  }

  return {
    paths: [
      ...paths
    ].sort(),
    booleans: [
      ...booleans
    ].sort(),
    arrays: [
      ...arrays
    ].sort(),
  };
}
