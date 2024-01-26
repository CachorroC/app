'use client';
import styles from 'components/Form/form.module.css';
import typography from '#@/styles/fonts/typography.module.css';
import layout from '#@/styles/layout.module.css';
import { ChangeEvent, } from 'react';
import { InputDateHelper } from '#@/lib/project/date-helper';
import { useNuevaNotaContext } from '#@/app/Notas/nueva-nota-form-context';
import { addNotaToMongo, addNotaToPrisma } from '#@/app/Notas/actions';
import { NewNota } from '#@/lib/types/notas';
import { usePathname } from 'next/navigation';

export const NuevaNota = () => {
          const pathname = usePathname();

          const {
            notaFormState, setNotaFormState
          } = useNuevaNotaContext();




          function handleStringChange(
            e: ChangeEvent<HTMLInputElement| HTMLSelectElement>
          ) {
                return setNotaFormState(
                  {
                    ...notaFormState,
                    [ e.target.name ]: String(
                      e.target.value
                    )
                  }
                );
          }

          function handleNumericChange (
            e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
          ) {

                return setNotaFormState(
                  {
                    ...notaFormState,
                    [ e.target.name ]: Number(
                      e.target.value
                    )
                  }
                );
          }



          async function createNoteInDatabase () {


                const newDater = new Date();

                const sender = await addNotaToPrisma(
                  notaFormState
                );

                const adder = await addNotaToMongo(
                  notaFormState
                );

                if ( adder.success ) {
                  alert(
                    `se ingresó la informacion a la base de datos in prisma ${ adder.data }`
                  );
                } else {
                  alert(
                    `error, no se pudo ingresar la forma a la base de dato in prismas ${ adder.data }`
                  );
                }

                if ( sender.success ) {
                  alert(
                    `se ingresó la informacion a la base de datos ${ sender.data }`
                  );
                } else {
                  alert(
                    `error, no se pudo ingresar la forma a la base de datos ${ sender.data }`
                  );
                }

                if ( !adder.success || !sender.success ) {
                  return setNotaFormState(
                    {
                      ...notaFormState
                    }
                  );
                }

                const newFactura:NewNota = {
                  text         : '',
                  done         : false,
                  content      : [ '' ],
                  carpetaNumero: null,
                  dueDate      : new Date(
                    newDater.getFullYear(), newDater.getMonth(), newDater.getDate()
                  ),
                  extraContent: null,
                  pathname    : pathname
                };
                return setNotaFormState(
                  {
                    ...newFactura,
                  }
                );
          }

          return (
            <>
              <form
                className={ styles.container }
                action={createNoteInDatabase}
              >
                <h1 className={typography.displayLarge}>Nueva Nota</h1>
                <section className={layout.sectionColumn}>
                  <section className={layout.sectionRow}>
                    <label
                      htmlFor="carpetaNumero"
                      className={styles.label}
                    >
                      {'carpeta'}
                    </label>
                    <input
                      type="number"
                      className={styles.textArea}
                      name='carpetaNumero'
                      value={ notaFormState.carpetaNumero ?? '' }
                      onChange={handleNumericChange}
                    />
                  </section>
                  <section className={layout.sectionRow}>
                    <label
                      htmlFor="dueDate"
                      className={styles.label}
                    >
                Fecha
                    </label>

                    <input
                      type="date"
                      name="dueDate"
                      className={styles.textArea}
                      value={InputDateHelper(
                        notaFormState.dueDate
                      )}
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


                                setNotaFormState(
                                  {
                                    ...notaFormState,
                                    dueDate: new Date(
                                      `${ yearStringer }-${ monthStringer }-${ dayStringer }`
                                    ),
                                  }
                                );

                      }}
                    />
                  </section>
                  <section className={layout.sectionRow}>
                    <label
                      htmlFor="text"
                      className={styles.label}
                    >
                      {'Nota'}
                    </label>
                    <input
                      type="text"
                      className={styles.textArea}
                      name='text'
                      value={ notaFormState.text }
                      onChange={handleStringChange}
                    />
                  </section>
                  <section className={layout.sectionRow}>
                    <label
                      htmlFor="content"
                      className={styles.label}
                    >
                      {'notas adicionales'}
                    </label>
                    <input
                      type="text"
                      className={styles.textArea}
                      name='content'
                      value={ notaFormState.content ?? ''}
                      onChange={handleStringChange}
                    />
                  </section>
                  <section className={layout.segmentRow}>
                    <button type="submit">Add</button>
                  </section>
                </section>
              </form>
            </>
          );
};
