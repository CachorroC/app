import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deriveNumeroEscrito, ordinalMasculino } from './derive';

test(
  'ordinalMasculino handles units, tens, and compound values', () => {
    assert.equal(
      ordinalMasculino( 1 ), 'primero' 
    );
    assert.equal(
      ordinalMasculino( 4 ), 'cuarto' 
    );
    assert.equal(
      ordinalMasculino( 10 ), 'décimo' 
    );
    assert.equal(
      ordinalMasculino( 20 ), 'vigésimo' 
    );
    assert.equal(
      ordinalMasculino( 84 ), 'octogésimo cuarto' 
    );
  } 
);

test(
  'ordinalMasculino returns null outside 1–99 or for non-integers', () => {
    assert.equal(
      ordinalMasculino( 0 ), null 
    );
    assert.equal(
      ordinalMasculino( 100 ), null 
    );
    assert.equal(
      ordinalMasculino( 4.5 ), null 
    );
  } 
);

test(
  'deriveNumeroEscrito derives the ordinal from a numeric string', () => {
    assert.equal(
      deriveNumeroEscrito( '4' ), 'cuarto' 
    );
  } 
);

test(
  'deriveNumeroEscrito falls back to the raw value when unparseable', () => {
    assert.equal(
      deriveNumeroEscrito( 'ABC' ), 'ABC' 
    );
  } 
);
