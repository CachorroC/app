'use client';

import { IntCarpeta, NuevaCarpeta } from '#@/lib/types/carpetas';
import { FieldPath,
  RegisterOptions,
  useController,
  useFormContext, } from 'react-hook-form';
import form from './form.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import { useState, type HTMLInputTypeAttribute, useId } from 'react';
import layout from '#@/styles/layout.module.css';
import styles from './form.module.css';

export function InputSection(
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
) {
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

  const id = useId();

  if ( !propValues || propValues === null || propValues === undefined ) {
    isInCarpeta = false;
    console.log(
      `prop values is ${ propValues }`
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
    <div className={layout.sectionRow}>
      <label className={styles.switchBox}>
        <input
          className={styles.inputElement}
          name={`${ name }.hasProperty`}
          checked={hasProperty}
          type="checkbox"
          onChange={(
            e
          ) => {
            setHasProperty(
              e.target.checked
            );
          }}
        />
        <span className={styles.slider}></span>
      </label>
      { hasProperty && (
        <label
          className={ `${ form.label } ${ typography.titleMedium }` }
          htmlFor={ id + field.name }
        >
          { title }
          <input
            name={ field.name }
            id={id + field.name}
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
        </label>
      )}
      <pre> {JSON.stringify(
        fieldState, null, 2
      )}</pre>
    </div>
  );
}
