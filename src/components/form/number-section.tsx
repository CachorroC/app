'use client';

import { IntCarpeta } from '#@/lib/types/carpetas';
import { type FieldPath,
  RegisterOptions,
  useFormContext,
  useController, } from 'react-hook-form';
import form from './form.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { NuevaCarpeta } from '#@/lib/types/raw-carpeta';

export const NumberSection = (
  {
    name,
    title,
    type,
    rls,
  }: {
    name: FieldPath<NuevaCarpeta | IntCarpeta>;
    title: string;
    type: 'number' | 'tel';
    rls?: Omit<
    RegisterOptions<NuevaCarpeta | IntCarpeta, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
  } 
) => {
          const {
            control 
          } = useFormContext<NuevaCarpeta | IntCarpeta>();

          const rules = rls ?? {
            required      : false,
            valuesAsNumber: true,
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
            <div className={layout.segmentRow}>
              <label
                className={`${ form.label } ${ typography.titleMedium }`}
                htmlFor={field.name}
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
                onChange={(
                  e 
                ) => {
                          field.onChange(
                            parseInt(
                              e.target.value 
                            ) 
                          );
                }}
              />
            </div>
          );
};
