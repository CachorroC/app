import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deriveNumeroEscrito, numeroJuzgadoEnPalabras } from './derive';

test(
  'numeroJuzgadoEnPalabras keeps ordinal words for 1-9', () => {
    assert.equal(
      numeroJuzgadoEnPalabras( 1 ), 'primero'
    );
    assert.equal(
      numeroJuzgadoEnPalabras( 4 ), 'cuarto'
    );
  }
);

test(
  'numeroJuzgadoEnPalabras uses cardinal words from 10 up', () => {
    assert.equal(
      numeroJuzgadoEnPalabras( 10 ), 'diez'
    );
    assert.equal(
      numeroJuzgadoEnPalabras( 20 ), 'veinte'
    );
    assert.equal(
      numeroJuzgadoEnPalabras( 21 ), 'veintiuno'
    );
    assert.equal(
      numeroJuzgadoEnPalabras( 49 ), 'cuarenta y nueve'
    );
    assert.equal(
      numeroJuzgadoEnPalabras( 84 ), 'ochenta y cuatro'
    );
  }
);

test(
  'numeroJuzgadoEnPalabras returns null outside 1–99 or for non-integers', () => {
    assert.equal(
      numeroJuzgadoEnPalabras( 0 ), null
    );
    assert.equal(
      numeroJuzgadoEnPalabras( 100 ), null
    );
    assert.equal(
      numeroJuzgadoEnPalabras( 4.5 ), null
    );
  }
);

test(
  'deriveNumeroEscrito derives the written form from a numeric string', () => {
    assert.equal(
      deriveNumeroEscrito( '4' ), 'cuarto'
    );
    assert.equal(
      deriveNumeroEscrito( '49' ), 'cuarenta y nueve'
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
