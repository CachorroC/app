'use client';

import { Fragment } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import styles from '../form.module.css';
import { InputDateHelper } from '#@/lib/project/date-helper';
import { josefina } from '#@/styles/fonts';

export default function VencimientoPagareSection() {
  const {
    control, register 
  } = useFormContext();

  const {
    fields, append, remove, prepend 
  } = useFieldArray(
    {
      control,
      name: 'demanda.vencimientoPagare',
    } 
  );
  return (
    <>
      <h3 className={josefina.className}>Vencimiento Del Pagare</h3>
      <ul>
        {fields.map(
          (
            item, index 
          ) => {
            return (
              <section
                className={styles.sectionRow}
                key={item.id}
              >
                <label
                  htmlFor={`demanda.vencimientoPagare.${ index }`}
                  className={styles.label}
                >{`pagaré numero ${ index + 1 }`}</label>
                <input
                  type="date"
                  className={styles.vencimientoArea}
                  {...register(
                    `demanda.vencimientoPagare.${ index }`, {
                      valueAsDate: true,
                    } 
                  )}
                />

                <button
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
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append(
              InputDateHelper(
                new Date() 
              ) 
            );
          }}
        >
          append
        </button>

        <button
          type="button"
          onClick={() => {
            prepend(
              InputDateHelper(
                new Date() 
              ) 
            );
          }}
        >
          prepend
        </button>
      </section>
    </>
  );
}
