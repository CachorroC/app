'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { FieldPath, RegisterOptions, useFormContext } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { useState } from 'react';

export const DateInputSection = (
  {
    name,
    title,
    initialValue,

    rls,
  }: {
  name: FieldPath<IntCarpeta>;
      title: string;
      initialValue?: Date;
  rls?: Omit<
    RegisterOptions<IntCarpeta, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
) => {
  const {
    register
  } = useFormContext<IntCarpeta>();

  const [inputValue, setInputValue] = useState()

  const rules = rls ?? {
    required: false,
  };

  return (
    <section className={form.section}>
      <label
        className={`${ form.label } ${ typography.titleLarge }`}
        htmlFor={name}
      >
        {title}
      </label>
      <input
        key={name}
        className={form.textArea}
        type={'date'}
        placeholder={ title }
        value={}
        onChange={}
      />
    </section>
  );
};
