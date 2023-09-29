'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { FieldPath, useController, useFormContext } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';

export const DateInputSection = (
  {
    name,
    title,
    initialValue,

  }: {
  name: FieldPath<IntCarpeta>;
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


  const stringDateValue = dateValue.toISOString()
    .slice(
      0,  10
    );


  const {
    control
  } = useFormContext<IntCarpeta>();

  const {
    field, fieldState
  } = useController(
    {
      name,
      control,
      defaultValue: stringDateValue
    }
  );




  return (
    <section className={form.section}>
      <label
        className={`${ form.label } ${ typography.titleLarge }`}
        htmlFor={name}
      >
        {title}
      </label>
      <input type="date" { ...field } placeholder={ name } />
      <p>{fieldState.isTouched && 'Touched'}</p>
      <p>{fieldState.isDirty && 'Dirty'}</p>
      <p>{fieldState.invalid
        ? 'invalid'
        : 'valid'}</p>

    </section>
  );
};
