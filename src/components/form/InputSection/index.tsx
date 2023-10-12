'use client';

import { IntCarpeta, NuevaCarpeta } from '#@/lib/types/carpetas';
import { FieldPath,
  RegisterOptions,
  useController,
  useFormContext, } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import {  type HTMLInputTypeAttribute } from 'react';

export const InputSection = (
  {

    name,
    title,
    type,
    rls,
  }: {

  name: FieldPath<NuevaCarpeta | IntCarpeta>;
  title: string;
  type: HTMLInputTypeAttribute;
  rls?: Omit<
    RegisterOptions<NuevaCarpeta|IntCarpeta, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
) => {



  const {
    control, setValue
  } = useFormContext<NuevaCarpeta| IntCarpeta>();

  const rules = rls ?? {
    required: true,
  };

  const {
    field
  } = useController(
    {
      name,
      control,
      rules,
    }
  );
  return (
    <div className={ form.sectionRow } >
      <label
        className={`${ form.label } ${ typography.titleMedium }`}
        htmlFor={name}
      >
        {title}
      </label>
      <input
        name={field.name}
        value={ field.value }
        ref={field.ref}
        type={type}
        placeholder={title}
        className={form.textArea}
        onChange={(
          e
        ) => {
          field.onChange(
            e.target.value
          );

          setValue(
            name, e.target.value
          );
        }}
      />
    </div>
  );
};
