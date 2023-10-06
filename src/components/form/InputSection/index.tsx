'use client';

import { NuevaCarpeta, NuevaCarpetaKeys } from '#@/lib/types/carpetas';
import { FieldPath, RegisterOptions, useFormContext } from 'react-hook-form';
import form from '../form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import type { HTMLInputTypeAttribute } from 'react';
import { useCarpetaFormContext } from '#@/app/context/carpeta-form-context';

export const InputSection = (
  {
    name,
    title,
    type,
    rls,
  }: {
  name: NuevaCarpetaKeys;
  title: string;
  type: HTMLInputTypeAttribute;
  rls?: Omit<
    RegisterOptions<NuevaCarpeta, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
) => {
  const {
    register
  } = useFormContext<NuevaCarpeta>();

  const {
    nuevaCarpeta, setNuevaCarpeta
  } = useCarpetaFormContext();

  function handleChange(
    e
  ) {
    setNuevaCarpeta(
      {
        ...nuevaCarpeta,
        [ e.target.name ]: e.target.value
      }
    );
  }


  const rules = rls ?? {
    required: true,
  };

  return (
    <section className={form.section}>
      <label
        className={`${ form.label } ${ typography.titleLarge }`}
        htmlFor={name}
      >
        {title}
      </label>
      <input name={name} value={nuevaCarpeta[ name ]} onChange={handleChange}/>
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
