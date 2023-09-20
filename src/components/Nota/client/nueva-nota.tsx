'use client';
import { createNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import form from 'components/form/form.module.css';
import styles from 'components/form/checkbox/styles.module.css';

export const NuevaNota = (
    {
                    llaveProceso = '' 
    }: { llaveProceso?: string } 
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

      const pathname = usePathname();

      async function onCreate(
                  formData: FormData 
      ) {
        const res = await createNota(
                    formData 
        );
        setMessage(
                    res.message 
        );
      }

      return (
        <div className={form.container}>
          <form
            className={form.form}
            action={onCreate}
          >
            <section className={form.section}>
              <label
                htmlFor="llaveProceso"
                className={form.label}
              >
                {'Expediente'}
              </label>
              <input
                type="text"
                className={form.textArea}
                name="llaveProceso"
                defaultValue={llaveProceso}
              />
            </section>
            <input
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
            <input
              type="date"
              name="date"
              value={inputNota.date.toString()}
              onChange={(
                  e 
              ) => {
                    setInputNota(
                                {
                                                ...inputNota,
                                                date: e.target.value,
                                } 
                    );
              }}
            />
            <input
              type="text"
              name="pathname"
              defaultValue={pathname}
            />

            <label className={styles.switchBox}>
              <input
                className={styles.inputElement}
                name="done"
                defaultChecked={inputNota.done ?? false}
                type="checkbox"
              />
              <span className={styles.slider}></span>
            </label>
            <button type="submit">Add</button>
            <p>{message}</p>
          </form>
        </div>
      );
};
