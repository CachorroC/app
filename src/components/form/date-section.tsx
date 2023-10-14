'use client';

import { NuevaCarpeta } from '#@/lib/types/carpetas';
import { FieldPath, useController, useFormContext } from 'react-hook-form';
import form from './form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { InputDateHelper } from '#@/lib/project/date-helper';
import { useState } from 'react';

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

  console.log(
    dateValue 
  );

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
    field 
  } = useController(
    {
      name,
      defaultValue: stringDateValue,
      control,
      rules,
    } 
  );
  return (
    <section className={form.sectionRow}>
      <label
        className={`${ form.label } ${ typography.titleLarge }`}
        htmlFor={name}
      >
        {title}
      </label>
      <input
        type="date"
        name={field.name}
        className={form.textArea}
        value={InputDateHelper(
          stringDateValue 
        )}
        onChange={(
          e 
        ) => {
          console.log(
            e.target.valueAsDate 
          );

          const [
            yearStringer,
            monthStringer,
            dayStringer
          ]
            = e.target.value.split(
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
        }}
      />
    </section>
  );
};
