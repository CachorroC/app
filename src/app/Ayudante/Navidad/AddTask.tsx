'use client';
import { useState } from 'react';
import { useDispatchTasks,   } from './TasksContext';
import { createUser } from './actions';

export function AddTask(
  {
    carpetaNumero
  }: { carpetaNumero?: number }
) {

      const [
        taskState,
        setTaskState
      ] = useState(
        {
          text         : 'Nueva Tarea',
          done         : false,
          carpetaNumero: carpetaNumero
            ? carpetaNumero
            : null,
          updatedAt: new Date()
        }
      );

      const dispatchTasks = useDispatchTasks();

      async function createTask (
        formData: FormData
      ) {
            const user = await createUser(
              formData
            );

            console.log(
              user
            );
            return dispatchTasks(
              {
                type: 'added',
                task: user
              }
            );
      }

      return (
        <>
          <form action={ createTask}>
            { taskState.text }
            <input
              placeholder={ 'add task' }
              type="text"
              name={ 'text' }
              value={ taskState.text }
              onChange={ (
                e
              ) => {
                        return setTaskState(
                          {
                            ...taskState,
                            text: e.target.value
                          }
                        );
              }}/>
            <input
              type="checkbox"
              name="done"
              defaultChecked={taskState.done} />


            <button type={ 'submit' } >Add</button>
          </form><pre>
            { JSON.stringify(
              taskState, null, 2
            ) }
          </pre>
        </>
      );
}
