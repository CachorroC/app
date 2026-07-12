'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import type { FieldGroup } from '#@/memoriales/manifests/types';
import { getPath } from '#@/memoriales/lib/get-path';
import { Field } from '../field';
import styles from './fieldset.module.css';

interface FieldsetProps {
  group      : FieldGroup;
  pathPrefix?: string;
  disabled?  : boolean;
}

export function Fieldset( {
  group, pathPrefix, disabled 
}: FieldsetProps ) {
  const {
    control 
  } = useFormContext();
  const values = useWatch( {
    control,
  } ) as Record<string, unknown>;

  const booleanField = group.fields.find( ( field ) => {
    return field.type === 'boolean';
  } );
  const gateName = booleanField
    ? pathPrefix
      ? `${ pathPrefix }.${ booleanField.name }`
      : booleanField.name
    : undefined;
  const gateValue = gateName
    ? !!getPath(
        values, gateName 
      )
    : true;

  return (
    <fieldset
      disabled={disabled}
      className={styles.fieldset}
    >
      <legend className={styles.legend}>{group.legend}</legend>
      {group.fields.map( ( field ) => {
        if ( field.derived ) {
          return null;
        }

        if ( field.type === 'stringList' && booleanField && !gateValue ) {
          return null;
        }

        const name = pathPrefix
          ? `${ pathPrefix }.${ field.name }`
          : field.name;

        return (
          <Field
            key={field.name}
            name={name}
            field={field}
            disabled={disabled}
          />
        );
      } )}
    </fieldset>
  );
}
