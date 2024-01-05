'use client';
import { useState } from 'react';
import { useDispatchTasks } from './TasksContext';
import { createUser } from './actions';
import { IntTask } from '#@/lib/types/carpetas';
import typography from '#@/styles/fonts/typography.module.css';
import { InputDateHelper, OutputDateHelper } from '#@/lib/project/date-helper';
import styles from './styles.module.css';
import layout from '#@/styles/layout.module.css';

export function AddTask(
  {
    carpetaNumero
  }: { carpetaNumero?: number }
) {
      const [ taskState, setTaskState ] = useState<IntTask>(
        {
          text         : '',
          done         : false,
          content      : [ 'contenido' ],
          dueDate      : null,
          carpetaNumero: carpetaNumero
            ? carpetaNumero
            : null,
        }
      );

      const dispatchTasks = useDispatchTasks();

      async function createTask(
        formData: FormData
      ) {
            for ( const contenido of taskState.content ) {
              formData.append(
                'content', contenido
              );
            }



            const user = await createUser(
              formData
            );

            console.log(
              user
            );
            setTaskState(
              {
                ...taskState,
                text: '',
              }
            );
            return dispatchTasks(
              {
                type: 'added',
                task: user,
              }
            );
      }

      return (
        <>
          <form action={ createTask } className={styles.container}>
            <fieldset>
              <legend>Agregar Tarea</legend>
              <section className={ layout.sectionRow }>
                <label
                  className={`${ styles.label } ${ typography.titleMedium }`}
                  htmlFor={'text'}
                >
                tarea:
                </label>
                <input
                  placeholder={'add task'}
                  type="text"
                  name={ 'text' }
                  className={styles.textArea}
                  value={taskState.text}
                  onChange={(
                    e
                  ) => {
                            return setTaskState(
                              {
                                ...taskState,
                                text: e.target.value,
                              }
                            );
                  }}
                />

              </section>
              <section className={ layout.segmentRow }>

                <label className={styles.switchBox}>
                  <input
                    className={ styles.inputElement }
                    name="done"
                    checked={ taskState.done }
                    onChange={ (
                      e
                    ) => {
                              setTaskState(
                                {
                                  ...taskState,
                                  done: e.target.checked
                                }
                              );
                    }}
                    type="checkbox"
                  />
                  <span className={styles.slider}></span>
                </label>

              </section>

              <input type='date' name='dueDate' value={  InputDateHelper(
                taskState.dueDate
              )
              } onChange={ (
                e
              ) => {
                        return setTaskState(
                          {
                            ...taskState,
                            dueDate: new Date(
                              e.target.value
                            )

                          }
                        );
              } } />
              <input name='carpetaNumero' type='number'  className={styles.textArea} value={taskState.carpetaNumero ?? 0} onChange={ (
                e
              ) => {
                        return setTaskState(
                          {
                            ...taskState,
                            carpetaNumero: Number(
                              e.target.value
                            )
                          }
                        );
              } } />
              <input name='content[0]' type='text'  className={styles.textArea} value={taskState.content[ 0 ]} onChange={ (
                e
              ) => {
                        return setTaskState(
                          {
                            ...taskState,
                            content: [ ...taskState.content,
                              String(
                                e.target.value
                              ) ]
                          }
                        );
              } } />
            </fieldset>
            <button type={'submit'}>Add</button>
          </form>
          <pre>{JSON.stringify(
            taskState, null, 2
          )}</pre>
        </>
      );
}
