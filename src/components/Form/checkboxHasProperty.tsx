'use client';
import { useState } from 'react';
import styles from './form.module.css';
import { useFormContext } from 'react-hook-form';
import { KeyOfCarpeta, MonCarpeta } from '#@/lib/types/carpetas';
import { useCarpetaFormContext } from '../../app/Context/carpeta-form-context';

export function CheckboxHasProperty( {
  keyOfCarpeta,
}: {
  keyOfCarpeta: KeyOfCarpeta;
} ) {
  const {
    carpetaFormState 
  } = useCarpetaFormContext();

  let isInCarpeta;

  const propertieValue = carpetaFormState[ keyOfCarpeta ];

  if (
    !propertieValue
    || propertieValue === null
    || propertieValue === undefined
  ) {
    isInCarpeta = false;
    console.log( `propertie value is ${ propertieValue }` );
  } else {
    isInCarpeta = true;
  }

  const [
    hasProperty,
    setHasProperty
  ] = useState( isInCarpeta );

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
          onChange={( e ) => {
            setHasProperty( e.target.checked );
          }}
        />
        <span className={styles.slider}></span>
      </label>
      {hasProperty && <input {...register( keyOfCarpeta )} />}
      {JSON.stringify(
        propertieValue, null, 2 
      )}
    </>
  );
}
