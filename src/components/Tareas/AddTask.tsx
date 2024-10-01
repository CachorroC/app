'use client';
import { useState } from 'react';
import { useDispatchTasks } from './TasksContext';
import typography from '#@/styles/fonts/typography.module.css';
import { InputDateHelper } from '#@/lib/project/date-helper';
import styles from './styles.module.css';
import layout from '#@/styles/layout.module.css';
import { addTaskToMongo, addTaskToPrisma } from '#@/app/Tareas/actions';
import { NewTask } from '#@/lib/types/tareas';

export function AddTask( {
  carpetaNumero
}: { carpetaNumero?: number} ) {
  const [
    taskState,
    setTaskState
  ] = useState<NewTask>( {
    text   : '',
    done   : false,
    content: [
      ''
    ],
    dueDate      : new Date(),
    carpetaNumero: carpetaNumero
      ? carpetaNumero
      : null,
  } );

  const dispatchTasks = useDispatchTasks();

  async function createTask() {
    /*  for ( const contenido of taskState.content ) {
              formData.append(
                'content', contenido
              );
            } */

    const taskPrisma = await addTaskToPrisma( {
      ...taskState,
    } );

    const taskMongo = await addTaskToMongo( taskState );

    alert( JSON.stringify(
      taskPrisma, null, 2
    ) );
    alert( JSON.stringify(
      taskMongo, null, 2
    ) );
    setTaskState( {
      ...taskState,
      ...taskPrisma,
      text: '',
    } );

    return dispatchTasks( {
      type: 'added',
      task: {
        ...taskState,
        ...taskPrisma,
      },
    } );
  }

  return (
    <>
      <form
        action={createTask}
        className={styles.container}
      >
        <fieldset>
          <legend>Agregar Tarea</legend>
          <section className={layout.sectionRow}>
            <label
              className={`${ styles.label } ${ typography.titleMedium }`}
              htmlFor={'text'}
            >
              tarea:
            </label>
            <input
              placeholder={'add task'}
              type="text"
              name={'text'}
              className={styles.textArea}
              value={taskState.text}
              onChange={( e ) => {
                return setTaskState( {
                  ...taskState,
                  text: e.target.value,
                } );
              }}
            />
          </section>
          <section className={layout.segmentRow}>
            <label className={styles.switchBox}>
              <input
                className={styles.inputElement}
                name="done"
                checked={taskState.done}
                onChange={( e ) => {
                  setTaskState( {
                    ...taskState,
                    done: e.target.checked,
                  } );
                }}
                type="checkbox"
              />
              <span className={styles.slider}></span>
            </label>
          </section>

          <input
            type="date"
            name="dueDate"
            value={InputDateHelper( taskState.dueDate )}
            onChange={( e ) => {
              return setTaskState( {
                ...taskState,
                dueDate: new Date( e.target.value ),
              } );
            }}
          />
          <input
            name="carpetaNumero"
            type="number"
            className={styles.textArea}
            value={taskState.carpetaNumero ?? 0}
            onChange={( e ) => {
              return setTaskState( {
                ...taskState,
                carpetaNumero: Number( e.target.value ),
              } );
            }}
          />
          <input
            name="content"
            type="text"
            className={styles.textArea}
            value={taskState.content.toLocaleString() ?? ''}
            onChange={( e ) => {
              return setTaskState( {
                ...taskState,
                content: [
                  ...taskState.content,
                  e.target.value
                ],
              } );
            }}
          />
        </fieldset>
        <button type={'submit'}>Add</button>
      </form>
      <pre>{JSON.stringify(
        taskState, null, 2
      )}</pre>
    </>
  );
}
