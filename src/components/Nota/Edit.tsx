'use client';
import {  editNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { useEffect, useState } from 'react';
import styles from 'components/form/form.module.css';
import { Nota } from '@prisma/client';

export const Edit = (
  {
    nota
  }: { nota: Nota }
) => {
  const {
    inputNota, setInputNota
  } = useNotaContext();

  const [
            message,
            setMessage
  ] = useState<string>(
    ''
  );

  async function onCreate(
    formData: FormData
  ) {
    const res = await editNota(
      formData
    );
    setMessage(
      res.message
    );
  }

  useEffect(
    () => {
      setInputNota(
        nota
      );
    }, [
              nota,
              setInputNota
    ]
  );

  const inputMonth = String(
    inputNota.date.getMonth() + 1
  )
    .padStart(
      2, '0'
    );

  const inputDate = String(
    inputNota.date.getDate()
  )
    .padStart(
      2, '0'
    );

  return ( <div className={styles.container}>
    <form
      className={styles.form}
      action={onCreate}
    >
      <section className={ styles.section }>
        <label className={styles.label} htmlFor={'id'}>{'No.'}</label>
        <input
          className={styles.textArea}
          type="number"
          name="id"
          defaultValue={inputNota.id}
        />
      </section>
      <section className={styles.section}>
        <label className={styles.label} htmlFor={'llaveProceso'}>{'llaveProceso'}</label>
        <input
          className={styles.textArea}
          type="text"
          name="llaveProceso"
          defaultValue={inputNota.llaveProceso
            ? inputNota.llaveProceso
            : ''}
        />
      </section>
      <label className={styles.label} htmlFor={'text'}>{'Contenido'}</label>
      <input
        className={styles.textArea}
        type="text"
        name="text"
        value={inputNota.text}
        onChange={(
          e
        ) => {
          setInputNota(
            {
              ...inputNota,
              text: e.target.value,
            }
          );
        }}
      />
      <section className={styles.section}>
        <label className={styles.label} htmlFor={'date'}>{'Fecha'}</label>
        <input
          type="date"
          className={styles.textArea}
          name="date"
          defaultValue={`${ inputNota.date.getFullYear() }-${ inputMonth }-${ inputDate }`}
        />
      </section>
      <section className={styles.section}><label className={styles.label} htmlFor={'pathname'}>{'Ruta'}</label>
        <input
          type="text"
          className={styles.textArea}
          name="pathname"
          defaultValue={inputNota.pathname}
        /></section>
      <section className={styles.section}><label className={styles.label} htmlFor={'done'}>{'¿Revisada?'}</label>
        <label className={styles.switchBox}>
          <input
            className={styles.inputElement}
            name="done"
            required={true}
            defaultChecked={inputNota.done}
            type="checkbox"
          />
          <span className={styles.slider}></span>
        </label></section>
      <button type="submit">Add</button>
      <p>{message}</p>
    </form></div>
  );
};
