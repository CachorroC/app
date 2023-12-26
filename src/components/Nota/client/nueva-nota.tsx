'use client';
import { useParams, usePathname } from 'next/navigation';
import styles from 'components/form/form.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { NotasWatcher } from '#@/app/Carpeta/[numero]/notaswatcher';
import { Nota } from '@prisma/client';

export const NuevaNota = (
  {
    id 
  }: { id?: number } 
) => {
          const newNota: Nota = {
            title        : 'Nueva Nota',
            content      : 'contenido de una nueva nota',
            pathname     : '/',
            date         : new Date(),
            carpetaNumero: 0,
            createdAt    : new Date(),
            updatedAt    : new Date(),
            id           : id
              ? id
              : 0,
          };

          const params = useParams();

          const {
            register,
            reset,
            getValues,
            setFocus,
            setValue,
            setError,
            control,
            handleSubmit,
          } = useForm<Nota>(
            {
              defaultValues   : newNota,
              shouldFocusError: true,
              criteriaMode    : 'all',
            } 
          );

          const [
            inputNota,
            setInputNota 
          ] = useState(
            getValues() 
          );

          const {
            numero 
          } = params;

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

          /*
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
      `/Notas/id/${ res.id }`
    );
  }
 */
          const onSubmit: SubmitHandler<Nota> = async (
            formNota 
          ) => {
                    try {
                      const request = await fetch(
                        '/api/Notas/Nueva', {
                          method : 'POST',
                          headers: {
                            'content-type': 'application/json',
                          },
                          body: JSON.stringify(
                            {
                              ...inputNota,
                              ...formNota,
                            } 
                          ),
                        } 
                      );
                      alert(
                        JSON.stringify(
                          request.status, null, 2 
                        ) 
                      );

                      if ( request.status > 200 ) {
                        setError(
                          'root.serverError', {
                            type: request.statusText,
                          } 
                        );
                      }

                      const updatedNota = await request.json();

                      alert(
                        JSON.stringify(
                          updatedNota, null, 2 
                        ) 
                      );
                    } catch ( error ) {
                      alert(
                        JSON.stringify(
                          error, null, 2 
                        ) 
                      );
                    }
          };

          const pathname = usePathname();

          useEffect(
            () => {
                      reset(
                        {
                          pathname     : pathname,
                          carpetaNumero: Number(
                            numero 
                          ),
                        } 
                      );
                      setFocus(
                        'title' 
                      );
            }, [
              numero,
              pathname,
              reset,
              setFocus 
            ] 
          );

          return (
            <div className={styles.container}>
              <form
                className={styles.form}
                onSubmit={handleSubmit(
                  onSubmit 
                )}
              >
                <h1 className={typography.displayLarge}>Nueva Nota</h1>
                <section className={layout.sectionColumn}>
                  <section className={layout.segmentRow}>
                    <section className={layout.sectionRow}>
                      <label
                        htmlFor="carpetaNumero"
                        className={styles.label}
                      >
                        {'carpeta asociada'}
                      </label>
                      <input
                        type="number"
                        className={styles.textArea}
                        {...register(
                          'carpetaNumero' 
                        )}
                      />
                    </section>
                    <section className={layout.sectionRow}>
                      <label
                        htmlFor="date"
                        className={styles.label}
                      >
                Fecha
                      </label>

                      <input
                        type="date"
                        name="dte"
                        className={styles.textArea}
                        value={`${ inputNota.date.getFullYear() }-${ inputMonth }-${ inputDate }`}
                        onChange={(
                          e 
                        ) => {
                                  const [
                                    yearStringer,
                                    monthStringer,
                                    dayStringer 
                                  ]
                    = e.target.value.split(
                      '-' 
                    );

                                  const newYear = Number(
                                    yearStringer 
                                  );

                                  const newMonth = Number(
                                    monthStringer 
                                  ) - 1;

                                  const newDay = Number(
                                    dayStringer 
                                  );
                                  setInputNota(
                                    {
                                      ...inputNota,
                                      date: new Date(
                                        newYear, newMonth, newDay 
                                      ),
                                    } 
                                  );
                                  setValue(
                                    'date', new Date(
                                      newYear, newMonth, newDay 
                                    ) 
                                  );
                        }}
                      />
                    </section>
                  </section>

                  <section className={layout.sectionRow}>
                    <label
                      htmlFor="title"
                      className={styles.label}
                    >
                      {'Nota:'}
                    </label>
                    <input
                      type="text"
                      className={styles.textArea}
                      {...register(
                        'title', {
                          required: true,
                        } 
                      )}
                    />
                  </section>

                  <section className={layout.segmentRow}>
                    <button type="submit">Add</button>
                  </section>
                </section>
              </form>

              <NotasWatcher control={control} />
            </div>
          );
};
