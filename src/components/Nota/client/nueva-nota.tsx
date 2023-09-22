'use client';
import { createNota } from '#@/app/actions';
import { useNotaContext } from '#@/app/context/main-context';
import { usePathname, useRouter } from 'next/navigation';
import form from 'components/form/form.module.css';
import styles from 'components/form/checkbox/styles.module.css';

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
    router.push(
      `/Notas/${ res.id }`
    );
  }


  return (
    <div className={form.container}>
      <form
        className={ form.form }
        action={ onCreate }
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
        <section className={form.section}>
          <label
            htmlFor="cod"
            className={form.label}
          >
            {'Numero'}
          </label>
          <input
            type="number"
            className={form.textArea}
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
        <input
          type="text"
          className={form.textArea}
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
        <input
          type="date"
          name="date"
          className={form.textArea}
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
          className={form.textArea}
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
