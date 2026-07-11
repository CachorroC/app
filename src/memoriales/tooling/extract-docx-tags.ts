// extract-docx-tags.ts
// Extracts Jinja tags from a .docx, handling Word's run-splitting and loop scope.
import { readFileSync } from 'node:fs';
import { unzipSync, strFromU8 } from 'fflate';

export interface ExtractedTemplate {
  paths   : string[]; // normalized scalar/interpolation paths: "deudor.nombre", "pagos[].fecha"
  booleans: string[]; // condition variables from {% if X %}
  arrays  : string[]; // loop sources: "pagos", "pagos[].abonos"
}

const XML_PART = /^word\/(document|header\d*|footer\d*)\.xml$/;
const TOKEN = /\{\{\s*(.*?)\s*\}\}|\{%\s*(.*?)\s*%\}/g;

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
        source
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
