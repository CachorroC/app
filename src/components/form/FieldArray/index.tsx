import React, { Fragment } from 'react';
import { FieldPath, useFieldArray, useFormContext } from 'react-hook-form';
import { NuevaCarpeta, IntCarpeta } from '#@/lib/types/carpetas';

let renderCount = 0;

export default function FieldArrayComponent(
  {
    name,
  }: {
  name: FieldPath<IntCarpeta | NuevaCarpeta>;
}
) {
  const {
    control, register, setValue, getValues, watch
  } = useFormContext<IntCarpeta>();

  const {
    fields, append, remove, prepend
  } = useFieldArray(
    {
      control,
      name: 'obligacion',
    }
  );


  renderCount++;

  return (
    <>
      <ul>
        {fields.map(
          (
            field, index
          ) => {
            return (
              <Fragment key={field.id}>
                <input
                  key={ field.id }
                  {...register(
                    `demanda.obligacion.${ index }`
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
              </Fragment>
            );
          }
        )}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append(
              {
                name: 'append',
              }
            );
          }}
        >
          append
        </button>

        <button
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
