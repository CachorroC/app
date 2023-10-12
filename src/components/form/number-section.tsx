'use client';

import { IntCarpeta, NuevaCarpeta } from '#@/lib/types/carpetas';
import {
  type FieldPath,
  RegisterOptions,
  useController,
  useFormContext,
} from 'react-hook-form';
import form from './form.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { type HTMLInputTypeAttribute } from 'react';

export const NumberSection = ({
  name,
  title,
  type: 'number' | 'tel';
  rls,
}: {
  name: FieldPath<NuevaCarpeta | IntCarpeta>;
  title: string;
  rls?: Omit<
    RegisterOptions<NuevaCarpeta | IntCarpeta, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}) => {
  const { control, setValue } = useFormContext<NuevaCarpeta | IntCarpeta>();

  const rules = rls ?? {
    required: false,
  };

  const { field } = useController({
    name,
    control,
    rules,
  });
  return (
    <div className={form.sectionRow}>
      <label
        className={`${form.label} ${typography.titleMedium}`}
        htmlFor={name}
      >
        {title}
      </label>
      <input
        name={field.name}
        value={field.value}
        ref={field.ref}
        type={type}
        placeholder={title}
        className={form.textArea}
        onChange={(e) => {
          field.onChange(Number(e.target.value));

          setValue(name, Number(e.target.value));
        }}
      />
    </div>
  );
};
