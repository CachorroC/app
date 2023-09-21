'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { FieldPath, RegisterOptions, useFormContext } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import type { HTMLInputTypeAttribute } from 'react';

export const InputSection = (
  {
    name,
    title,
    type,
    rls,
  }: {
  name: FieldPath<IntCarpeta>;
  title: string;
  type: HTMLInputTypeAttribute;
  rls?: Omit<
    RegisterOptions<IntCarpeta, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
) => {
  const {
    register
  } = useFormContext<IntCarpeta>();

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
        type={type}
        placeholder={title}
        {...register(
          name, rules
        )}
      />
    </section>
  );
};
