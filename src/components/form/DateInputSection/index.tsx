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


  const [
    isInputDateSection,
    setIsInputDateSection
  ] = useState(
    stringDateValue
  );

  const {
    control, register
  } = useFormContext<IntCarpeta>();




  return (
    <section className={form.section}>
      <label
        className={`${ form.label } ${ typography.titleLarge }`}
        htmlFor={name}
      >
        {title}
      </label>
      <input type="date" name={ name } className={form.textArea} defaultValue={ stringDateValue } placeholder={ name } />

      <input type='date' className={form.textArea} defaultValue={dateValue.toString()} {...register(
        name,  {
          valueAsDate: true,
          required   : true
        }
      )} />

      <input type='date' name={ name } className={form.textArea}  value={ isInputDateSection } onChange={ (
        e
      ) => {
        setIsInputDateSection(
          e.target.value
        );
      }} />


    </section>
  );
};
