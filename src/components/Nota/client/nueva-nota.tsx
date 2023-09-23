'use client';
import { createNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { usePathname, useRouter } from 'next/navigation';
import styles from 'components/form/form.module.scss';
import typography from '#@/styles/fonts/typography.module.scss';

export const NuevaNota = (
  {
    llaveProceso = '', cod
  }: { llaveProceso?: string; cod: number }
) => {
  const {
    inputNota, setInputNota
  } = useNotaContext();

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



  const pathname = usePathname();

  const router = useRouter();

  async function onCreate(
    formData: FormData
  ) {
    const res = await createNota(
      formData
    );
    alert(
      res.message
    );
    router.replace(
      `/Notas/${ res.id }`
    );
  }


  return (
    <div className={styles.container}>
      <form
        className={ styles.form }
        action={ onCreate }
      >
        <h1 className={typography.displayLarge}>Nueva Nota</h1>
        <section className={styles.section}>
          <section className={styles.section}>
            <label
              htmlFor="llaveProceso"
              className={styles.label}
            >
              {'Expediente'}
            </label>
            <input
              type="text"
              className={styles.textArea}
              name="llaveProceso"
              defaultValue={llaveProceso}
            />
          </section>
          <section className={styles.section}>
            <label
              htmlFor="cod"
              className={styles.label}
            >
              {'Numero'}
            </label>
            <input
              type="number"
              className={styles.textArea}
              name="cod"
              value={ cod }
              onChange={ (
                e
              ) => {
                setInputNota(
                  {
                    ...inputNota,
                    cod: Number(
                      e.target.value
                    )
                  }
                );
              }}
            />
          </section>
        </section>
        <section className={ styles.section }>
          <label htmlFor='text' className={styles.label}>{'Nota:'}</label>
          <input
            type="text"
            className={styles.textArea}
            name="text"
            value={inputNota.text}
            onChange={
              (
                e
              ) => {
                setInputNota(
                  {
                    ...inputNota,
                    text: e.target.value,
                  }
                );
              }
            }
          />
        </section>
        <input
          type="date"
          name="date"
          className={styles.textArea}
          value={ `${ inputNota.date.getFullYear() }-${ inputMonth }-${ inputDate }` }
          onChange={(
            e
          ) => {
            setInputNota(
              {
                ...inputNota,
                date: new Date(
                  e.target.value
                )
              }
            );
          }}

        />
        <input
          type="text"
          className={styles.textArea}
          name="pathname"
          defaultValue={pathname}
        />

        <label className={styles.switchBox}>
          <input
            type="checkbox"
            className={styles.inputElement}
            name="done"
            checked={inputNota.done}
            onChange={(
              e
            ) => {
              setInputNota(
                {
                  ...inputNota,
                  done: e.target.checked
                }
              );
            }}
          />
          <span className={styles.slider}></span>
        </label>
        <button type="submit">Add</button>

      </form>
    </div>
  );
};
