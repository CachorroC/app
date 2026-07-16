// discover-manifests.ts
// Shared ground-truth for "what manifests exist" — used by both `generate-registry.ts`
// (writes the registry) and `registry-completeness.test.ts` (asserts the registry matches
// this list). Finds the exported MemorialTemplate in each manifest file by duck-typing its
// shape, since exported identifier names aren't consistent across files (`base`,
// `aportando291y292`, `impulso_calificacion_demanda`, ...).
import { basename, extname } from 'node:path';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { MemorialTemplate } from '../manifests/types';

const MANIFESTS_DIR = fileURLToPath( new URL(
  '../manifests', import.meta.url
) );

const EXCLUDED_FILES = new Set( [
  'types.ts',
  'registry.ts'
] );

/** Shape of one discovered manifest module: which file it came from, how to import it, the name of its exported template binding, and the resolved `MemorialTemplate` itself. */
export interface DiscoveredManifest {
  file           : string;
  moduleSpecifier: string;
  exportName     : string;
  template       : MemorialTemplate;
}

/**
 * Duck-types a value to decide whether it's a `MemorialTemplate` export.
 * Manifest files don't use a consistent exported identifier name, so
 * `discoverManifests` has to scan each module's exports and pick out the
 * one that looks like a template rather than importing a known name.
 * @param v - Candidate export value from a manifest module.
 * @returns True if `v` has the string `id`/`filename`/`displayName` and array `groups` fields of a `MemorialTemplate`.
 */
const isMemorialTemplate = ( v: unknown ): v is MemorialTemplate => {
  return typeof v === 'object' && v !== null
    && typeof ( v as Record<string, unknown> ).id === 'string'
    && typeof ( v as Record<string, unknown> ).filename === 'string'
    && typeof ( v as Record<string, unknown> ).displayName === 'string'
    && Array.isArray( ( v as Record<string, unknown> ).groups );
};

/**
 * Reads every manifest file under `manifests/` (skipping `types.ts`, `registry.ts`,
 * test files and `.d.ts` files), dynamically imports each one, and locates its
 * `MemorialTemplate` export via {@link isMemorialTemplate}. Asserts that each
 * template's `id` matches its file's basename and that no `id` is duplicated
 * across files. This is the single source of truth both `generate-registry.ts`
 * (to build `registry.ts`) and `registry-completeness.test.ts` (to assert the
 * registry stays in sync) rely on.
 * @returns The full list of discovered manifests, in filename order.
 */
export const discoverManifests = async (): Promise<DiscoveredManifest[]> => {
  const files = readdirSync( MANIFESTS_DIR )
    .filter( ( file ) => {
      return extname( file ) === '.ts'
        && !file.endsWith( '.test.ts' )
        && !file.endsWith( '.d.ts' )
        && !EXCLUDED_FILES.has( file );
    } )
    .sort();

  const discovered: DiscoveredManifest[] = [];
  const seenIds = new Map<string, string>();

  for ( const file of files ) {
    const moduleSpecifier = `../manifests/${ basename(
      file, '.ts'
    ) }`;
    const mod = await import( moduleSpecifier );

    const matches = Object.entries( mod )
      .filter( ( [
        , value
      ] ) => {
        return isMemorialTemplate( value );
      } );

    if ( matches.length !== 1 ) {
      throw new Error(
        `${ file }: expected exactly one MemorialTemplate export, found ${ matches.length }`
        + ` (exports: ${ Object.keys( mod )
          .join( ', ' ) })`
      );
    }

    const [
      [
        exportName,
        template
      ]
    ] = matches as [[string, MemorialTemplate]];

    const expectedId = basename(
      file, '.ts'
    );

    if ( template.id !== expectedId ) {
      throw new Error(
        `${ file }: template.id ('${ template.id }') must match the file's basename ('${ expectedId }')`
      );
    }

    const existingFile = seenIds.get( template.id );

    if ( existingFile ) {
      throw new Error(
        `Duplicate manifest id '${ template.id }' in ${ existingFile } and ${ file }`
      );
    }

    seenIds.set(
      template.id, file
    );

    discovered.push( {
      file,
      moduleSpecifier,
      exportName,
      template,
    } );
  }

  return discovered;
};
