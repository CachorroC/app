'use client';
import { useState } from 'react';
import { IntTask, useDispatchTasks, useTasks } from './TasksContext';
import { DeleteTaskButton } from './task-buttons';
import { EditTask } from './EditTask';

export default function TaskList() {
      const tasksRaw = useTasks();

      const tasks = [
        ...tasksRaw
      ].sort(
        (
          a, b
        ) => {
                  if ( a.id < b.id ) {
                    return -1;
                  }

                  if ( b.id < a.id ) {
                    return 1;
                  }

                  return 0;
        }
      );


      return (
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>terminado</td>
              <td>contenido</td>
              <td>salvar</td>
              <td>idk</td>
            </tr>
          </thead>
          <tbody>
            {tasks.map(
              (
                task
              ) => {
                        return (

                          <Task task={task} key={task.id}/>

                        );
              }
            ) }
          </tbody>
        </table>
      );
}

function Task(
  {
    task
  }: {task: IntTask}
) {
      const [
        isEditing,
        setIsEditing
      ] = useState(
        false
      );

      const dispatchTasks = useDispatchTasks();

      let taskContent;

      if ( isEditing ) {
        taskContent = (
          <>

            <td>
              <EditTask initialTask={ task } key={task.id}/>
            </td>
            <td>
              <button type={'button'} onClick={() => {
                        return setIsEditing(
                          false
                        );
              }}>
          Save
              </button>
            </td>
          </>
        );
      } else {
        taskContent = (
          <>
            <td> { task.text }</td>
            <td>
              <button type={'button'} onClick={ () => {
                        return setIsEditing(
                          true
                        );
              } }>
              Edit
              </button>
            </td>
          </>
        );
      }

      return (
        <tr>


          <td>
            <input
              name={ 'id' }
              disabled={true}
              type={'number'}
              value={task.id}
              onChange={ e => {
                        dispatchTasks(
                          {
                            type: 'changed',
                            task: {
                              ...task,
                              id: Number(
                                e.target.value
                              )
                            }
                          }
                        );
              } } />
          </td>
          <td>
            <input
              name={'done'}
              type="checkbox"
              checked={task.done}
              onChange={ e => {
                        dispatchTasks(
                          {
                            type: 'changed',
                            task: {
                              ...task,
                              done: e.target.checked
                            }
                          }
                        );
              }}
            />
          </td>
          {taskContent}
          <td>
            <DeleteTaskButton key={task.id} id={task.id } />
          </td>
        </tr>
      );
}
