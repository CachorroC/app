'use client';
import { intNotaFormValues, intNota } from 'types/notas';
import { usePathname } from 'next/navigation';
import { useState, Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import note from '../note.module.css';
import typography from '#@/styles/fonts/typography.module.scss';
import { Accordion } from 'components/Accordion';

export function NewNota(
  {
    llaveProceso
  }: { llaveProceso: string }
) {
  const pathname = usePathname();

  const {
    register,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm<intNotaFormValues>(
    {
      defaultValues: {
        nota  : 'Ingresa tu nota',
        tareas: [],
      },
      mode: 'onBlur',
    }
  );

  const {
    fields, append, remove
  } = useFieldArray(
    {
      name: 'tareas',
      control,
    }
  );

  const onSubmit = async (
    data: intNotaFormValues
  ) => {
    const newData: intNota = {
      ...data,
      llaveProceso: llaveProceso,
      pathname    : pathname,
      fecha       : new Date()
            .toLocaleString(),
    };

    alert(
      JSON.stringify(
        newData
      )
    );

    const postNewNote = await fetch(
      `/api/Notas/${ llaveProceso }`, {
        method : 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          newData
        ),
      }
    );

    const responsePostNewNote = await postNewNote.json();
    alert(
      responsePostNewNote
    );

    return responsePostNewNote;
  };

  const [
    isActive,
    setIsActive
  ] = useState(
    false
  );

  return (
    <div className={note.container}>
      <form className={note.form} onSubmit={handleSubmit(
        onSubmit
      )}>
        <div className={note.section}>
          <label
            htmlFor="nota"
            className={`${ note.label } ${ typography.titleMedium }`}
          >
            Nota
          </label>
          <input
            type="text"
            placeholder="agregue su nota"
            id="nota"
            className={note.textArea}
            {...register(
              'nota', {
                required: true,
              }
            )}
          />
        </div>
        <Accordion>
          {fields.map(
            (
              field, index
            ) => {
              const watchIsDone = watch(
                `tareas.${ index }.isDone`
              );

              return (
                <Fragment key={field.id}>
                  <div className={note.section} key={field.id}>
                    <label
                      htmlFor={`tareas.${ index }.tarea`}
                      key={field.id}
                      className={note.label}
                    >
                    Tarea:
                    </label>
                    <input
                      type="text"
                      placeholder="tarea"
                      key={field.id}
                      {...register(
                        `tareas.${ index }.tarea`, {}
                      )}
                      className={note.textArea}
                      defaultValue={field.tarea}
                    />
                  </div>
                  <div className={note.section}>
                  2
                    <p className={note.label}>
                      {watchIsDone
                        ? '¡ tarea completa !'
                        : '¿ completar tarea ?'}
                    </p>
                    <button
                      type="button"
                      className={note.button}
                      onClick={() => {
                        setValue(
                          `tareas.${ index }.isDone`,
                          watchIsDone
                            ? false
                            : true,
                        );
                      }}
                    >
                      <span className="material-symbols-outlined">
                        {watchIsDone
                          ? 'check_box'
                          : 'check_box_outline_blank'}
                      </span>
                    </button>
                  </div>
                  <div className={note.section}>
                    <label
                      htmlFor={`tareas.${ index }.dueDate`}
                      className={note.label}
                    >
                      {'Para cuándo es?:'}
                    </label>
                    <input
                      type="date"
                      className={note.textArea}
                      placeholder={`tareas.${ index }.dueDate`}
                      {...register(
                        `tareas.${ index }.dueDate`, {}
                      )}
                    />
                  </div>
                  <div className={note.buttonsRow}>
                    <button
                      className={note.submitButton}
                      type="button"
                      onClick={() => {
                        return remove(
                          index
                        );
                      }}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <button
                      type="button"
                      className={note.submitButton}
                      onClick={() => {
                        return append(
                          {
                            tarea  : '',
                            isDone : false,
                            dueDate: new Date()
                                  .toISOString(),
                          }
                        );
                      }}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </Fragment>
              );
            }
          )}
        </Accordion>

        <div className={note.section}>
          <button type="submit" className={note.submitButton}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
