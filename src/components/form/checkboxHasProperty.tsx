'use client';
import { useState } from 'react';
import { KeyOfCarpeta, MonCarpeta } from '../../lib/types/carpetas';
import styles from './form.module.css';
import { useFormContext } from 'react-hook-form';

export function CheckboxHasProperty(
  {
    keyOfCarpeta, carpeta
  }: { keyOfCarpeta: KeyOfCarpeta; carpeta: MonCarpeta }
) {
  let isInCarpeta;

  const propertieValue = carpeta[ keyOfCarpeta ];

  if ( !propertieValue || propertieValue === null || propertieValue === undefined ) {
    isInCarpeta = false;
    console.log(
      propertieValue 
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
    register
  } = useFormContext<MonCarpeta>();
  return (
    <>
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
      { hasProperty && (
        <input {...register(
          keyOfCarpeta
        )} />
      ) }
      {JSON.stringify(
        propertieValue, null, 2
      )}
    </>

  );

}