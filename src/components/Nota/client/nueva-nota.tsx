'use client';
import { createNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import form from 'components/form/form.module.css';
import styles from 'components/form/checkbox/styles.module.css';

export const NuevaNota= (
  {
    llaveProceso = ''
  }: {llaveProceso?: string}
) => {
  const {
    inputNota, setInputNota
  } = useNotaContext();


  const pathname = usePathname();

  return (
    <form className={form.form} action={createNota}>
      <input type="text" name="llaveProceso" defaultValue={llaveProceso} />
      <input type="text" name="nota" value={inputNota.text} onChange={(
        e
      ) => {
        setInputNota(
          {
            ...inputNota,
            text: e.target.value
          }
        );
      }}/>
      <input type="date" name="fecha" value={ inputNota.date ?? new Date()
            .toLocaleString() } onChange={ (
        e
      ) => {
        setInputNota(
          {
            ...inputNota,
            date: e.target.value
          }
        );

      }}/>
      <input type='text' name='pathname' defaultValue={ pathname } />

      <label className={styles.switchBox}>
        <input className={ styles.inputElement }name='done' defaultChecked={inputNota.done ?? false} type='checkbox'  />
        <span className={styles.slider}></span>
      </label>
      <button type="submit">Add</button>
    </form>
  );
};