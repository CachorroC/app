// scaffold-manifest.ts
// Usage: pnpm tsx src/memoriales/tooling/scaffold-manifest.ts <path-to-template.docx> <template-id> > draft.ts
// Emits a draft MemorialTemplate you then enrich (labels / types / select options / groups).
import { basename } from 'node:path';
import { extractDocxTags } from './extract-docx-tags';
import type { AutofillConfig, FieldDef, FieldGroup, FieldType, MemorialTemplate } from '../manifests/types';

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

// --- 1. Group the raw dotted/loop paths into draft field groups -----------------------

type FieldMeta = {
  name       : string;
  boolean?   : boolean;
  stringList?: boolean;
};

type Draft = {
  key?       : string;
  repeatable?: boolean;
  fields     : FieldMeta[];
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

/** Places an already-unwrapped (no `[]`) dotted path into its group. */
const placeClean = (
  path: string, meta: Omit<FieldMeta, 'name'>
) => {
  const nested = path.match( /^([^.]+)\.(.+)$/ ); // deudor.nombre

  if ( nested ) {
    ensure( nested[ 1 ] ).fields.push( {
      name: nested[ 2 ],
      ...meta,
    } );

    return;
  }

  ensure( undefined ).fields.push( {
    name: path,
    ...meta,
  } ); // juzgado
};

const place = (
  path: string, isBoolean = false
) => {
  const objectArray = path.match( /^([^[]+)\[\]\.(.+)$/ ); // pagos[].fecha -> repeatable group

  if ( objectArray ) {
    ensure(
      objectArray[ 1 ], true
    ).fields.push( {
      name   : objectArray[ 2 ],
      boolean: isBoolean,
    } );

    return;
  }

  const scalarArray = path.match( /^([^[]+)\[\]$/ ); // anexos_list[] -> {% for x in anexos_list %}{{x}}{% endfor %}

  if ( scalarArray ) {
    placeClean(
      scalarArray[ 1 ], {
        stringList: true
      }
    );

    return;
  }

  placeClean(
    path, {
      boolean: isBoolean
    }
  );
};

paths.forEach( ( p ) => {
  place( p );
} );
booleans.forEach( ( b ) => {
  place(
    b, true
  );
} );

// --- 2. Field rules: canonical overrides shared by (almost) every manifest ------------
// Keyed by the field's full dotted path (group.field, or just field for root scalars).
// `tipo_proceso` / `tipoproceso` alias: some templates literally use the tag without the
// underscore (see aportando-291-y-292.docx) — the field `name` must stay whatever the
// .docx says, so both spellings are matched here for the *rule*, never for renaming.

type FieldRule = Partial<Pick<FieldDef, 'type' | 'format' | 'derived' | 'options'>>;

const tipoProcesoRule: FieldRule = {
  format: 'upper'
};

const FIELD_RULES: Record<string, FieldRule> = {
  'deudor.nombre': {
    format: 'upper'
  },
  cuantia_value: {
    type   : 'select',
    format : 'upper',
    options: [
      {
        value: 'mínima cuantía',
        label: 'Mínima cuantía',
      },
      {
        value: 'menor cuantía',
        label: 'Menor cuantía',
      },
      {
        value: 'mayor cuantía',
        label: 'Mayor cuantía',
      },
    ],
  },
  tipo_proceso    : tipoProcesoRule,
  tipoproceso     : tipoProcesoRule,
  'juzgado.ciudad': {
    format: 'upper'
  },
  'juzgado.tipo': {
    format: 'upper'
  },
  'juzgado.numero_escrito': {
    type   : 'text',
    derived: true,
    format : 'upper',
  },
  'radicado.año': {
    format: 'radicado'
  },
  'radicado.numero': {
    format: 'radicado'
  },
};

const guessType = ( name: string ): FieldType => {
  if ( /cedula|nit|numero|cantidad|monto|valor|total/i.test( name ) ) {
    return 'number';
  }

  if ( /fecha/i.test( name ) ) {
    return 'date';
  }

  return 'text';
};

const buildField = (
  meta: FieldMeta, fullPath: string
): FieldDef => {
  const rule = FIELD_RULES[ fullPath ];
  const type: FieldType = rule?.type
    ?? ( meta.stringList
      ? 'stringList'
      : meta.boolean
        ? 'boolean'
        : guessType( meta.name ) );

  const field: FieldDef = {
    name : meta.name,
    label: meta.name,
    type,
  };

  switch ( type ) {
      case 'boolean':
        break; // gates a `{% if %}`; never required, never derived

      case 'stringList':
        field.helpText = 'Un elemento por línea.';

        break;

      default:
        if ( rule?.derived ) {
          field.derived = true;
        } else {
          field.required = true;
        }
  }

  if ( rule?.format ) {
    field.format = rule.format;
  }

  if ( rule?.options ) {
    field.options = rule.options;
  }

  return field;
};

const toFieldGroup = ( draft: Draft ): FieldGroup => {
  const fields = draft.fields.map( ( meta ) => {
    const fullPath = draft.key
      ? `${ draft.key }.${ meta.name }`
      : meta.name;

    return buildField(
      meta, fullPath
    );
  } );

  return {
    ...( draft.key
      ? {
          key: draft.key
        }
      : {} ),
    ...( draft.repeatable
      ? {
          repeatable: true as const
        }
      : {} ),
    legend: draft.key ?? 'Datos generales',
    fields,
  };
};

let fieldGroups = [
  ...groups.values()
].map( toFieldGroup );

// --- 3. Split "has_X" + "X_list" root pairs into their own trailing group -------------
// e.g. `has_anexos` (boolean) + `anexos_list` (stringList) -> a dedicated "Anexos" group,
// matching every hand-enriched manifest that has an optional attachments list.

const humanize = ( base: string ): string => {
  const spaced = base.replace(
    /_/g, ' '
  );

  return spaced.charAt( 0 )
    .toUpperCase() + spaced.slice( 1 );
};

const rootGroup = fieldGroups.find( ( g ) => {
  return !g.key;
} );

if ( rootGroup ) {
  const listFields = rootGroup.fields.filter( ( f ) => {
    return f.type === 'stringList';
  } );

  for ( const listField of listFields ) {
    const base = listField.name.replace(
      /_list$/, ''
    );
    const gateName = `has_${ base }`;
    const gateField = rootGroup.fields.find( ( f ) => {
      return f.type === 'boolean' && f.name === gateName;
    } );

    const extracted = [
      ...( gateField
        ? [
            gateField
          ]
        : [] ),
      listField,
    ];

    rootGroup.fields = rootGroup.fields.filter( ( f ) => {
      return !extracted.includes( f );
    } );

    fieldGroups.push( {
      legend: humanize( base ),
      fields: extracted.map( ( f ) => {
        return f.type === 'boolean'
          ? {
              ...f,
              label: `¿Incluye ${ base.replace(
                /_/g, ' '
              ) }?`,
            }
          : {
              ...f,
              label: humanize( base ),
            };
      } ),
    } );
  }
}

fieldGroups = fieldGroups.filter( ( g ) => {
  return g.fields.length > 0;
} );

// `deudor` always leads the form, matching every hand-enriched manifest.
const deudorIndex = fieldGroups.findIndex( ( g ) => {
  return g.key === 'deudor';
} );

if ( deudorIndex > 0 ) {
  const [
    deudorGroup
  ] = fieldGroups.splice(
    deudorIndex, 1
  );

  fieldGroups.unshift( deudorGroup );
}

// --- 4. autofill: gated on `deudor.nombre`, fieldMap built from what's actually there --

const AUTOFILL_CANDIDATES: { paths: string[]; target: string }[] = [
  {
    paths: [
      'juzgado.tipo'
    ],
    target: 'juzgado.tipo',
  },
  {
    paths: [
      'juzgado.ciudad'
    ],
    target: 'juzgado.ciudad',
  },
  {
    paths: [
      'juzgado.numero'
    ],
    target: 'juzgado.numero',
  },
  {
    paths: [
      'radicado.numero'
    ],
    target: 'radicado.numero',
  },
  {
    paths: [
      'radicado.año'
    ],
    target: 'radicado.año',
  },
  {
    paths: [
      'tipo_proceso',
      'tipoproceso'
    ],
    target: 'tipoProceso',
  },
  {
    paths: [
      'llaveProceso'
    ],
    target: 'llaveProceso',
  },
];

const buildAutofill = ( rawPaths: string[] ): AutofillConfig | undefined => {
  const pathSet = new Set( rawPaths );

  if ( !pathSet.has( 'deudor.nombre' ) ) {
    return undefined;
  }

  const fieldMap: Record<string, string> = {};

  for ( const candidate of AUTOFILL_CANDIDATES ) {
    const found = candidate.paths.find( ( p ) => {
      return pathSet.has( p );
    } );

    if ( found ) {
      fieldMap[ found ] = candidate.target;
    }
  }

  if ( Object.keys( fieldMap ).length === 0 ) {
    return undefined;
  }

  return {
    triggerField: 'deudor.nombre',
    fieldMap,
  };
};

// --- 5. Assemble the draft template as a real object, then serialize it ---------------

const displayName = basename( docxPath )
  .replace(
    /\.docx$/, ''
  )
  .split( /[_-]+/ )
  .filter( Boolean )
  .map( ( word ) => {
    return word.charAt( 0 )
      .toUpperCase() + word.slice( 1 );
  } )
  .join( ' ' );

const draftTemplate: MemorialTemplate = {
  id         : templateId,
  filename   : basename( docxPath ),
  displayName,
  description: 'descripción de una línea',
  ...( () => {
    const autofill = buildAutofill( paths );

    return autofill
      ? {
          autofill
        }
      : {};
  } )(),
  groups: fieldGroups,
};

// A generic value -> TS-source serializer: inlines anything that's shape-inlineable
// (no forced-block children) *and* fits within WIDTH; otherwise renders one entry per
// line and recurses. This is what keeps e.g. `fieldMap` / `groups` multi-line while
// single-format field objects like `{ name: 'nombre', ... }` stay on one line, purely
// from the shape/width of the data — no per-field/per-group string templates.
const WIDTH = 96;
const INDENT = '  ';

const escapeString = ( s: string ): string => {
  return s.replace(
    /\\/g, '\\\\'
  )
    .replace(
      /'/g, '\\\''
    );
};

const isPlainObject = ( v: unknown ): v is Record<string, unknown> => {
  return typeof v === 'object' && v !== null && !Array.isArray( v );
};

const isKeyBare = ( key: string ): boolean => {
  return /^[A-Za-z_$][\w$]*$/.test( key );
};

const serializeKey = ( key: string ): string => {
  return isKeyBare( key )
    ? key
    : `'${ escapeString( key ) }'`;
};

const serializePrimitive = ( v: string | number | boolean ): string => {
  if ( typeof v === 'string' ) {
    return `'${ escapeString( v ) }'`;
  }

  return String( v );
};

/** Returns a one-line rendering if every descendant is representable, else null. */
const tryInline = ( v: unknown ): string | null => {
  if ( v === undefined ) {
    return null;
  }

  if ( typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' ) {
    return serializePrimitive( v );
  }

  if ( Array.isArray( v ) ) {
    if ( v.length === 0 ) {
      return '[]';
    }

    const parts = v.map( tryInline );

    if ( parts.some( ( p ) => {
      return p === null;
    } ) ) {
      return null;
    }

    return `[ ${ parts.join( ', ' ) } ]`;
  }

  if ( isPlainObject( v ) ) {
    const entries = Object.entries( v )
      .filter( ( [
        , val
      ] ) => {
        return val !== undefined;
      } );

    if ( entries.length === 0 ) {
      return '{}';
    }

    const parts = entries.map( ( [
      key,
      val
    ] ) => {
      const inner = tryInline( val );

      return inner === null
        ? null
        : `${ serializeKey( key ) }: ${ inner }`;
    } );

    if ( parts.some( ( p ) => {
      return p === null;
    } ) ) {
      return null;
    }

    return `{ ${ parts.join( ', ' ) } }`;
  }

  return null;
};

const serialize = (
  v: unknown, indent: number
): string => {
  const inline = tryInline( v );

  if ( inline !== null && indent * INDENT.length + inline.length <= WIDTH ) {
    return inline;
  }

  const pad = INDENT.repeat( indent + 1 );
  const closePad = INDENT.repeat( indent );

  if ( Array.isArray( v ) ) {
    const items = v.map( ( item ) => {
      return `${ pad }${ serialize(
        item, indent + 1
      ) },`;
    } );

    return `[\n${ items.join( '\n' ) }\n${ closePad }]`;
  }

  if ( isPlainObject( v ) ) {
    const entries = Object.entries( v )
      .filter( ( [
        , val
      ] ) => {
        return val !== undefined;
      } )
      .map( ( [
        key,
        val
      ] ) => {
        return `${ pad }${ serializeKey( key ) }: ${ serialize(
          val, indent + 1
        ) },`;
      } );

    return `{\n${ entries.join( '\n' ) }\n${ closePad }}`;
  }

  // Primitives always succeed at tryInline, so this is unreachable in practice.
  return inline ?? 'undefined';
};

const exportName = templateId.replace(
  /-/g, ''
);

console.log( `import type { MemorialTemplate } from './types';

export const ${ exportName }: MemorialTemplate = ${ serialize(
  draftTemplate, 0
) };` );
