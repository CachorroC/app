// memoriales-parity.test.ts  (vitest; trivially portable to jest)
// Fails if any template variable lacks a manifest field, or vice versa.
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';
import { extractDocxTags } from './extract-docx-tags';
import { memorialesRegistry } from '../manifests/registry';
import type { MemorialTemplate } from '../manifests/types';

const TEMPLATES_DIR = join(process.cwd(), 'src/memoriales/templates');

function manifestPaths(t: MemorialTemplate): { paths: Set<string>; booleans: Set<string> } {
  const paths = new Set<string>();
  const booleans = new Set<string>();
  for (const g of t.groups) {
    for (const f of g.fields) {
      const base = g.key
        ? g.repeatable
          ? `${g.key}[].${f.name}`
          : `${g.key}.${f.name}`
        : f.name;
      (f.type === 'boolean' ? booleans : paths).add(base);
    }
  }
  return { paths, booleans };
}

const diff = (a: Set<string>, b: Set<string>) => [...a].filter((x) => !b.has(x));

describe('manifest ⇄ template parity', () => {
  for (const template of Object.values(memorialesRegistry)) {
    it(`${template.id} covers every tag and has no orphan fields`, () => {
      const docx = extractDocxTags(join(TEMPLATES_DIR, template.filename));
      const manifest = manifestPaths(template);

      const inDocx = new Set([...docx.paths]);
      const inManifest = manifest.paths;
      const boolsDocx = new Set(docx.booleans);

      expect(
        { missingFields: diff(inDocx, inManifest), orphanFields: diff(inManifest, inDocx) },
      ).toEqual({ missingFields: [], orphanFields: [] });

      expect(
        { missingBooleans: diff(boolsDocx, manifest.booleans) },
      ).toEqual({ missingBooleans: [] });
    });
  }
});
