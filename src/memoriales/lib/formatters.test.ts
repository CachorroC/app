import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatCedula, formatCurrencyCOP, formatDateLong, formatRadicado, formatUpper } from './formatters';

test(
  'formatCurrencyCOP renders grouped digits with no decimals', () => {
    const result = formatCurrencyCOP( 1234567 );

    assert.match(
      result, /1\.234\.567/ 
    );
    assert.doesNotMatch(
      result, /,\d{2}$/ 
    );
  } 
);

test(
  'formatDateLong renders a long Spanish date', () => {
    assert.equal(
      formatDateLong( '2026-07-10' ), '10 de julio de 2026' 
    );
  } 
);

test(
  'formatRadicado strips whitespace and non-digit characters', () => {
    assert.equal(
      formatRadicado( '110 013-103' ), '110013103' 
    );
  } 
);

test(
  'formatCedula groups digits with thousands separators', () => {
    assert.equal(
      formatCedula( 1234567 ), '1.234.567'
    );
    assert.equal(
      formatCedula( '1.020.304' ), '1.020.304'
    );
  }
);

test(
  'formatUpper uppercases accented Spanish text', () => {
    assert.equal(
      formatUpper( 'mínima cuantía' ), 'MÍNIMA CUANTÍA'
    );
    assert.equal(
      formatUpper( 'juzgado civil municipal' ), 'JUZGADO CIVIL MUNICIPAL'
    );
  }
);
