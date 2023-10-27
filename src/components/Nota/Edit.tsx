'use client';
import { editNota } from '#@/app/actions';
import { useState } from 'react';
import styles from 'components/form/form.module.css';
import layout from '#@/styles/layout.module.css';
import { Nota } from '@prisma/client';

export const Edit = (
  {
    nota
  }: { nota: Nota }
) => {
  const [
    inputNota,
    setInputNota
  ] = useState(
    nota
  );

  const [
    message,
    setMessage
  ] = useState<string>(
    ''
  );

  const dateString = inputNota.date.toISOString()
    .slice(
      0, 10
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

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        action={onCreate}
      >
        <section className={layout.sectionRow}>
          <label
            className={styles.label}
            htmlFor={'id'}
          >
            {'No.'}
          </label>
          <input
            className={styles.textArea}
            type="text"
            name="id"
            defaultValue={nota.id}
          />
        </section>
        <section className={layout.sectionRow}>
          <label
            className={styles.label}
            htmlFor={'llaveProceso'}
          >
            {'llaveProceso'}
          </label>
          <input
            className={styles.textArea}
            type="number"
            name="llaveProceso"
            defaultValue={inputNota.carpetaNumero
              ? inputNota.carpetaNumero
              : ''}
          />
        </section>
        <label
          className={styles.label}
          htmlFor={'text'}
        >
          {'Nota:'}
        </label>
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

        <section className={layout.sectionRow}>
          <label
            className={styles.label}
            htmlFor={'date'}
          >
            {'Fecha controlled'}
          </label>
          <input
            type="date"
            className={styles.textArea}
            name="date"
            value={dateString}
            onChange={(
              e
            ) => {
              setInputNota(
                {
                  ...inputNota,
                  date: new Date(
                    e.target.value
                  ),
                }
              );
            }}
          />
          <p>{dateString}</p>
        </section>
        <section className={layout.sectionRow}>
          <label
            className={styles.label}
            htmlFor={'done'}
          >
            {'¿Revisada?'}
          </label>
          {/*  <label className={styles.switchBox}>
            <input
              className={styles.inputElement}
              name="done"
              checked={inputNota.pathname}
              onChange={(
                e
              ) => {
                setInputNota(
                  {
                    ...inputNota,
                    done: e.target.checked,
                  }
                );
              }}
              type="checkbox"
            />
            <span className={styles.slider}></span>
          </label> */}
        </section>
        <button type="submit">Add</button>
        <p>{message}</p>
      </form>
    </div>
  );
};
