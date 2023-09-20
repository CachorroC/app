'use client';
import {  editNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { useEffect, useState } from 'react';
import form from 'components/form/form.module.css';
import styles from 'components/form/checkbox/styles.module.css';
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

      async function onCreate() {
        const res = await editNota(
                    inputNota
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

      return (
        <form
          className={form.form}
          action={onCreate}
        >
          <input
            type="number"
            name="id"
            defaultValue={inputNota.id}
          />
          <input
            type="text"
            name="llaveProceso"
            defaultValue={inputNota.llaveProceso ?? ''}
          />
          <input
            type="text"
            name="nota"
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
          <input
            type="date"
            name="fecha"
            value={inputNota.date.toString()}
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
          <input
            type="text"
            name="pathname"
            defaultValue={inputNota.pathname}
          />

          <label className={styles.switchBox}>
            <input
              className={styles.inputElement}
              name="done"
              defaultChecked={inputNota.done}
              type="checkbox"
            />
            <span className={styles.slider}></span>
          </label>
          <button type="submit">Add</button>
          <p>{message}</p>
        </form>
      );
};
