import React, { Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';

let renderCount = 0;

export default function ObligacionesComponent() {
  const {
    control, register, setValue, getValues
  } = useFormContext();

  const {
    fields, append, remove, prepend
  } = useFieldArray(
    {
      control,
      name: 'demanda.obligacion',
    }
  );

  renderCount++;

  return (
    <>
      <label
        className={`${ styles.label } ${ typography.titleMedium }`}
        htmlFor={'demanda.obligacion'}
      >
        {'Obligaciones del deudor'}
      </label>
      {fields.map(
        (
          field, index
        ) => {
          return (
            <section
              className={styles.sectionRow}
              key={field.id}
            >
              <label
                className={`${ styles.label } ${ typography.titleMedium }`}
                htmlFor={`demanda.obligacion.${ index }`}
              >{`Obligacion ${ index + 1 }`}</label>
              <input
                className={styles.textArea}
                key={field.id}
                {...register(
                  `demanda.obligacion.${ index }`
                )}
              />
              <button
                className={styles.button}
                type="button"
                onClick={() => {
                  return remove(
                    index
                  );
                }}
              >
              Delete
              </button>
            </section>
          );
        }
      )}

      <section className={styles.sectionRow}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            append(
              ''
            );
          }}
        >
          append
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() => {
            setValue(
              'test', [
                ...( getValues().test || [] ),
                {
                  name       : 'append',
                  nestedArray: [
                    {
                      field1: 'append',
                      field2: 'append',
                    },
                  ],
                },
              ]
            );
          }}
        >
          Append Nested
        </button>

        <button
          type="button"
          onClick={() => {
            prepend(
              {
                name: 'append',
              }
            );
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            setValue(
              'test', [
                {
                  name       : 'append',
                  nestedArray: [
                    {
                      field1: 'Prepend',
                      field2: 'Prepend',
                    },
                  ],
                },
                ...( getValues().test || [] ),
              ]
            );
          }}
        >
          prepend Nested
        </button>
      </section>

      <span className="counter">Render Count: {renderCount}</span>
    </>
  );
}
