'use client';

import { FieldPath, useController, useFormContext } from 'react-hook-form';
import form from './form.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { InputDateHelper } from '#@/lib/project/date-helper';
import { useState } from 'react';
import layout from '#@/styles/layout.module.css';
import { NuevaCarpeta } from '#@/lib/types/raw-carpeta';

export const DateInputSection = (
  {
    name,
    title,
    initialValue,
  }: {
    name: FieldPath<NuevaCarpeta>;
    title: string;
    initialValue?: Date;
  }
) => {
          const dateValue = initialValue
            ? initialValue
            : new Date();

          const [
            stringDateValue,
            setStringDateValue
          ] = useState(
            dateValue
          );

          const {
            control, setValue
          } = useFormContext();

          const rules = {
            required: false,
          };

          const {
            field, fieldState
          } = useController(
            {
              name,
              defaultValue: stringDateValue,
              control,
              rules,
            }
          );
          return (
            <><section className={ layout.segmentRow }>
              <label
                className={ `${ form.label } ${ typography.titleLarge }` }
                htmlFor={ name }
              >
                { title }
              </label>
              <input
                type="date"
                name={ field.name }
                className={ form.textArea }
                value={ InputDateHelper(
                  stringDateValue
                ) }
                onChange={ (
                  e
                ) => {
                          console.log(
                            `onChange new value for date-section: ${ e.target.valueAsDate }`
                          );

                          const [
                            yearStringer,
                            monthStringer,
                            dayStringer
                          ] = e.target.value.split(
                            '-'
                          );

                          const newYear = Number(
                            yearStringer
                          );

                          const newMonth = Number(
                            monthStringer
                          ) - 1;

                          const newDay = Number(
                            dayStringer
                          );
                          field.onChange(
                            e.target.value
                          );
                          setValue(
                            name, e.target.value
                          );
                          setStringDateValue(
                            new Date(
                              newYear, newMonth, newDay
                            )
                          );
                } } />
            </section><pre>
              { JSON.stringify(
                fieldState, null, 2
              ) }
            </pre></>
          );
};
