// scaffold-manifest.ts
// Usage: pnpm tsx src/memoriales/tooling/scaffold-manifest.ts <path-to-template.docx> <template-id> > draft.ts
// Emits a draft MemorialTemplate you then enrich (labels / types / formats / required / derived).
import { basename } from 'node:path';
import { extractDocxTags } from './extract-docx-tags';

const [
  , , docxPath,
  templateId
] = process.argv;

if ( !docxPath || !templateId ) {
  console.error( 'Usage: tsx scaffold-manifest.ts <template.docx> <template-id>', );
  process.exit( 1 );
}

const {
  paths, booleans 
} = extractDocxTags( docxPath );

type Draft = {
  key?       : string;
  repeatable?: boolean;
  fields     : { name: string; boolean?: boolean }[];
};

const groups = new Map<string, Draft>();

const ensure = (
  key: string | undefined, repeatable = false 
): Draft => {
  const id = key ?? '__root__';

  if ( !groups.has( id ) ) {
    groups.set(
      id, {
        key,
        repeatable,
        fields: [],
      } 
    );
  }

  const g = groups.get( id )!;

  if ( repeatable ) {
    g.repeatable = true;
  }

  return g;
};

const place = (
  path: string, isBoolean = false 
) => {
  const arr = path.match( /^([^[]+)\[\]\.(.+)$/ ); // pagos[].fecha

  if ( arr ) {
    ensure(
      arr[ 1 ], true 
    ).fields.push( {
      name   : arr[ 2 ],
      boolean: isBoolean,
    } );

    return;
  }

  const nested = path.match( /^([^.]+)\.(.+)$/ ); // deudor.nombre

  if ( nested ) {
    ensure( nested[ 1 ] ).fields.push( {
      name   : nested[ 2 ],
      boolean: isBoolean,
    } );

    return;
  }

  ensure( undefined ).fields.push( {
    name   : path,
    boolean: isBoolean,
  } ); // juzgado
};

paths.forEach( ( p ) => {
  place( p );
} );
booleans.forEach( ( b ) => {
  place(
    b, true 
  );
} );

const guessType = (
  name: string, isBoolean: boolean 
): string => {
  if ( isBoolean ) {
    return 'boolean';
  }

  if ( /cedula|nit|numero|cantidad|monto|valor|total/i.test( name ) ) {
    return 'number';
  }

  if ( /fecha/i.test( name ) ) {
    return 'date';
  }

  return 'text';
};

const emitField = ( f: { name: string; boolean?: boolean } ): string => {
  return `      { name: '${ f.name }', label: '${ f.name }', type: '${ guessType(
    f.name,
    !!f.boolean,
  ) }', required: true },`;
};

const emitGroup = ( g: Draft ): string => {
  const head
    = ( g.key
      ? `key: '${ g.key }', `
      : '' )
    + ( g.repeatable
      ? 'repeatable: true, '
      : '' )
    + `legend: '${ g.key ?? 'Datos generales' }',`;

  return `    { ${ head }\n      fields: [\n${ g.fields
    .map( emitField )
    .join( '\n' ) }\n      ] },`;
};

const displayName = basename( docxPath )
  .replace(
    /-template\.docx$/, '' 
  )
  .replace(
    /-/g, ' ' 
  );

console.log( `import type { MemorialTemplate } from './types';

export const ${ templateId.replace(
  /-/g, '' 
) }: MemorialTemplate = {
  id: '${ templateId }',
  filename: '${ basename( docxPath ) }',
  displayName: '${ displayName }',
  description: 'descripción de una línea',
  groups: [
${ [
  ...groups.values()
].map( emitGroup )
  .join( '\n' ) }
  ],
};` );
