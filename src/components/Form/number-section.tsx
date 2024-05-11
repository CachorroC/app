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
import { useCarpetaFormContext } from '#@/app/Context/carpeta-form-context';

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
    carpetaFormState, setCarpetaFormState 
  } = useCarpetaFormContext();

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
        value={String(
          field.value 
        ) ?? undefined}
        ref={field.ref}
        type={type}
        placeholder={title}
        className={form.textArea}
        onChange={(
          e 
        ) => {
          setCarpetaFormState(
            {
              ...carpetaFormState,
              [ name ]: e.target.value,
            } 
          );
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

export function NewNumberSection(
  {
    name,
    title,
  }: {
  name: 'id' | 'idProcesos' | 'idRegUltimaAct' | 'numero';
  title: string;
} 
) {
  const {
    carpetaFormState, setCarpetaFormState 
  } = useCarpetaFormContext();
  return (
    <div className={layout.sectionRow}>
      <label
        className={`${ form.label } ${ typography.titleMedium }`}
        htmlFor={name}
      >
        {title}
      </label>
      <input
        name={name}
        value={String(
          carpetaFormState[ name ] 
        ) ?? ''}
        type="number"
        placeholder={title}
        className={form.textArea}
        onChange={(
          e 
        ) => {
          return setCarpetaFormState(
            {
              ...carpetaFormState,
              [ name ]: Number(
                e.target.value 
              ),
            } 
          );
        }}
      />
    </div>
  );
}
