// memoriales-parity.test.ts (node:test — run via `pnpm test:memoriales-parity`)
// Fails if any template variable lacks a manifest field, or vice versa.
import { join } from 'node:path';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractDocxTags } from './extract-docx-tags';
import { memorialesRegistry } from '../manifests/registry';
import type { MemorialTemplate } from '../manifests/types';

const TEMPLATES_DIR = join(
  process.cwd(), 'src/memoriales/templates' 
);

/**
 * `stringList` fields normalize to `${base}[]` (matching the loop the extractor sees).
 * `boolean` fields go into the booleans set, unless they carry a `format` (e.g.
 * 'positivaNegativa'), in which case they render as text and go into `paths` instead.
 * A `derived` field is included in `paths`
 * unless its tag is entirely absent from the extracted docx (i.e. it's purely computed,
 * with no `{{ }}` of its own) — `numero_escrito` is derived but does appear as a tag, so
 * it stays included.
 */
function manifestPaths(
  template: MemorialTemplate,
  docxPaths: Set<string>,
): { paths: Set<string>; booleans: Set<string> } {
  const paths = new Set<string>();
  const booleans = new Set<string>();

  for ( const group of template.groups ) {
    for ( const field of group.fields ) {
      const base = group.key
        ? group.repeatable
          ? `${ group.key }[].${ field.name }`
          : `${ group.key }.${ field.name }`
        : field.name;

      if ( field.type === 'boolean' ) {
        if ( field.format ) {
          // A formatted boolean (e.g. 'positivaNegativa') renders as text, not an `{% if %}` gate.
          paths.add( base );
        } else {
          booleans.add( base );
        }

        continue;
      }

      const path = field.type === 'stringList'
        ? `${ base }[]`
        : base;

      if ( field.derived && !docxPaths.has( path ) ) {
        continue;
      }

      paths.add( path );
    }
  }

  return {
    paths,
    booleans,
  };
}

const diff = (
  a: Set<string>, b: Set<string> 
): string[] => {
  return [
    ...a
  ].filter( ( x ) => {
    return !b.has( x );
  } );
};

describe(
  'manifest ⇄ template parity', () => {
    for ( const template of Object.values( memorialesRegistry ) ) {
      it(
        `${ template.id } covers every tag and has no orphan fields`, () => {
          const docx = extractDocxTags( join(
            TEMPLATES_DIR, template.filename 
          ) );
          const inDocx = new Set( docx.paths );
          const manifest = manifestPaths(
            template, inDocx 
          );

          assert.deepEqual(
            {
              missingFields: diff(
                inDocx, manifest.paths 
              ),
              orphanFields: diff(
                manifest.paths, inDocx 
              ),
            },
            {
              missingFields: [],
              orphanFields : [],
            },
          );

          assert.deepEqual(
            {
              missingBooleans: diff(
                new Set( docx.booleans ), manifest.booleans 
              ),
            },
            {
              missingBooleans: [],
            },
          );
        } 
      );
    }
  } 
);
