// registry-completeness.test.ts (node:test — run via `pnpm test:memoriales`)
// Fails if a manifest file in src/memoriales/manifests/ isn't reflected in the committed
// registry.ts, or the registry has drifted from its source file. Fix: `pnpm memoriales:generate-registry`.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { discoverManifests } from './discover-manifests';
import { memorialesRegistry } from '../manifests/registry';

describe(
  'manifest ⇄ registry completeness', () => {
    it(
      'every manifest file in src/memoriales/manifests/ is registered', async () => {
        const discovered = await discoverManifests();
        const discoveredIds = new Set( discovered.map( ( m ) => {
          return m.template.id;
        } ) );
        const registeredIds = new Set( Object.keys( memorialesRegistry ) );

        const missingFromRegistry = [
          ...discoveredIds
        ].filter( ( id ) => {
          return !registeredIds.has( id );
        } );
        const orphanInRegistry = [
          ...registeredIds
        ].filter( ( id ) => {
          return !discoveredIds.has( id );
        } );

        assert.deepEqual(
          {
            missingFromRegistry,
            orphanInRegistry,
          },
          {
            missingFromRegistry: [],
            orphanInRegistry   : [],
          },
        );
      }
    );

    it(
      'registry.ts is up to date with the manifests directory (run `pnpm memoriales:generate-registry`)', async () => {
        const discovered = await discoverManifests();

        for ( const { template } of discovered ) {
          assert.deepEqual(
            ( memorialesRegistry as Record<string, unknown> )[ template.id ],
            template,
            `registry.ts entry for '${ template.id }' is stale or missing — run \`pnpm memoriales:generate-registry\``
          );
        }
      }
    );
  }
);
