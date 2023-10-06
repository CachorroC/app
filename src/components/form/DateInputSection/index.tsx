'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { FieldPath, useController, useFormContext } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { useState } from 'react';

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

  const [
    isInputDateSection,
    setIsInputDateSection
  ] = useState(
    initialValue?.toISOString()
      .slice(
        0, 10
      )
  );


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
    control, register
  } = useFormContext<IntCarpeta>();

  const {
    fieldState
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
      <input type="date" name={ name } className={form.textArea} defaultValue={ stringDateValue } placeholder={ name } />
      <p>{fieldState.isTouched && 'Touched'}</p>
      <input type='date' className={form.textArea}  {...register(
        name,  {
          valueAsDate: true,
          required   : true
        }
      )} />

      <p>{ fieldState.isDirty && 'Dirty' }</p>
      <input type='date' name={ name } className={form.textArea}  value={ isInputDateSection } onChange={ (
        e
      ) => {
        setIsInputDateSection(
          e.target.value
        );
      }} />
      <p>{fieldState.invalid
        ? 'invalid'
        : 'valid'}</p>

    </section>
  );
};
