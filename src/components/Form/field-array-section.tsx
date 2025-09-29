import React, { Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './form.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';


export function ObligacionesComponent() {
  const {
    control, register
  } = useFormContext();

  const {
    fields, append, remove, prepend
  } = useFieldArray(
    {
      control,
      name: 'demanda.obligacion',
    }
  );


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
              className={layout.segmentRow}
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
                <span className={`material-symbols-outlined ${ styles.icon }`}>
                  bookmark_remove
                </span>
              </button>
            </section>
          );
        }
      )}

      <section className={layout.sectionRow}>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            append(
              ''
            );
          }}
        >
          <span className={styles.text}>agregar</span>
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            variables
          </span>
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() => {
            prepend(
              ''
            );
          }}
        >
          <span className={styles.text}>agregar antes</span>
          <span className={`material-symbols-outlined ${ styles.icon }`}>
            variables
          </span>
        </button>

        {/* <button
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
        </button> */}
      </section>

    </>
  );
}
