'use client';

import { NuevaCarpeta } from '#@/lib/types/carpetas';
import { FieldPath,
  RegisterOptions,

  useController,

  useFormContext, } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { useState, type HTMLInputTypeAttribute } from 'react';

export const InputSection = (
  {
    name,
    title,
    type,
    rls,
  }: {
  name: FieldPath<NuevaCarpeta>;
  title: string;
  type: HTMLInputTypeAttribute;
  rls?: Omit<
    RegisterOptions<NuevaCarpeta, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
) => {
  const [
    fieldValue,
    setFieldValue
  ] = useState(
    ''
  );

  const {
    control, setValue
  } = useFormContext<NuevaCarpeta>();


  const rules = rls ?? {
    required: true,
  };

  const {
    field
  } = useController(
    {
      name,
      control,
      rules
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
        name={ field.name }
        value={fieldValue}
        type={type}
        placeholder={title}
        className={ form.textArea }

        onChange={(
          e
        ) => {
          field.onChange(
            e.target.value
          );

          setValue(
            name, e.target.value
          );
          setFieldValue(
            e.target.value
          );
        }}

      />
    </section>
  );
};
