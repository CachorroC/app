'use client';

import { IntCarpeta, NuevaCarpeta } from '#@/lib/types/carpetas';
import { FieldPath,
  RegisterOptions,
  useController,
  useFormContext, } from 'react-hook-form';
import form from './form.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { useState, type HTMLInputTypeAttribute } from 'react';
import layout from '#@/styles/layout.module.css';
import styles from './form.module.css';

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
    RegisterOptions<NuevaCarpeta | IntCarpeta, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}
) => {
  const {
    control, getValues
  } = useFormContext<NuevaCarpeta | IntCarpeta>();

  const rules = rls ?? {
    required: false,
  };

  const propValues = getValues(
    name
  );

  let isInCarpeta;

  if ( !propValues || propValues === null || propValues === undefined ) {
    isInCarpeta = false;
    console.log(
      propValues
    );
  } else {
    isInCarpeta = true;
  }

  const [
    hasProperty,
    setHasProperty
  ] = useState(
    isInCarpeta
  );

  const {
    field, fieldState
  } = useController(
    {
      name,
      control,
      rules,
    }
  );
  return (
    <div className={ layout.segmentRow }>
      <label
        className={ `${ form.label } ${ typography.titleMedium }` }
        htmlFor={ name }
      >
        { title }
      </label>
      <div>
        <label className={styles.switchBox}>
          <input
            className={styles.inputElement}
            checked={hasProperty}
            type="checkbox"
            onChange={ (
              e
            ) => {
              setHasProperty(
                e.target.checked
              );
            }}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      { hasProperty && (

        <input
          name={ field.name }
          value={ field.value ?? '' }
          ref={ field.ref }
          type={ type }
          placeholder={ title }
          className={ form.textArea }
          onChange={ (
            e
          ) => {
            field.onChange(
              e.target.value
            );
          } } />

      ) }
      {
        JSON.stringify(
          fieldState, null, 2
        )
      }
    </div>
  );
};
